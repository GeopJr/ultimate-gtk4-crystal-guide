# Les bindings

Générer des beaux bindings est assez facile grâce à [GI Crystal](https://github.com/hugopl/gi-crystal). Je n'irai pas plus en détail, s'il vous plaît, je vous invite à lire la documentation pour plus d'informations, cependant je couvre l'utilisation basique.

- Ajouter le code ci-dessous dans votre fichier `shard.yml` :

```yaml
developer_dependencies:
  gi-crystal:
    github: hugopl/gi-crystal
```

- Éxécuter : 

```
$ shards install
```

- Créer un fichier `src/bindings/binding.yml`.

- À l'intérieur, suivez la [spécification Crystal GI](https://github.com/hugopl/gi-crystal/blob/master/BINDING_YML.md). Vous définnisez le Typelib que vous souhaitez construire les liaisons et ce qu'il faut inclure ou exclure. Par exemple :

```yaml
namespace: Adw
version: '1'
```

- Puis, ce qu'il reste à faire est d'éxecuter le générateur.

```
$ ./bin/gi-crystal
```
