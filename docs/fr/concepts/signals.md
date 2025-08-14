# Les signaux

Les signaux sont juste des évènements. Si vous êtes fammilier avec le développement web, ils sont simmilaire aux évènements JavaScript.

Dans la documentation, les signaux des widgets ont un suffixe `_signal` pour les différencier des méthodes normales.

Connectons le signal `clicked` de `Gtk::Button` à une fonction qui va changer son label :

```crystal
clicks = 0
button = Gtk::Button.new_with_label("Clicked #{clicks}")

def clicked(btn : Gtk::Button, new_clicks : Int32)
    button.label = "Clicked #{new_clicks}"
end

# Passer un block
button.clicked_signal.connect do
    clicks = clicks.succ
    clicked(button, clicks)
end
```

[![GIF d'un code ci-dessus en action](/assets/en/signals-0.gif)](/assets/en/signals-0.webm)

::: info
Cliquer sur le GIF pour une résolution webm complète.
:::
