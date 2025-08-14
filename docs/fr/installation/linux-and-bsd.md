---
title: Linux et BSD
---

# Les dépendances

Vous devez avoir installé :

- gtk4
- gobject-introspection

Le nom des paquets dépend de votre distribution. Cependant, vous devez utiliser la version `-dev` ou `-devel`.

Voici certaines exemples ci-dessous pour les distributions majeures :

## FreeBSD

```
# pkg install gtk4 gobject-introspection
```

## NetBSD

```
# pkg_add gtk4 gobject-introspection
```

## Fedora

```
# dnf install gtk4-devel gtk-doc gobject-introspection-devel
```

## Debian

```
# apt install libgtk-4-0 gobject-introspection gir1.2-gtk-4.0
```

## Arch Linux

```
# pacman -S gtk4 gobject-introspection
```
