# To Do:

## 1. Dead Code ✅

Deleting of unused or dead code.

## 2. Barrel Files ✅

Too many index.ts or index.tsx files with no need for them.

**Correct usage**

{{modal_name}}/
	index.ts - exporting all file
	{{modal_name}}file1.ts
	{{modal_name}}file2.ts
	{{modal_name}}file3.ts
	{{modal_name}}file4.ts

**Current usage**

{{modal_name}}/
	index.ts - holding all the functional code and exporting it directly.

---

## 3. Folder Structure

Maintaining files in a proper folder structure.

### Current folder structure

```txt
src/
├── api/
│   ├── api.ts
│   ├── MutationKeys.ts
│   ├── QueryKeys.ts
│   ├── endpoints/          ← 27 files (1 per feature)
│   │   ├── AddCardDetails.ts
│   │   ├── Checkout.ts
│   │   ├── CreateIntent.ts
│   │   ├── DecreaseQuantity.ts
│   │   ├── Delete.ts
│   │   ├── DeleteCard.ts
│   │   ├── DeleteProduct.ts
│   │   ├── EditProfile.ts
│   │   ├── FcmToken.ts
│   │   ├── GetAllProduct.ts
│   │   ├── GetCardDetails.ts
│   │   ├── GetOrderDetails.ts
│   │   ├── GetProfileData.ts
│   │   ├── GetThemeGlobal.ts
│   │   ├── IncreaseQuantity.ts
│   │   ├── LastActiveCart.ts
│   │   ├── LinkDevice.ts
│   │   ├── Login.ts
│   │   ├── Logout.ts
│   │   ├── promoCode.ts           ← lowercase, inconsistent
│   │   ├── SetCardAsPrimary.ts
│   │   ├── VerifyCode.ts
│   │   ├── VerifyEmail.ts
│   │   ├── VerifyEmailOTP.ts
│   │   ├── VerifyPhone.ts
│   │   └── VerifyPhoneOTP.ts
│   └── functions/          ← 26 files (1 per hook, all dead intermediates)
│       ├── AddCard.ts
│       ├── ApplyPromoCode.ts
│       ├── Checkout.ts
│       ├── CreateIntent.ts
│       ├── DecreaseQuantity.ts
│       ├── Delete.ts
│       ├── DeleteCard.ts
│       ├── DeleteProduct.ts
│       ├── EditProfile.ts
│       ├── FcmToken.ts
│       ├── GetAllProduct.ts
│       ├── GetCardDetails.ts
│       ├── GetOrderDetails.ts
│       ├── GetProfileData.ts
│       ├── GetThemeGlobal.ts
│       ├── IncreaseQuantity.ts
│       ├── LastActiveCart.ts
│       ├── LinkDevice.ts
│       ├── Login.ts
│       ├── Logout.ts
│       ├── SetCardAsPrimary.ts
│       ├── VerifyCode.ts
│       ├── VerifyEmail.ts
│       ├── VerifyEmailOTP.ts
│       ├── VerifyPhone.ts
│       └── VerifyPhoneOTP.ts
├── assets/
│   ├── Images/             ← 47 images (PNG/SVG)
│   ├── fonts.ts
│   └── images.ts           ← barrel import for all images
├── atoms/
│   ├── authAtom.ts         ← legacy atoms (UserData, CartId, etc.)
│   ├── brandingAtom.ts     ← new branding system (BrandingData, theme)
│   ├── colorsAtom.ts       ← theme-driven colors
│   └── loginCreds.tsx      ← legacy atoms (is_anomaly, fToken, etc.)
├── components/             ← app-level reusable
│   ├── AddCardModal.tsx
│   ├── LoaderComponent.tsx
│   ├── SuccessModal.tsx
│   ├── WarnAlert.tsx
│   ├── WrapperContainer.tsx
│   └── use*Styles.ts       ← 5 style hooks
├── config/
│   └── NavigationString.ts
├── hooks/
│   ├── useColors.ts
│   ├── mutations/          ← 20 mutation hooks
│   │   ├── AddCardDetails.ts
│   │   ├── ApplyPromo.ts
│   │   ├── Checkout.ts
│   │   ├── CreateIntent.ts
│   │   ├── DecreaseQuantity.ts    ← DEAD
│   │   ├── Delete.ts
│   │   ├── DeleteCard.ts
│   │   ├── DeleteProduct.ts
│   │   ├── EditProfile.ts
│   │   ├── FcmToken.ts            ← DEAD
│   │   ├── IncreaseQuantity.ts    ← DEAD
│   │   ├── LinkDevice.ts
│   │   ├── Login.ts
│   │   ├── Logout.ts
│   │   ├── SetCardAsPrimary.ts
│   │   ├── VerifyCode.ts
│   │   ├── VerifyEmail.ts
│   │   ├── VerifyEmailOTP.ts
│   │   ├── VerifyPhone.ts
│   │   └── VerifyPhoneOTP.ts
│   └── queries/            ← 6 query hooks
│       ├── GetAllProduct.ts
│       ├── GetCardDetails.ts
│       ├── GetLastActiveCart.ts
│       ├── GetOrderDetails.ts
│       ├── GetProfileData.ts
│       └── GetThemeGlobal.ts
├── routes/
│   ├── index.tsx
│   ├── BottomTabs.tsx
│   ├── useBottomTabsStyles.ts
│   └── useRootNavigatorStyles.ts
├── shared/                 ← disjoint from components/
│   ├── components/
│   │   └── AppButton/
│   │       ├── AppButton.tsx
│   │       └── useAppButtonStyles.ts
│   └── theme/
│       ├── colors.ts
│       └── index.ts        ← only barrel file in project
├── utils/
│   ├── aws.ts
│   ├── currencyFormatter.ts
│   ├── helpers/
│   │   └── navigations.ts
│   └── statuses.ts
├── views/
│   ├── components/         ← screen-level reusable
│   │   ├── ButtonSection.tsx       ← DEAD
│   │   ├── CommonHeader.tsx
│   │   ├── CurrencyText.tsx
│   │   ├── useButtonSectionStyles.ts  ← DEAD
│   │   ├── useCommonHeaderStyles.ts
│   │   ├── useCurrencyTextStyles.ts
│   │   └── functions/     ← mixed components + utilities
│   │       ├── ImagePickerAlert.tsx
│   │       ├── imageSelect.ts       ← DEAD
│   │       ├── uploadToS3.ts
│   │       └── useImagePickerAlertStyles.ts
│   ├── hooks/
│   │   └── useTextFonts.ts         ← DEAD (broken)
│   └── screens/
│       ├── functions/     ← global utilities (misplaced)
│       │   ├── OnItemPress.ts      ← DEAD
│       │   ├── refetchQuery.ts
│       │   ├── responsiveFonts.ts
│       │   └── util.ts
│       ├── AppUpdate/
│       │   ├── index.tsx
│       │   └── useAppUpdateStyles.ts
│       ├── WelcomeScreens/
│       │   ├── LoginScreen/
│       │   │   ├── index.tsx
│       │   │   └── useLoginStyles.ts
│       │   ├── VerifyCode/
│       │   │   ├── index.tsx
│       │   │   └── useVerifyCodeStyles.ts
│       │   └── AddCard/
│       │       ├── index.tsx
│       │       ├── useAddCardStyles.ts
│       │       └── components/
│       │           └── AddCardValidation.ts
│       └── BottomTabs/
│           ├── CartScreen/
│           │   ├── index.tsx              ← 586 lines
│           │   ├── CameraScanner.tsx
│           │   ├── useCartStyles.ts
│           │   ├── useCameraScannerStyles.ts
│           │   └── hooks/
│           │       ├── helpers.ts
│           │       ├── types.ts
│           │       └── useAppStateListener.ts
│           ├── CheckoutScreen/
│           │   ├── index.tsx              ← 847 lines
│           │   ├── PaymentComplete.tsx
│           │   ├── useCheckoutScreenStyles.ts
│           │   ├── usePaymentCompleteStyles.ts
│           │   └── components/
│           │       ├── SavedCardsSkeleton.tsx
│           │       └── useSavedCardsSkeletonStyles.ts
│           ├── ProfileScreen/
│           │   ├── index.tsx              ← 585 lines
│           │   ├── useProfileStyles.ts
│           │   ├── EditProfile/
│           │   │   ├── index.tsx          ← 818 lines
│           │   │   ├── useEditProfileStyles.ts
│           │   │   └── components/
│           │   │       ├── VerifyCodeModal.tsx
│           │   │       ├── editProfileValidation.tsx
│           │   │       └── useVerifyCodeModalStyles.ts
│           │   ├── ManageCards/
│           │   │   ├── index.tsx
│           │   │   ├── useManageCardsStyles.ts
│           │   │   └── components/
│           │   │       ├── ManageCardModal.tsx
│           │   │       ├── ManageCardsSkeleton.tsx
│           │   │       ├── useManageCardModalStyles.ts
│           │   │       └── useManageCardsSkeletonStyles.ts
│           │   ├── PrivacyPolicy/
│           │   │   └── index.tsx          ← unnecessary directory (stub, 13 lines)
│           │   └── TermsAndConditions/
│           │       └── index.tsx          ← unnecessary directory (stub, 13 lines)
│           └── TransactionScreen/
│               ├── index.tsx
│               ├── useTransactionStyles.ts
│               └── components/
│                   ├── DownloadPDFModal.tsx
│                   └── useDownloadPDFModalStyles.ts
├── declarations.d.ts
└── locales.ts
```


