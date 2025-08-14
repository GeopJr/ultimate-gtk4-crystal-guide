---
title: Introduction
lang: fr-FR
---

# Bienvenue dans le guide Ultimate GTK4 + Crystal.

GTK est un kit d'outils de widgets, cross-platforme, open-source et grauit pour créer une interface utilisateur graphique.

Crystal, en lien avec [GObject Introspection](https://gi.readthedocs.io/en/latest/) peut générer des liaisons C pour
tout bibliothèque qui est basé sur GObject, incluant la dernière version de GTK et GTK4 !

Le développement de GTK est *très* simmilaire au développement web, donc pendant la lecture de ce guide,
vous pourrez chercher certaines sections qui compare avec le sujet actuel avec le développement web.

## Objectifs

Après avoir lu ce guide, vous serez capable de:

- Construire des applications premium
- Les packager
- Utiliser les systèmes build.
- Génerer des liaisons pour des bibliothèques tiers basés sur GObject.
- et bien d'autres...

::: warning
Ce guide peut parfois **NE PAS** être correct ou pas suivre des meilleurs pratiques. Il est recommandé de ne pas
suivre aveuglement et regarder d'autres guides, blogs etc... qui confirme ou qui le contredit.
:::

## Crédits

Dans un mode classique de Crystal, ceci est un effort communautaire. Il n'y a pas d'organisations qui
gèrent tous les shards, mais il y a une approche décentralisée.

Le plus cependant marqué, il y a deux principaux shards qui sont responsables pour la meilleure qualité des
liaisons qui sont faites par [Hugo Parente Lima](https://github.com/hugopl) :

- [GI Crystal](https://github.com/hugopl/gi-crystal) - Outil qui permet de générer des liaisons Crystal et un API utilisateur pour des bibliothèques basés sur glib.
- [gtk4.cr](https://github.com/hugopl/gtk4.cr) - Des liaisons GTK4 pour Crystal.

## Documentations importantes

- [Crystal](https://crystal-lang.org/api/latest/index.html)
- [GTK4](https://docs.gtk.org/gtk4/)
- [gtk4.cr](https://hugopl.github.io/gtk4.cr/)
- [Memory Management](https://github.com/hugopl/gi-crystal#memory-management-%EF%B8%8F%EF%B8%8F)

## Pourquoi Crystal ?

- C'est un langage plus rapide.
- Il possède une gestion de mémoire et d'un typage sûre.
- Sa syntaxe est inspiré de Ruby, souvent décrit comme une des plus propres et simples à comprendre et la plus efficace à écrire.
- Il possède des macros, la concurrence, le parralélisme, les liaisons C et bien d'autres.

## Nouveau dans Crystal ?

- [Crystal for Rubyists](http://www.crystalforrubyists.com/) - Free book to bootstrap your Crystal journey
- [Crystal Mastery](https://crystalmastery.io/) - Screencasts for learning Crystal
- [crystal-koans](https://github.com/ilmanzo/crystal-koans) - Learn Crystal by writing unit tests
- [crystal-lang.org](https://crystal-lang.org) - Official language site
- [devdocs.io](https://devdocs.io/crystal/) - API Documentation Browser with Crystal support
- [Programming Crystal](https://pragprog.com/book/crystal/programming-crystal) - PragProg book to start your Crystal journey

::: info
De [https://github.com/veelenga/awesome-crystal](https://github.com/veelenga/awesome-crystal).
:::

## Pas intéressé ?

Il y a d'autres kits d'outils d'interface utilisateur avec des liaisons Crystal ou d'alternatives aux shards et
des moyens d'utiliser GTK, en voici certaines :

- [crystal-gobject](https://github.com/jhass/crystal-gobject) - GTK3 bindings & different binding generation (+ maintenance)
- [Layout](https://github.com/grkek/layout) - Build Native (not webview) GTK3 apps using web technologies (HTML, CSS, JS)
- [libui.cr](https://github.com/Fusion/libui.cr) - Bindings for the cross platform GUI toolkit, libui
- [qt5.cr](https://github.com/Papierkorb/qt5.cr) - Qt5 bindings
