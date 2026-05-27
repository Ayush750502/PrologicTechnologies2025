# iOS React Native Application Setup Documentation

## Project Overview

This documentation contains the complete setup and configuration steps performed to make the iOS React Native application fully functional with:

* Firebase Cloud Messaging (FCM)
* APNs Push Notifications
* Stripe PaymentSheet
* Apple Pay
* PDF Download & Open Support
* Native iOS Capabilities
* Apple Developer Portal Configuration
* Firebase Integration
* React Native Native Module Configuration

---

# 1. Apple Developer Portal Configuration

Website:

[https://developer.apple.com/account/](https://developer.apple.com/account/)

---

## 1.1 Create Unique Bundle Identifier (App ID)

Created a unique iOS bundle identifier:

```text
com.skipqueuemobile.app
```

### Reason

The previous bundle identifier:

```text
com.skipqueue.app
```

was already registered globally under another Apple Developer account.

### Issues Fixed

* Provisioning profile creation failure
* APNs entitlement failure
* Push notification capability failure
* iOS signing issues

---

## 1.2 Enable Push Notifications

Inside Apple Developer Portal:

```text
Certificates, IDs & Profiles
→ Identifiers
→ App ID
```

Enabled:

```text
Push Notifications
```

### Why Required

Required for:

* APNs registration
* Firebase Cloud Messaging
* iOS remote notifications
* `aps-environment` entitlement generation

---

## 1.3 Create APNs Authentication Key (.p8)

Inside:

```text
Certificates, IDs & Profiles
→ Keys
→ +
```

Enabled:

```text
Apple Push Notifications service (APNs)
```

Downloaded:

```text
AuthKey_XXXXX.p8
```

### Saved Values

* `.p8` file
* Key ID
* Team ID

### Why Required

Used for:

* Firebase Push Notifications
* APNs ↔ FCM token bridging
* iOS push notification delivery

---

## 1.4 Create Merchant ID for Apple Pay

Inside:

```text
Certificates, IDs & Profiles
→ Identifiers
→ Merchant IDs
```

Created Merchant ID:

```text
merchant.com.skipqueuemobile.app
```

### Why Required

Used for:

* Apple Pay
* Stripe PaymentSheet
* iOS payment authorization

---

# 2. Firebase Console Configuration

Website:

[https://console.firebase.google.com](https://console.firebase.google.com)

---

## 2.1 Add iOS App to Firebase

Registered iOS application using:

```text
com.skipqueuemobile.app
```

Downloaded Firebase configuration file:

```text
GoogleService-Info.plist
```

Placed inside:

```text
ios/SkipQueue/
```

### Why Required

Required for:

* Firebase initialization
* Firebase Messaging
* Firebase Crashlytics
* Firebase Analytics

---

## 2.2 Upload APNs Key to Firebase

Inside Firebase Console:

```text
Project Settings
→ Cloud Messaging
```

Uploaded:

* APNs `.p8` file
* Key ID
* Team ID

### Why Required

Allows Firebase to:

* receive APNs tokens
* generate FCM tokens
* send push notifications to iOS devices

### Issue Fixed

Resolved:

```text
No APNS token specified before fetching FCM Token
```

---

# 3. Xcode Configuration

Opened project using:

```bash
ios/SkipQueue.xcworkspace
```

---

## 3.1 Enable Automatic Signing

Inside:

```text
TARGETS
→ SkipQueue
→ Signing & Capabilities
```

Enabled:

```text
Automatically manage signing
```

### Why Required

Allows Xcode to:

* generate provisioning profiles
* manage certificates
* handle entitlements automatically

---

## 3.2 Add Push Notifications Capability

Added capability:

```text
Push Notifications
```

### Why Required

Adds:

```text
aps-environment
```

entitlement to application.

### Issues Fixed

Resolved:

```text
No valid aps-environment entitlement string found
```

---

## 3.3 Enable Background Modes

Added capability:

```text
Background Modes
```

Enabled:

```text
Remote notifications
```

### Why Required

Required for:

* background FCM notifications
* silent notifications
* notification delivery while app is minimized

---

## 3.4 Add Apple Pay Capability

Added capability:

```text
Apple Pay
```

Selected Merchant ID:

```text
merchant.com.skipqueuemobile.app
```

### Why Required

Required for:

* Stripe Apple Pay
* iOS PaymentSheet Apple Pay integration

---

# 4. Native iOS AppDelegate Configuration

Updated:

```text
ios/SkipQueue/AppDelegate.swift
```

---

## 4.1 Added Firebase Initialization

Added imports:

```swift
import Firebase
import UserNotifications
```

Added:

```swift
FirebaseApp.configure()
```

### Why Required

Initializes:

* Firebase App
* Firebase Messaging
* Crashlytics
* Analytics

---

## 4.2 Register For Remote Notifications

Added:

```swift
application.registerForRemoteNotifications()
```

### Why Required

Starts APNs device registration process.

---

## 4.3 APNs Token Registration

Added:

```swift
Messaging.messaging().apnsToken = deviceToken
```

inside:

```swift
didRegisterForRemoteNotificationsWithDeviceToken
```

### Why Required

Bridges:

```text
APNs Token → Firebase Messaging
```

### Issues Fixed

Resolved:

```text
No APNS token specified before fetching FCM Token
```

---

## 4.4 APNs Failure Callback

Added:

```swift
didFailToRegisterForRemoteNotificationsWithError
```

### Why Required

Used for debugging APNs registration failures.

---

# 5. React Native Firebase Messaging Setup

Installed packages:

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/messaging
```

---

## 5.1 Android Notification Permission

Requested runtime permission:

```ts
POST_NOTIFICATIONS
```

for Android 13+

### Why Required

Android 13+ requires runtime notification permission.

---

## 5.2 iOS Notification Permission

Implemented:

```ts
messaging().requestPermission()
```

### Why Required

Required before:

* APNs registration
* FCM token generation
* notification delivery

---

## 5.3 Device Registration

Implemented:

```ts
await messaging().registerDeviceForRemoteMessages()
```

### Why Required

Registers iOS device with APNs.

---

## 5.4 APNs Token Wait Logic

Implemented APNs token retry mechanism:

```ts
await messaging().getAPNSToken()
```

### Why Required

APNs token generation is asynchronous on iOS.

Prevents race condition where:

```ts
getToken()
```

runs before APNs token exists.

### Issues Fixed

Resolved:

```text
No APNS token specified before fetching FCM Token
```

---

## 5.5 FCM Token Generation

Implemented:

```ts
await messaging().getToken()
```

### Why Required

Generates Firebase Cloud Messaging token used for push notifications.

---

## 5.6 Foreground Notification Handling

Implemented:

```ts
messaging().onMessage()
```

### Features

* foreground notifications
* cart refresh handling
* payment success navigation
* local notification display

---

## 5.7 Background Notification Handling

Implemented:

```ts
onNotificationOpenedApp()
getInitialNotification()
```

### Why Required

Used for:

* app open from notification
* notification navigation handling
* background notification interaction

---

# 6. Notifee Notification Setup

Installed:

```bash
npm install @notifee/react-native
```

Website:

[https://notifee.app](https://notifee.app)

---

## 6.1 Create Android Notification Channel

Implemented:

```ts
notifee.createChannel()
```

### Why Required

Required for Android notification display.

---

## 6.2 Local Notification Display

Implemented:

```ts
notifee.displayNotification()
```

### Features

* foreground notification display
* local notifications
* notification click handling

---

# 7. Stripe PaymentSheet & Apple Pay Setup

Installed:

```bash
npm install @stripe/stripe-react-native
```

Website:

[https://github.com/stripe/stripe-react-native](https://github.com/stripe/stripe-react-native)

---

## 7.1 StripeProvider Configuration

Configured:

```tsx
<StripeProvider
  publishableKey={STRIPE_PUBLISHABLE_KEY}
  merchantIdentifier="merchant.com.skipqueuemobile.app"
  urlScheme="skipqueue"
/>
```

### Why Required

Required for:

* Stripe PaymentSheet
* Apple Pay
* payment authentication
* redirect payment methods

---

## 7.2 PaymentSheet returnURL

Added:

```ts
returnURL: 'skipqueue://stripe-redirect'
```

inside:

```ts
initPaymentSheet()
```

### Why Required

Required for:

* 3DS authentication
* redirect payment methods
* bank authentication
* payment return handling

---

## 7.3 Info.plist URL Scheme (Not Done Yet)

Added URL scheme inside:

```text
ios/SkipQueue/Info.plist
```

Configured:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>skipqueue</string>
    </array>
  </dict>
</array>
```

### Why Required

Used for:

* Stripe redirects
* deep linking
* PaymentSheet return flow

---

# 8. PDF Download & File Opening Setup

Installed:

```bash
npm install react-native-fs
npm install react-native-file-viewer
```

---

## 8.1 Cross Platform File Storage

Used:

```ts
RNFS.DocumentDirectoryPath
```

instead of:

```ts
DownloadDirectoryPath
```

### Why Required

Provides:

* Android + iOS compatibility
* sandbox-safe storage
* no extra permissions
* avoids Android scoped storage issues

---

## 8.2 File Viewer Integration

Implemented:

```ts
FileViewer.open()
```

### Features

* open PDFs
* view invoices
* preview downloaded files

---

## 8.3 iOS File URI Fix

Added:

```text
file://
```

prefix for iOS file paths.

### Issues Fixed

Resolved:

```text
The file “System” doesn’t exist
```

---

# 9. Permissions Handled

## iOS Permissions

Configured:

* push notifications
* Apple Pay
* APNs

### No Permission Required

For:

* PDF downloads inside app sandbox

---

## Android Permissions

Configured:

* POST_NOTIFICATIONS
* optional storage permissions

---

# 10. Final Working Features

The iOS React Native application now fully supports:

* ✅ Firebase Cloud Messaging (FCM)
* ✅ APNs Push Notifications
* ✅ Foreground Notifications
* ✅ Background Notifications
* ✅ Notification Click Handling
* ✅ Stripe PaymentSheet
* ✅ Apple Pay
* ✅ Redirect Payment Methods
* ✅ 3DS Authentication
* ✅ PDF Download
* ✅ PDF Open & Preview
* ✅ Cross Platform File Storage
* ✅ Native iOS Configuration
* ✅ Automatic Signing & Provisioning
* ✅ Firebase Integration
* ✅ React Native Native Module Integration
* ✅ Android & iOS Compatibility