### New folder structure pattern for the code

> src are main code containing folder

**1. features/ -** storing the functions, api calling, ui componenets including screens inside it which are directly used inside the feature or directly related to it.

	{{features_name}}/
    	a. tanstack/
          	keys/
              	{{features_name}}MutationKeys.ts
              	{{features_name}}QueryKeys.ts
          	queries/
              	use{{api_name}}.ts
          	mutation/
              	use{{api_name}}.ts
    	b. views/
        	screens/
          	{{screen_name}}
              	{{screen_name}}.tsx
              	use{{screen_name}}Style.tsx
              	use{{screen_name}}.ts
        	components/
            	{{component_name}}/
                	{{component_name}}.tsx
                	use{{component_name}}.ts
                	{{component_name}}Style.tsx
        	modals/
            	{{modal_name}}/
                	{{modal_name}}.tsx
                	use{{modal_name}}.ts
                	use{{modal_name}}Style.ts
    	c. atom/
        	{{features_name}}Atom.ts
    	d. types/
        	{{features_name}}Types.ts
    	e. components/
        	{{component_name}}/
            	{{component_name}}.tsx
            	use{{component_name}}.ts
            	{{component_name}}Style.tsx

**2. utils/** - for constanting constants and helper functions.

    a. helper/
        {{helper_function_name}}.ts
    b. constants.ts or constants/
        env.ts
        constants.ts

**3. shared/** - for storing shared elements used throughtout the project.

	a. components/
		{{component_name}}/
		            {{component_name}}.tsx
		            use{{component_name}}.ts
		            {{component_name}}Style.tsx
    b. theme/ - for storing the theme structure like colors, typography, layouts,etc.
    c. services/ - for handling third party services like notifications.

**4. api/ -** for storing file used for api calling.

    a. api.ts - for storing the common api calling function and it's basic creds like base_url, headers, etc.
    b. endpoints.ts or endpoints/ - for storing api endpoints used all over the application.
        {{feature_name}}.ts - for storing api endpoints feature wise.

**5. routes/ -** For root navigaition handling for the whole application

	a. RootNavigation - For storing navigaiton container for using navigation in the application
    b. Routes.ts - For storing the list of the navigaitions string used in the applicaition.

**6. atom/ -** for storing the common atom states used throught the application.


### Features used in application

**1. Auth**

    a. Login
    b. Otp Verficaton
    c. Logout
    d. Delete Account

**2. Cart**

    a. Scan to connect
    b. Cart Screen

**3. Cards**

    a. Add New Card
    b. Cards List
    c. Set card as primary
    d. Delete Card

**4. Payments**

    a. Checkout
    b. Payment History

**5. Profile**

    a. Edit Profile
    b. Terms & Conditions
    c. Privacy Policy

---

## 4. Endpoint files

Their are too many endpoint files , creating fewer files and feature wise accordingly

## 5. Hooks maintainance

Tanstack hook have functions imported separately, while those functions are not used any where else other than the hooks

## 6. UI Components Segregation

Components like cart have multiple UI components like showCartNotConnected and showVirtualCart components that should be maintained as separate screens.

## 7. Functional Components Segregation

Functionality in the screen and componenets should be maintained in their relevant hooks.

---

## Points to Noted:

**1. TypeScript:**

Must follow proper typescript for solid code foundation.

**2. Inline Documentation:**

Must have inline documentation of code for proper code understanding.

---
---

# Proposed Implementation Plan - Architecture & Folder Structure Refactoring

This plan details the reorganization of the codebase into a clean, feature-driven folder structure, deletion of dead code, consolidation/renaming of barrel files, and segregation of screen/component logic into dedicated hooks.

## User Review Required

> [!IMPORTANT]
> - All imports across the application (`App.tsx`, `src/routes/RootNavigation.tsx`, screens, hooks, components) will be updated to reflect the new feature-based structure.
> - The intermediate API calling layer under `src/api/functions/` is eliminated, and endpoints from `src/api/endpoints/` are consolidated into a feature-wise endpoints folder under `src/api/endpoints/`.
> - Functional code currently in `index.tsx` files has already been moved to named files (like `LoginScreen.tsx`), but we will make sure no nested component has redundant `index.tsx` files holding functional code.

## Proposed Folder Structure Pattern

We will restructure `src/` to follow this layout:
- `src/features/`
  - `auth/` (Login, OTP verification, Logout, Delete account)
  - `cart/` (Scan to connect, Cart list, Scan modal)
  - `cards/` (Add new card, Card listing, Set primary, Delete card)
  - `payments/` (Checkout, Payment complete, Transaction/Order history)
  - `profile/` (Profile detail, Edit profile, Privacy policy, Terms & conditions)
- `src/shared/`
  - `components/` (CommonHeader, CurrencyText, AppButton, LoaderComponent, SuccessModal, WarnAlert, WrapperContainer)
  - `theme/` (colors, typography, useColors)
  - `services/` (notifications/useNotificationHandler)
- `src/api/`
  - `api.ts` (base Axios instance/callApi)
  - `endpoints/` (auth.ts, cart.ts, cards.ts, payments.ts, profile.ts)
- `src/routes/`
  - `RootNavigation.tsx`
  - `BottomTabs.tsx`
  - `useAuthCheck.ts`
  - `useBranding.ts`
- `src/atom/` (common state atoms like brandingAtom, colorsAtom, authAtom)
- `src/utils/` (common helper functions and constants)

---

## Proposed Changes

### 1. Dead Code Clean Up
- [DELETE] `src/views/components/useButtonSectionStyles.ts` (as the component `ButtonSection.tsx` is already dead/removed).
- Any other detected unused files will be removed.

### 2. API Endpoints Feature-wise Segregation
- [NEW] `src/api/endpoints/auth.ts` containing authentication-related endpoints.
- [NEW] `src/api/endpoints/cart.ts` containing cart-related endpoints.
- [NEW] `src/api/endpoints/cards.ts` containing card-related endpoints.
- [NEW] `src/api/endpoints/payments.ts` containing payment-related endpoints.
- [NEW] `src/api/endpoints/profile.ts` containing profile-related endpoints.
- [DELETE] `src/api/endpoints.ts` (consolidated).

### 3. Migrating and Grouping to Features
We will move files into their respective features under `src/features/`.

#### **Auth Feature (`src/features/auth/`)**
- `hooks/keys/authMutationKeys.ts` (consolidated auth mutation keys)
- `hooks/mutation/useLogin.ts` (containing the login TanStack mutation hook)
- `hooks/mutation/useVerifyCode.ts` (containing OTP verify TanStack mutation hook)
- `hooks/mutation/useLogout.ts` (containing logout TanStack mutation hook)
- `hooks/mutation/useDeleteAccount.ts` (shopper account deletion mutation)
- `views/screens/LoginScreen/`
  - `LoginScreen.tsx`
  - `useLoginScreenStyle.ts`
  - `useLoginScreen.ts`
- `views/screens/VerifyCodeScreen/`
  - `VerifyCodeScreen.tsx`
  - `useVerifyCodeScreenStyle.ts`
  - `useVerifyCodeScreen.ts`

#### **Cart Feature (`src/features/cart/`)**
- `hooks/keys/cartKeys.ts` (Query & Mutation keys)
- `hooks/queries/useGetAllProduct.ts`
- `hooks/queries/useGetLastActiveCart.ts`
- `hooks/mutation/useLinkDevice.ts`
- `hooks/mutation/useApplyPromo.ts`
- `hooks/mutation/useDeleteProduct.ts`
- `views/screens/ScanCartScreen/`
  - `ScanCartScreen.tsx`
  - `useScanCartStyle.ts`
  - `useScanCart.ts`
  - `hooks/` (helpers, types, app state listener for scan cart)
- `views/screens/CartScreen/`
  - `CartScreen.tsx`
  - `useCartScreenStyle.ts`
  - `useCartScreen.ts` (extracted logic from CartScreen.tsx)
- `views/modals/CameraScanner/`
  - `CameraScanner.tsx`
  - `useCameraScannerStyle.ts`

#### **Cards Feature (`src/features/cards/`)**
- `hooks/keys/cardsKeys.ts`
- `hooks/queries/useGetCardDetails.ts`
- `hooks/mutation/useAddCardDetails.ts`
- `hooks/mutation/useSetCardAsPrimary.ts`
- `hooks/mutation/useDeleteCard.ts`
- `views/screens/AddCardScreen/`
  - `AddCardScreen.tsx`
  - `useAddCardScreenStyle.ts`
  - `useAddCardScreen.ts`
  - `components/AddCardValidation.ts`
- `views/screens/ManageCardsScreen/`
  - `ManageCardsScreen.tsx`
  - `useManageCardsScreenStyle.ts`
  - `useManageCardsScreen.ts`
- `views/modals/AddCardModal/`
  - `AddCardModal.tsx`
  - `useAddCardModalStyle.ts`
- `views/modals/ManageCardModal/`
  - `ManageCardModal.tsx`
  - `useManageCardModalStyle.ts`
- `views/components/ManageCardsSkeleton/`
  - `ManageCardsSkeleton.tsx`
  - `useManageCardsSkeletonStyle.ts`

#### **Payments Feature (`src/features/payments/`)**
- `hooks/keys/paymentsKeys.ts`
- `hooks/queries/useGetOrderDetails.ts`
- `hooks/mutation/useCreateIntent.ts`
- `hooks/mutation/useCheckout.ts`
- `views/screens/CheckoutScreen/`
  - `CheckoutScreen.tsx`
  - `useCheckoutScreenStyle.ts`
  - `useCheckoutScreen.ts`
- `views/screens/PaymentCompleteScreen/`
  - `PaymentCompleteScreen.tsx`
  - `usePaymentCompleteScreenStyle.ts`
  - `usePaymentCompleteScreen.ts`
- `views/screens/TransactionScreen/`
  - `TransactionScreen.tsx`
  - `useTransactionScreenStyle.ts`
  - `useTransactionScreen.ts`
- `views/components/SavedCardsSkeleton/`
  - `SavedCardsSkeleton.tsx`
  - `useSavedCardsSkeletonStyle.ts`
- `views/modals/DownloadPDFModal/`
  - `DownloadPDFModal.tsx`
  - `useDownloadPDFModalStyle.ts`

#### **Profile Feature (`src/features/profile/`)**
- `hooks/keys/profileKeys.ts`
- `hooks/queries/useGetProfileData.ts`
- `hooks/queries/useGetThemeGlobal.ts`
- `hooks/mutation/useEditProfile.ts`
- `hooks/mutation/useVerifyEmail.ts`
- `hooks/mutation/useVerifyEmailOTP.ts`
- `hooks/mutation/useVerifyPhone.ts`
- `hooks/mutation/useVerifyPhoneOTP.ts`
- `views/screens/ProfileScreen/`
  - `ProfileScreen.tsx`
  - `useProfileScreenStyle.ts`
  - `useProfileScreen.ts`
- `views/screens/EditProfileScreen/`
  - `EditProfileScreen.tsx`
  - `useEditProfileScreenStyle.ts`
  - `useEditProfileScreen.ts`
- `views/screens/TermsAndConditionsScreen/`
  - `TermsAndConditionsScreen.tsx`
- `views/screens/PrivacyPolicyScreen/`
  - `PrivacyPolicyScreen.tsx`
- `views/components/ImagePickerAlert/`
  - `ImagePickerAlert.tsx`
  - `useImagePickerAlertStyle.ts`
- `views/modals/VerifyCodeModal/`
  - `VerifyCodeModal.tsx`
  - `useVerifyCodeModalStyle.ts`
- `utils/uploadToS3.ts`

### 4. Move Common Components/Hooks to Shared
- `src/components/*` -> `src/shared/components/`
  - Move `LoaderComponent.tsx`, `SuccessModal.tsx`, `WarnAlert.tsx`, `WrapperContainer.tsx` and their style hooks.
  - Move `CommonHeader.tsx` and `CurrencyText.tsx` and their style hooks.
- `src/hooks/useColors.ts` -> `src/shared/theme/useColors.ts`
- `src/routes/useNotificationHandler.ts` -> `src/shared/services/notifications/useNotificationHandler.ts` (or import directly from routes/shared services)

---

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure no syntax/formatting/linter issues across the codebase.
- Run `npm test` if any tests are defined to verify logic.

### Manual Verification
- Compile and start the app using `npm start` / Metro server.
- Verify screen navigation is completely intact and functional (Welcome/Login, AddCard, Tab navigation, profile edit, checkout).


## Current folder strusture:

```txt

src
├── api
│   └── api.ts
├── assets
│   ├── fonts.ts
│   ├── Images
│   │   ├── 3dots.png
│   │   ├── amexcard.png
│   │   ├── applePay.png
│   │   ├── appLogoSkipQ1.png
│   │   ├── appLogoSkipQ.png
│   │   ├── BackIcon.png
│   │   ├── calender.png
│   │   ├── CartSkipQ.png
│   │   ├── checkIcon.png
│   │   ├── CloseIcon.png
│   │   ├── connectCart.png
│   │   ├── crossIcon.png
│   │   ├── debit.png
│   │   ├── deleteIcon.png
│   │   ├── deleteSkipQ.png
│   │   ├── dhiram.svg
│   │   ├── dinercard.png
│   │   ├── discovercard.png
│   │   ├── downloadIcon.png
│   │   ├── DummyCartItem1.png
│   │   ├── DummyCartItem2.png
│   │   ├── DummyCartItem3.png
│   │   ├── DummyPSkipQ.png
│   │   ├── EditPenSkipQ.png
│   │   ├── EditPSkipQ.png
│   │   ├── error.png
│   │   ├── flash-off.png
│   │   ├── flash.png
│   │   ├── gPay.png
│   │   ├── HideEye.png
│   │   ├── HistorySkipQ.png
│   │   ├── logoutSkipQ.png
│   │   ├── ManageCardsSkipQ.png
│   │   ├── mastercard.png
│   │   ├── nointernet.png
│   │   ├── PrivacyPolicySkipQ.png
│   │   ├── ProfilebgSkipQ.png
│   │   ├── ProfileSkipQ.png
│   │   ├── rightCircle.png
│   │   ├── RightIconSkipQ.png
│   │   ├── rupaycard.png
│   │   ├── ShopIcon.png
│   │   ├── showEye.png
│   │   ├── SkipQAppLogo.png
│   │   ├── skipqbg.png
│   │   ├── successPayment.png
│   │   ├── success.png
│   │   ├── TermSkipQ.png
│   │   ├── visa.png
│   │   └── Warning.png
│   └── images.ts
├── config
│   ├── NavigationString.ts
│   └── NavigationTypes.ts
├── declarations.d.ts
├── features
│   ├── app
│   │   └── atom
│   │       └── appAtom.ts
│   ├── auth
│   │   ├── atom
│   │   │   └── authAtom.ts
│   │   ├── endpoints
│   │   │   └── auth.ts
│   │   ├── hooks
│   │   │   ├── keys
│   │   │   │   └── authMutationKeys.ts
│   │   │   └── mutation
│   │   │       ├── useDeleteAccount.ts
│   │   │       ├── useFcmToken.ts
│   │   │       ├── useLogin.ts
│   │   │       ├── useLogout.ts
│   │   │       └── useVerifyCode.ts
│   │   └── views
│   │       └── screens
│   │           ├── LoginScreen
│   │           │   ├── LoginScreen.tsx
│   │           │   ├── useLoginScreenStyle.ts
│   │           │   └── useLoginScreen.ts
│   │           └── VerifyCodeScreen
│   │               ├── useVerifyCodeScreenStyle.ts
│   │               ├── useVerifyCodeScreen.ts
│   │               └── VerifyCodeScreen.tsx
│   ├── cards
│   │   ├── endpoints
│   │   │   └── cards.ts
│   │   ├── hooks
│   │   │   ├── keys
│   │   │   │   └── cardsKeys.ts
│   │   │   ├── mutation
│   │   │   │   ├── useAddCardDetails.ts
│   │   │   │   ├── useDeleteCard.ts
│   │   │   │   └── useSetCardAsPrimary.ts
│   │   │   └── queries
│   │   │       └── useGetCardDetails.ts
│   │   └── views
│   │       ├── components
│   │       │   └── ManageCardsSkeleton
│   │       │       ├── ManageCardsSkeleton.tsx
│   │       │       └── useManageCardsSkeletonStyles.ts
│   │       ├── modals
│   │       │   ├── AddCardModal
│   │       │   │   ├── AddCardModal.tsx
│   │       │   │   └── useAddCardModalStyles.ts
│   │       │   └── ManageCardModal
│   │       │       ├── ManageCardModal.tsx
│   │       │       └── useManageCardModalStyles.ts
│   │       └── screens
│   │           ├── AddCardScreen
│   │           │   ├── AddCardScreen.tsx
│   │           │   ├── components
│   │           │   │   └── AddCardValidation.ts
│   │           │   ├── useAddCardStyles.ts
│   │           │   └── useAddCard.ts
│   │           └── ManageCardsScreen
│   │               ├── ManageCardsScreen.tsx
│   │               ├── useManageCardsScreenStyle.ts
│   │               └── useManageCardsScreen.ts
│   ├── cart
│   │   ├── atom
│   │   │   └── cartAtom.ts
│   │   ├── endpoints
│   │   │   └── cart.ts
│   │   ├── hooks
│   │   │   ├── keys
│   │   │   │   └── cartKeys.ts
│   │   │   ├── mutation
│   │   │   │   ├── useApplyPromo.ts
│   │   │   │   ├── useDeleteProduct.ts
│   │   │   │   └── useLinkDevice.ts
│   │   │   └── queries
│   │   │       ├── useGetAllProduct.ts
│   │   │       └── useGetLastActiveCart.ts
│   │   └── views
│   │       └── screens
│   │           ├── CartScreen
│   │           │   ├── CartScreen.tsx
│   │           │   ├── useCartScreenStyle.ts
│   │           │   └── useCartScreen.ts
│   │           └── ScanCartScreen
│   │               ├── hooks
│   │               │   ├── helpers.ts
│   │               │   ├── types.ts
│   │               │   └── useAppStateListener.ts
│   │               ├── modals
│   │               │   ├── CameraScanner.tsx
│   │               │   └── useCameraScannerStyles.ts
│   │               ├── ScanCartScreen.tsx
│   │               ├── useScanCartStyles.ts
│   │               └── useScanCart.ts
│   ├── payments
│   │   ├── endpoints
│   │   │   └── payments.ts
│   │   ├── hooks
│   │   │   ├── keys
│   │   │   │   └── paymentsKeys.ts
│   │   │   ├── mutation
│   │   │   │   ├── useCheckout.ts
│   │   │   │   └── useCreateIntent.ts
│   │   │   └── queries
│   │   │       └── useGetOrderDetails.ts
│   │   └── views
│   │       ├── components
│   │       │   └── SavedCardsSkeleton
│   │       │       ├── SavedCardsSkeleton.tsx
│   │       │       └── useSavedCardsSkeletonStyles.ts
│   │       └── screens
│   │           ├── CheckoutScreen
│   │           │   ├── CheckoutScreen.tsx
│   │           │   ├── useCheckoutScreenStyles.ts
│   │           │   └── useCheckoutScreen.ts
│   │           ├── PaymentCompleteScreen
│   │           │   ├── PaymentCompleteScreen.tsx
│   │           │   ├── usePaymentCompleteScreenStyles.ts
│   │           │   └── usePaymentCompleteScreen.ts
│   │           └── TransactionScreen
│   │               ├── TransactionScreen.tsx
│   │               ├── useTransactionScreenStyles.ts
│   │               └── useTransactionScreen.ts
│   └── profile
│       ├── endpoints
│       │   └── profile.ts
│       ├── hooks
│       │   ├── keys
│       │   │   └── profileKeys.ts
│       │   ├── mutation
│       │   │   ├── useEditProfile.ts
│       │   │   ├── useVerifyEmailOTP.ts
│       │   │   ├── useVerifyEmail.ts
│       │   │   ├── useVerifyPhoneOTP.ts
│       │   │   └── useVerifyPhone.ts
│       │   └── queries
│       │       ├── useGetProfileData.ts
│       │       └── useGetThemeGlobal.ts
│       ├── utils
│       │   └── uploadToS3.ts
│       └── views
│           ├── components
│           │   └── ImagePickerAlert
│           │       ├── ImagePickerAlert.tsx
│           │       └── useImagePickerAlertStyles.ts
│           ├── modals
│           │   └── VerifyCodeModal
│           │       ├── useVerifyCodeModalStyles.ts
│           │       └── VerifyCodeModal.tsx
│           └── screens
│               ├── EditProfileScreen
│               │   ├── components
│               │   │   └── editProfileValidation.tsx
│               │   ├── EditProfileScreen.tsx
│               │   ├── useEditProfileScreenStyles.ts
│               │   └── useEditProfileScreen.ts
│               ├── PrivacyPolicyScreen
│               │   └── PrivacyPolicyScreen.tsx
│               ├── ProfileScreen
│               │   ├── ProfileScreen.tsx
│               │   ├── useProfileScreen.ts
│               │   └── useProfileStyles.ts
│               └── TermsAndConditionsScreen
│                   └── TermsAndConditionsScreen.tsx
├── locales.ts
├── routes
│   ├── BottomTabs.tsx
│   ├── RootNavigation.tsx
│   ├── useAuthCheck.ts
│   ├── useBottomTabsStyles.ts
│   ├── useBranding.ts
│   ├── useNotificationHandler.ts
│   └── useRootNavigatorStyles.ts
├── shared
│   ├── components
│   │   ├── AppButton
│   │   │   ├── AppButton.tsx
│   │   │   └── useAppButtonStyles.ts
│   │   ├── AppUpdateModal
│   │   │   ├── AppUpdateModal.tsx
│   │   │   └── useAppUpdateStyles.ts
│   │   ├── CommonHeader
│   │   │   ├── CommonHeader.tsx
│   │   │   └── useCommonHeaderStyles.ts
│   │   ├── CurrencyText
│   │   │   ├── CurrencyText.tsx
│   │   │   └── useCurrencyTextStyles.ts
│   │   ├── LoaderComponent
│   │   │   ├── LoaderComponent.tsx
│   │   │   └── useLoaderStyles.ts
│   │   ├── SuccessModal
│   │   │   ├── SuccessModal.tsx
│   │   │   └── useSuccessModalStyles.ts
│   │   ├── WarnAlert
│   │   │   ├── useWarnAlertStyles.ts
│   │   │   └── WarnAlert.tsx
│   │   └── WrapperContainer
│   │       ├── useWrapperContainerStyles.ts
│   │       └── WrapperContainer.tsx
│   ├── services
│   │   └── notifications
│   │       └── useNotificationHandler.ts
│   └── theme
│       ├── colors.ts
│       ├── index.ts
│       └── useColors.ts
└── utils
    ├── aws.ts
    ├── currencyFormatter.ts
    ├── formatMobileNumber.ts
    ├── helper
    │   ├── refetchQuery.ts
    │   ├── responsiveFonts.ts
    │   └── util.ts
    ├── helpers
    │   └── navigations.ts
    └── statuses.ts

```