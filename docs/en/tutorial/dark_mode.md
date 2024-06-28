# Forcing The Dark Color Scheme

GNOME applications will respect the system setting for the light or dark theme. It is possible, however, to present the choice of forcing the dark theme to the user in your application’s UI.

![Screenshot of text-viewer in dark mode with the 'COPYING' file open](/assets/en/dark_mode.png)

## Add the “Dark Mode” item to the application’s menu

1. Open the UI definition file for the `Text::Viewer::Window` widget
1. Add a menu item for the `app.dark` action, called `Dark Mode`

```xml{7-10}
<menu id="primary_menu">
  <section>
    <item>
      <attribute name="label" translatable="yes">Save _as...</attribute>
      <attribute name="action">win.save-as</attribute>
    </item>
    <item>
      <attribute name="label" translatable="yes">_Dark mode</attribute>
      <attribute name="action">app.dark-mode</attribute>
    </item>
```

## Add the dark mode action to the application

1. Open the `Text::View::App` source
1. Find the `Text::View::App` class constructor
1. Create the `dark-mode` **stateful** action and connect to its `activate` and `change-state` signals
1. Add the action to the application

```crystal{5-9,11}
    def initialize
      super(application_id: "com.example.TextViewer", flags: Gio::ApplicationFlags::DefaultFlags)

      #...
      dark_mode_action = Gio::SimpleAction.new_stateful("dark-mode", nil, GLib::Variant.new(false))
      dark_mode_action.activate_signal.connect do
      end
      dark_mode_action.change_state_signal.connect do |new_state|
      end
      #...
      self.add_action dark_mode_action
    end
```

5. Add the `activate_signal` callback; this callback toggles the state of the `dark-mode` action between `true` and `false`

```crystal{3-6}
dark_mode_action = Gio::SimpleAction.new_stateful("dark-mode", nil, GLib::Variant.new(false))
dark_mode_action.activate_signal.connect do
  state = dark_mode_action.state
  old_state = state.nil? ? false : state.as_bool
  new_state = !old_state
  dark_mode_action.change_state(GLib::Variant.new(new_state))
end
dark_mode_action.change_state_signal.connect do |new_state|
end
```

6. Add the `change_state_signal` callback; this callback is responsible for switching the application’s color scheme using the [`Adw::StyleManager`](https://libadwaita.geopjr.dev/docs/Adw/StyleManager.html) API

```crystal{9-12}
dark_mode_action = Gio::SimpleAction.new_stateful("dark-mode", nil, GLib::Variant.new(false))
dark_mode_action.activate_signal.connect do
  state = dark_mode_action.state
  old_state = state.nil? ? false : state.as_bool
  new_state = !old_state
  dark_mode_action.change_state(GLib::Variant.new(new_state))
end
dark_mode_action.change_state_signal.connect do |new_state|
  dark_mode = new_state.nil? ? false : new_state.as_bool
  style_manager = Adw::StyleManager.default
  style_manager.color_scheme = dark_mode ? Adw::ColorScheme::ForceDark : Adw::ColorScheme::Default
  dark_mode_action.state = new_state
end
```

## Store the dark mode state as a setting

If you want to preserve the chosen color scheme across sessions you can store it inside **GSettings**, which you added in [Saving The Application State](./saving_state).

### Add a new key to the settings schema

1. Open the `com.example.TextViewer.gschema.xml` file
1. Add a `dark-mode` boolean key

```xml{13-15}
<?xml version="1.0" encoding="UTF-8"?>
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
    <key name="dark-mode" type="b">
      <default>false</default>
    </key>
  </schema>
</schemalist>
```

:::warning
You'll need to re-install and compile the schema.
:::

### Add GSettings to the application

Add a [`Gio::Settings`](https://libadwaita.geopjr.dev/docs/Gio/Settings.html) instance to your `Text::Viewer::App` class

```crystal{2,7}
  class App < Adw::Application
    @settings : Gio::Settings

    def initialize
      super(application_id: "com.example.TextViewer", flags: Gio::ApplicationFlags::DefaultFlags)

      @settings = Gio::Settings.new("com.example.TextViewer")
```

### Set the initial state for the color scheme

1. Retrieve the value of the `dark-mode` **GSettings** key
1. Set the color scheme using the key’s value
1. Initialize the state of the `dark-mode` action with the key’s value

```crystal{11-13,15}
  class App < Adw::Application
    @settings : Gio::Settings

    def initialize
      super(application_id: "com.example.TextViewer", flags: Gio::ApplicationFlags::DefaultFlags)

      @settings = Gio::Settings.new("com.example.TextViewer")

      #...

      dark_mode = @settings.boolean("dark-mode");
      style_manager = Adw::StyleManager.default
      style_manager.color_scheme = dark_mode ? Adw::ColorScheme::ForceDark : Adw::ColorScheme::Default

      dark_mode_action = Gio::SimpleAction.new_stateful("dark-mode", nil, GLib::Variant.new(dark_mode))
      #...
```

### Save the color scheme when it changes

Update the `dark-mode` **GSettings** key using the state of the `dark-mode` action whenever it changes.

```crystal{7}
dark_mode_action.change_state_signal.connect do |new_state|
  dark_mode = new_state.nil? ? false : new_state.as_bool
  style_manager = Adw::StyleManager.default
  style_manager.color_scheme = dark_mode ? Adw::ColorScheme::ForceDark : Adw::ColorScheme::Default
  dark_mode_action.state = new_state

  @settings.set_boolean("dark-mode", dark_mode)
end
```

In this lesson you have learned how to force the dark color scheme for your application, and storing it as an application preference.
