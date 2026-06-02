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

