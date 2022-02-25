---
postName: Widgets
---

# Widgets

Widgets are premade components with properties, styles & signals. They can be usually put in one of the following categories:

- `Toplevel` - Windows, dialogs and their variants

- `Containers`/`Layout` - Boxes, frames, viewports, popups etc.

- `Control` - Switches, buttons, text inputs etc.

- `Display` - Images, icons, labels, textviews, spinners etc.

Widgets follow OOP, meaning that they inherit properties, signals and others.

[Valadoc](https://valadoc.org/) has beautiful interactive diagrams that explain the hierarchy of each widget, for example [`Gtk.Switch`](https://valadoc.org/gtk4/Gtk.Switch.html).

On Crystal, while we don't generate fancy diagrams, each widget includes all the methods (which includes properties & signals) all the way back to `GObject::Object`, for example [`Gtk::Switch`](https://hugopl.github.io/gtk4.cr/Gtk/Switch.html).
