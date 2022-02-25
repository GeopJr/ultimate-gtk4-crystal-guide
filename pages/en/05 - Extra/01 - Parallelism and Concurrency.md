---
postName: Parallelism & Concurrency
---

# Parallelism & Concurrency

Without going too much into detail, the main thread is occupied by the main loop, blocking it for any reason **HAS** to be avoided. Blocking it will result in your app being in a "Frozen" state. Any expensive code should run in a different thread.

Crystal has made many [improvements to parallelism](https://crystal-lang.org/2019/09/06/parallelism-in-crystal.html) over the years, to enable it you need to pass the `-Dpreview_mt` flag when building (or running with `crystal run`) your app.

To achieve concurrency we use [fibers](https://crystal-lang.org/reference/1.3/guides/concurrency.html). Fibers by default spawn in the same thread, however that changes with `-Dpreview_mt`, fibers can now spawn in any of the threads.

While that's awesome, there's a problem when used with GTK - they can still spawn in the main/blocked/occupied thread. To bypass this I created [non-blocking-spawn](https://github.com/GeopJr/non-blocking-spawn), a copy of the top level spawn method that when `same_thread` is false, uses any BUT the current thread.

Since it touches private interfaces it's better to understand what it does before blindly using.

The default, top level spawn:

```crystal
def spawn(*, name : String? = nil, same_thread = false, &block)
  fiber = Fiber.new(name, &block)
  if same_thread
    fiber.@current_thread.set(Thread.current)
  end
  Crystal::Scheduler.enqueue fiber
  fiber
end
```

- Creates a fiber
- If same_thread is true, sets the fiber's thread to the current one
- Lets Scheduler handle it and returns it

The non-blocking-spawn one:

```crystal
def spawn(*, name : String? = nil, same_thread = false, &block) : Fiber
    fiber = Fiber.new(name, &block)
    if same_thread
      fiber.@current_thread.set(Thread.current)
    else
      non_blocking_threads = threads
      fiber.@current_thread.set(non_blocking_threads.sample) unless non_blocking_threads.size == 0
    end
    Crystal::Scheduler.enqueue fiber
    fiber
end

def threads : Array(Thread)
  threads = [] of Thread
  Thread.unsafe_each do |thread|
    next if thread == Thread.current
    threads << thread
  end
  threads
end
```

The `Non::Blocking#threads` method:

- Creates an array of Thread
- Goes through all available threads and returns all but the current one

The `Non::Blocking#spawn` method:

- Exactly the same as the top level one but when `same_thread` is false, it sets the fiber's thread to a random one from `Non::Blocking#threads` (any but the current one) if available, else lets Scheduler to handle it

With those two functions, not only can we spawn in any but the current thread but also handle the event of no threads being available (`Non::Blocking#threads == 0`):

```crystal
require "non-blocking-spawn"

if Non::Blocking.threads == 0
    sleep 10.seconds
else
    Non::Blocking.spawn do
      sleep 3600.seconds
    end
end
```
