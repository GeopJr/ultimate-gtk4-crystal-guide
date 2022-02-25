---
postName: Actions
---

# Actions

Actions are yet another way to bind functions to widgets, usually keyboard shortcuts and menu items.

For instance, here's a UI for a headbar menu with an "About app" button:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <requires lib="gtk" version="4.0"/>
  <menu id="primary_menu">
    <section>
      <item>
        <attribute name="label" translatable="yes">_About app</attribute>
        <attribute name="action">app.about</attribute>
      </item>
    </section>
  </menu>
  <object class="GtkMenuButton" id="menuBtn">
    <property name="menu-model">primary_menu</property>
    <property name="icon-name">open-menu-symbolic</property>
    <property name="tooltip-text" translatable="yes">Menu</property>
  </object>
</interface>
```

The "action" attribute has `app.about` as content, so "about" is our action name. Now we only need to create it, add it to the app and connect to its `activate_signal`:

```crystal
action = Gio::SimpleAction.new("about", nil)
app.add_action(action) # app : Gtk::Application

action.activate_signal.connect do
  puts "This is my Crystal GTK app!"
end
```
