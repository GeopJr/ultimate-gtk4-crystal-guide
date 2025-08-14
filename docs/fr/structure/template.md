# Modèle

Cette section du guide documente la création d'une structure de projet basique, propre et efficace.

Vous pouvez soit la suivre pour créer vous-mêmes votre projet ou bien ignorer cette étape et suivre le résultat
à partir de [tiny-stats-template](https://github.com/GeopJr/tiny-stats-template).

## Bien démarrer

Le moyen le plus rapide de créer un projet est d'utiliser la commande `crystal init` :

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
Dépôt Git vide initialisé dans /my-gtk-app/.git/
```

Au moment d'écrire ceci, la commande `crystal init` est un peu imposé, passez en revue les fichiers suivants :

- `LICENSE`
- `README.md`
- `shard.yml`

Puis installer `gtk4.cr` en suivant la page [`Installation/Shard`](../installation/shard).
