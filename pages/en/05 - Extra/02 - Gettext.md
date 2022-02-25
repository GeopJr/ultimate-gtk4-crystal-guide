---
postName: Gettext (i18n)
---

# Gettext (i18n)

Gettext is an i18n tool that is separate from your app's code. The main benefit over other tools is, just as GResource, being integrated with GTK. Gettext apart from basic 1 on 1 translations, is also able to handle plurals and automatically detect the system's language.

You can get the Crystal bindings for it and explore its methods at: [https://github.com/GeopJr/gettext.cr](https://github.com/GeopJr/gettext.cr).

There are three filetypes associated with it: `.pot`, `.po` & `.mo`. The last one is binary.

Let's get started:

- Create a `po/` folder if you haven't already

- Create a `po/LINGUAS` file that includes the language codes of the available translations, one per line

- Create a `po/POTFILES` file that includes the paths of the files we should extract strings from (usually all .ui files, metainfo & desktop)

- Run `xgettext` to extract the translatable strings into a `.pot` file - `xgettext --files-from=po/POTFILES --output=po/APP_ID.pot` - which acts as a "template" for the other translations

- Create a `.po` file for a language using `msginit` eg. `msginit -i po/APP_ID.pot -o po/el.po -l el_GR.utf8`

- Translate the strings found in the newly created `.po` file

- Create a binary `.mo` using `msgfmt` eg. `msgfmt po/el.po -o po/locale/el/LC_MESSAGES/APP_ID.mo`

- Move the `po/locale/` to `/usr/share/locale` (not necessary)

- Add the following to your `prerequisites`:

```crystal
Gettext.setlocale(Gettext::LC::ALL, "")

# The macro allows you to set a custom env var during compile time for the mo location eg. `MY_APP_LOCALE_LOCATION="./po/locale/"`
Gettext.bindtextdomain("APP_ID", {{env("MY_APP_LOCALE_LOCATION").nil? ? "/usr/share/locale" : env("MY_APP_LOCALE_LOCATION")}})
Gettext.textdomain("APP_ID")
```

- Test it by running it with `LANG="el"`

You can also add strings that only exist in code in the `.pot` (and `.po`) files and then translate them on demand, for instance:

```crystal
label = Gtk::Label.new("")
label.text = Gettext.gettext("Hello World")
# LANG="en" => "Hello World"
# LANG="el" => "Γειά σου Κόσμε"
```

#### Translating .desktop and metainfo files

Translating those files is just as easy, for the sake of not replacing themselves, add the `.in` extension (`APP_ID.dekstop.in` & `APP_ID.metainfo.xml.in`). (Update it in the `POTFILES` file too).

Now all you have to do is run:

- `msgfmt --xml --template data/APP_ID.metainfo.xml.in -d "./po" -o data/APP_ID.metainfo.xml` for the metainfo file

- `msgfmt --desktop --template data/APP_ID.desktop.in -d "./po" -o data/APP_ID.desktop` for the .desktop file

> Note: You need to have the language you are testing with, installed (`locale -a`)

> Note: Remember to add `*.mo` to your `.gitignore`

> Note: Replace APP_ID with your app's ID
