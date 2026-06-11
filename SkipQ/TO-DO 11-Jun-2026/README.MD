# TO-DO 11-Jun-2026

## Task

Api integration in device app.


---

## Hanshow device apis

### Auth — `authService.ts`

| Method | Endpoint | Payload / Params |
|--------|----------|-----------------|
| POST | `/auth/shopper/login` | body: `{ phone }`, optional header: `merchant_id` |
| POST | `/auth/shopper/device-verify-otp` | body: `{ phone, otp, serialNumber? }` |
| POST | `/auth/shopper/device-log-out` | body: `{ shopperId, cartId }` |

---

### Device — `deviceService.ts`

| Method | Endpoint | Payload / Params |
|--------|----------|-----------------|
| POST | `/device/getDeviceDetails` | body: `{ serialNumber, deviceInfo, fcmToken }` |
| POST | `/device/register-device` | body: `{ serialNumber, status, is_inshopping_mode, created_by, deviceInfo }` |
| PUT | `/device/health` | body: `DeviceHealthRequest` (deviceId, battery, cpu, memory, storage, temperature, wifi, status, hardwareVersion, etc.) |
| POST | `/device-installation/{deviceId}/complete` | path param: `deviceId` |
| POST | `/device/addDeviceAlerts` | body: `{ deviceId, errorCode }` |

---

### Cart — `cartService.ts`

| Method | Endpoint | Payload / Params |
|--------|----------|-----------------|
| GET | `/cart/{cartId}/getAllProducts` | path: `cartId`, header: `isshopper: true` |
| POST | `/products/barcode` | body: `{ cartId, chainId, sku, quantity, event, tag }` |
| PUT | `/cart/{cartId}/adjustQuantity` | path: `cartId`, body: `{ event, tag, virtualCartId, sku, adjustedQuantity, chainId, proofId, totalItems }` |
| POST | `/cart/{cartId}/addProduct` | path: `cartId`, body: `{ productId, quantity, event, tag, scanned, dropped, status, chainId, proofId, totalItems, sku? }` — used by: `addItem`, `cancelPersonalItem`, `addPersonalItem`, `removePersonalItem`, `rearrangeItem`, `didNothing`, `removeProductWithoutScan`, `occlusionDetected` |
| PUT | `/cart/{cartId}/uploadProductVideo` | path: `cartId`, body: `{ dropVideos, proofId }` |

---

### Staff — `staffService.ts`

| Method | Endpoint | Payload / Params |
|--------|----------|-----------------|
| POST | `/auth/staff/login` | body: `{ qr_code, cartId }` |
| POST | `/auth/staff/logout` | body: `{ staffId, storeId, merchantId, cartId }`, header: `Authorization` |
| GET | `/hil/hil-list/{store}` | path: `store`, header: `Authorization` |
| POST | `/store/staff/escalate` | body: `{ escalatedTo, escalatedBy, cartItemId }`, headers: `merchant_id`, `Authorization` |
| POST | `/store/staff/cart-abandon` | body: `{ cartId, abandonedBy }`, headers: `merchant_id`, `Authorization` |
| POST | `/store/staff/approve-item` | body: `{ cartItemId, cartId, staffId, status }`, header: `Authorization` |
| DELETE | `/cart/{cartId}/deleteProduct` | path: `cartId`, body: `{ virtualCartId }`, headers: `merchant_id`, `Authorization` |
| POST | `/store/staff/manage-quantity` | body: `{ staff_id, cartId, item_id, quantity }`, headers: `merchant_id`, `Authorization` |
| GET | `/cart/cart-event-group` | query: `cartId`, `sku`, headers: `merchant_id`, `Authorization` |

---

### Checkout / Payment — `payment.ts` & `api.ts`

| Method | Endpoint | Payload / Params |
|--------|----------|-----------------|
| GET | `/card/get-cards-detail/{userId}` | path: `userId`, header: `Authorization`, `isShopper: true` |
| POST | `/card/create-intent` | body: `{ cartId, shopperId }`, header: `Authorization`, `isShopper: true` |
| POST | `/cart/{cartId}/soldProducts` | path: `cartId`, body: `{ cartId, shopperId, promo_code, paymentMethodId, PaymentIntentId, paymentType, transcationDetails, deviceId, paymentStatus, reason, code, discount? }` |
| POST | `/promo/validate` | body: `{ code, cartTotal }` |
| POST | `/promos/applyPromo` | body: `{ cartId, promo_code }` |