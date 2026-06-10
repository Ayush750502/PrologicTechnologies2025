# Standardisation :

## Git:

### Branches :

1. `{'feat' | 'fix' | 'style' | 'refactor' | 'test' | 'docs' | 'chore'}/{developer name}/{update_specific_name}`

2. 
---

### Project Structure:

```console
src // developement code
├── components // common components used in the code
│   ├── Header
│   │   ├── Header.tsx
│   │   └── useHeaderStyle.ts
│   ├── HelpSection
│   │   ├── HelpSection.tsx
│   │   └── useHelpSectionStyle.ts
│   ├── LanguageSwitcher
│   │   ├── LanguageSwitcher.tsx
│   │   └── useLanguageSwitcherStyle.ts
│   ├── LoadingModal
│   │   ├── LoadingModal.tsx
│   │   └── useLoadingModalStyle.ts
│   ├── Snackbar
│   │   ├── SnackbarContext.tsx
│   │   ├── SnackbarHelper.tsx
│   │   ├── SnackbarItem.tsx
│   │   ├── useSnackbarHelper.ts
│   │   └── useSnackbarItemStyle.ts
│   └── ThemeButton
│       ├── ThemeButton.tsx
│       └── useThemedButtonStyle.ts
├── config // code or data for project configuration
│   ├── currency.ts
│   └── env.ts
├── features // features using in the application
│   ├── __feature_name__
│   │   ├── api // api functions used for this feature.
│   │   │   └── authService.ts
│   │   ├── components // components used for this feature
│   │   │   ├── AuthLayout
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── useAuthLayoutStyle.ts
│   │   │   ├── CountryModal
│   │   │   │   ├── CountryModal.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── useCountryModalStyle.ts
│   │   │   ├── index.ts
│   │   │   ├── Keypad
│   │   │   │   ├── Keypad.tsx
│   │   │   │   └── useKeypadStyle.ts
│   │   │   └── PhoneInput
│   │   │       ├── index.ts
│   │   │       ├── PhoneInput.tsx
│   │   │       └── usePhoneInputStyle.ts
│   │   ├── hooks // hooks used in this component
│   │   │   ├── useLogin.ts
│   │   │   ├── useLogout.ts
│   │   │   └── useOtp.ts
│   │   ├── routes // views or screen used in this app
│   │   │   ├── LoginScreen
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── useLoginScreenStyle.ts
│   │   │   ├── OtpScreen
│   │   │   │   ├── OtpScreen.tsx
│   │   │   │   └── useOtpScreenStyle.ts
│   │   │   ├── SplashScreen
│   │   │   │   ├── SplashScreen.tsx
│   │   │   │   └── useSplashScreenStyle.ts
│   │   │   └── WelcomeScreen
│   │   │       ├── useWelcomeScreenStyle.ts
│   │   │       └── WelcomeScreen.tsx
│   │   └── stores // global state file used in this project  
│   │   │   └── authSlice.ts
│   │   └── types // types or interfaces used for data handling and defination.
│   ├── cart
│   │   ├── api
│   │   │   └── cartService.ts
│   │   ├── components
│   │   │   ├── CartBottomBar
│   │   │   │   ├── CartBottomBar.tsx
│   │   │   │   └── useCartBottomBarStyle.ts
│   │   │   ├── CartItemCard
│   │   │   │   ├── CartItemCard.tsx
│   │   │   │   └── useCartItemCardStyle.ts
│   │   │   ├── ItemAddedModal
│   │   │   │   ├── ItemAddedModal.tsx
│   │   │   │   └── useItemAddedModalStyle.ts
│   │   │   ├── ItemAddedScanModal
│   │   │   │   ├── ItemAddedScanModal.tsx
│   │   │   │   └── useItemAddedScanModalStyle.ts
│   │   │   ├── ItemRemoveListScanModal
│   │   │   │   ├── ItemRemoveListScanModal.tsx
│   │   │   │   └── useItemRemoveListScanModalStyle.ts
│   │   │   ├── ItemRemoveModal
│   │   │   │   ├── ItemRemoveModal.tsx
│   │   │   │   └── useItemRemoveModalStyle.ts
│   │   │   ├── ItemScannedModal
│   │   │   │   ├── ItemScannedModal.tsx
│   │   │   │   └── useItemScannedModalStyle.ts
│   │   │   ├── ManualVerificationModal
│   │   │   │   ├── ManualVerificationModal.tsx
│   │   │   │   └── useManualVerificationModalStyle.ts
│   │   │   ├── OcclusionModal
│   │   │   │   ├── OcclusionModal.tsx
│   │   │   │   └── useOcclusionModalStyle.ts
│   │   │   ├── PersonalItemModal
│   │   │   │   ├── PersonalItemModal.tsx
│   │   │   │   └── usePersonalItemModalStyle.ts
│   │   │   ├── PromoList
│   │   │   │   ├── PromoList.tsx
│   │   │   │   └── usePromoListStyle.ts
│   │   │   ├── QuantityAdjustmentModal
│   │   │   │   ├── QuantityAdjustmentModal.tsx
│   │   │   │   └── useQuantityAdjustmentModalStyle.ts
│   │   │   └── QuantityPluseMinus
│   │   │       ├── QuantityPluseMinus.tsx
│   │   │       └── useQuantityPlusMinusStyle.ts
│   │   ├── hooks
│   │   │   ├── useCartFetch.ts
│   │   │   ├── useCartSDK.ts
│   │   │   ├── useCartSocket.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useChain.ts
│   │   │   └── usePromo.ts
│   │   ├── routes
│   │   │   ├── useVirtualCartScreenStyle.ts
│   │   │   └── VirtualCartScreen.tsx
│   │   ├── stores
│   │   │   └── cartSlice.ts
│   │   └── types
│   │       └── cartTypes.ts
│   ├── checkout
│   │   ├── components
│   │   │   └── OrderSummaryPanel.tsx
│   │   ├── routes
│   │   │   ├── CheckOutScreen.tsx
│   │   │   ├── PaymentDetailsScreen.tsx
│   │   │   └── PaymentSuccessScreen.tsx
│   │   └── stores
│   │       └── paymentSlice.ts
│   ├── device
│   │   ├── api
│   │   │   └── deviceService.ts
│   │   ├── commandHandler
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── useDeviceBootstrap.ts
│   │   │   ├── useDeviceHealth.ts
│   │   │   └── useSDKAlerts.ts
│   │   ├── routes
│   │   │   └── DeviceStatusPage.tsx
│   │   └── stores
│   │       └── deviceSlice.ts
│   ├── misc
│   │   ├── routes
│   │   │   └── GlobalHelpSection
│   │   │       ├── GlobalHelpScreen.tsx
│   │   │       └── useGlobalHelpSectionStyle.ts
│   │   └── stores
│   │       └── appSlice.ts
│   ├── sdk
│   │   └── stores
│   │       └── sdkSlice.ts
│   └── staff
│       ├── api
│       │   └── staffService.ts
│       ├── components
│       │   ├── ConfirmationModal.tsx
│       │   ├── EventsListModal.tsx
│       │   ├── HilListModal.tsx
│       │   ├── useConfirmationModalStyle.ts
│       │   ├── useEventsListModalStyle.ts
│       │   └── useHilListModalStyle.ts
│       ├── hook
│       │   └── useStaff.ts
│       ├── routes
│       │   ├── StaffDashBoard.tsx
│       │   └── useStaffDashboardStyle.ts
│       └── store
│           └── staffSlice.ts
├── i18n // internationalisation used in the project.
│   ├── index.ts
│   └── locales
│       ├── ar.json
│       └── en.json
├── lib // external services or functions used in this project.
│   ├── apiErrorHandler.ts
│   ├── axios.ts
│   ├── hanshow
│   │   ├── requestFunctions.ts
│   │   ├── SDKBridge.ts
│   │   └── SDKEventTracker.ts
│   ├── navigation
│   │   └── NavigationService.ts
│   ├── s3
│   │   └── uploadVideo.ts
│   └── socket
│       ├── socketManager.ts
│       └── SocketProvider.tsx
├── providers // provider components for dynamic instances.
│   └── AppProvider.tsx
├── routes // managing navigation throughtout the views or screens
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── RootNavigator.tsx
│   ├── routes.ts
│   └── StaffNavigator.tsx
├── services
│   └── api
│       └── api.ts
├── stores
│   ├── hooks.ts
│   └── store.ts
├── theme // setting style and theme data of the application.
│   ├── animations.ts // animation styles
│   ├── colors.ts // colors used throught out the application
│   ├── components.ts // styling for screens or components used thorughtout the application
│   ├── index.ts // for handling export of the styles.
│   ├── layout.ts // styling for layouts used in the application
│   ├── shadows.ts // styling for handling shadows
│   ├── spacing.ts // styling for maintaining spacing 
│   └── typography.ts // stylin
├── types // common type used througth the application
│   ├── apiTypes.ts
│   └── staffTypes.ts
└── utils // helper functions or data used in the application
    ├── colorShades.ts
    ├── constants
    │   ├── currency.ts
    │   └── index.ts
    ├── countryData.ts
    ├── data
    │   ├── cartData.ts
    │   ├── helpContent.ts
    │   ├── staffData.ts
    │   └── VirtualCart.ts
    ├── deviceinfo
    │   ├── deviceInfo.native.ts
    │   └── deviceInfo.types.ts
    ├── helpers
    │   └── eventIcons.tsx
    ├── helpers.ts
    └── language.ts
```