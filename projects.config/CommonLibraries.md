# React Native Common Libraries & Features

| Library | Description | Dependencies |
|----------|-------------|--------------|
| react-native-reanimated | High-performance animation library that runs animations on the UI thread. | react-native-worklets |
| react-native-worklets | Enables multi-threading and background execution in React Native. | - |
| react-native-gesture-handler | Native-driven gesture handling for smooth touch interactions. | react-native-screens |
| @react-navigation/native | Core navigation library for React Native applications. | react-native-reanimated<br>react-native-gesture-handler |
| @react-navigation/native-stack | Native stack navigator for creating application routes and screens. | react-native-reanimated<br>react-native-gesture-handler |
| axios | Promise-based HTTP client for API requests. | - |
| @tanstack/react-query | Server-state management, caching, synchronization, and data fetching. | - |
| Redux Toolkit / Jotai / Zustand | Global state management solutions. | - |
| @react-native-async-storage/async-storage | Persistent key-value storage for local data. | - |
| react-native-mmkv | High-performance local storage with synchronous operations. | react-native-nitro-modules |
| @react-native-firebase/app | Initializes Firebase in the React Native application. | Firebase Project |
| @react-native-firebase/auth | Firebase Authentication services. | @react-native-firebase/app |
| @react-native-firebase/messaging | Firebase Cloud Messaging (FCM) integration. | @react-native-firebase/app |
| @react-native-firebase/crashlytics | Crash reporting and application stability monitoring. | @react-native-firebase/app |
| @react-native-firebase/firestore | Cloud Firestore NoSQL database integration. | @react-native-firebase/app |
| @notifee/react-native | Advanced local and remote notification management. | - |
| formik | Form state management library. | - |
| yup | Schema-based validation library. | - |
| react-native-fs | File system access for reading, writing, uploading, and downloading files. | - |
| react-native-webview | Renders web pages and HTML content inside the application. | - |
| react-native-dotenv | Enables usage of `.env` files for environment variables. | - |
| react-native-keychain | Secure credential storage and biometric authentication support. | Native iOS/Android biometric APIs |

## Recommended Core Stack

| Category | Libraries |
|-----------|------------|
| Navigation | @react-navigation/native, @react-navigation/native-stack, react-native-gesture-handler, react-native-reanimated |
| Networking | axios, @tanstack/react-query |
| State Management | Redux Toolkit / Jotai / Zustand |
| Storage | react-native-mmkv, react-native-keychain |
| Firebase | @react-native-firebase/app, auth, messaging, crashlytics, firestore |
| Forms | formik, yup |
| Notifications | @notifee/react-native |
| Utilities | react-native-fs, react-native-webview, react-native-dotenv |