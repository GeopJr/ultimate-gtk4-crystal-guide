# Debugging

## UI

You can run your app with `GTK_DEBUG=interactive` to run the inspector alongside your app. It's similar to a Web Inspector - you can select widgets, edit their properties, inject CSS, explore assets etc.

## Memory

Most GTK related errors will probably be memory issues. They are pretty unreadable, but you can pass `-Ddebugmemory` for more details. The thought process when you are stuck is to, as funny as it sounds, remove line until the error is gone to determine what line is causing it.
