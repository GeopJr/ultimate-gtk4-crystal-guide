# Adding A Content View

In this lesson, you will learn how to modify the UI definition file of the application’s window to add a text area UI element. The text area will be used to display the contents of a text file that we are going to load in the next lesson.

![Screenshot of text-viewer in light mode in an empty state](/assets/en/content_view.png)

Any GNOME application is composed of a hierarchy of UI elements, called widgets; GTK allows defining UI using XML instead of writing them in code. The default template for GNOME applications provided by Builder uses a UI definition file for the main application window, and we are going to edit it like any other file.

1. Open the `text-viewer-window.ui` file under the `src` directory
1. The window is defined as a **template** element for the `Text-Viewer-Window` class
1. The window has **property** elements, which describe the value for the various properties; for instance, setting the default title of the window will be set using the `title` property
1. The window also has two **child** elements
    - the first **child** element is a [`Adw::HeaderBar`](https://libadwaita.geopjr.dev/docs/Adw/HeaderBar.html), and it is used to describe the contents of the header bar; in this case, a [`Gtk::MenuButton`](https://libadwaita.geopjr.dev/docs/Gtk/MenuButton.html) with the primary menu of the application
    - the second **child** element is the main content area of the window
1. Currently, the main content is provided by a [`Gtk::Label`](https://libadwaita.geopjr.dev/docs/Gtk/Label.html) widget, with a “Hello, World!” label
1. Outside the template block, you can find the definition of the menu using the menu element

# Set the title of the main window

1. Find the `Text-Viewer-Window` definition
1. Find the property elements that define the default width and height of the window
1. Add the following property:

```xml{4}
<template class="Text-Viewer-Window" parent="AdwApplicationWindow">
  <property name="default-width">600</property>
  <property name="default-height">300</property>
  <property name="title">Text Viewer</property>
  <property name="content">
    <object class="AdwToolbarView">
```

# Set the development style for the main window

The `devel` style communicate to the user that the application is a development snapshot.

1. Find the `Text-Viewer-Window` definition
1. Add the following style:

```xml{5-7}
<template class="Text-Viewer-Window" parent="AdwApplicationWindow">
  <property name="default-width">600</property>
  <property name="default-height">300</property>
  <property name="title">Text Viewer</property>
  <style>
    <class name="devel"/>
  </style>
  <property name="content">
    <object class="AdwToolbarView">
```

# Add a scrollable container

Follow these steps to add a **scrollable container** to the window:

1. First, you need to remove the the UI element that is already in the window. Find the object element that defines the [`Gtk::Label`](https://libadwaita.geopjr.dev/docs/Gtk/Label.html), and remove the whole block
1. Add the following UI definition for a **scrollable container** inside the property element for the `content` property:

```xml{2-9}
<property name="content">
  <object class="GtkScrolledWindow">
    <property name="hexpand">true</property>
    <property name="vexpand">true</property>
    <property name="margin-top">6</property>
    <property name="margin-bottom">6</property>
    <property name="margin-start">6</property>
    <property name="margin-end">6</property>
  </object>
</property>
```

The definition of the scrollable container has the following properties:
- `hexpand` and `vexpand` tell the container to expand to fit the whole area of the parent window
- `margin-top`, `margin-bottom` tell the container to add a margin of six pixels at the top and bottom edges, respectively
- `margin-start` and `margin-end` tell the container to add a margin of six pixels at the leading and trailing edges, respectively; the leading and trailing edges are determined by the text direction

# Add a text view

Follow these steps to add a **text view widget** to the scrollable container:

1. Add a new **property** element for the **child** property:

```xml{9-10}
<property name="content">
  <object class="GtkScrolledWindow">
    <property name="hexpand">true</property>
    <property name="vexpand">true</property>
    <property name="margin-top">6</property>
    <property name="margin-bottom">6</property>
    <property name="margin-start">6</property>
    <property name="margin-end">6</property>
    <property name="child">
    </property>
  </object>
</property>
```

2. Add an **object** definition for the [`Gtk::TextView`](https://libadwaita.geopjr.dev/docs/Gtk/TextView.html) widget, and assign the `main_text_view` as its identifier

```xml{10-12}
<property name="content">
  <object class="GtkScrolledWindow">
    <property name="hexpand">true</property>
    <property name="vexpand">true</property>
    <property name="margin-top">6</property>
    <property name="margin-bottom">6</property>
    <property name="margin-start">6</property>
    <property name="margin-end">6</property>
    <property name="child">
      <object class="GtkTextView" id="main_text_view">
        <property name="monospace">true</property>
      </object>
    </property>
  </object>
</property>
```

# Bind the text view in the source code

Templates represent the structure of a UI bound to a specific class; in this case, the UI definition of the **Text-Viewer-Window** class. In order to access a UI element from within the class, you must assign an identifier, using the id XML attribute, to the definition in the XML, and tell GTK to bind the object with the same identifier to a member in the instance structure.

1. Open the `window.cr` file
1. Find the `Window` class in the `Text::Viewer` namespace
1. Replace the `label` with the `main_text_view`

```crystal{6,13,19}
module Text::Viewer
  @[Gtk::UiTemplate(
    resource: "/com/example/TextViewer/text-viewer-window.ui",
    children: {
      "header_bar",
      "main_text_view",
    }
  )]
  class Window < Adw::ApplicationWindow
    include Gtk::WidgetTemplate

    @header_bar = Adw::HeaderBar
    @main_text_view : Gtk::TextView

    def initialize
      super()

      @header_bar = Adw::HeaderBar.cast(template_child("header_bar"))
      @main_text_view = Gtk::TextView.cast(template_child("main_text_view"))
    end
  end
end
```

Now you can run it using `$ crystal run src/text-viewer.cr` or `$ make run`

In the next lesson, you will learn how to select a file and load its contents into the text area.
