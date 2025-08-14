# GResource

GResource est un bundle de ressources qui inclut des données de l'application telles que :

- les fichiers d'interface utilisateur
- des icônes
- des fichiers CSS

Il existe quelques façons de bundler tels assets en Crystal (y compris leur chargement manuel en utilisant des macros); Cependant, GResource offre quelque chose d'important qui ne sont pas intégré à GTK.

Cela vous permet par exemple de mettre du CSS et des icônes à ceux qui sont chargés à partir du bundle (`Widget#icon_name = "path/in/bundle/icon.svg"`)

## Bien démarrer

- Créez un fichier `data/APP_ID.gresource.xml` avec le code présent ci-dessous :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/path/for/bundle">
    <file compressed="true">css/style.css</file>
    <file compressed="true" preprocess="xml-stripblanks">icons/my_app.svg</file>
    <file compressed="true" preprocess="xml-stripblanks">ui/my_app.ui</file>
  </gresource>
</gresources>
```

- Ceci va bundler les fichiers suivants: `data/css/style.css`, `icons/my_app.svg` et `ui/my_app.ui`, compressez-les et retirer les espaces blancs.

- Vous devez remplacer `/path/for/bundle` par le chemin que vous souhaitez, généralement l'identifiant de l'application APP_ID (par exemple : `dev.geopjr.My_app` => `/dev/geopjr/My_app`).

- Et maintenant vous pouvez les charger comme s'ils se trouvaient à cet emplacement, par exemple :

```crystal
Gtk::CssProvider#load_from_resource("/dev/geopjr/My_app/css/style.css")`.
```

Le débogage doit aussi pouvoir les lister sous `Global > Resources`.

## Créer et charger le binaire.

Vous pouvez soit le créer et le charger manuellement ou bien utiliser le macro `Gio#register_resource` qui font la même chose pour vous :

### `Gio#register_resource`

Nous l'appellons juste dans `prerequisites` :

```crystal
Gio.register_resource("data/dev.geopjr.My_app.gresource.xml", "data")
```

### Manuellement

#### Créer un binaire

Le binaire est en cours de création avec l'utilisation d'un outil externe qui est `glib-compile-resources`.

La commande complète est :

```
$ glib-compile-resources --sourcedir BASE_FOLDER --target PATH/TO/COMPILED.gresource PATH/TO/FILE.gresource.xml
```

En ayant l'emplacement ci-dessus en tant qu'exemples, il devrait ressembler à ceci :

```
$ glib-compile-resources --sourcedir data --target data/dev.geopjr.My_app.gresource data/dev.geopjr.My_app.gresource.xml
```

#### Charger le binaire

Maintenant, elle devrait se situer dans `data/dev.geopjr.My_app.gresource`.

Nous le chargeons en mémoire en utilisant des macros et puis l'ajouter dans la partie `prerequisites`.
Suivez la [source](https://github.com/hugopl/gtk4.cr/blob/77c98c350166baedc44d10e2030aaf7946d04e6b/src/bindings/gio/resource.cr) `Gio#register_resource`.

::: tip
Pensez à ajouter `*.gresource` à votre fichier `.gitignore`.
:::

::: tip
Remplacez `APP_ID` par l'identifiant de votre application.
:::
