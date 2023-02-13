require "gtk4"

# Let's register our GResource
resource = Gio.register_resource("data/dev.geopjr.reverse.gresource.xml", "data")

app = Gtk::Application.new("dev.geopjr.reverse", Gio::ApplicationFlags::None)

# Custom widget - A box with a label and a button that when clicked copies the label's text
@[Gtk::UiTemplate(resource: "/dev/geopjr/reverse/ui/copy_widget.ui", children: %w(label copy_btn))]
class CopyWidget < Gtk::Box
  include Gtk::WidgetTemplate

  @label : Gtk::Label
  @copy_btn : Gtk::Button
  @clipboard : Gdk::Clipboard?

  def initialize
    super()

    @label = Gtk::Label.cast(template_child("label"))
    @label.text = ""
    @label.wrap = true

    @copy_btn = Gtk::Button.cast(template_child("copy_btn"))
    @copy_btn.label = "Copy"

    # On copy button click
    @copy_btn.clicked_signal.connect do
      # Check if clipboard has been set
      unless (clp = @clipboard).nil?
        # and copy the value
        clp.set(value)
      end
    end
  end

  # Getter function that gets the label's value
  # (CopyWidget#value)
  def value : String
    @label.text
  end

  # Setter function that sets the label's value
  # (CopyWidget#value=)
  def value=(text : String)
    @label.text = text
  end

  # Whether the copy button should be sensitive
  def disabled=(t_disable : Bool = true)
    @copy_btn.sensitive = !t_disable
  end

  # Setter for the clipboard
  def clipboard=(t_clipboard : Gdk::Clipboard)
    @clipboard = t_clipboard
  end
end

# Custom widget - A vertical box
@[Gtk::UiTemplate(resource: "/dev/geopjr/reverse/ui/copy_box.ui", children: %w())]
class CopyBoxWidget < Gtk::Box
  include Gtk::WidgetTemplate

  @copy_reverse = CopyWidget.new
  @copy_upcase = CopyWidget.new
  @copy_downcase = CopyWidget.new

  def initialize(text : String, clipboard : Gdk::Clipboard)
    super()

    # Append each CopyWidget and set its clipboard
    {@copy_reverse, @copy_upcase, @copy_downcase}.each do |x|
      append(x)
      x.clipboard = clipboard
    end

    self.value = text
  end

  # Sets the value of each widget, after transforming it
  # and conditionally disables their copy buttons
  def value=(text : String)
    @copy_reverse.value = text.reverse   # foo => oof
    @copy_upcase.value = text.upcase     # foo => FOO
    @copy_downcase.value = text.downcase # BAR => bar

    {@copy_reverse, @copy_upcase, @copy_downcase}.each do |x|
      # We want the copy buttons to be disabled when
      # the text has been left unchanged (e.g foo => foo)
      # or when the text is empty
      x.disabled = x.value == text || text.empty?
    end
  end
end

app.activate_signal.connect do
  window = Gtk::ApplicationWindow.new(app)
  window.title = "String Transformations"
  window.set_default_size(600, 300)

  # Init the copy view
  copy_view = CopyBoxWidget.new("", window.clipboard)

  # Create an entry for the text
  entry = Gtk::Entry.new
  entry.placeholder_text = "Type something"
  # When the entry changes, set the value
  # of the copy view (CopyBoxWidget#value)
  # to it
  entry.changed_signal.connect do
    copy_view.value = entry.buffer.text
  end

  view_box = Gtk::Box.new(:Vertical, 30)
  view_box.append(entry)
  view_box.append(copy_view)

  window.child = view_box
  window.present
end

exit(app.run)
