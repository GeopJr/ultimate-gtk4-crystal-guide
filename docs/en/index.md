---
title: Introduction
lang: en-US
---

# Welcome to the Ultimate GTK4 + Crystal Guide!

GTK is a free and open-source cross-platform widget toolkit for creating graphical user interfaces.

Crystal, in combination with [GObject Introspection](https://gi.readthedocs.io/en/latest/), is able to generate bindings for any GObject based library, including the latest version of GTK, GTK4!

GTK development is *very* similar to web dev, so while reading this guide you might find some small sections comparing the current topic with the web dev one.

## Goals

After reading this guide, you should be able to:

- Build premium applications
- Package them
- Use build systems
- Generate bindings for third-party GObject based libraries
- & More

::: warning
The guide might **NOT** be correct or follow best practices at times. Please don't blindly follow it and look around for other guides, blog posts, docs etc. that confirm or contradict it.
:::

## Credits

In classic Crystal fashion, this is a community effort. There's not an org that manages all the shards, but there's a decentralized approach.

Most notably however, there are two main shards that are responsible for the great quality of the bindings made by [Hugo Parente Lima](https://github.com/hugopl):

- [GI Crystal](https://github.com/hugopl/gi-crystal) - Tool to generate Crystal bindings and user API for glib-based libraries
- [gtk4.cr](https://github.com/hugopl/gtk4.cr) - GTK4 bindings for Crystal

## Important docs

- [Crystal](https://crystal-lang.org/api/latest/index.html)
- [GTK4](https://docs.gtk.org/gtk4/)
- [gtk4.cr](https://hugopl.github.io/gtk4.cr/)
- [Memory Management](https://github.com/hugopl/gi-crystal#memory-management-%EF%B8%8F%EF%B8%8F)

## Why Crystal?

- It's very fast
- It's memory and type safe
- Its syntax is inspired by Ruby's, often described as one of the cleanest, easiest to understand and most efficient to write
- Macros, Concurrency, Parallelism, C bindings & more

## New to Crystal?

- [Crystal for Rubyists](http://www.crystalforrubyists.com/) - Free book to bootstrap your Crystal journey
- [Crystal Mastery](https://crystalmastery.io/) - Screencasts for learning Crystal
- [crystal-koans](https://github.com/ilmanzo/crystal-koans) - Learn Crystal by writing unit tests
- [crystal-lang.org](https://crystal-lang.org) - Official language site
- [devdocs.io](https://devdocs.io/crystal/) - API Documentation Browser with Crystal support
- [getgood.at](https://getgood.at/in-a-day/crystal) - Learn Crystal in a Day
- [Programming Crystal](https://pragprog.com/book/crystal/programming-crystal) - PragProg book to start your Crystal journey

::: info
from: [https://github.com/veelenga/awesome-crystal](https://github.com/veelenga/awesome-crystal)
:::

## Not interested?

There are many other GUI toolkits with Crystal bindings or alternative shards and ways to use GTK, here's some:

- [crystal-gobject](https://github.com/jhass/crystal-gobject) - GTK3 bindings & different binding generation (+ maintenance)
- [Layout](https://github.com/grkek/layout) - Build Native (not webview) GTK3 apps using web technologies (HTML, CSS, JS)
- [libui.cr](https://github.com/Fusion/libui.cr) - Bindings for the cross platform GUI toolkit, libui
- [qt5.cr](https://github.com/Papierkorb/qt5.cr) - Qt5 bindings
