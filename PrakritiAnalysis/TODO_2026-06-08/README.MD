# TODO 2026-06-08

## I. Code Review for refactoring

1. Understanding the flow of the application.
2. Apis used in the application.
3. Third party services used.
4. Screens and their flow.
5. Features of the application.

**Findings:**

1. (BUG) user data is not getting saved on /addCustomer api responce for user id.
2. (BUG) Assesstment Report Showing report of the static user id.
3. Login Flow not yet in use but can be in future
4. GraphQL no in use but may in the future.
5. Features:
	a. localisation - HN & EN
	b. Health Assessment and report.
	c. Recent Assessment report.
	d. Download report.
	e. Dashboard.
	f. Navigation
6. Current Flow:

	[Dashboard] --(Start Assessment)--> [Assessment Screen]

---

## Refactoring of code into a definate / understandable structure.

### Dead Code removal: ✓

	1. dead styling
	2. dead logic (other than authentication one)
	3. commented code
	4. Unused Code Files
	5. Unused states
	6. Unused imports
	7. Unused Functions

### Duplicate Code removal: ✓

	1. Identical functions
	2. Duplicate files

### Barrel Files removal: ✓

	Renaming Barrel files into their relevant main function.

### Excessive File usages: ✓

	endpoint files, api/functions files etc.

### UI Segregation: ✓

	Extracting Multiple UI components coded within one file along with their main component.

### Functional Hook: ✓

	Extracting functions and states from the UI components and svaing them inside a logical hook that will be imported in the UI components.

### Folder Structure: ✓

	Maintaining folder structure for increasing the readability of code.
		1. feature
			{{feature_name}}/ 
				components/
					{{component_name}}/
						{{component_name}}.tsx
						use{{component_name}}.ts
				screens/
					{{screen_name}}
						{{screen_name}}.tsx
						use{{screen_name}}.ts
				store | atom /
					{{feature_name}}.ts
				modals/
					{{modal_name}}/
						{{modal_name}}.tsx
						use{{modal_name}}.ts
				graphql/
					mutation/
					query/
				hooks/
					tanstack/
						mutation/
						query/
				endpoints.ts
				MutationKeys.ts
				QueryKeys.ts
				types.ts
		2. store / atom/
				Root_state_export.ts
		3. api/
			api.ts
		4. utils/
			config/
				constants.ts
			helpers/
		5. routes/
			RootNavigation.tsx
			RouteParam.ts
		6. shared/
			components/
				{{component_name}}/
					{{component_name}}.tsx
					use{{component_name}}.ts


**Features:** 

	1. app - root functions or those states which are used at the root level of the application with Privacy Policy and TNC
		app/ 
		  AppUpdateModal/
		  PrivacyPolicyScreen/
		  TermsNConditionsScreen/

	2. auth - containing everything about auth feature like apis, states, hooks, UI etc.
		auth/
		  AboutYourselfFormScreen/
	3. dashboard - contains everything used in the dash boards.
		 dashboard/
		 	DashboardScreen/
    4. Assessment - 
    	  assessment/
    	  	QuizScreen/
    	  		AboutYourself/
    	  		GutHealth/
    	  		BowelMovement/
    	  		PhysicalStrength/
    	  		MentalStrength/
    	  	DownloadResultScreen/
    	  	ResultModal/
	5. Language -
		  language/
		  	SelectLanguageScreen/

## Current Folder structure

