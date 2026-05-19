# React Native Native Camera Framework (Android)

This implementation provides:

* Native Camera Discovery Module
* Camera Connection Monitoring
* Native Camera Preview Component
* React Native Wrapper
* CameraX-based rendering
* External/Internal camera detection

---

# Project Structure

```text
android/app/src/main/java/com/yourapp/camera/
├── CameraModule.kt
├── CameraPackage.kt
├── CameraViewManager.kt
├── NativeCameraView.kt
└── CameraRepository.kt
```

---

# 1. Gradle Dependencies

## android/app/build.gradle

```gradle
android {
    buildFeatures {
        viewBinding true
    }
}

dependencies {

    def camerax_version = "1.3.4"

    implementation "androidx.camera:camera-core:$camerax_version"
    implementation "androidx.camera:camera-camera2:$camerax_version"
    implementation "androidx.camera:camera-lifecycle:$camerax_version"
    implementation "androidx.camera:camera-view:$camerax_version"

    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.7.0"
}
```

---

# 2. Android Permissions

## android/app/src/main/AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

---

# 3. CameraRepository.kt

## android/app/src/main/java/com/yourapp/camera/CameraRepository.kt

```kotlin
package com.yourapp.camera

import android.content.Context
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager

class CameraRepository(context: Context) {

    private val cameraManager =
        context.getSystemService(Context.CAMERA_SERVICE)
                as CameraManager

    fun getCameraIds(): Array<String> {
        return cameraManager.cameraIdList
    }

    fun getCameraManager(): CameraManager {
        return cameraManager
    }

    fun getLensType(cameraId: String): String {

        val characteristics =
            cameraManager.getCameraCharacteristics(cameraId)

        val lensFacing =
            characteristics.get(
                CameraCharacteristics.LENS_FACING
            )

        return when (lensFacing) {
            CameraCharacteristics.LENS_FACING_FRONT -> "front"
            CameraCharacteristics.LENS_FACING_BACK -> "back"
            CameraCharacteristics.LENS_FACING_EXTERNAL -> "external"
            else -> "unknown"
        }
    }
}
```

---

# 4. CameraModule.kt

## android/app/src/main/java/com/yourapp/camera/CameraModule.kt

```kotlin
package com.yourapp.camera

import android.hardware.camera2.CameraManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class CameraModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val repository =
        CameraRepository(reactContext)

    private val cameraManager: CameraManager =
        repository.getCameraManager()

    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun getConnectedCameras(promise: Promise) {

        try {

            val cameras = Arguments.createArray()

            repository.getCameraIds().forEach { cameraId ->

                val camera = Arguments.createMap()

                camera.putString("id", cameraId)

                camera.putString(
                    "position",
                    repository.getLensType(cameraId)
                )

                camera.putBoolean("connected", true)

                cameras.pushMap(camera)
            }

            promise.resolve(cameras)

        } catch (e: Exception) {
            promise.reject(
                "CAMERA_DISCOVERY_ERROR",
                e.message,
                e
            )
        }
    }

    private val availabilityCallback =
        object : CameraManager.AvailabilityCallback() {

            override fun onCameraAvailable(cameraId: String) {
                sendEvent(
                    "cameraConnected",
                    cameraId
                )
            }

            override fun onCameraUnavailable(cameraId: String) {
                sendEvent(
                    "cameraDisconnected",
                    cameraId
                )
            }
        }

    @ReactMethod
    fun startMonitoring() {

        cameraManager.registerAvailabilityCallback(
            availabilityCallback,
            null
        )
    }

    @ReactMethod
    fun stopMonitoring() {

        cameraManager.unregisterAvailabilityCallback(
            availabilityCallback
        )
    }

    private fun sendEvent(
        eventName: String,
        cameraId: String
    ) {

        val payload = Arguments.createMap()

        payload.putString("cameraId", cameraId)

        reactContext
            .getJSModule(
                DeviceEventManagerModule
                    .RCTDeviceEventEmitter::class.java
            )
            .emit(eventName, payload)
    }
}
```

---

# 5. NativeCameraView.kt

## android/app/src/main/java/com/yourapp/camera/NativeCameraView.kt

```kotlin
package com.yourapp.camera

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout
import androidx.camera.core.CameraSelector
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import androidx.lifecycle.findViewTreeLifecycleOwner

class NativeCameraView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : FrameLayout(context, attrs) {

    private val previewView = PreviewView(context)

    private var currentCameraId: String? = null

    init {
        addView(
            previewView,
            LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT
            )
        )
    }

    fun setCameraId(cameraId: String) {
        currentCameraId = cameraId

        post {
            startCamera()
        }
    }

    private fun startCamera() {

        val cameraId = currentCameraId ?: return

        val lifecycleOwner =
            findViewTreeLifecycleOwner() ?: return

        val cameraProviderFuture =
            ProcessCameraProvider.getInstance(context)

        cameraProviderFuture.addListener({

            val cameraProvider =
                cameraProviderFuture.get()

            val preview =
                Preview.Builder()
                    .build()

            preview.surfaceProvider =
                previewView.surfaceProvider

            val cameraSelector =
                CameraSelector.Builder()
                    .addCameraFilter { cameraInfos ->

                        cameraInfos.filter { info ->
                            info.cameraId == cameraId
                        }
                    }
                    .build()

            cameraProvider.unbindAll()

            cameraProvider.bindToLifecycle(
                lifecycleOwner,
                cameraSelector,
                preview
            )

        }, ContextCompat.getMainExecutor(context))
    }
}
```

