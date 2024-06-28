# Getting Started

The GNOME Tutorial uses GNOME Builder to generate the project and uses meson as its build system. Unfortunately, these are not compatible with Crystal, so we are going to use a pre-configured repo based on one of Builder's presets.

Let's clone it:

```sh
$ git clone https://github.com/GeopJr/gnome-beginners-guide-crystal 
```

- `src`

This is the directory with the sources of your application, as well as the UI definition files for its widgets.

- `src/text-viewer.gresource.xml`

The [GResource](https://docs.gtk.org/gio/struct.Resource.html#description) manifest for assets that will be built into the project using `glib-compile-resources`.

- `po/POTFILES`

The list of files containing [translatable](https://developer.gnome.org/documentation/guidelines/localization.html), user-visible strings.

- `data/com.example.TextViewer.gschema.xml`

The schema file for the [settings](https://docs.gtk.org/gio/class.Settings.html) of the application.

- `data/com.example.TextViewer.desktop.`

The [desktop entry file](https://developer.gnome.org/documentation/guidelines/maintainer/integrating.html) for the application.

- `data/com.example.TextViewer.appdata.xml`

The [application metadata](https://www.freedesktop.org/software/appstream/docs/chap-Quickstart.html) used by app stores and application distributors.
