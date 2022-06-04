# UI Design

The first step for a successful app is the UI design.

There are a few ways to do this:

- [`Glade`](https://glade.gnome.org/) - Interface Designer for GTK

While Glade is _a bit behind_, it's still very useful for UI design on GTK4. With Glade you can create designs by drag-n-dropping widgets, editing their properties, preview your UI & more.

[![Gif of creating a window using Glade](/assets/en/ui-design-0.gif)](/assets/en/ui-design-0.webm)

::: info
Click the gif for a full resolution webm)
:::

Glade can export your UIs in various formats but we mostly want them in GtkBuilder/.ui.

While Glade works only with GTK3, we can use `gtk-builder-tool simplify` with the `--3to4` flag to convert it to GTK4.

- [`Cambalache`](https://gitlab.gnome.org/jpu/cambalache) - a new RAD tool for Gtk 4 and 3 with a clear MVC design and data model first philosophy

Cambalache is aiming to replace Glade. While it's already very useful, it might not be as user friendly as Glade yet.

[![Gif of creating a window using Cambalache](/assets/en/ui-design-1.gif)](/assets/en/ui-design-1.webm)

::: info
Click the gif for a full resolution webm)
:::

- Writing GtkBuilder files manually

As you might have noticed from the above two, the exported .ui file is just an XML file. If you are familiar with web dev, this acts as the "HTML" of your website.

For example, the Glade sample (passed through `gtk-builder-tool simplify --3to4 --replace`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <requires lib="gtk" version="4.0"/>
  <object class="GtkWindow">
    <property name="child">
      <object class="GtkBox">
        <property name="orientation">vertical</property>
        <child>
          <object class="GtkLabel">
            <property name="label" translatable="1">my app</property>
          </object>
        </child>
        <child>
          <object class="GtkSpinner">
            <property name="active">True</property>
          </object>
        </child>
      </object>
    </property>
  </object>
</interface>
```

Writing these files is quite easy and straightforward, more on that at [Widgets](../concepts/widgets).

- Creating the UI in code

We can also, of course, create widgets using code. If you are familiar with web dev, this is similar to creating elements with JS & editing their properties.

```crystal
button = Gtk::Button.new_with_label("Increase")
button.icon_name = "face-devilish-symbolic"
```

## tiny-stats' UI

Made with Glade and then converted to GTK4 using `gtk-builder-tool`. It sticks to the original [plan](./plan) using the widgets mentioned there.

What's left to do is assign IDs to the Widgets we will need to handle in [code](./code).

::: tip
It's ok to include placeholder text and containers as they can be overwritten in code.
:::

```xml
<?xml version="1.0" encoding="UTF-8"?>
<interface>
  <requires lib="gtk" version="4.0"/>
  <object class="GtkApplicationWindow" id="tinyWindow">
    <property name="child">
      <object class="GtkNotebook" id="tinyNotebook">
        <property name="focusable">1</property>
        <child>
          <object class="GtkNotebookPage">
            <property name="child">
              <object class="GtkGrid">
                <property name="row-homogeneous">1</property>
                <property name="column-homogeneous">1</property>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Usage</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Used</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Total</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">2</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyCPUUsage">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyCPUUsed">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyCPUTotal">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">2</property>
                    </layout>
                  </object>
                </child>
              </object>
            </property>
            <property name="tab">
              <object class="GtkLabel">
                <property name="label" translatable="yes">CPU</property>
              </object>
            </property>
          </object>
        </child>
        <child>
          <object class="GtkNotebookPage">
            <property name="position">1</property>
            <property name="child">
              <object class="GtkGrid">
                <property name="row-homogeneous">1</property>
                <property name="column-homogeneous">1</property>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Available</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Used</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Total</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">2</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyAvailable">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyUsed">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyTotal">
                    <property name="label">000</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">2</property>
                    </layout>
                  </object>
                </child>
              </object>
            </property>
            <property name="tab">
              <object class="GtkLabel">
                <property name="label" translatable="yes">Memory</property>
              </object>
            </property>
          </object>
        </child>
        <child>
          <object class="GtkNotebookPage">
            <property name="position">2</property>
            <property name="child">
              <object class="GtkGrid">
                <property name="row-homogeneous">1</property>
                <property name="column-homogeneous">1</property>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Up</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel">
                    <property name="label" translatable="yes">Down</property>
                    <layout>
                      <property name="column">0</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyUp">
                    <property name="label">0 kB/s</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">0</property>
                    </layout>
                  </object>
                </child>
                <child>
                  <object class="GtkLabel" id="tinyDown">
                    <property name="label">0 kB/s</property>
                    <layout>
                      <property name="column">1</property>
                      <property name="row">1</property>
                    </layout>
                  </object>
                </child>
              </object>
            </property>
            <property name="tab">
              <object class="GtkLabel">
                <property name="label" translatable="yes">Network</property>
              </object>
            </property>
          </object>
        </child>
      </object>
    </property>
    <child type="titlebar">
      <object class="GtkHeaderBar">
        <child type="end">
        <menu id="primary_menu">
          <section>
            <item>
              <attribute name="label" translatable="yes">_About Tiny Stats</attribute>
              <attribute name="action">app.about</attribute>
            </item>
          </section>
        </menu>
          <object class="GtkMenuButton" id="tinyMenu">
            <property name="menu-model">primary_menu</property>
            <property name="icon-name">open-menu-symbolic</property>
            <property name="tooltip-text" translatable="yes">Menu</property>
          </object>
        </child>
      </object>
    </child>
  </object>
</interface>
```

::: tip
You can always split a ui file into smaller ui files for maintainability, however tiny-stats is too tiny and doesn't really require that.
:::

We should also create a CSS rule for the title and a class that we might find useful later:

```css
.font-monospace, .title {
  font-family: monospace;
}
```

Let's preview it using `gtk-builder-tool preview`:

![Screenshot of the above UI in action](/assets/en/ui-design-0.png)

Lastly, save them as `data/ui/app.ui` and `data/css/style.css`.
