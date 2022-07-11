# GResource

GResource is a resource bundle that includes application data like:

- UI files
- Icons
- CSS

There are quite a few ways to bundle such assets in Crystal (including manually loading them using macros), however GResource offers something important that they don't - being integrated with GTK.

That allows you to e.g. directly set css & icons to those loaded from the bundle (`Widget#icon_name = "path/in/bundle/icon.svg"`).

To get started, create a `data/APP_ID.gresource.xml` with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/path/for/bundle">
    <file compressed="true">css/style.css</file>
    <file compressed="true" preprocess="xml-stripblanks">icons/my_app.svg</file>
    <file compressed="true" preprocess="xml-stripblanks">ui/my_app.ui</file>
  </gresource>
</gresources>
```

That will bundle the following files: `data/css/style.css`, `icons/my_app.svg` & `ui/my_app.ui`, compress them and strip their whitespace.

You should replace `/path/for/bundle` with the path you want, usually the APP_ID (e.g. `dev.geopjr.My_app` => `/dev/geopjr/My_app`).

And now you can load them as if they are at that location, eg: `Gtk::CssProvider#load_from_resource("/dev/geopjr/My_app/css/style.css")`.

Debugger should also be able to list them under `Global > Resources`.

#### Creating & Loading the binary

You can either create and load it manually or use the `Gio#register_resource` macro that does both of them for you:

##### `Gio#register_resource`

We just call it in `prerequisites`:

```crystal
Gio.register_resource("data/dev.geopjr.My_app.gresource.xml", "data")
```

##### Manually

###### Creating the binary

The binary is being created with the use of an external tool, `glib-compile-resources`.

The full command is:
```
$ glib-compile-resources --sourcedir BASE_FOLDER --target PATH/TO/COMPILED.gresource PATH/TO/FILE.gresource.xml
```
Having the above locations as examples, it should look like:
```
$ glib-compile-resources --sourcedir data --target data/dev.geopjr.My_app.gresource data/dev.geopjr.My_app.gresource.xml
```

###### Loading the binary

There should now be a `data/dev.geopjr.My_app.gresource` binary.

We load it in memory using macros and then register it in `prerequisites`.
Follow `Gio#register_resource`'s [source](https://github.com/hugopl/gtk4.cr/blob/77c98c350166baedc44d10e2030aaf7946d04e6b/src/bindings/gio/resource.cr).

::: tip
Remember to add `*.gresource` to your `.gitignore`.
:::

::: tip
Replace `APP_ID` with your app's ID.
:::
