---
postName: Code
---

# Code

## Dependencies

We need the following:

- gtk4.cr
- hardware
- non-blocking-spawn
- gettext.cr

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

## src/modules/prerequisites.cr

For now, we need to gather the app version from `shard.yml` and load the UI & CSS files as strings using macros.

These will later be replaced with GResource.

```crystal
module Tiny::Stats
  extend self

  VERSION    = {{read_file("./shard.yml").split("version: ")[1].split("\n")[0]}}
  UI         = {{read_file("./data/ui/app.ui")}}
  CSS_STRING = {{read_file("./data/css/style.css")}}
end
```

## src/tiny-stats.cr (main file)

This is responsible for the load order and for loading dependencies. However it can still be used for code that will run after the other files.

We create a new `Builder` using the `UI` global variable from `prerequisites`, a new `CssProvider` and a new `Application`.

Since we assigned IDs to the widgets we are going to need, we can assign them to global vars for easy access later on by down-casting.

```crystal
require "gtk4"
require "hardware"
require "non-blocking-spawn"

require "./modules/prerequisites.cr"
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

## src/modules/functions/meters.cr

We want to update the hardware stats in an infinite loop. To achieve this we are going to spawn a fiber (with the parallelism flag) that updates the labels (using the global vars from before) every second.

We also want it to start on demand, so we are going to wrap it in a method inside a new module.

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

## src/modules/functions/about_action.cr

Similarly, let's also create the "About app" action.

We need to create a new `Gio#SimpleAction` with the name of the action we set in the UI file:

`<attribute name="action">app.about</attribute>` => `about`

Then we add it to the `Gtk::Application` and handle its `activate_signal`.

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

## src/modules/views/main.cr

Since our app is very simple and has only one view, we'll glue everything together here.

We'll connect to the `startup` and `activate` signals. The `startup` signal will be used to load the CSS:

```crystal
def startup(app : Gtk::Application)
  CSS.load_from_data(CSS_STRING.bytes)
end
```

The `activate` signal emits every time your app launches, this means that it can emit _multiple_ times. We wan't to avoid that with tiny stats and instead just focus the window if it's already running.

We also want the window title to change based on the `Notebook` page title. We can do so by connecting to the `switch_page_signal` and get the current page title using `Gtk::Notebook#tab_label_text`:

```crystal
NOTEBOOK.switch_page_signal.connect do |x|
  window.title = "Tiny Stats - #{NOTEBOOK.tab_label_text(x)}"
end
```

We will also initialize the above mentioned functions:

```crystal
Tiny::Stats::Meters.init
Tiny::Stats.about_action(app)
```

Let's also make Crystal exit when the app closes:

```crystal
exit(APP.run(ARGV))
```

The finished file should be:

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

It should now be runnable: `crystal run src/tiny-stats.cr -Dpreview_mt`

![Screenshot of the app running showing cpu info](/assets/en/code-0.png)
