---
postName: Translations
---

# Translations

Let's follow the [Gettext](../05%20-%20Extra/02%20-%20Gettext) section:

## po/POTFILES

```
data/dev.geopjr.tinystats.desktop.in
data/dev.geopjr.tinystats.metainfo.xml.in
data/ui/app.ui
```

## po/LINGUAS

I can only do Greek at the moment, so that's what I'm going to add.

```
el
```

## Generating the translation files

Let's run `xgettext` to gather all translatable strings: `xgettext --files-from=po/POTFILES --output=po/dev.geopjr.tinystats.pot`

Now let's generate the Greek file: `msginit -i po/dev.geopjr.tinystats.pot -o po/el.po -l el_GR.utf8`

I'll go ahead and fill in `po/el.po`.

`.mo` binaries will be generated during install.

## Code

Following the [Gettext](../05%20-%20Extra/02%20-%20Gettext) section, we are going to add `gettext` to our requires and add `setlocale` & `textdomain` to our `prerequisites.cr`

```crystal
require "gettext"
```

```crystal
Gettext.setlocale(Gettext::LC::ALL, "")
Gettext.bindtextdomain("dev.geopjr.tinystats", {{env("TINY_LOCALE_LOCATION").nil? ? "/usr/share/locale" : env("TINY_LOCALE_LOCATION")}})
Gettext.textdomain("dev.geopjr.tinystats")
```

Thankfully, most of the strings that need translation are in the UI file which gets translated automatically, but we still need to translate the title:

```crystal
window.title = "Tiny Stats - #{Gettext.gettext(NOTEBOOK.tab_label_text(x).not_nil!)}"
```

Lastly, we will place the [`thank_translators.cr`](../05%20-%20Extra/04%20-%20Credits) script in `data/scripts/` and add them in the translators section of the About dialog:

### src/modules/prerequisites.cr

```crystal
THANKS = {{run("../../data/scripts/thank_translators").stringify}}
```

### src/modules/functions/about_action.cr

```crystal
Gtk.show_about_dialog(
  APP.active_window,
  name: "About Tiny Stats",
  application: APP,
  program_name: "Tiny Stats",
  version: VERSION,
  logo_icon_name: "dev.geopjr.tinystats",
  copyright: "© 2021 Evangelos Paterakis",
  website: "https://github.com/GeopJr/tiny-stats-template",
  authors: ["Evangelos \"GeopJr\" Paterakis"],
  artists: ["Evangelos \"GeopJr\" Paterakis"],
  translator_credits: THANKS, # ++
)
```

![Our app in Greek](/assets/en/translations-0.png)
