# Giving Elementary OS a total macOVER

 I've been using a Linux computer as my primary development machine for quite some time,
 and after years and years of looking at numerous websites that post screenshots of
 stuff running under macOS, I subconsciously picked the idea of trying it out.

#### But wait...

 ... did I just decide to shift to a completely new and unfamiliar OS just for a feast to the eyes?

 Doesn't make sense... AT ALL...

 So I decided to give my current home a new look.

## Installing [Elementary OS](https://elementary.io)

 I've decided to go with Elementary OS Loki v0.4x as I've been using Ubuntu and this
 thing is a totally re-done Ubuntu distro. You can just go to Elementary's home page
 and download the ISO, then use a tool like [Universal USB Installer](https://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/)
 or [UNetBootin](https://unetbootin.github.io/) to burn the ISO a disk/USB drive and
  use it as your live media.

After you've got your live installation media (LIM) ready,
just plug it in and boot your computer from the LIM.

#### One Last Chance...

After your computer boots up, you'll get an option to try out the Elementary OS without
actually installing it. If you go with this option, you can use the Elementary OS until
you shut your computer down without affecting your files (unless you try to do so). Make
sure that everything that you need (that includes any VPN connection that you might use, or
any IDE or Text Editors your prefer) are working. And decide whether you are comfortable with
Elementary or not.

If you're ready to install, just click on the **Install Elementary OS** icon on the dock,
or reboot your computer from the LIM again. You would be presented with a splash screen with
instructions that you can follow to complete the installation of Elementary OS.

## After installation

Please take time to [learn the basics](https://elementary.io/docs/learning-the-basics#learning-the-basics)
of Elementary OS.

## Making EOS look like a Mac.

#### Start by installing `software-properties-common` package.

We need this for `apt-add-repository` command. Launch the terminal by using `Super Key + T`
and then type in the following commands.

    $ sudo apt-get install software-properties-common

#### Installing `elementary-tweaks`

Using elementary-tweaks, we can enable double-click in Elementary, or add minimize buttons.
It basically gives us lots of tweaking options.

    $ sudo add-apt-repository ppa:philip.scott/elementary-tweaks
    $ sudo apt-get update
    $ sudo apt-get install elementary-tweaks

#### Installing `git`

    $ sudo apt-get install git

#### Installing OSX-Arc theme

OSX-Arc theme collection is a flat theme collection based on arc with transparent elements. OSX-Arc Collection is available in three variants, it also supports GTK 3, GTK 2 and Gnome-Shell which integrates with GTK 3 and GTK 2 based desktop environments like Gnome, Unity, Pantheon, XFCE, Mate, etc.

For this post, we will be using [OSX Arc Plus](https://github.com/LinxGem33/OSX-Arc-Plus) theme. There's a dark theme variant, if you prefer that as well.

    $ cd /usr/share/themes
    $ sudo git clone https://github.com/LinxGem33/OSX-Arc-Plus.git

OSX Arc themes also come with a matching plank theme. You will need to copy the contents of
`./OSX-Arc-Plus/extra/Arc-Plank` to `/usr/share/plank/themes`.

#### Giving the final touch

Launch the Tweak Tool by opening **System Settings** from the dock, and then navigate to
**Tweaks** under the **Personal** section.

- Set **General > Appearance > Theme Settings > GTK+** to *OSX-Arc-Plus*.
- Set **General > Appearance > Window Controls > Layout** to *OSX*.
- Set **Applications > Files > Single Click** to *disabled*.

Now launch plank with `plank --preferences` from a terminal and select Arc-Plank as the theme.

### Here we are.

![Screenshot of final look](./assets/img/screenshot.png)
