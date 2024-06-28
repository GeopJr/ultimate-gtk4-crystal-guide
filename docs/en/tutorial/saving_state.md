# Saving The Application State

The aim of this lesson is to illustrate how to define new settings starting from their schema, and bind them to properties on your window in order to save and restore the size and state of the window across different sessions.

## Add new keys to the settings schema

Settings are stored in a database, and each key is described inside a schema; the schema contains the type of the value associated with the key, as well as the default value of the key.

1. Open the `com.example.TextViewer.gschema.xml` file under the data directory
1. Add a `window-width`, `window-height`, and `window-maximized` keys to the schema, including their default values of `600`, `400`, and `false`, respectively

```xml{3-11}
<schemalist gettext-domain="text-viewer">
  <schema id="com.example.TextViewer" path="/com/example/TextViewer/">
    <key name="window-width" type="i">
      <default>600</default>
    </key>
    <key name="window-height" type="i">
      <default>400</default>
    </key>
    <key name="window-maximized" type="b">
      <default>false</default>
    </key>
  </schema>
</schemalist>
```

:::info
The schema needs to be installed before your app can use it. Use the Makefile which takes care of it `# make schema`.
:::

## Use GSettings

**GSettings** is the object that watches the keys for a specific schema id. You use the GSettings API to access the value of the keys, as well as get notified of changes in the settings.

1. Open the `window.cr` file
1. Modify the `Text::Viewer::Window` class to include a [`Gio::Settings`](https://libadwaita.geopjr.dev/docs/Gio/Settings.html) property and initialize it with the `com.example.TextViewer` schema id

```crystal{10,15}
  #...
  class Window < Adw::ApplicationWindow
    include Gtk::WidgetTemplate

    @header_bar = Adw::HeaderBar
    @main_text_view : Gtk::TextView
    @open_button : Gtk::Button
    @cursor_pos : Gtk::Label

    @settings : Gio::Settings

    def initialize
      super()

      @settings = Gio::Settings.new("com.example.TextViewer")
    #...
```

## Bind the settings to the window state properties

Keys inside a **GSettings** schema can be bound to **GObject** properties; bound properties will be automatically saved inside the settings database whenever they change, and will be restored at creation time.

Modify the `Text::Viewer::Window` class constructor to bind the `window-width`, `window-height`, and `window-maximize` keys to the `default-width`, `default-height`, and `maximized` properties, respectively

```crystal{4-6}
    def initialize
      super()
      #...
      @settings.bind("window-width", self, "default-width", Gio::SettingsBindFlags::Default)
      @settings.bind("window-height", self, "default-height", Gio::SettingsBindFlags::Default)
      @settings.bind("window-maximized", self, "maximized", Gio::SettingsBindFlags::Default)
    end
```

:::warning
You cannot bind regular Crystal instance variables or getters/setters like this. Those work because they are **GObject** properties. You can, however, create **GObject** properties from Crystal with annotations.
:::

In this lesson you have added keys to the GSettings schema associated with your application; managed the lifetime of the GSettings instance by tying it to the application window; and bound the keys in the GSettings database to the state properties of your application window.
