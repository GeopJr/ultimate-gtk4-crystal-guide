# Bindings

Generating beautiful bindings is quite easy with [GI Crystal](https://github.com/hugopl/gi-crystal). I won't go too much into detail, please read the repo docs for more info, however I'll cover the basic usage.

- Add the following to your `shard.yml`:

```yaml
developer_dependencies:
  gi-crystal:
    github: hugopl/gi-crystal
```

- Run: 
```
$ shards install
```

- Create a `src/bindings/binding.yml` file

- Inside of it, following the [GI Crystal spec](https://github.com/hugopl/gi-crystal/blob/master/BINDING_YML.md), you define the Typelib you want to build bindings for and what to include or exclude, e.g.:

```yaml
namespace: Adw
version: '1'
```

- Then all what's left to do is run the generator:
```
$ ./bin/gi-crystal
```
