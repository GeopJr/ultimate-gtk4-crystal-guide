# Organisation

Cela ne signifie pas que tout est obligatoire mais cela permet d'accomplir la maintenabilité. il s'agit d'une suggestion, vous êtes libre de créer votre propre structure.

Crystal initie la création de la structure du projet suivant (sans compter les fichiers hors du dossier source) :

```
.
├── ...
└── src
    └── my-gtk-app.cr

2 directories, 6 files
```

Cela vous offre une totale liberté sur la manière de séparer votre projet. Personnellement, j'opte pour une répartition :

- `src/my-gtk-app.cr` - Point d'entrée qui contient des importations `require` et certaines variables globales.

- `src/modules/` - Contient la source réele qui est chargée / importée depuis le point d'entrée.

- `src/modules/prerequisites.cr` - Le première fichier qui est chargée, contient du code qui a besoin d'être éxectuée en premier
(en genéral : Gettext, Gresource, des macros ainsi que certaines variables globales) (optionnel)

- `src/modules/functions/` - Contient des fonctions (séparées dans leurs propres fichiers qui peuvent inclure des sous-fonctions) qui sont soit les deux utilisés par beaucoup ²de composants ou qui sont trop grandes ou complexes.

- `src/modules/views/**` - Contient du code par vue / fenêtre / stage de l'application (chacun séparées dans son propre fichier),
il peut contenir des sous-dossiers pour plus de complexité ou de vues multi-stage (par exemple: `main.cr`, `welcome.cr`, `settings.cr`).

- `data/` - Contient des fichiers liés à l'application (.desktop, gresource, metainfo, icons, des fichiers config, .css, .ui, des scripts, etc...).

- `po/` - Contient des fichiers d'internationalisation Gettext (i18n). (.po, .pot, LINGUAS, POTFILES)

Une fois que tout est fait, la nouvelle structure devrait ressembler à cela :

```
.
├── ...
├── data
│   └── ...
├── po
│   └── ...
└── src
    ├── my-gtk-app.cr
    └── modules
        ├── functions
        │   └── ...
        ├── prerequisites.cr
        └── views
            └── ...
```
