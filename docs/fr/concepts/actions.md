# Actions

Les actions sont encore un autre moyen de lier les fonctions aux widgets, souvent les raccourcis clavier et les items des menus.

Par exemple, voilà à quoi ressemble une interface utilisateur pour une barre de tête
avec un bouton "À propos de l'application" :

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

L'attribut "action" a pour valeur `app.about` comme contenu, donc "about" est le nom de note action.

Maintenant, il ne nous reste plus qu'à la créer, ajoutez-la à l'application et connectez au signal grâce à la méthode `activate_signal` :

```crystal
action = Gio::SimpleAction.new("about", nil)
app.add_action(action) # app : Gtk::Application

action.activate_signal.connect do
  puts "Ceci est mon application GTK avec Crystal !"
end
```
