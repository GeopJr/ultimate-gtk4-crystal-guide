# GResource

En suivant la section [GResource](../concepts/gresource), nous utiliseront GResource pour bundler rapidement les assets dans l'application :

## `data/dev.geopjr.tinystats.gresource.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/dev/geopjr/tinystats">
    <file compressed="true">css/style.css</file>
    <file compressed="true" preprocess="xml-stripblanks">icons/dev.geopjr.tinystats.svg</file>
    <file compressed="true" preprocess="xml-stripblanks">ui/app.ui</file>
  </gresource>
</gresources>
```

## Code

### `src/modules/prerequisites.cr`

Nous n'avons plus besoin des variables globales `UI` et `CSS`, donc nous allons les commenter (voir les supprimer) pendant le chargement du gresource :

```crystal
# UI         = {{read_file("./data/ui/app.ui")}}
# CSS_STRING = {{read_file("./data/css/style.css")}}

Gio.register_resource("data/dev.geopjr.tinystats.gresource.xml", "data")
```

### `src/tiny-stats.cr`

Nous pouvons maintenant charger le fichier UI depuis le ressource :

```crystal
B_UI = Gtk::Builder.new_from_resource("/dev/geopjr/tinystats/ui/app.ui")
```

### `src/modules/views/main.cr`

Nous pouvons charger le ficher CSS depuis GResource aussi :

```crystal
def startup(app : Gtk::Application)
    CSS.load_from_resource("/dev/geopjr/tinystats/css/style.css")
end
```
