# Les widgets

Les widgets sont des composants prédéfinis avec des propriétés, des styles ainsi que des signaux. Ils peuvent être notamment 

Widgets are premade components with properties, styles & signals. Ils peuvent généralement être placés dans l'une des catégories suivantes :

- `Haut niveau` - Les fenêtres, les dialogues et leurs variantes.

- `Conteneurs` ou `Layout` - Les boîtes, les cadres, les viewports, les popups etc...

- `Contrôle` - Les switchs, les boutons, les champs de texte etc...

- `Affichage` - Les images, les icônes, les labels, les vues de texte, les spinners etc...

Les widgets suivent la POO (programmation orienté objet), ce qui veut dire qu'ils héritent des propriétés, des signaux ainsi que d'autres.

[Valadoc](https://valadoc.org/) a des jolies diagrammes interactives qui expliquent la hiérarchie de chaque widget, par exemple [`Gtk.Switch`](https://valadoc.org/gtk4/Gtk.Switch.html).

En Crystal, tandis que nous ne générons pas de diagrammes sophistiqués, chaque widget inclut toutes les méthodes (ce qui comprennent les propriétés et les signaux) jusqu'à `GObject::Object`, par exemple [`Gtk::Switch`](https://hugopl.github.io/gtk4.cr/Gtk/Switch.html).