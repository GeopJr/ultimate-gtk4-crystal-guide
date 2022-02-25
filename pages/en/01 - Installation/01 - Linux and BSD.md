---
postName: Linux & BSD
---

# Dependencies

You need to have installed:

- gtk4
- gobject-introspection

Package name depends on your distro, however you should be aiming for `-dev` or `-devel` versions.

Listed below are some examples for the major distributions:

## FreeBSD

> `# pkg install gtk4 gobject-introspection`

## NetBSD

> `# pkg_add gtk4 gobject-introspection`

## Fedora

> `# dnf install gtk4-devel gtk-doc`

## Debian

> `# apt install libgtk-4-0 gobject-introspection gir1.2-gtk-4.0`

## Arch Linux

> `# pacman -S gtk4 gobject-introspection`
