# Blueprint

In [First App > UI Design](../first-app/ui-design) we explored different ways to design our app and found out that there are two options: UI files & creating widgets manually in code.

However, there's now a markup language that compiles to UI files / GtkBuilder XML called [Blueprint](https://jwestman.pages.gitlab.gnome.org/blueprint-compiler/).

::: tip
Reading [Blueprint's docs](https://jwestman.pages.gitlab.gnome.org/blueprint-compiler/) is highly recommended as this page won't cover everything.
:::

## Setup

`blueprint-compiler` will most likely not be available by default on your machine.

Check if it's available on your OS' repos and install it. If it's not, you have to install it manually:

```
$ git clone https://gitlab.gnome.org/jwestman/blueprint-compiler
$ cd blueprint-compiler
$ meson . _build
$ ninja -C _build install
```

`blueprint-compiler` should now be available on PATH!

## Getting Started

Blueprint files are going to first be compiled into GtkBuilder XML before we bundle them into the GResource.

- We don't want to commit them, so we are going to add the following to our `.gitignore` file:

```
data/ui/compiled/
```

- We will place our `.blp` (Blueprint) files in `./data/ui/` just like our UI files, but we will reference to their compiled versions (under `./data/ui/compiled/`) in our `data/APP_ID.gresource.xml`. For example, if we want to bundle `./data/ui/about.blp`, we are going to add the following:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/path/for/bundle">
    <file compressed="true" preprocess="xml-stripblanks">ui/compiled/about.ui</file>
  </gresource>
</gresources>
```

- We want to compile them every time we compile the app, so we are going to use macros to call `blueprint-compiler`. Add the following in your [`src/modules/prerequisites.cr`](../first-app/gresource#code) (or wherever you compile your GResource bundle):

```crystal
{%
    `blueprint-compiler batch-compile ./data/ui/compiled ./data/ui/ ./data/ui/*.blp`
%}
```

::: warning
Compiling of Blueprint files has to be done **before** you compile your GResource, so place it **above** `Gio#register_resource`.
:::

::: warning
Wrapping it in `{%` `%}` is required.
:::

- Then we are going to compile & register the resource as mentioned in [Concepts > GResource](../concepts/gresource#creating-loading-the-binary), like:

```crystal
Gio.register_resource("data/APP_ID.gresource.xml", "data")
```

- And lastly, refer to them as usual:

```crystal
Gtk::Builder.new_from_resource("/path/for/bundle/ui/compiled/about.ui")
```

::: info
Notice that it's under the `/compiled/` folder in the GResource too.
:::

## Porting UI files to Blueprint

`blueprint-compiler` offers a `port` command that automatically ports UI files / GtkBuilder XML to Blueprint:

- First of all, change the current directory to the folder your UI files are, e.g. `./data/ui/`, otherwise it will recursively search for UI files including in folders like `lib/` and mess with the shards:

```
$ cd ./data/ui/
```

- Then run `blueprint-compiler port` and respond with the following:

```
$ blueprint-compiler port

STEP 1: Create subprojects/blueprint-compiler.wrap
Create subprojects/blueprint-compiler.wrap? [y/n] n

STEP 2: Set up .gitignore
Create .gitignore with '/subprojects/blueprint-compiler'? [y/n] n

STEP 3: Convert UI files
will port ./app.ui -> ./app.blp

All files were converted.
Save these changes? [y/n] y

STEP 4: Set up meson.build
NOTE: Depending on your build system setup, you may need to make some adjustments to this step.

STEP 5: Update POTFILES.in
po/POTFILES.in does not exist, skipping

STEP 6: Clean up
Delete old XML files? [y/n] y
STEP 6: Done! Make sure your app still builds and runs correctly.
```

::: info
We don't use meson in Crystal, making many of the above tasks useless.
:::

::: warning
Blueprint doesn't support everything UI files do, porting might error. If that happens, try removing the section it complains about.
:::

## Translations

Blueprint files use the gettext syntax to mark strings for translation (see [Blueprint Docs#translations](https://jwestman.pages.gitlab.gnome.org/blueprint-compiler/translations.html)), e.g.:

<!-- It's not CSS, but the syntax matches -->
```css
Label {
    label: _("Welcome to my app!");
}
```

- We first append them to our `po/POTFILES` file, just as we would with UI files (as mentioned in [Extra > Gettext](./gettext) and [First App > Translations](../first-app/translations)), e.g.:

```
data/ui/about.blp
data/ui/settings.blp
```

- And then run `xgettext` to generate the strings. Blueprint files require some extra flags that are not mentioned in the other pages:

```
$ xgettext --files-from=po/POTFILES --output=po/APP_ID.pot --from-code=UTF-8 --add-comments --keyword=_ --keyword=C_:1c,2
```

::: warning
Without the extra flags, strings won't be extracted from the .blp files.
:::

## Flatpak

We need to install `blueprint-compiler` in the sandbox:

### json

```json
{
...
    "modules": {
        {
            "name": "blueprint-compiler",
            "buildsystem": "meson",
            "sources": [
              {
                "type": "git",
                "url": "https://gitlab.gnome.org/jwestman/blueprint-compiler",
                "branch": "main"
              }
            ]
        }
    ...
    }
}
```

### yaml

```yaml
...
modules:
  - name: blueprint-compiler
    buildsystem: meson
    sources:
      - type: git
        url: https://gitlab.gnome.org/jwestman/blueprint-compiler
        branch: main
    ...
```

## UI Design

Currently, there are two apps that are able to handle Blueprint: [Workbench](https://flathub.org/apps/details/re.sonny.Workbench) and [GNOME Builder](https://flathub.org/apps/details/org.gnome.Builder).

![Screenshot of the app Workbench showing on the left side a Blueprint file and on the right side its preview](/assets/en/blueprint-0.png)

## Example

[Tiny Stats](https://github.com/GeopJr/tiny-stats-template) got updated with a Blueprint action (with translations, GResource and everything else) on [this commit](https://github.com/GeopJr/tiny-stats-template/commit/5d7beb550b60ac8098361cfd104a2870a7224fd9).
