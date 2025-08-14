# Le shard

Les liaisons sont générés à la volée. Ce qui signifie qu'il y a une étape supplémentaire après avoir installé les shards qui génère des liaisons.

- Ajoutez des dépendances dans votre fichier `shard.yml` :

```yaml
dependencies:
  gtk4:
    github: hugopl/gtk4.cr
```

- Éxécutez :
```
$ shards install
```

- Une fois les dépendances installées, exécutez :
```
$ ./bin/gi-crystal
```
