# Getting Started with NodeMCU ESP8266

I recently bought a couple of [NodeMCU](https://en.wikipedia.org/wiki/NodeMCU)s for fun and I've been enjoying playing with them. 
After some time in, I've decided to share how can you get started with the ESP8266 with [MicroPython](http://micropython.org/).

These posts will take shape of a tutorial series so that people who're just getting started may benefit from this.

A **NodeMCU** is an open source IoT platform that includes a firmware that runs on the ESP8266 WiFi SoC (that's pretty much an Arduino with WiFi). I've decided to go with MicroPython instead of Lua or Arduino because I've been in and around Python for a decent time (this doesn't have to do anything with the fact that Pointers gives me an anxiety).

So, let's jump right into it.

> pewdiepie.jpg

Oh, a friendly reminder. I'll be using Ubuntu 18.04LTS during this whole time.

![A NodeMCU](./assets/img/nodemcu/nodemcu.jpg)

## Step 1: Flashing MicroPython Firmware

Before we actually start writing pro-level MicroPython on our NodeMCU, we'll have to install a firmware on the NodeMCU's ROM that can run MicroPython. Let's start by downloading the firmware itself that can be found [at this link](http://micropython.org/download#esp8266). For now, you want to download the stable releases.

Once we have the firmware, we need a utility that can be used to flash it on the ESP86200. There are plenty of programs that can do that, but I found [esptool](https://github.com/espressif/esptool) to be the easiest. It's available in both Python2 and Python3 versions. I'll be using the one implemented in Python2. Now is a good time to plug the NodeMCU in your computer using a USB cable.

```shell
$ pip2 install esptool
```

After you have installed esptool, make sure that you have rights to access your NodeMCU over the USP port (e.g., group `dialout` or `uucp`).

```shell
$ ls -l /dev/ttyUSB*
crw-rw---- 1 root dialout 188, 0 Mar  8 10:55 /dev/ttyUSB0
$ sudo usermod -a -G dialout ${USER}
```

It's time to check if our current setup works. To do that, simply throw `esptool.py --port /dev/ttyUSB0 flash_id` into your terminal:


If you see something like this, it worked.

```
esptool.py v2.6
Serial port /dev/ttyUSB0
Connecting....
Detecting chip type... ESP8266
Chip is ESP8266EX
Features: WiFi
MAC: xx:xx:xx:xx:xx:xx
Uploading stub...
Running stub...
Stub running...
Manufacturer: 68
Device: 4016
Detected flash size: 4MB
Hard resetting via RTS pin...
```

It's time to flash the firmware now. To do that, simply run this command and be sure to use the firmware file that you've downloaded.

```shell
$ esptool.py --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=detect -fm dio 0 esp8266-xxxxxxxx-vxxx.bin
```

This should take like 10 seconds to complete. If you see something like this, then the installation was successful

```
esptool.py v2.6
Serial port /dev/ttyUSB0
Connecting....
Detecting chip type... ESP8266
Chip is ESP8266EX
Features: WiFi
MAC: bc:dd:c2:23:39:9b
Uploading stub...
Running stub...
Stub running...
Changing baud rate to 460800
Changed.
Configuring flash size...
Auto-detected Flash size: 4MB
Flash params set to 0x0240
Compressed 615388 bytes to 399928...
Wrote 615388 bytes (399928 compressed) at 0x00000000 in 9.0 seconds (effective 547.8 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
```

To verify, look at the available WiFi connections near you. MicroPython firmware creates an access point with SSID `MicroPython-xxxxxx` when the device is booted.

![WiFi networks showing MicroPython](./assets/img/nodemcu/wifi.png)

Swwweet!

## Step 2: Getting into the `REPL` prompt

From the [MicroPython docs](http://docs.micropython.org/en/v1.9.3/wipy/wipy/tutorial/repl.html)...

> REPL stands for `Read Evaluate Print Loop` and is the name given to the interactive MicroPython prompt that you can access on the WiPy. Using the REPL is by far the easiest way to test out your code and run commands. You can use the REPL in addition to writing scripts in `main.py`.

There are several ways of getting into the REPL prompt. You can refer to the [documentation](http://docs.micropython.org/en/v1.9.3/wipy/wipy/tutorial/repl.html) to get into it. I had `uucp` installed on the machine, so I'm going to use the `cu` utility.

```shell
$ cu -l /dev/ttyUSB0 -s 115200
```

If the command is successful, it should say `Connected`. Smack dat enter key after this and you should see the REPL prompt (`>>> `), which is basically a Python prompt but micro and somewhat extra cool.

You can type in standard Python code in it and it should work


![Executing Python in REPL](./assets/img/nodemcu/repl.png)

## Step 3: Getting MicroPython-y

"Hello world" statements are not fun enough, so let's experiment with the built-in LED. The traditional first program for hobby electronics is a blinking light. We will try to build that.

First, let's have a look at the pinout diagram of an ESP86200

![NodeMCU Pinout](./assets/img/nodemcu/NodeMCU_GPIOs.png)

The NodeMCU has 2 built-in LEDs (circled). The one near the antenna (the golden zig-zag line) is internally connected to `gpio2` and the other one to `gpio16`. Let's turn both of them on.


```python
from machine import Pin

led_1 = Pin(2, Pin.OUT)
led_2 = Pin(16, Pin.OUT)

led_2.off()
```

Sweet, now let's create a simple script that blinks both of the LEDs one by one.


```python
from machine import Pin
import time

led_1 = Pin(2, Pin.OUT)
led_2 = Pin(16, Pin.OUT)

def switch_leds_1():
    led_1.off()
    led_2.on()

def switch_leds_2():
    led_1.on()
    led_2.off()

while True:
    switch_leds_1()
    time.sleep(0.5)
    switch_leds_2()
    time.sleep(0.5)
```

---

That's pretty much it for the basics. I'll be doing advanced things like creating boot scripts and web servers in my next post.

#### `CYBER POTATO`

![CYBER_POTATO](./assets/img/nodemcu/cyberpotato.jpg)
