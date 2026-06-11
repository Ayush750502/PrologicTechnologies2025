# 🚀 SkipQ

---

## ✅ Task Review with Manas Sir
1. [X] ItemAddedModal  
2. [X] Events and functionality  
3. [X] sdk-tester.apk from Adityan  

---

## ✅ Release Preparation
- [X] Preparing release build of latest merged files  

---

## 🔄 Events, Tags & Functionality

### 1. Event Types
- [X] There are multiple types of events:

  **1. SDK Events**
  - `addedProductsDetected`
  - `removedProductsDetected`
  - `barcodeDetected`
  - `coveredDetected`
  - `proofReady`
  - `getVisibleProductsNumInCart`
  - `deviceState`

  **2. App Events**
  - `cart:item-removed`
  - `barcode-scan-success`
  - `close-center-snackbar`
  - `removal-video-ready`

  **3. Flow Events**
  - `cartInit`
  - `beginTracking`
  - `barcodeScanned`
  - `itemAddedWithoutScan`
  - `itemRemoved`
  - `promo`
  - `checkout`

---

### 2. Functionalities
- [X] Multiple types of functionalities:

  **1. SDKCommands**

  - `controlScanner` → ScannerControlParams  
  - `configureScanner` → ScannerConfigParams  
  - `controlLED` → LEDControlParams  
  - `controlDeviceLock` → DeviceLockParams  
  - `controlKioskMode` → KioskModeParams  
  - `beginTracking`  
  - `endTracking`  
  - `beginMarketing`  
  - `endMarketing`  
  - `queryDeviceInformation`  
  - `deviceState`  
  - `getVisibleProductsNumInCart`  
  - `controlBeep` → `{ action: 'on' | 'off' }`  

  **2. App functions**