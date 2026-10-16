# Conversation Log - Razorpay WebView Integration

### USER: 72967729

**ASSISTANT:** I can see you've sent some numbers, but I'm not sure what
you'd like to know. Could you clarify your question about Razorpay's
products or services?

---

### USER: RZP_REQUEST_CODE

**ASSISTANT:** I don't have context on what "RZP_REQUEST_CODE" refers to.
Could you clarify what you're trying to do—like finding an order ID,
request ID, or something else in Razorpay's APIs?

---

### USER:
```java
public void open(ReadableMap options) {
    Activity currentActivity = getCurrentActivity();
    try {
      JSONObject optionsJSON = Utils.readableMapToJson(options);
      Intent intent = new Intent(currentActivity, CheckoutActivity.class);
      intent.putExtra("OPTIONS", optionsJSON.toString());
      intent.putExtra("FRAMEWORK", "react_native");
      currentActivity.startActivityForResult(intent, Checkout.RZP_REQUEST_CODE);
    } catch (Exception e) {}
  }
```

**ASSISTANT:** This looks like native Android code for integrating
Razorpay Checkout in a React Native app (handling the `open()` method
and activity result). Could you clarify what you'd like help
with—such as implementing `onActivityResult`, handling payment
success/failure callbacks, or troubleshooting this specific
integration?

---

### USER: on execution of this code it opens up a modal where can see
razorpay options for payment. But I doubt is in this modal razorpay
accuallty opens up a url in web view instead of Android Views and
components??

**ASSISTANT:** Yes — the Razorpay Android SDK's `CheckoutActivity`
renders the checkout form inside a WebView, not native Android UI
components. The payment page itself is essentially the same
web-based checkout, loaded within that WebView inside the native
modal/activity. This is documented in the context of
[Webview for Mobile Apps](/payments/payment-gateway/web-integration/standard/webview),
where reusing Standard Checkout web code also opens the form in a
WebView inside an app.

**Suggestions given:**
- [Android Integration - Standard Checkout](/payments/payment-gateway/android-integration/standard)
- [Webview for Mobile Apps](/payments/payment-gateway/web-integration/standard/webview)
- [Android Troubleshooting & FAQs](/payments/payment-gateway/android-integration/standard/troubleshooting-faqs)

---

### USER: How can you be so sure, double check it and provide me some
evidence links

**ASSISTANT:** Confirmed. The
[Android Standard Integration — Payment Methods](/payments/payment-gateway/android-integration/standard/payment-methods)
page states: "Our SDK sets an instance of `RazorpayWebViewClient` and
`RazorpayWebChromeClient` to the Webview passed..." — explicitly
referring to a WebView inside the SDK.

Additionally, the
[Android Troubleshooting & FAQs](/payments/payment-gateway/android-integration/standard/troubleshooting-faqs)
page confirms that even without the native SDK, reusing standard web
integration "opens the checkout form in a WebView within your mobile
app" — reinforcing that `CheckoutActivity` renders checkout via
WebView, not native Android views.

**Suggestions given:**
- [Android Integration - Payment Methods](/payments/payment-gateway/android-integration/standard/payment-methods)
- [Android Troubleshooting & FAQs](/payments/payment-gateway/android-integration/standard/troubleshooting-faqs)

---

### USER: is it same for react native razorpay sdk

**ASSISTANT:** The docs confirm: "The React Native Standard SDK acts
as a wrapper around the Razorpay Standard SDK" (the native
Android/iOS SDK) — see
[React Native Standard Plugin Prerequisites](/payments/payment-gateway/react-native-integration/standard).
Since the code you shared calls `CheckoutActivity` (the native
Android SDK class) directly, it uses the same WebView-based checkout
mechanism under the hood. So yes, it's the same mechanism for React
Native.

---

### USER: In vulnerability testing of our application we are getting
that for JS enabled in Webview as a vulnerability of which proposed
solution was given to disable JS in webviews used in the app. But
here is the thing that we are using razorpay as payment gateway in
our app, and it's some library is shown as source of this
vulnerability. How to ressolve this query

**ASSISTANT:** The documentation doesn't address disabling JavaScript
in WebViews or vulnerability-scanner findings specifically for the
Android/React Native SDK. Since Razorpay's checkout relies on a
WebView to render the payment form, JavaScript must remain enabled
for it to function — disabling it would break checkout. I couldn't
find documentation specifically addressing this vulnerability-scanner
finding or disabling JS in Razorpay's WebView. However, since
Razorpay Checkout fundamentally requires JavaScript execution to
render and process payments inside the WebView, disabling JS would
break the payment flow — so this is likely a flag you'd need to
document as an accepted risk/exception with your security team rather
than something to "fix" via the SDK.

For specific guidance, I'd suggest reaching out to Razorpay's
[Support team](https://razorpay.com/support/) with your scan report,
or checking the
[Android Troubleshooting & FAQs](/payments/payment-gateway/android-integration/standard/troubleshooting-faqs)
page for related integration issues.

---