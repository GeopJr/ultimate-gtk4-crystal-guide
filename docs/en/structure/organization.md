# Organization

This is not by any means required but it achieves maintainability. Feel free to create your own structure that "feels right", this is just a suggestion.

Crystal init creates the following project structure (minus the non-app source files):

```
.
├── ...
└── src
    └── my-gtk-app.cr

2 directories, 6 files
```

This gives you full freedom on how you'll split your project. My personal goto is to split it in:

- `src/my-gtk-app.cr` - Entrypoint that contains the `require`s and some global variables

- `src/modules/` - Contains the actual source that gets loaded/required from the entrypoint

- `src/modules/prerequisites.cr` - The first file that gets loaded, contains code that needs to run first (usually Gettext, Gresource, macros and some global vars) (optional)

- `src/modules/functions/` - Contains functions (split into their own files that might include sub-functions) that are either used by more than one component or are too big/complex

- `src/modules/views/**` - Contains code per view/window/stage of the app (each split into its own file), can contain sub-folders for more complex or multi-stage views (example: `main.cr`, `welcome.cr`, `settings.cr`)

- `data/` - Contains files related to the app (.desktop, gresource, metainfo, icons, configs, css, .ui, scripts etc.)

- `po/` - Contains Gettext internationalization (i18n) files (.po, .pot, LINGUAS, POTFILES)

With all that done, the new structure should look like this:

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
