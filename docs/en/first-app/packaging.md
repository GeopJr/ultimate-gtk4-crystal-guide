# Packaging

## Makefile

Following the [Makefile](../extra/makefile) section, we create it with the following content:

```makefile
.PHONY: all install uninstall test build mo desktop metainfo
PREFIX ?= /usr
PO_LOCATION ?= po 
LOCALE_LOCATION ?= /share/locale 

all: gresource desktop metainfo build

build:
	MY_APP_LOCALE_LOCATION="$(PREFIX)$(LOCALE_LOCATION)" $(CRYSTAL_LOCATION)shards build -Dpreview_mt --release --no-debug

test:
	$(CRYSTAL_LOCATION)crystal spec -Dpreview_mt --order random

gresource:
	glib-compile-resources --sourcedir data --target data/dev.geopjr.tinystats.gresource data/dev.geopjr.tinystats.gresource.xml

mo:
	mkdir -p $(PO_LOCATION)/mo
	for lang in `cat "$(PO_LOCATION)/LINGUAS"`; do \
		if [[ "$$lang" == 'en' || "$$lang" == '' ]]; then continue; fi; \
		mkdir -p "$(PREFIX)$(LOCALE_LOCATION)/$$lang/LC_MESSAGES"; \
		msgfmt "$(PO_LOCATION)/$$lang.po" -o "$(PO_LOCATION)/mo/$$lang.mo"; \
		install -D -m 0644 "$(PO_LOCATION)/mo/$$lang.mo" "$(PREFIX)$(LOCALE_LOCATION)/$$lang/LC_MESSAGES/dev.geopjr.tinystats.mo"; \
	done

metainfo:
	msgfmt --xml --template data/dev.geopjr.tinystats.metainfo.xml.in -d "$(PO_LOCATION)" -o data/dev.geopjr.tinystats.metainfo.xml

desktop:
	msgfmt --desktop --template data/dev.geopjr.tinystats.desktop.in -d "$(PO_LOCATION)" -o data/dev.geopjr.tinystats.desktop

install: mo
	install -D -m 0755 bin/tiny-stats $(PREFIX)/bin/tiny-stats
	install -D -m 0644 data/dev.geopjr.tinystats.desktop $(PREFIX)/share/applications/dev.geopjr.tinystats.desktop
	install -D -m 0644 data/icons/dev.geopjr.tinystats.svg $(PREFIX)/share/icons/hicolor/scalable/apps/dev.geopjr.tinystats.svg
	install -D -m 0644 data/icons/dev.geopjr.tinystats-symbolic.svg $(PREFIX)/share/icons/hicolor/symbolic/apps/dev.geopjr.tinystats-symbolic.svg
	gtk-update-icon-cache /usr/share/icons/hicolor

uninstall:
	rm -f $(PREFIX)/bin/tiny-stats
	rm -f $(PREFIX)/share/applications/dev.geopjr.tinystats.desktop
	rm -f $(PREFIX)/share/icons/hicolor/scalable/apps/dev.geopjr.tinystats.svg
	rm -f $(PREFIX)/share/icons/hicolor/symbolic/apps/dev.geopjr.tinystats-symbolic.svg
	rm -rf $(PREFIX)$(LOCALE_LOCATION)/*/*/dev.geopjr.tinystats.mo
	gtk-update-icon-cache /usr/share/icons/hicolor
```

## Flatpak (`data/dev.geopjr.tinystats.json`)

While it does look a bit messy, it covers everything needed. Dependencies generated using the script mentioned on the [Flatpak](../packaging/flatpak) section.

