# To-DO

1. **both/cart&payment/checkout -** adding condition for disabling button to all the screens.

	- moving socket event to a global state and handling those states in the individual screens.
	- Screens to update: 
		- (Hanshow device)
			- Checkout Screen
			- Payment Screen
		- (Mobile App):
			- Payment Screen
			


2. **both/app/api -** on getting error code 401 use refresh token api, and update the token of the application.

	Implementing a global hook for updating / refreshing the token whenever we are getting 401 ERROR.



3. **MobileApp/cart/socket -** handling reject / approve events in mobile app using web socket.
	
	Updating global hook for cart for listening to web socket for approve / reject event.



4. **HanshowDevice/login/scan -** Currently Handle by web socket, must be handled by notification from now on.
	
	Updating scan QR login event from web-socket to push notification.



5. **HanshowDevice/app/update_over_the_air -** Get to know how OTA will work for react native application.

	CodePush - https://appsairpush.com/apps
	npm install appsairpush-react-native react-native-fs react-native-restart-newarch

6. 

curl --request POST \
--url http://192.168.1.27:9000/auth/refresh \
--header 'content-type: application/json' \
--data '{
"refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOWU5MTg3LTQ5NjUtN2E4ZS04MGJkLTIzY2UzYThiNGIzZiIsImRldmljZUlkIjoiMDhmZjliMTAtZmZjYi00M2FhLWIzNjgtNGY4N2RlOWE0NTFkIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3ODM0MjQyMDMsImV4cCI6MTc4NDAyOTAwM30.A9bSTkEFTR29Bc8OB57L9kAnkMtSgYtTPNCNFKiUg_rapfBGiSMBHflq5je09LsRFFNsK6NuWKAVk_0J6oI_PqIWPYcACP-XaE-fozG5BdiY638AOGJOXJOPDgBgvzhV4K21uz8cEmtpFMSTZIHdy-sD-7jMsfYAZLzJ7KM7Qlk00sgbr87RjCmv8qiOgPTiVuzBIU-cgTgLsBVzBm-tINEu-Ll0ihalyrcao0eZbBweY5fXKkMlkLwK5YSYB5NZV1CMs3Tf43d4cOYVUuleo4pYrawUDHER1dcsDo_JnKjZw8DXMJezO9nzQvFIj91dfmjJwnZfmOCDZxR1UKcgWQ"
}'