# Flatpak

Flatpak est un bac à sable au format paquet pour faire un empaquetage un peu astucieux.

Vous pouvez écrire des configurations Flatpak soit en JSON ou en YAML, mais pour des raisons de compatibilité avec GNOME Builder, nous allons créer un fichier `data/APP_ID.json`.

Pendant le processus de construction `shards` ne pourra pas télécharger les bibliothèques nécessaires. C'est pour cette raison que j'ai créé un script ci-dessous qui va à travers de votre fichier `shard.lock` et du dossier `lib/`, de collecter les versions du shard et les scripts de post-installation et les retourne au format correct et avec les instructions.

```crystal
# Génère les sources requises pour le Flatpak basé sur le fichier shard.lock.

require "yaml"
require "json"
require "option_parser"

PATH = Path["lib"]

toJson = false

OptionParser.parse do |parser|
  parser.on "-j", "--json", "Whether it should export json instead of yaml" do
    toJson = true
  end
end

lockfile = YAML.parse(File.read("shard.lock"))
shards = lockfile["shards"]

sources = [] of Hash(String, String)
postinstall_scripts = [] of String

shards.as_h.each do |x, y|
  version_type = "tag"
  version = "v" + y["version"].to_s
  if version.includes?("+git.commit.")
    version_type = "commit"
    version = version.split("+git.commit.")[-1]
  end
  sources << {
    "type"       => "git",
    "url"        => y["git"].to_s,
    version_type => version,
    "dest"       => PATH.join(x.to_s).to_s,
  }
end

Dir.open("lib/").each_child do |child|
  child_path = Path["lib/"].join(child)
  next unless File.directory?(child_path)
  shard_file = YAML.parse(File.read(child_path.join("shard.yml")))
  postinstall = shard_file["scripts"]?.try &.["postinstall"]?
  next unless postinstall
  postinstall_scripts << "cd #{child_path} && #{postinstall} && cd ../.."
end

commands = [] of String

# La boucle ci-dessous va parcourir tous les bibliothèques et créer des raccourcis à ces libraries pour le dossier parent.
commands << "for i in ./#{PATH}/*/; do ln -snf \"..\" \"$i/lib\"; done"
commands += postinstall_scripts if postinstall_scripts.size > 0

puts "Place the following snippet inside the 'build-commands' of your config:"
puts toJson ? commands.to_pretty_json : commands.to_yaml
puts "Keep in mind that postinstall scripts might need to be modified and audited."
puts ""
puts "Place the following snippet inside the 'sources' of your config:"
puts toJson ? sources.to_pretty_json : sources.to_yaml
```

Enregistrez le code dans le fichier `shards_to_sources.cr` et éxécutez :

```
$ crystal run shards_to_sources.cr
```

Vous pouvez aussi passer le drapeau `-j` si vous souhaitez obtenir le résultat au format JSON (`crystal run shards_to_sources.cr -- -j`).

Suivez les instructions et auditez les scripts de post-installation.

En ce qui concerne la rédaction du script, cela dépend de votre paquet. Vous allez devoir installer et construire toutes les dépendances, ainsi que gérer les versions de Crystal et des shards. Je ne vais pas trop me focaliser là-dessus, alors n'hésitez pas à jeter un œil à la [configuration de Collision](https://raw.githubusercontent.com/GeopJr/Collision/main/data/dev.geopjr.Collision.json).

::: tip
Remplacez `APP_ID` par votre identifiant de votre application.
:::