```json
{
	"app-id": "dev.geopjr.tinystats",
	"runtime": "org.gnome.Platform",
	"runtime-version": "41",
	"sdk": "org.gnome.Sdk",
	"command": "tiny-stats",
	"finish-args": ["--socket=wayland", "--socket=fallback-x11", "--share=ipc", "--device=dri"],
	"cleanup": ["/include", "/lib/pkgconfig", "/share/doc", "/share/man", "*.a", "*.la"],
	"modules": [
		{
			"name": "livevent",
			"sources": [
				{
					"type": "git",
					"url": "https://github.com/libevent/libevent.git",
					"tag": "release-2.1.12-stable"
				}
			]
		},
		{
			"name": "libyaml",
			"sources": [
				{
					"type": "archive",
					"url": "https://github.com/yaml/libyaml/releases/download/0.2.5/yaml-0.2.5.tar.gz",
					"sha256": "c642ae9b75fee120b2d96c712538bd2cf283228d2337df2cf2988e3c02678ef4"
				}
			]
		},
		{
			"name": "tinystats",
			"buildsystem": "simple",
			"build-commands": [
				"for i in ./lib/*/; do ln -snf \"..\" \"$i/lib\"; done",
				"cd lib/gi-crystal && ../../crystal/bin/crystal build src/generator/main.cr --no-debug --release && cd ../..",
				"mkdir ./bin && cp lib/gi-crystal/main ./bin/gi-crystal && ./bin/gi-crystal || true",
				"glib-compile-resources --sourcedir data --target data/dev.geopjr.tinystats.gresource data/dev.geopjr.tinystats.gresource.xml",
				"TINY_LOCALE_LOCATION=\"/app/share/locale\" ./crystal/bin/crystal build ./src/tiny-stats.cr -Dpreview_mt --no-debug --release",
				"msgfmt --xml --template data/dev.geopjr.tinystats.metainfo.xml.in -d \"./po\" -o data/dev.geopjr.tinystats.metainfo.xml",
				"msgfmt --desktop --template data/dev.geopjr.tinystats.desktop.in -d \"./po\" -o data/dev.geopjr.tinystats.desktop",
				"mkdir -p po/mo && for lang in `cat \"po/LINGUAS\"`; do if [[ \"$lang\" == 'en' || \"$lang\" == '' ]]; then continue; fi; mkdir -p \"/app/share/locale/$lang/LC_MESSAGES\"; msgfmt \"po/$lang.po\" -o \"po/mo/$lang.mo\";  install -D -m 0644 \"po/mo/$lang.mo\" \"/app/share/locale/$lang/LC_MESSAGES/dev.geopjr.tinystats.mo\"; done"
			],
			"post-install": [
				"install -D -m 0755 tiny-stats /app/bin/tiny-stats",
				"install -D -m 0644 data/dev.geopjr.tinystats.desktop /app/share/applications/dev.geopjr.tinystats.desktop",
				"install -D -m 0644 data/icons/dev.geopjr.tinystats.svg /app/share/icons/hicolor/scalable/apps/dev.geopjr.tinystats.svg",
				"install -D -m 0644 data/icons/dev.geopjr.tinystats-symbolic.svg /app/share/icons/hicolor/symbolic/apps/dev.geopjr.tinystats-symbolic.svg",
				"install -D -m 0644 data/dev.geopjr.tinystats.metainfo.xml /app/share/metainfo/dev.geopjr.tinystats.metainfo.xml"
			],
			"sources": [
				{
					"type": "dir",
					"path": "..",
					"skip": [
						".rucksack",
						".rucksack.toc",
						"lib/",
						"tiny-stats",
						"bin/",
						"data/dev.geopjr.tinystats.desktop",
						"data/dev.geopjr.tinystats.gresource",
						"po/mo/"
					]
				},
				{
					"type": "archive",
					"dest": "crystal/",
					"url": "https://github.com/crystal-lang/crystal/releases/download/1.3.2/crystal-1.3.2-1-linux-x86_64.tar.gz",
					"sha256": "6e102e55d658f2cc0c56d23fcb50bd2edbd98959aa6b59b8e1210c6860651ed4"
				},
				{
					"type": "git",
					"url": "https://github.com/geopjr/gettext.cr.git",
					"tag": "v1.0.0",
					"dest": "lib/gettext"
				},
				{
					"type": "git",
					"url": "https://github.com/hugopl/gi-crystal.git",
					"commit": "6100e4dc0786fc505cf9b57146c3cc3ddf2512a4",
					"dest": "lib/gi-crystal"
				},
				{
					"type": "git",
					"url": "https://github.com/hugopl/gtk4.cr.git",
					"commit": "16a3b79866e0af18e95681ca2842d8428ac6e152",
					"dest": "lib/gtk4"
				},
				{
					"type": "git",
					"url": "https://github.com/crystal-community/hardware.git",
					"tag": "v0.5.2",
					"dest": "lib/hardware"
				},
				{
					"type": "git",
					"url": "https://github.com/geopjr/non-blocking-spawn.git",
					"tag": "v1.0.0",
					"dest": "lib/non-blocking-spawn"
				},
				{
					"type": "git",
					"url": "https://github.com/hugopl/version_from_shard.git",
					"tag": "v1.2.5",
					"dest": "lib/version_from_shard"
				}
			]
		},
		{
			"name": "hack_for_Builder",
			"buildsystem": "simple",
			"build-commands": []
		}
	]
}
```
