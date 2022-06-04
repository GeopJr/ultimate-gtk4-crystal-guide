# Metadata

## `data/dev.geopjr.tinystats.desktop.in`

This is the "launcher" file, that holds some info about the app.

[Spec](https://specifications.freedesktop.org/desktop-entry-spec/latest/)

```ini
[Desktop Entry]
Type=Application
StartupWMClass=tiny-stats
Exec=tiny-stats %F
Name=tiny-stats
GenericName=System Monitor
Comment=Tiny hardware stats monitor
Terminal=false
Icon=dev.geopjr.tinystats
Categories=Utility;
Keywords=memory;cpu;network;monitor;
```

## `data/dev.geopjr.tinystats.metainfo.xml.in`

This file holds info for app stores.

[Spec](https://freedesktop.org/software/appstream/docs/chap-AppStream-About.html)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<component type="desktop">
  <id>dev.geopjr.tinystats</id>
  <name>Tiny Stats</name>
  <developer_name>Evangelos "GeopJr" Paterakis</developer_name>
  <summary>Tiny hardware stats monitor</summary>
  <metadata_license>CC0-1.0</metadata_license>
  <url type="homepage">https://github.com/GeopJr/tiny-stats-template</url>
  <url type="bugtracker">https://github.com/GeopJr/tiny-stats-template/issues</url>
  <url type="donation">https://geopjr.dev/donate</url>
  <description>
    <p>
      Check your hardware stats with a tiny &amp; minimal system monitor!
    </p>
  </description>
  <releases>
    <release version="1.0.0" date="2022-03-01" />
  </releases>
  <content_rating type="oars-1.1" />
</component>
```

## `data/icons/dev.geopjr.tinystats.svg & data/icons/dev.geopjr.tinystats-symbolic.svg`

There are a few guides on icon creation, I highly recommend ["Designing an Icon for Your App"](https://blogs.gnome.org/tbernard/2019/12/30/designing-an-icon-for-your-app/) by Tobias Bernard, especially if you are targeting the GNOME platform.

![The app icons](/assets/en/metadata-0.png)

![The app icons in preview](/assets/en/metadata-1.png)

::: info
The `.in` extension is being used to mark it as a gettext translation file template.
:::
