# Flatpak

Flatpak is a sandboxed package format making packaging a bit trickier.

You can write flatpak configs in either json or yaml, but for the sake of being compatible with GNOME Builder, we'll create a `data/APP_ID.json` file.

During the build process `shards` won't be able to download the required libraries. For that reason I've written the following script that goes through your `shard.lock` and `lib/` folder, collects shard versions and postinstall scripts and returns them in the correct format and with instructions:

```crystal
# Generates the required sources for the flatpak based on the shard.lock

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

# The following loop will go through all libs and symlink their libs to the parent folder.
commands << "for i in ./#{PATH}/*/; do ln -snf \"..\" \"$i/lib\"; done"
commands += postinstall_scripts if postinstall_scripts.size > 0

puts "Place the following snippet inside the 'build-commands' of your config:"
puts toJson ? commands.to_pretty_json : commands.to_yaml
puts "Keep in mind that postinstall scripts might need to be modified and audited."
puts ""
puts "Place the following snippet inside the 'sources' of your config:"
puts toJson ? sources.to_pretty_json : sources.to_yaml
```

Save it as `shards_to_sources.cr` and run:
```
$ crystal run shards_to_sources.cr
```
You can also pass the `-j` format if you want it in json (`crystal run shards_to_sources.cr -- -j`).

Follow the instructions and audit the postinstall scripts.

Now on the script writing, it depends on your package. You will have to install and build all dependencies as well as manage Crystal and shard versions. I don't want to focus too much on it so you are more than welcome to take a look at [Collision's config](https://raw.githubusercontent.com/GeopJr/Hashbrown/main/data/dev.geopjr.Hashbrown.json).

::: tip
Replace `APP_ID` with your app's ID.
:::