---

# 6. CameraViewManager.kt

## android/app/src/main/java/com/yourapp/camera/CameraViewManager.kt

```kotlin
package com.yourapp.camera

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class CameraViewManager : SimpleViewManager<NativeCameraView>() {

    override fun getName(): String {
        return "NativeCameraView"
    }

    override fun createViewInstance(
        reactContext: ThemedReactContext
    ): NativeCameraView {

        return NativeCameraView(reactContext)
    }

    @ReactProp(name = "cameraId")
    fun setCameraId(
        view: NativeCameraView,
        cameraId: String?
    ) {
        cameraId?.let {
            view.setCameraId(it)
        }
    }
}
```

---

# 7. CameraPackage.kt

## android/app/src/main/java/com/yourapp/camera/CameraPackage.kt

```kotlin
package com.yourapp.camera

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CameraPackage : ReactPackage {

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {

        return listOf(
            CameraModule(reactContext)
        )
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> {

        return listOf(
            CameraViewManager()
        )
    }
}
```

---

# 8. Register Package

## android/app/src/main/java/com/yourapp/MainApplication.kt

Add:

```kotlin
import com.yourapp.camera.CameraPackage
```

Then:

```kotlin
override fun getPackages(): List<ReactPackage> {
    return PackageList(this).packages.apply {
        add(CameraPackage())
    }
}
```

---

# 9. React Native Wrapper

## src/native/NativeCameraView.tsx

```tsx
import { requireNativeComponent } from 'react-native';

export default requireNativeComponent('NativeCameraView');
```

---

# 10. Camera Module Wrapper

## src/native/CameraModule.ts

```ts
import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const { CameraModule } = NativeModules;

export const CameraEvents =
  new NativeEventEmitter(CameraModule);

export default CameraModule;
```

---

# 11. React Native Usage

## App.tsx

```tsx
import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import CameraModule, {
  CameraEvents,
} from './src/native/CameraModule';

import NativeCameraView
  from './src/native/NativeCameraView';

export default function App() {

  const [cameras, setCameras] = useState<any[]>([]);

  useEffect(() => {

    loadCameras();

    CameraModule.startMonitoring();

    const connectedSubscription =
      CameraEvents.addListener(
        'cameraConnected',
        console.log
      );

    const disconnectedSubscription =
      CameraEvents.addListener(
        'cameraDisconnected',
        console.log
      );

    return () => {

      connectedSubscription.remove();
      disconnectedSubscription.remove();

      CameraModule.stopMonitoring();
    };

  }, []);

  async function loadCameras() {

    try {

      const result =
        await CameraModule.getConnectedCameras();

      setCameras(result);

    } catch (e) {
      console.error(e);
    }
  }

  const firstCamera = cameras[0];

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={{
          padding: 16,
        }}
      >

        <Text>
          Connected Cameras:
        </Text>

        {cameras.map(camera => (
          <Text key={camera.id}>
            {camera.id} ({camera.position})
          </Text>
        ))}

      </View>

      {firstCamera && (
        <NativeCameraView
          style={{
            flex: 1,
          }}
          cameraId={firstCamera.id}
        />
      )}

    </SafeAreaView>
  );
}
```

---

# Output Example

```json
[
  {
    "id": "0",
    "position": "back",
    "connected": true
  },
  {
    "id": "1",
    "position": "front",
    "connected": true
  }
]
```

---

# Features You Can Add Next

## Camera Controls

* flash
* zoom
* focus
* exposure
* torch
* fps
* HDR

---

# Capture Photo

Add:

```kotlin
ImageCapture
```

from CameraX.

---

# Video Recording

Add:

```kotlin
VideoCapture
```

---

# Barcode / QR Scanner

Use:

* ML Kit
* ZXing

---

# USB Camera Support

For:

* OTG webcams
* HDMI capture cards
* microscopes

You must integrate:

* Android USB Host API
* UVC support

Recommended:

* [https://github.com/saki4510t/UVCCamera](https://github.com/saki4510t/UVCCamera)

Because CameraX does NOT fully support all USB webcams.

---

# Important Production Improvements

## Add Runtime Permission Handling

Current implementation assumes camera permission already granted.

---

# Add Lifecycle Safety

Handle:

* app background
* app foreground
* activity recreation
* orientation changes

---

# Add Error Events

Emit:

```text
cameraError
cameraPermissionDenied
cameraDisconnected
cameraReconnected
```

---

# Recommended Future Architecture

```text
camera/
├── module/
├── preview/
├── repository/
├── lifecycle/
├── usb/
├── capture/
└── events/
```

This keeps the system scalable.
