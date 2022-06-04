# Template

This section of the guide documents the creation of a clean and efficient basic project structure.

You can either follow it to create it yourself or skip it and use the result from [tiny-stats-template](https://github.com/GeopJr/tiny-stats-template).

## Getting Started

The quickest way to set up a project is by using `crystal init`:

```shell
$ crystal init app my-gtk-app
    create  /my-gtk-app/.gitignore
    create  /my-gtk-app/.editorconfig
    create  /my-gtk-app/LICENSE
    create  /my-gtk-app/README.md
    create  /my-gtk-app/shard.yml
    create  /my-gtk-app/src/my-gtk-app.cr
    create  /my-gtk-app/spec/spec_helper.cr
    create  /my-gtk-app/spec/my-gtk-app_spec.cr
Initialized empty Git repository in /my-gtk-app/.git/
```

At the time of writing this, `crystal init` is a bit opinionated, so go ahead and review the following files:

- `LICENSE`

- `README.md`

- `shard.yml`

Then install `gtk4.cr` by following the [`Installation/Shard`](../installation/shard) page.
