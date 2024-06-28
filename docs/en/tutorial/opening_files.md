# Loading Content From A File

In this lesson you will learn how to ask the user to select a file, load the file’s contents, and then put those contents into the text area of our text viewer.

![Screenshot of text-viewer in light mode in an empty state](/assets/en/opening_files.png)

# Add an “Open” button

In order to open a file, you need to let the user select it. You can follow these instructions to add a **button** to the window’s header bar that will open a file selection dialog.

## Update the UI definition

1. Open the `text-viewer-window.ui` file
1. Find the **object** definition for the [`Adw::HeaderBar`](https://libadwaita.geopjr.dev/docs/Adw/HeaderBar.html) widget
1. Add an **object** definition for a [`Gtk::Button`](https://libadwaita.geopjr.dev/docs/Gtk/Button.html) as a child of the header bar, packing it at the leading edge of the window decoration using the **start** type:

```xml{2-7}
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
```
4. The button has the `open_button` identifier, so you can bind it in the window template.
5. The button also has an **action-name** property set to **win.open**; this action will be activated when the user presses the button.

## Bind the template in your source code

1. Open the `window.cr` file
1. Add the `open_button` widget to the `Text::Viewer::Window` class:

```crystal{7,15,22}
module Text::Viewer
  @[Gtk::UiTemplate(
    resource: "/com/example/TextViewer/text-viewer-window.ui",
    children: {
      "header_bar",
      "main_text_view",
      "open_button",
    }
  )]
  class Window < Adw::ApplicationWindow
    include Gtk::WidgetTemplate

    @header_bar = Adw::HeaderBar
    @main_text_view : Gtk::TextView
    @open_button : Gtk::Button

    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
      @open_button = Gtk::Button.cast(template_child("open_button"))
    end
  end
end
```

# Add the “Open” action

Add the `open` **action** to the `Text::Viewer::Window` class.

Once you add the open action to the window, you can address it as `win.open`:

1. Create and add the action in the `Window`'s constructor:

```crystal{24-28}
module Text::Viewer
  @[Gtk::UiTemplate(
    resource: "/com/example/TextViewer/text-viewer-window.ui",
    children: {
      "header_bar",
      "main_text_view",
      "open_button",
    }
  )]
  class Window < Adw::ApplicationWindow
    include Gtk::WidgetTemplate

    @header_bar = Adw::HeaderBar
    @main_text_view : Gtk::TextView
    @open_button : Gtk::Button

    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
      @open_button = Gtk::Button.cast(template_child("open_button"))

      open_action = Gio::SimpleAction.new("open", nil)
      open_action.activate_signal.connect do
        self.open_file_dialog
      end
      self.add_action open_action
    end
  end
end
```
2. Open the `text-viewer.cr` source file and find the class constructor
1. Add <kbd>Ctrl</kbd> + <kbd>O</kbd> as the accelerator shortcut for the `win.open` action

```crystal{7}
  #...
  class App < Adw::Application
    def initialize
      #...

      self.set_accels_for_action("app.quit", {"<primary>q"})
      self.set_accels_for_action("win.open", {"<Ctrl>o"})

      #...
    end
    #...
```

# Select a file

Now that you have added action, you must define the function that will be called when the action is activated.

1. Create an `open_file_dialog` method in `Window` in `window.cr`, and inside it, create a [`Gtk::FileChooserNative`](https://libadwaita.geopjr.dev/docs/Gtk/FileChooserNative.html) object, which will present a **file selection dialog** to the user

```crystal
    #...
    private def open_file_dialog
      filechooser = Gtk::FileChooserNative.new("Open File", nil, Gtk::FileChooserAction::Open, "_Open", "_Cancel")
      filechooser.transient_for = self

      filechooser.show
    end
```

2. When the filechooser emits the `response` signal, the following code in the lambda gets executed. This happens once the user has selected the file and closed the dialog, or simply closed the dialog without selecting a file:

```crystal{5-11}
    #...
    private def open_file_dialog
      filechooser = Gtk::FileChooserNative.new("Open File", nil, Gtk::FileChooserAction::Open, "_Open", "_Cancel")
      filechooser.transient_for = self
      filechooser.response_signal.connect do |response|
        # If the user selected a file...
        if Gtk::ResponseType.from_value(response) == Gtk::ResponseType::Accept
          # ... retrieve the location from the dialog and open it
          self.open_file (filechooser.file);
        end
      end

      filechooser.show
    end
```

# Read & Show the contents of a file

Instead of relying on Gio to read the file, you will use Crystal's IO operations. In the `Window` class in the `window.cr` file, create the following method:

```crystal
    #...
    private def open_file(file : Gio::File?)
      return if file.nil?

      file_path = file.not_nil!.path.not_nil!
      File.open(file_path) do |file_io|
        # Retrieve the `Gtk::TextBuffer` instance that stores the
        # text displayed by the `Gtk::TextView` widget
        buffer = @main_text_view.buffer

        # Set the text using the contents of the file
        buffer.text = file_io.gets_to_end
        # Reposition the cursor so it's at the start of the text
        buffer.place_cursor(buffer.start_iter)
      end
    end
```

# Update the title of the window

Since the application now is showing the contents of a specific file, you should ensure that the user interface reflects this new state. One way to do this is to update the title of the window with the name of the file.

Since the name of the file uses the raw encoding for files provided by the operating system, we need to query the file for its **display name**.

1. Modify the `open_file` method to extract the file name from the path
2. Set the `title` of the window to the file name

```crystal{7}
    #...
    private def open_file(file : Gio::File?)
      return if file.nil?

      file_path = file.not_nil!.path.not_nil!
      File.open(file_path) do |file_io|
        self.title = File.basename(file_path, File.extname(file_path))

        # Retrieve the `Gtk::TextBuffer` instance that stores the
        # text displayed by the `Gtk::TextView` widget
        buffer = @main_text_view.buffer

        # Set the text using the contents of the file
        buffer.text = file_io.gets_to_end
        # Reposition the cursor so it's at the start of the text
        buffer.place_cursor(buffer.start_iter)
      end
    end
```

# Add the “Open” shortcut to the Keyboard Shortcuts help

The Keyboard Shortcuts help dialog is part of the template. GTK automatically handles its creation and the action that presents it to the user.

1. Find the `help-overlay.ui` file in the sources directory
2. Find the `GtkShortcutsGroup` definition
3. Add a new `GtkShortcutsShortcut` definition for the win.open action in the shortcuts group

```xml{3-8}
<object class="GtkShortcutsGroup">
  <property name="title" translatable="yes" context="shortcut window">General</property>
  <child>
    <object class="GtkShortcutsShortcut">
      <property name="title" translatable="yes" context="shortcut window">Open</property>
      <property name="action-name">win.open</property>
    </object>
  </child>
```

You should now be able to run the application, press the **Open** button or <kbd>Ctrl</kbd> + <kbd>O</kbd>, and select a text file in your system. For instance, you can navigate to the text viewer project directory, and select the COPYING file in the sources:

![Screenshot of text-viewer in light mode with the 'COPYING' file open](/assets/en/opening_files_main.png)
