# Code

## Dépendances

Ci-dessous, nous avons besoin :

- `gtk4.cr`
- `hardware`
- `non-blocking-spawn`
- `gettext.cr`

```yaml
dependencies:
  gtk4:
    github: hugopl/gtk4.cr
  hardware:
    github: crystal-community/hardware
  non-blocking-spawn:
    github: GeopJr/non-blocking-spawn
  gettext:
    github: GeopJr/gettext.cr
```

## `src/modules/prerequisites.cr`

Maintenant, nous avons besin de rassembler la version de l'application depuis le fichier `shard.yml` et charger les fichiers UI et CSS en tant que chaîne de caractères en utilisant des macros.

Plus tard, ceci va être remplacé par GResource.

```crystal
module Tiny::Stats
  extend self

  VERSION    = {{read_file("./shard.yml").split("version: ")[1].split("\n")[0]}}
  UI         = {{read_file("./data/ui/app.ui")}}
  CSS_STRING = {{read_file("./data/css/style.css")}}
end
```

## `src/tiny-stats.cr` (fichier principal)

Ce fichier est responsable du chargement de l'ordre et des dépendances. Cependant, il peut être toujours utilisé pour du code qui va être éxécutée après les autres fichiers.

Nous allons créer un nouveau `Builder` en utilisant la variable globale `UI` depuis `prerequisites`, un nouveau `CssProvider` ainsi que `Application`.

Depuis que nous avons affecté les ID aux widgets que nous allons avoir besoin, on peut les affecter dans les variables gloables pour rendre l'accès plus facile sur le **down-casting**.

```crystal
require "gtk4"
require "hardware"
require "non-blocking-spawn"

require "./modules/prerequisites.cr" # Vous pouvez aussi juste placer les contenus ici,
                                     # il faut juste faire en sorte que celui-ci soit au-dessus du code.

require "./modules/functions/*"
require "./modules/views/*"

module Tiny::Stats
  B_UI = Gtk::Builder.new_from_string(UI, UI.bytesize.to_i64)
  CSS  = Gtk::CssProvider.new

  NOTEBOOK = Gtk::Notebook.cast(B_UI["tinyNotebook"])
  MENU_BTN = Gtk::MenuButton.cast(B_UI["tinyMenu"])
  CPU_GRID = Gtk::Grid.cast(B_UI["tinyCPU"])

  MEMORY_AVAILABLE = Gtk::Label.cast(B_UI["tinyAvailable"])
  MEMORY_USED      = Gtk::Label.cast(B_UI["tinyUsed"])
  MEMORY_TOTAL     = Gtk::Label.cast(B_UI["tinyTotal"])

  NET_UP   = Gtk::Label.cast(B_UI["tinyUp"])
  NET_DOWN = Gtk::Label.cast(B_UI["tinyDown"])

  CPU_USAGE = Gtk::Label.cast(B_UI["tinyCPUUsage"])
  CPU_USED = Gtk::Label.cast(B_UI["tinyCPUUsed"])
  CPU_TOTAL = Gtk::Label.cast(B_UI["tinyCPUTotal"])

  APP = Gtk::Application.new("dev.geopjr.tinystats", Gio::ApplicationFlags::None)
end
```

## `src/modules/functions/meters.cr`

Nous souhaitons mettre à jour les états du matériel dans une boucle infinie. Pour accomplir cela, nous allons créer une fibre (avec le drapeau du parrallélisme) qui va mettre à jour des labels (en utilisant les variables globales depuis avant) chaque seconde.

Nous voulons aussi la démarrer à la demande, donc on va wrapper dans une méthode à l'intérieur d'une module.

```crystal
module Tiny::Stats
  module Meters
    extend self

    def init
      Non::Blocking.spawn do
        old_in, old_out = 0.0, 0.0
        cpus = Hardware::CPU.new
        loop do
          memory = Hardware::Memory.new
          net = Hardware::Net.new

          MEMORY_USED.text = "#{(memory.used/1024).to_i64} mb"
          MEMORY_AVAILABLE.text = "#{(memory.available/1024).to_i64} mb"
          MEMORY_TOTAL.text = "#{(memory.total/1024).to_i64} mb"

          now_in, now_out = net.in_octets, net.out_octets
          NET_DOWN.text = "#{(now_in - old_in) / 1000} kB/s"
          NET_UP.text = "#{(now_out - old_out) / 1000} kB/s"
          old_in, old_out = now_in, now_out

          CPU_USAGE.text = "#{cpus.usage!.to_i64} %"
          CPU_USED.text = "#{cpus.used}"
          CPU_TOTAL.text = "#{cpus.total}"

          sleep 1.second
        end
      end
    end
  end
end
```

