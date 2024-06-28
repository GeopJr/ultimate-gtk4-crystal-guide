# Saving The Content To A File

In this lesson you will learn how to add a menu entry with a key shortcut, ask the user to select a file for saving the [`Gtk::TextBuffer`](https://libadwaita.geopjr.dev/docs/Gtk/TextBuffer.html) contents, and save a file.

# Add the “Save As” menu item

1. Open the UI definition file for your window and find the `primary_menu` menu definition at the bottom of the file
2. Remove the “Preferences” menu item, as we are not going to need it
3. In place of the removed menu item, add the definition of the **Save As** menu item:

```xml{3-6}
<menu id="primary_menu">
  <section>
    <item>
      <attribute name="label" translatable="yes">_Save as...</attribute>
      <attribute name="action">win.save-as</attribute>
    </item>
    <item>
      <attribute name="label" translatable="yes">_Keyboard Shortcuts</attribute>
      <attribute name="action">win.show-help-overlay</attribute>
    </item>
    <item>
      <attribute name="label" translatable="yes">_About {{name}}</attribute>
      <attribute name="action">app.about</attribute>
    </item>
  </section>
</menu>
```

The “Save as” menu item is bound to the `win.save-as` action; this means that activating the menu item will activate the `save-as` action registered on the `Text::Viewer::Window` window.

# Add the “Save As” action

1. Open the `window.cr` file, and find the class constructor of the `Text::Viewer::Window` widget
1. Create the `save-as` action, connect a callback to its `activate` signal, and add the action to the window

```crystal{15-19}
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

      save_action = Gio::SimpleAction.new("save-as", nil)
      save_action.activate_signal.connect do
        self.save_file_dialog
      end
      self.add_action save_action

      @main_text_view.buffer.notify_signal["cursor-position"].connect do
        buffer = @main_text_view.buffer
        cursor_position = buffer.cursor_position
        iter = buffer.iter_at_offset(cursor_position)
        @cursor_pos.label = "Ln #{iter.line}, Col #{iter.line_offset}"
      end
    end
```

# Select a file

1. In the `activate` callback method for the `save-as` action, create a file selection dialog using the `Gtk::FileChooserAction::Save` action, and connect to its `response` signal

```crystal
    private def save_file_dialog
      filechooser = Gtk::FileChooserNative.new("Save File As", nil, Gtk::FileChooserAction::Save, "_Save", "_Cancel")
      filechooser.transient_for = self
      filechooser.response_signal.connect do |response|
      end

      filechooser.show
    end
```

2. In the method, retrieve the [`Gio::File`](https://libadwaita.geopjr.dev/docs/Gio/File.html) for the location selected by the user, and call the save_file method

```crystal{5-7}
    private def save_file_dialog
      filechooser = Gtk::FileChooserNative.new("Save File As", nil, Gtk::FileChooserAction::Save, "_Save", "_Cancel")
      filechooser.transient_for = self
      filechooser.response_signal.connect do |response|
        if Gtk::ResponseType.from_value(response) == Gtk::ResponseType::Accept
          self.save_file(filechooser.file)
        end
      end

      filechooser.show
    end
```

# Save the contents of the text buffer

In the `save_file` method, retrieve the contents of the [`Gtk::TextBuffer`](https://libadwaita.geopjr.dev/docs/Gtk/TextBuffer.html) using the start and end [`Gtk::TextIter`](https://libadwaita.geopjr.dev/docs/Gtk/TextIter.html) as the bounds of the buffer, then save it to the [`Gio::File`](https://libadwaita.geopjr.dev/docs/Gio/File.html)'s `Path` using Crystal's File IO

```crystal
    private def save_file(file : Gio::File?)
      return if file.nil?

      file_path = file.not_nil!.path.not_nil!
      File.open(file_path, "w") do |file_io|
        buffer = @main_text_view.buffer

        # Retrieve the iterator at the start of the buffer
        start_iter = buffer.start_iter

        # Retrieve the iterator at the end of the buffer
        end_iter = buffer.end_iter

        # Retrieve all the visible text between the two bounds
        text = buffer.text(start_iter, end_iter, false)
        return if text.size == 0

        file_io.print(text)
      end
    end
```

# Add a key shortcut for the “Save As” action

1. Open the `text-viewer.cr` source file and find the constructor for the `Text::Viewer::App` class
1. Add <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> as the accelerator shortcut for the `win.save-as` action

```crystal{8}
  #...
  class App < Adw::Application
    def initialize
      #...

      self.set_accels_for_action("app.quit", {"<primary>q"})
      self.set_accels_for_action("win.open", {"<Ctrl>o"})
      self.set_accels_for_action("win.save-as", {"<Ctrl><Shift>s"})

      #...
    end
    #...
```

# Add the “Save As” shortcut to the Keyboard Shortcuts help

1. Find the `help-overlay.ui` file in the sources directory
1. Find the `GtkShortcutsGroup` definition
1. Add a new `GtkShortcutsShortcut` definition for the `win.save` action in the shortcuts group

```xml{9-14}
<object class="GtkShortcutsGroup">
  <property name="title" translatable="yes" context="shortcut window">General</property>
  <child>
    <object class="GtkShortcutsShortcut">
      <property name="title" translatable="yes" context="shortcut window">Open</property>
      <property name="action-name">win.open</property>
    </object>
  </child>
  <child>
    <object class="GtkShortcutsShortcut">
      <property name="title" translatable="yes" context="shortcut window">Save As</property>
      <property name="action-name">win.save-as</property>
    </object>
  </child>
```

At the end of this lesson, you should be able to:

- select the “Save As” menu item from the primary menu
- select a file from a dialog
- save the contents of the text viewer in the selected file
