# CLI

Sometimes you might want your app to have a **C**ommand **L**ine **I**nterface so that users can open files or even configure it. Despite how similar these two cases seem, they are implemented differently.

Before I get into them, let's create an example app: A file size viewer that accepts files from the command line and has 1-2 options.

```crystal
require "gtk4"

label = "No open file"

app = Gtk::Application.new("dev.geopjr.filesizeviewer", Gio::ApplicationFlags::HandlesOpen)

app.activate_signal.connect do
  window = Gtk::ApplicationWindow.new(app)
  window.title = "File Size"
  window.set_default_size(200, 200)
  main_label = Gtk::Label.new(label)
  main_label.wrap = true

  window.child = main_label
  window.present
end

exit(app.run)
```

![Screenshot of the app running showing just a label with the text 'No open file'](/assets/en/cli-0.png)

## Files

Now lets make it open a file from command line and calculate its size in kb.

We are going to use the [`Gio::Application#open_signal`](https://hugopl.github.io/gtk4.cr/Gio/Application.html#open_signal-instance-method). This signal emits when we provide a file to our app without emitting the #activate one.

::: info
While it's possible to get the file path from ARGV, it's recommended to use the open_signal as it returns a list of `Gio::File` & supports xdg-portals, allowing you to access files outside of sandboxed environments like flatpak.
:::

With that said, all we have to do is connect to the signal, grab the first file from the list, query its stats and set the label to that:

```crystal
app.open_signal.connect do |files, hint|
  file = files[0]
  fileinfo = file.query_info("standard::size", :none, nil)
  filesize_h = fileinfo.size / 1000
  label = "File: \"#{file.basename}\" is #{filesize_h} kb"

  # We need to manually emit the activate signal
  app.activate

  nil
end
```

Running `crystal run src/app.cr -- ./shard.yml` or `./app.cr ./shard.yml` will result in:

![Screenshot of the app running showing just a label with the text 'File "shard.yml" is 0.198 kb'](/assets/en/cli-1.png)

## Arguments

We now want to add some arg options:

- `-m, --megabyte` `Whether to use megabytes instead of kilobytes`
- `-l label, --label=LABEL` `Default label if no file is set`

For that we are going to use Crystal's `OptionParser`:

```crystal
require "gtk4"
require "option_parser"

label = "No open file"
megabyte = false

OptionParser.parse do |parser|
  parser.banner = "Usage: file-size-cr [arguments] [file]"
  parser.on("-m", "--megabyte", "Whether to use megabytes instead of kilobytes") { megabyte = true }
  parser.on("-l label", "--label=LABEL", "Default label if no file is set") { |t_label| label = t_label }
  parser.on("-h", "--help", "Show this help") do
    puts parser
    exit
  end
  parser.invalid_option do |flag|
    STDERR.puts "ERROR: #{flag} is not a valid option."
    STDERR.puts parser
    exit(1)
  end
end
```

then we are going to update the open_signal so it correctly handles the `-m` flag:

```crystal
app.open_signal.connect do |files, hint|
  file = files[0]
  fileinfo = file.query_info("standard::size", :none, nil)
  filesize_h = fileinfo.size / 1000

  filesize_h = filesize_h / 1000 if megabyte
  label = "File: \"#{file.basename}\" is #{filesize_h} #{megabyte ? "m" : "k"}b"

  app.activate

  nil
end
```

and last but certainly not least, we are going to remove all the flags but the files from ARGV and then pass it to out app. GTK will refuse to proceed on unknown flag but we still want it to handle files for the open_signal:

```crystal
clean_argv = [PROGRAM_NAME].concat(ARGV.reject { |x| x.starts_with?('-') })
exit(app.run(clean_argv))
```

Running `crystal run src/app.cr -- -m ./shard.yml` or `./app.cr -m ./shard.yml` will result in:

![Screenshot of the app running showing just a label with the text 'File "shard.yml" is 0.00019800000000000002 mb'](/assets/en/cli-2.png)

Running `crystal run src/app.cr -- -l "You forgot to mention a file"` or `./app.cr -l "You forgot to mention a file"` will result in:

![Screenshot of the app running showing just a label with the text 'You forgot to mention a file'](/assets/en/cli-3.png)

### Final result

```crystal
require "gtk4"
require "option_parser"

label = "No open file"
megabyte = false

OptionParser.parse do |parser|
  parser.banner = "Usage: file-size-cr [arguments] [file]"
  parser.on("-m", "--megabyte", "Whether to use megabytes instead of kilobytes") { megabyte = true }
  parser.on("-l label", "--label=LABEL", "Default label if no file is set") { |t_label| label = t_label }
  parser.on("-h", "--help", "Show this help") do
    puts parser
    exit
  end
  parser.invalid_option do |flag|
    STDERR.puts "ERROR: #{flag} is not a valid option."
    STDERR.puts parser
    exit(1)
  end
end

app = Gtk::Application.new("dev.geopjr.filesizeviewer", Gio::ApplicationFlags::HandlesOpen)

app.activate_signal.connect do
  window = Gtk::ApplicationWindow.new(app)
  window.title = "File Size"
  window.set_default_size(200, 200)
  main_label = Gtk::Label.new(label)
  main_label.wrap = true

  window.child = main_label
  window.present
end

app.open_signal.connect do |files, hint|
  file = files[0]
  fileinfo = file.query_info("standard::size", :none, nil);
  filesize_h = fileinfo.size / 1000

  filesize_h = filesize_h / 1000 if megabyte
  label = "File: \"#{file.basename}\" is #{filesize_h} #{megabyte ? "m" : "k"}b"

  app.activate

  nil
end

clean_argv = [PROGRAM_NAME].concat(ARGV.reject { |x| x.starts_with?('-') })
exit(app.run(clean_argv))
```
