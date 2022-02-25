---
postName: GResource
---

# GResource

Following the [GResource](../03%20-%20Concepts/04%20-%20GResource) section, we'll make use of GResource to quickly bundle our assets in the app:

## data/dev.geopjr.tinystats.gresource.xml

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

Let's also build it: `glib-compile-resources --sourcedir data --target data/dev.geopjr.tinystats.gresource data/dev.geopjr.tinystats.gresource.xml`

## Code

### src/modules/prerequisites.cr

We no longer need the `UI` and `CSS` global variables, so we can go ahead and comment them out (or remove them) while loading the gresource:

```crystal
# UI         = {{read_file("./data/ui/app.ui")}}
# CSS_STRING = {{read_file("./data/css/style.css")}}

RESOURCE = Gio::Resource.new_from_data(GLib::Bytes.new({{read_file("./data/dev.geopjr.tinystats.gresource")}}.bytes))
RESOURCE._register
```

### src/tiny-stats.cr

We can now load the ui file from the resource:

```crystal
B_UI = Gtk::Builder.new_from_resource("/dev/geopjr/tinystats/ui/app.ui")
```

### src/modules/views/main.cr

We can load our CSS from the GResource too:

```crystal
def startup(app : Gtk::Application)
    CSS.load_from_resource("/dev/geopjr/tinystats/css/style.css")
end
```
