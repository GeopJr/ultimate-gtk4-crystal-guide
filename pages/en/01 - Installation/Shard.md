# Shard

Bindings are being generated on the fly. This means that there's an additional step after installing the shard that generates the bindings.

- Add the dependency to your `shard.yml`:

```yaml
dependencies:
  gtk4:
    github: hugopl/gtk4.cr
```

- Run `shards install`

- Run `./bin/gi-crystal`
