# Showing The Cursor Position

In this lesson you will learn how to use `Gtk::TextBuffer` to be notified of the position of the cursor inside the text area widget, and update a label in the header bar of the text viewer application.

![Screenshot of text-viewer in light mode in an empty state. On the headerbar there's the text 'Ln 0, Col 0'](/assets/en/cursor_position.png)

# Add the cursor position indicator

## Update the UI definition

1. Add a `GtkLabel` as the child of the `AdwHeaderBar` in the UI definition file for the `Text::Viewer::Window` class; the label must be packed as a child of type `end`, and placed after the `GtkMenuButton`
1. The label has the `cursor_pos` identifier that is going to be used to bind it in the `Text-Viewer-Window` template
1. The label has an initial content of *Ln 0*, *Col 0* set using the `label` property
1. Additionally, the label has two style classes:
    - `dim-label`, to reduce the contrast in the default theme
    - `numeric`, which will use tabular numbers in the font used by the label

```xml{14-22}
<object class="AdwHeaderBar" id="header_bar">
  <child type="start">
    <object class="GtkButton" id="open_button">
      <property name="label">Open</property>
      <property name="action-name">win.open</property>
    </object>
  </child>
  <child type="end">
    <object class="GtkMenuButton">
      <property name="primary">True</property>
      <property name="icon-name">open-menu-symbolic</property>
      <property name="tooltip-text" translatable="yes">Menu</property>
      <property name="menu-model">primary_menu</property>
    </object>
  </child>
  <child type="end">
    <object class="GtkLabel" id="cursor_pos">
      <property name="label">Ln 0, Col 0</property>
      <style>
        <class name="dim-label"/>
        <class name="numeric"/>
      </style>
    </object>
  </child>
</object>
```

## Bind the template in your source code

Add the cursor_pos widget to the `Text::Viewer::Window` class

```crystal{8,17,25}
module Text::Viewer
  @[Gtk::UiTemplate(
    resource: "/com/example/TextViewer/text-viewer-window.ui",
    children: {
      "header_bar",
      "main_text_view",
      "open_button",
      "cursor_pos",
    }
  )]
  class Window < Adw::ApplicationWindow
    include Gtk::WidgetTemplate

    @header_bar = Adw::HeaderBar
    @main_text_view : Gtk::TextView
    @open_button : Gtk::Button
    @cursor_pos : Gtk::Label

    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
      @open_button = Gtk::Button.cast(template_child("open_button"))
      @cursor_pos = Gtk::Label.cast(template_child("cursor_pos"))

      open_action = Gio::SimpleAction.new("open", nil)
      open_action.activate_signal.connect do
        self.open_file_dialog
      end
      self.add_action open_action
    end
    #...
```

# Update the cursor position label

1. Retrieve the [`Gtk::TextBuffer`](https://libadwaita.geopjr.dev/docs/Gtk/TextBuffer.html) from the `main_text_view` widget and connect a callback to the `notify::cursor-position` signal to receive a notification every time the `cursor-position` property changes:

```crystal{16-17}
    #...
    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
      @open_button = Gtk::Button.cast(template_child("open_button"))
      @cursor_pos = Gtk::Label.cast(template_child("cursor_pos"))

      open_action = Gio::SimpleAction.new("open", nil)
      open_action.activate_signal.connect do
        self.open_file_dialog
      end
      self.add_action open_action

      @main_text_view.buffer.notify_signal["cursor-position"].connect do
      end
    end
    #...
```

2. Define the `notify::cursor-position` (lambda) callback to retrieve the position of the cursor from the [`Gtk::TextBuffer`](https://libadwaita.geopjr.dev/docs/Gtk/TextBuffer.html) object, and update the contents of the `cursor_pos` label:

```crystal{17-20}
    #...
    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
      @open_button = Gtk::Button.cast(template_child("open_button"))
      @cursor_pos = Gtk::Label.cast(template_child("cursor_pos"))

      open_action = Gio::SimpleAction.new("open", nil)
      open_action.activate_signal.connect do
        self.open_file_dialog
      end
      self.add_action open_action

      @main_text_view.buffer.notify_signal["cursor-position"].connect do
        buffer = @main_text_view.buffer
        cursor_position = buffer.cursor_position
        iter = buffer.iter_at_offset(cursor_position)
        @cursor_pos.label = "Ln #{iter.line}, Col #{iter.line_offset}"
      end
    end
    #...
```

The objective of this lesson is to update the contents of a [`Gtk::Label`](https://libadwaita.geopjr.dev/docs/Gtk/Label.html) widget every time the position of the cursor in the [`Gtk::TextView`](https://libadwaita.geopjr.dev/docs/Gtk/TextView.html) widget changes by using the property notification mechanism provided by **GObject**.
