# Issuess

1. **SkipQ/MobileApp/auth [2026-06-22] -** After user clicks on resend password, screens refreshed but not the state / identifier which is used to send data to the verify-otp api.

2. **SkipQ/HanshowDevice/health [2026-06-22] -** No proper validation is their for device battery.

3. **SkipQ/HanshowDevice/cart [2026-04-10] -** On item added without scan --> Asking user for what have you added --> user selected I have added a product --> for product not found it is openning modal for item scanned with previously scanned item not the current one(as product is not found).

4. **SkipQ/HanshowDevice/device [2026-06-24] -** Their is no procedure set for network errors.

5. **SkipQ/HanshowDevice/cart [2026-06-24] -** No loader activity their for some api's activities(like QuanityAdjustModal, StaffLogin, BarcodeScan etc.).

6. **SkipQ/Both/auth [2026-06-25] -** Mobile auth is not taking country code and phone number separatly i.e {{country code + phone number}} whille it should take them separatly.
	Eg. : phone number - 123456785
		  country code - 971
		  final phone number - 971123456785

  	while it should go like: 
  	{
  		"phoneNumber": "123456785",
  		"countryCode": "971"
  	}

7. **SkipQ/MobileApp/profile [2026-06-25] -** Same as that in Issue 6. but for profile configration of the user.

8. **SkipQ/Both/Merchant&Device [2026-06-25] -** Currency is not properly handled for both the merchant and the device.

9. **SkipQ/Both/ScanLogin [2026-07-10] -** QR code is same for that cart and the store, which can lead to mischievous activity,
	`like - person can save the qr code's photo, and scan it with the relevant app keeping it occupied leaving that cart unavailable for the customer in the store.`