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


