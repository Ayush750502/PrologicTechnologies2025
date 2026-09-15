# Commands

## Node

### 1. Start Metro

```cmd
$ npm start
```

Starts the Metro bundler.

### 2. Reset Metro Cache

```cmd
$ npm start -- --reset-cache
```

Starts Metro after clearing the cache.

---

## React Native

### 1. Link Assets

```cmd
$ npx react-native-asset
```

Links native assets such as fonts into the React Native project.

### 2. Run Android App

```cmd
$ npm run android
```

Builds and runs the Android application on a connected device or emulator.

### 3. Run on Specific Device

```cmd
$ npm run android -- --deviceId __DEVICE_ID__
```

Runs the Android application on the specified device.

```cmd
$ npm run android -- --device __DEVICE_ID__
```

Alternative syntax for running on a specific device.

---

## Android Emulator

### 1. Start Emulator

```cmd
$ emulator -avd __EMULATED_DEVICE_NAME__
```

Starts the specified Android Virtual Device.

### 2. Start Emulator Without GPU

```cmd
$ emulator -avd __EMULATED_DEVICE_NAME__ -gpu off
```

Starts the emulator with GPU acceleration disabled.

### 3. Start Emulator Without Snapshot

```cmd
$ emulator -avd __EMULATED_DEVICE_NAME__ -gpu off -no-snapshot
```

Starts the emulator without loading or saving a snapshot.

### 4. Start Emulator Without Boot Animation

```cmd
$ emulator -avd __EMULATED_DEVICE_NAME__ -gpu off -no-snapshot -no-boot-anim
```

Starts the emulator with GPU, snapshot, and boot animation disabled.

---

## ADB

### 1. List Connected Devices

```cmd
$ adb devices
```

Shows all Android devices and emulators connected through ADB.

### 2. List Installed Packages

```cmd
$ adb shell pm list packages
```

Displays all installed Android application package names.

### 3. Find a Specific Package

```cmd
$ adb shell pm list packages | grep __PACKAGE_NAME__
```

Filters the installed packages to find a specific application.

### 4. Uninstall Application

```cmd
$ adb uninstall __PACKAGE_NAME__
```

Uninstalls the specified application from the connected device.

### 5. Run Command on Specific Device

```cmd
$ adb -s __DEVICE_ID__ __COMMAND__
```

Executes an ADB command on a specific connected device.

### 6. Handshow Device

```text
adb-396374202667616254-oiypvx._adb-tls-connect._tcp
```

Device ID used for the Handshow device connection.

---

## Gradle

### 1. Stop Gradle Daemons

```cmd
$ ./gradlew --stop
```

Stops all running Gradle daemon processes.

### 2. Clean Android Build

```cmd
$ ./gradlew clean
```

Cleans the Android build directory and generated build files.

---

## Project Specific

### 1. Get Visible Products in Cart

```text
$ getVisibleProductsNumInCart
```

Project-specific utility for getting the number of visible products in the cart.


---
---

# Fixes:

To fix the no permissions (missing udev rules?) error, you need to configure udev rules on your Linux system. This tells Linux to grant your user account permission to interact with your specific Android phone via USB.
Here is how to fix this in under two minutes:
## 1. Find Your Phone's Vendor ID
First, find the specific hardware ID of your connected phone. Run this command in your terminal:

lsusb

Look for your phone in the list. It will look something like this:

Bus 001 Device 005: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device

The 4-character code before the colon (in this example, 18d1) is your Vendor ID. Note yours down.
## 2. Create the Udev Rule
Create a new rule file using your terminal's text editor (like nano):

sudo nano /etc/udev/rules.d/51-android.rules

Paste the following line into the file. Replace 18d1 with the actual Vendor ID you found in the step above:

SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"

To save and exit Nano: Press Ctrl + O, then Enter, then Ctrl + X.
## 3. Apply the Changes
Reload the Linux udev rules to activate the new configuration:

sudo udevadm control --reload-rules
sudo systemctl restart udev

## 4. Restart the ADB Server
Unplug the USB cable from your phone, then run these commands to restart ADB with proper permissions:

adb kill-server
adb start-server

Plug your USB cable back in. Look at your phone's screen and accept the "Allow USB Debugging?" prompt if it appears. Finally, verify it works:

adb devices

Your device should now say device instead of no permissions, allowing you to run gnirehtet and your development apps perfectly.
Did your device successfully switch to showing device in the terminal, or are you still getting a permission error?
