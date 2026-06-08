# Common Libraries and features in react native

1. react-native-reanimated - Library for handling animation in a separate UI thread
	deps - react-native-worklets
2. react-native-worklets - Library for using multiple threads in react native.
3. react-native-gesture-handler - Library for handling gesture input in the applicaiton
	deps - react-native-screens
4. @react-navigation/naitve - Core navigation library
	deps - react-native-reanimated
		   react-native-gesture-handler
5. @react-navigation/naitve-stack - for creating routes in an application.
	deps - react-native-reanimated
		   react-native-gesture-handler
6. axios - for api calling
7. @tanstack/react-query - for creating hooks of the functions with Promise<any> in return.
8. redux | atom - for global state management
9. @react-native-async-storage/async-storage - for saving data locally
					or
   react-native-mmkv - for instantly saving data locally
   		deps - react-native-nitro-module
10. @react-native-firebase/app - initialising firebase app
11. @react-native-firebase/auth - for using firenase authentication methods
12. @react-native-firebase/messaging - for using firebase cloud messaging
13. @react-native-firebase/crashlytics - for using firebase analytics tools for app crashed
14. @react-native-firebase/firestore - for using firebase database
15. @notifee/react-native - for showing notification.
16. formik & yup - for handling forms and validations
17. react-native-fs - for file handling
18. react-native-webview - for showing html content.
19. react-native-dotenv - for enabling .env file in the project
20. react-native-keychain - for biometric authentication.