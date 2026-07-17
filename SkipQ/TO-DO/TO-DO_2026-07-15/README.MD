# SkipQ Testing Over Live URL

> [!CAUTION]
> ❌ Mobile App Refresh Token handling went wrong.
> **Status -** ✅ Resolved

> [!NOTE]
> 
>❌ - Issue
>⚠️ - Warning
>✅ - Working

## Auth:

### Mobile:

1. PHONE NUMBER & OTP  -  ✅

### Hanshow Device:

1. PHONE NUMBER & OTP  -  ✅
2. SCAN QR             -  ✅


## Cart:

### Mobile App:

Product updates are Working fine,

> [!WARNING]
> HIL dashboard is yet to be checked whether it Working with HIL Events or not

### Hanshow Device:

1. BARCODE SCAN FLOW              -  ✅
2. ADD WITHOUT SCAN FLOW          -  ✅
3. ITEM REMOVED FLOW(Scan Check)  -  ✅
4. ITEM REMOVED FLOW(List Check)  -  ✅
5. OBSTRUCTION FLOW               -  ✅
6. ADJUST QUANTITY                -  ✅
7. HIL APPROVE                    -  ✅
8. HIL REJECT                     -  ✅


## Staff:

### Hanshow Device:

1. ITEM APPROVE     -  ✅
2. QR LOGIN         -  ✅
3. ITEM DELETING    -  ✅
4. CONTINIUE        -  ✅
5. ABANDON          -  ✅
6. CART-ITEM-EVENTS -  ✅


## Card:

### Mobile App:

1. GET CARDS       -  ✅
2. ADD CARD        -  ✅
3. SET AS PRIMARY  -  ✅


## Payment:
### Mobile App:

1. SAVED CARD        -  ✅
2. CARD ENTRY        -  ⚠️ // But currency is not handled properly
3. GET TRANSACTIONS  -  ✅
4. DOWNLOAD INVOICE  -  ✅

### Hanshow Device:

1. SAVED CARD  -  ⚠️ // But currency is not handled properly
2. CARD ENTRY  -  ⚠️ // But currency is not handled properly

⚠️ // But currency is not handled properly
Due to stripe converting taking dollar payment as rupee payment
Like Final Amount - $40
but stripe takes it as ₹40
and then converting it into dollar that is $0.42
and then error: Amount must convert to at least 50 cents. ₹40.00 converts to approximately $0.42.