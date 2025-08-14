# Débogage

## IU

Vous pouvez éxecuter votre application avec `GTK_DEBUG=interactive` pour lancer l'inspecteur à côté de votre application. Ceci est simmilaire à l'inspecteur web, vous pouvez sélectionner des widgets, modifier ses propriétés, injecter du CSS, découvrir des assets etc...

## Mémoire

La plupart des erreurs qui sont liées à GTK sont probablement dû aux problèmes mémoire. Ils sont pratiquement illisibles, mais vous pouvez passer le drapeau `-Ddebugmemory` pour plus de détails. Lorsque vous êtes bloqué (aussi drôle que cela puisse paraître), il faut supprimer des lignes jusqu'à ce que l'erreur disparaisse afin de déterminer quelle ligne est à l'origine de l'erreur.
