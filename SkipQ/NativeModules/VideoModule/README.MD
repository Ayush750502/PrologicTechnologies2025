# React Native Android Video Native Module Documentation

## Overview

This native module provides a custom Android video component for React Native using:

* Java
* TextureView
* MediaPlayer
* XML Layouts
* React Native Native UI Components

The module supports:

* Video playback
* Video rotation
* Looping
* Pause/Play
* Native event callbacks
* XML based Android layouts
* React Native integration

This implementation is optimized for:

* React Native 0.84+
* Android focused applications
* Kiosk applications
* Device management apps
* Custom Android video experiences

---

# Features

| Feature                       | Supported |
| ----------------------------- | --------- |
| MP4 Playback                  | ✅         |
| Remote URLs                   | ✅         |
| Local Files                   | ✅         |
| Rotation                      | ✅         |
| Looping                       | ✅         |
| Pause/Play                    | ✅         |
| Video Ready Event             | ✅         |
| XML Layouts                   | ✅         |
| React Native Native Component | ✅         |
| TextureView Rendering         | ✅         |
| Android Java                  | ✅         |

---

# Architecture

```txt
React Native JSX
        ↓
requireNativeComponent()
        ↓
RNVideoViewManager
        ↓
Inflate XML Layout
        ↓
RotatedVideoTextureView
        ↓
VideoPlayerController
        ↓
MediaPlayer
```

---

# Folder Structure

```txt
android/app/src/main/

├── java/com/skipqhanshowdevice/video/
│
│   ├── RNVideoPackage.java
│   ├── RNVideoViewManager.java
│   ├── RotatedVideoTextureView.java
│   └── VideoPlayerController.java
│
└── res/layout/
    └── rn_video_view.xml
```

---

# Android XML Layout

File:

```txt
android/app/src/main/res/layout/rn_video_view.xml
```

```xml
<?xml version="1.0" encoding="utf-8"?>

<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/video_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#000000">

    <com.skipqhanshowdevice.video.RotatedVideoTextureView
        android:id="@+id/video_texture"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</FrameLayout>
```

---

# RNVideoPackage.java

Registers the native module with React Native.

Responsibilities:

* Register ViewManager
* Expose native view to React Native

---

# RNVideoViewManager.java

Bridge between React Native and Android native views.

Responsibilities:

* Inflate XML layout
* Receive React props
* Create VideoPlayerController
* Emit native events

Supported Props:

| Prop     | Type    |
| -------- | ------- |
| source   | object  |
| rotation | number  |
| loop     | boolean |
| paused   | boolean |

Supported Events:

| Event   | Description                  |
| ------- | ---------------------------- |
| onReady | Fired when video is prepared |

---

# RotatedVideoTextureView.java

Custom TextureView implementation.

Responsibilities:

* Video rotation
* Matrix transforms
* Scaling
* Rotation correction

Why TextureView?

TextureView supports:

* Matrix transforms
* Rotation
* Scaling
* Custom rendering

SurfaceView does not properly support transformations.

---

# VideoPlayerController.java

Handles all MediaPlayer logic.

Responsibilities:

* MediaPlayer lifecycle
* Playback
* Pause/Play
* Looping
* Source loading
* Ready events
* Surface handling

---

# MainApplication.kt Registration

```kotlin
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        add(RNVideoPackage())
    }
```

---

# React Native TypeScript Wrapper

```tsx
import React from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  NativeSyntheticEvent,
} from 'react-native';

type ReadyEvent = NativeSyntheticEvent<{
  ready: boolean;
}>;

type Props = {
  source: {
    uri: string;
  };

  rotation?: number;

  loop?: boolean;

  paused?: boolean;

  style?: ViewStyle;

  onReady?: (event: ReadyEvent) => void;
};

const RNVideoView =
  requireNativeComponent<Props>('RNVideoView');

export default function NativeVideo(props: Props) {
  return <RNVideoView {...props} />;
}
```

---

# React Native Usage

```tsx
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import NativeVideo from './NativeVideo';

export default function App() {

  const [ready, setReady] = useState(false);

  return (
    <View
      style={{
        width: 400,
        height: 300,
      }}
    >
      <NativeVideo
        style={{
          width: '100%',
          height: '100%',
        }}
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        }}
        rotation={90}
        loop={true}
        paused={false}
        onReady={() => {
          setReady(true);
        }}
      />

      <Text>
        {ready ? 'Video Ready' : 'Loading Video'}
      </Text>
    </View>
  );
}
```

---

# Rotation Values

| Value | Rotation          |
| ----- | ----------------- |
| 0     | Normal            |
| 90    | Clockwise         |
| 180   | Upside Down       |
| 270   | Counter Clockwise |

---

# Video Ready Event Flow

```txt
MediaPlayer Prepared
        ↓
emitReadyEvent()
        ↓
React Native onReady
        ↓
Update React State
```

---

# Why XML Layouts?

Benefits:

* Easier UI customization
* Native Android structure
* Cleaner architecture
* Easier overlays
* Easier controls
* Easier future expansion

Possible future additions:

* Play button
* Seek bar
* Loading overlays
* Fullscreen button
* Gesture support
* Watermarks
* Subtitles

---

# Why TextureView Instead of VideoView?

TextureView supports:

* Rotation
* Scaling
* Matrix transforms
* Advanced rendering

VideoView has limitations:

* Poor rotation support
* Limited customization
* Limited transforms

---

# Recommended Future Improvements

## Suggested Features

* Custom playback controls
* Fullscreen support
* SeekBar support
* Mute support
* Volume control
* Playback speed
* Subtitle support
* Error events
* Buffering events
* onEnd event
* onProgress event

---

# Troubleshooting

## Video Not Rotating

Ensure:

* TextureView is used
* Rotation values are correct
* Matrix transforms are applied

---

## XML Compilation Error

Ensure:

* No comments before XML declaration
* File starts with:

```xml
<?xml version="1.0" encoding="utf-8"?>
```

---

## React Native View Not Showing

Ensure:

* style width/height are provided
* package registered in MainApplication.kt
* native module rebuilt

---

## Clean Build

```bash
cd android
./gradlew clean
```

Then:

```bash
npx react-native run-android
```

---

# Summary

This native module provides:

* Native Android video rendering
* React Native integration
* Rotation support
* XML layout architecture
* TextureView rendering
* MediaPlayer playback
* Event communication between native and JS

It is suitable for:

* Enterprise Android apps
* Kiosk applications
* Device management apps
* Custom media experiences
* React Native Android-focused projects
