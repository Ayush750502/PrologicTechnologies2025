```json
{
	"scripts": {
	    "android": "react-native run-android",
	    "build-android": "react-native build-android",
	    "android --active-arch-only": "react-native run-android --active-arch-only",
	    "gradlew-clean": "cd android && ./gradlew clean && cd ..",
	    "release-apk": "cd android && ./gradlew assembleRelease && cd ..",
	    "release-bundle": "cd android && ./gradlew bundleRelease && cd ..",
	    "adb-devices": "cd android && adb devices && cd ..",
	    "log-android": "react-native log-android",
	    "ios": "react-native run-ios",
	    "lint": "eslint .",
	    "start": "react-native start",
	    "test": "jest",
	    "postinstall": "patch-package",
	    "refresh": "rm -rf node_modules; rm -rf package-lock.json; npm i -f; cd ios; rm -rf Pods; rm -rf Podfile.lock; pod install; cd ..",
	    "install-release-apk": "adb install android/app/build/outputs/apk/release/app-release.apk"
	  },
}
```