---
postName: Makefile
---

# Makefile

As you might have noticed already, compiling the app requires a series of preparations, flags and env vars. To ease this process, we can use a Makefile!

```makefile
.PHONY: all install uninstall test build mo desktop metainfo
# Variables for easy customization based on environment
PREFIX ?= /usr
PO_LOCATION ?= po # location of .po files
LOCALE_LOCATION ?= /share/locale # PREFIX + LOCALE_LOCATION = where the .mo are going to be moved

all: gresource desktop metainfo build

# Build command setting MY_APP_LOCALE_LOCATION to the above mentioned path, using a custom CRYSTAL_LOCATION if any and building with parallelism, release and no-debug
build:
	MY_APP_LOCALE_LOCATION="$(PREFIX)$(LOCALE_LOCATION)" $(CRYSTAL_LOCATION)shards build -Dpreview_mt --release --no-debug

test:
	$(CRYSTAL_LOCATION)crystal spec -Dpreview_mt --order random

# Builds the gresource
gresource:
	glib-compile-resources --sourcedir data --target data/dev.geopjr.My_app.gresource data/dev.geopjr.My_app.gresource.xml

# Builds the .mo files based on the LINGUAS listings and installs them at $(PREFIX)$(LOCALE_LOCATION)/
mo:
	mkdir -p $(PO_LOCATION)/mo
	for lang in `cat "$(PO_LOCATION)/LINGUAS"`; do \
		if [[ "$$lang" == 'en' || "$$lang" == '' ]]; then continue; fi; \
		mkdir -p "$(PREFIX)$(LOCALE_LOCATION)/$$lang/LC_MESSAGES"; \
		msgfmt "$(PO_LOCATION)/$$lang.po" -o "$(PO_LOCATION)/mo/$$lang.mo"; \
		install -D -m 0644 "$(PO_LOCATION)/mo/$$lang.mo" "$(PREFIX)$(LOCALE_LOCATION)/$$lang/LC_MESSAGES/dev.geopjr.My_app.mo"; \
	done

# Translates .metainfo.xml
metainfo:
	msgfmt --xml --template data/dev.geopjr.My_app.metainfo.xml.in -d "$(PO_LOCATION)" -o data/dev.geopjr.My_app.metainfo.xml

# Translates .desktop
desktop:
	msgfmt --desktop --template data/dev.geopjr.My_app.desktop.in -d "$(PO_LOCATION)" -o data/dev.geopjr.My_app.desktop

# Installs the binary, .desktop and icons
install: mo
	install -D -m 0755 bin/my_app $(PREFIX)/bin/my_app
	install -D -m 0644 data/dev.geopjr.My_app.desktop $(PREFIX)/share/applications/dev.geopjr.My_app.desktop
	install -D -m 0644 data/icons/dev.geopjr.My_app.svg $(PREFIX)/share/icons/hicolor/scalable/apps/dev.geopjr.My_app.svg
	install -D -m 0644 data/icons/dev.geopjr.My_app-symbolic.svg $(PREFIX)/share/icons/hicolor/symbolic/apps/dev.geopjr.My_app-symbolic.svg
	gtk-update-icon-cache /usr/share/icons/hicolor

# Uninstalls the binary, .desktop and icons
uninstall:
	rm -f $(PREFIX)/bin/my_app
	rm -f $(PREFIX)/share/applications/dev.geopjr.My_app.desktop
	rm -f $(PREFIX)/share/icons/hicolor/scalable/apps/dev.geopjr.My_app.svg
	rm -f $(PREFIX)/share/icons/hicolor/symbolic/apps/dev.geopjr.My_app-symbolic.svg
	rm -rf $(PREFIX)$(LOCALE_LOCATION)/*/*/dev.geopjr.My_app.mo
	gtk-update-icon-cache /usr/share/icons/hicolor
```

- You can run specific script eg. `$ make gresource`

- You can install and uninstall with root eg. `# make install`