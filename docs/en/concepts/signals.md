# Signals

Signals are just events. If you are familiar with web dev, they are similar to JS events.

In docs, signals of widgets have the `_signal` suffix to differentiate themselves from normal methods.

Let's connect a `Gtk::Button`'s `clicked` signal to a function that will change its label:

```crystal
clicks = 0
button = Gtk::Button.new_with_label("Clicked #{clicks}")

def clicked(btn : Gtk::Button, new_clicks : Int32)
    button.label = "Clicked #{new_clicks}"
end

# Passing a block
button.clicked_signal.connect do
    clicks = clicks.succ
    clicked(button, clicks)
end
```

[![Gif of the above code in action](/assets/en/signals-0.gif)](/assets/en/signals-0.webm)

::: info
Click the gif for a full resolution webm)
:::