```cmd
src/
.
├── api
│   ├── api.ts
│   ├── endpoints
│   │   ├── app.ts
│   │   ├── assessments.ts
│   │   ├── auth.ts
│   │   └── profile.ts
│   ├── MutationKeys.ts
│   └── QueryKeys.ts
├── assets
│   ├── fonts.js
│   ├── Images
│   │   ├── AddIcon_sm_.png
│   │   ├── BackGround.png
│   │   ├── bellIcon.png
│   │   ├── body.png
│   │   ├── bookLeftIcon.png
│   │   ├── Brain.png
│   │   ├── CameraInstructionFrontHindi.png
│   │   ├── CameraInstructionFront.png
│   │   ├── CameraInstructionHindi.png
│   │   ├── CameraInstruction.png
│   │   ├── checkIcon.png
│   │   ├── checkIcon-round.png
│   │   ├── ChooseLanguage.png
│   │   ├── CloseIcon.png
│   │   ├── cover2.png
│   │   ├── Cover.png
│   │   ├── CrossIcon.png
│   │   ├── Date.png
│   │   ├── Delete.png
│   │   ├── DummyUser.png
│   │   ├── emailIcon.png
│   │   ├── error.png
│   │   ├── fitveda-logo.png
│   │   ├── hamburger.png
│   │   ├── Heart.png
│   │   ├── hero-bg.png
│   │   ├── HideEye.png
│   │   ├── Home.png
│   │   ├── HowItWorks2.png
│   │   ├── Kapha.png
│   │   ├── Leaver.png
│   │   ├── Login.png
│   │   ├── Logout.png
│   │   ├── man.png
│   │   ├── Nav-menu Icon.png
│   │   ├── NextArrow.png
│   │   ├── nointernet.png
│   │   ├── Password.png
│   │   ├── Pitta.png
│   │   ├── prakriti_analysis_horizontal.png
│   │   ├── PreviousArrow.png
│   │   ├── PrivacyPolicy.png
│   │   ├── Report.png
│   │   ├── showEye.png
│   │   ├── SkipQAppLogo.png
│   │   ├── StarIcon.png
│   │   ├── star.png
│   │   ├── starPrak.png
│   │   ├── Step1.png
│   │   ├── Strength.png
│   │   ├── success.png
│   │   ├── Test.png
│   │   ├── Time.png
│   │   ├── TNC.png
│   │   ├── Vata.png
│   │   ├── Warning.png
│   │   └── WellnessResultIcon.png
│   └── images.js
├── components
│   ├── ChangePassHeader.tsx
│   ├── DrawerHeader.tsx
│   ├── HeaderComponent.tsx
│   ├── LoaderComponent.tsx
│   ├── MediaPickerModal.tsx
│   ├── PermissionRequest.ts
│   ├── SuccessModal.tsx
│   ├── WarnAlert.tsx
│   ├── WebViewScreen.tsx
│   └── WrapperContainer.tsx
├── config
├── features
│   ├── app
│   │   ├── AppUpdateModal
│   │   │   ├── AppUpdateModal.tsx
│   │   │   └── useAppUpdate.ts
│   │   ├── endpoints.ts
│   │   ├── hooks
│   │   │   └── tanstack
│   │   │       └── query
│   │   │           └── useCommonData.ts
│   │   ├── MutationKeys.ts
│   │   ├── NoInternetScreen
│   │   │   ├── NoInternetScreen.tsx
│   │   │   └── styles.tsx
│   │   ├── PrivacyPolicyScreen
│   │   │   └── PrivacyPolicy.tsx
│   │   ├── QueryKeys.ts
│   │   ├── TermsNConditionsScreen
│   │   │   └── TermsAndConditions.tsx
│   │   └── types
│   ├── assessment
│   │   ├── DownloadResultScreen
│   │   │   ├── AssessmentReportScreen.tsx
│   │   │   ├── components
│   │   │   │   ├── DoshTable.tsx
│   │   │   │   ├── FoodSuggestion.tsx
│   │   │   │   ├── InfoCard.tsx
│   │   │   │   ├── ReportSectionDetails.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── ReviewModal.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   ├── TestimonialCard.tsx
│   │   │   │   └── VedicConnectSection.tsx
│   │   │   └── useAssessmentReport.ts
│   │   ├── endpoints.ts
│   │   ├── hooks
│   │   │   └── tanstack
│   │   │       ├── mutation
│   │   │       │   ├── useAddUpdateReview.ts
│   │   │       │   ├── useGetResult.ts
│   │   │       │   └── useSendEmailReport.ts
│   │   │       └── query
│   │   │           ├── useDownloadReport.ts
│   │   │           ├── useGetQuestions.ts
│   │   │           └── useGetReview.ts
│   │   ├── MutationKeys.ts
│   │   ├── QueryKeys.ts
│   │   └── QuizScreen
│   │       ├── components
│   │       │   ├── AboutYourselfForm
│   │       │   │   ├── AboutYourselfForm.tsx
│   │       │   │   ├── Step1ContactInfo.tsx
│   │       │   │   └── Step2Demographics.tsx
│   │       │   ├── ImageUploadSection
│   │       │   │   └── ImageUploadSection.tsx
│   │       │   └── Validation.ts
│   │       └── screens
│   │           ├── QuestionnaireScreen.tsx
│   │           └── useQuestionnaire.ts
│   ├── auth
│   │   ├── endpoints.ts
│   │   ├── hooks
│   │   │   └── tanstack
│   │   │       ├── mutation
│   │   │       │   ├── useDeleteAccount.ts
│   │   │       │   └── useRegisterUser.ts
│   │   │       └── query
│   │   │           └── useGetUserProfile.ts
│   │   ├── MutationKeys.ts
│   │   └── QueryKeys.ts
│   ├── dashboard
│   │   └── DashboardScreen
│   │       ├── components
│   │       │   ├── Doshas.tsx
│   │       │   ├── HowItWorks.tsx
│   │       │   ├── ReviewCard.tsx
│   │       │   ├── ReviewModal
│   │       │   │   ├── ReviewModal.tsx
│   │       │   │   └── useReviewModal.ts
│   │       │   ├── StarRating.tsx
│   │       │   └── VideoModal.tsx
│   │       ├── DashboardScreen.tsx
│   │       └── useDashboard.ts
│   └── language
│       └── SelectLanguageScreen
│           ├── components
│           │   └── ChooseButton.tsx
│           ├── LanguageSelectionScreen.tsx
│           └── useLanguageSelection.tsx
├── graphql
│   ├── mutations
│   └── useApolloClient.js
├── hooks
│   ├── mutations
│   │   ├── AddUpdateReview.ts
│   │   ├── ChangePassword.ts
│   │   ├── DeleteAccount.ts
│   │   ├── ForgotPassword.ts
│   │   ├── GetResult.ts
│   │   ├── Login.ts
│   │   ├── RegisterUser.ts
│   │   ├── SendEmailReport.ts
│   │   └── UpdateDeviceToken.ts
│   ├── queries
│   │   ├── CommonData.ts
│   │   ├── downloadReport.ts
│   │   ├── GetQuestions.ts
│   │   ├── GetResultHistory.ts
│   │   ├── GetReview.ts
│   │   └── GetUserProfile.ts
│   ├── useAlert.ts
│   ├── useBackHandler.ts
│   └── useLoadMore.ts
├── locales
│   ├── en.json
│   └── hi.json
├── routes
│   ├── DrawerTabs.tsx
│   └── RootNavigation.tsx
├── shared
│   ├── components
│   │   ├── DrawerHeader
│   │   │   └── DrawerHeader.tsx
│   │   ├── HeaderComponent
│   │   │   └── HeaderComponent.tsx
│   │   ├── MediaPickerModal
│   │   │   └── MediaPickerModal.tsx
│   │   ├── PermissionRequest
│   │   │   └── PermissionRequest.ts
│   │   ├── SuccessModal
│   │   │   └── SuccessModal.tsx
│   │   └── WebViewScreen
│   │       └── WebViewScreen.tsx
│   └── hooks
│       ├── useAlert.ts
│       ├── useBackHandler.ts
│       └── useLoadMore.ts
├── store
│   ├── authAtom.ts
│   ├── index.ts
│   └── languageAtom.ts
└── utils
    ├── capitalize.ts
    ├── config
    │   ├── constants.ts
    │   └── NavigationString.ts
    ├── helpers
    │   ├── globalColors.ts
    │   ├── locales.js
    │   ├── refetchQuery.ts
    │   ├── responsiveFonts.ts
    │   └── util.ts
    ├── pdfDownloader.ts
    └── permissions.ts
```