## `src/modules/functions/about_action.cr`

Similairement, nous allons aussi créer une action "À propos de l'application".

Nous avons besoin de créer une action `Gio#SimpleAction` avec son nom qui est défini dans le fichier UI : 

`<attribute name="action">app.about</attribute>` => `about`

Puis, nous l'ajoutons dans la classe `Gtk::Application` et gérer dans la méthode `activate_signal`.

```crystal
module Tiny::Stats
  extend self

  def about_action(app : Gtk::Application)
    action = Gio::SimpleAction.new("about", nil)
    app.add_action(action)

    action.activate_signal.connect do
      Gtk.show_about_dialog(
        APP.active_window,
        name: "About Tiny Stats",
        application: APP,
        program_name: "Tiny Stats",
        version: VERSION,
        logo_icon_name: "dev.geopjr.tinystats",
        copyright: "© 2021 Evangelos Paterakis",
        website: "https://github.com/GeopJr/tiny-stats-template",
        authors: ["Evangelos \"GeopJr\" Paterakis"],
        artists: ["Evangelos \"GeopJr\" Paterakis"],
      )
    end
  end
end
```

## `src/modules/views/main.cr`

Depuis que notre application est très simple et qu'elle a qu'une seule vue, nous allons tous la coller ici.

Nous allons la connecter dans les signals `startup` et `activate` qui vont être utilisés pour charger le CSS :
```crystal
def startup(app : Gtk::Application)
  CSS.load_from_data(CSS_STRING.bytes)
end
```

Le signal `activate` émet à chaque fois que votre application lance, ce qui veut dire qu'il émet plusieurs fois. Nous souhaitons éviter cela avec les petites statistiques et et juste focaliser la fenêtre s'il est déjà prête.

Nous souhaitons aussi que le titre de la fenêtre change, en fonction du titre de la page `Notebook`. On peut le faire en se connectant au signal `switch_page_signal` et récupérer le titre de la page actuelle en utilisant la méthode `Gtk::Notebook#tab_label_text` :

```crystal
NOTEBOOK.switch_page_signal.connect do |x|
  window.title = "Tiny Stats - #{NOTEBOOK.tab_label_text(x)}"
end
```

Nous souhaitons aussi initialiser les fonctions qui sont mentionnées ci-dessus :
```crystal
Tiny::Stats::Meters.init
Tiny::Stats.about_action(app)
```

Faisons en sorte que Crystal quitte le programme quand l'application se ferme :
```crystal
exit(APP.run(ARGV))
```

Le fichier final devrait ressembler à cela :

```crystal
module Tiny::Stats
  @@main_window_id = 0_u32

  def startup(app : Gtk::Application)
    CSS.load_from_data(CSS_STRING.bytes)
  end

  def activate(app : Gtk::Application)
    main_window = APP.window_by_id(@@main_window_id)
    return main_window.present if main_window

    window = Gtk::ApplicationWindow.cast(B_UI["tinyWindow"])
    window.application = app
    window.title = "Tiny Stats - CPU"
    @@main_window_id = window.id

    Tiny::Stats::Meters.init
    Tiny::Stats.about_action(app)

    NOTEBOOK.switch_page_signal.connect do |x|
      window.title = "Tiny Stats - #{NOTEBOOK.tab_label_text(x)}"
    end

    Gtk::StyleContext.add_provider_for_display(window.display, CSS, Gtk::STYLE_PROVIDER_PRIORITY_APPLICATION.to_u32)
    window.present
  end

  APP.startup_signal.connect(->startup(Gtk::Application))
  APP.activate_signal.connect(->activate(Gtk::Application))
  exit(APP.run(ARGV))
end
```

Ceci devrait maintenant être éxécutable :
```
$ crystal run src/tiny-stats.cr -Dpreview_mt
```

![Capture d'écran de l'application en cours d'éxecution, voir infos cpu](/assets/en/code-0.png)
