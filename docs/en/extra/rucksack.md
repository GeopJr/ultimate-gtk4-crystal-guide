# Rucksack

There are many shards that bundle files into Crystal apps, however [Rucksack](https://github.com/busyloop/rucksack) is a bit unique. It doesn't load them in memory but instead "attaches" them on the binary, allowing you to attach _huge_ files and access them on demand. This, however, requires an extra build step.

Rucksack needs to generate a "pack" that contains all the files you want to bundle. For the sake of automating the process, I wrote a tiny script that recursively goes through a folder (`./data` by default) and adds all files that match a set of regex checks to the pack:

```crystal
require "rucksack"

EXCLUDE = [
  /.+\.source\.svg$/i,
  /(.+)?\/data\/scripts(\/?.+)?$/i,
  /(.+)?\.cr/i,
  /(.+)?\/data\/[^\/]*$/i,
]

module RucksackHelper
  extend self

  def get_paths(path : String | Path) : Array(Path)
    result = [] of Path
    Dir.open(path).each_child do |child|
      child_path = Path[path, child]
      if File.directory?(child_path)
        result += get_paths(child_path)
        next
      end
      next unless EXCLUDE.all? { |regex| (regex =~ child_path.expand.to_s).nil? }
      raise "#{child_path} is not a file" unless File.file?(child_path)
      result << child_path
    end
    result
  end
end

RucksackHelper.get_paths("data/").each do |child|
    rucksack("./" + child.to_s)
end
```

Rucksack has a set of env vars that determine its runtime behavior from 0 to 2, 0 being forgiving and 2 being paranoid.

We want to set it to 1 during release builds and leave it as 0 during development. We can achieve it with macros:

```crystal
{% if !flag?(:debug) || flag?(:release) %}
  ENV["RUCKSACK_MODE"] ||= "1"
{% end %}
```

We can also run the script with macros so it generates it every time it compiles:

```crystal
{{run("../data/scripts/generate_rucksack.cr")}}
```

To read a file, all you have to do is pass an IO to rucksack:

```crystal
css_data = IO::Memory.new
rucksack("./data/css/style.css").read(css_data)
```

As mentioned previously, there's an additional step. You need to append the rucksack pack to the binary:

```sh
cat .rucksack >> ./my-app"
```

Keep in mind that it has to be at the end of the binary. When packaging, additional debug info might be appended to the binary and prevent rucksack from working. You can avoid that on flatpak by passing the following build-options:

```json
"build-options": {
	"strip": false,
	"no-debuginfo": true
},
```

Rucksack provides additional methods, exceptions and more, please read its [README](https://github.com/busyloop/rucksack#readme).
