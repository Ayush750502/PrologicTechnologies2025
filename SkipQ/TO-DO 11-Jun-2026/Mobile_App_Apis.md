# Mobile Application

**Base URL:** `https://skipqapi.prologic-technologies.com`

All requests include headers: `Authorization: Bearer <token>`, `merchant_id`, `isShopper: true`, `lang: fr`

## 🔐 Auth

| Method | Endpoint | Params |
|--------|----------|--------|
| POST | `/auth/shopper/login` | body: `{ phone/email, ... }` |
| POST | `/auth/shopper/verify-otp` | body: `{ otp, ... }` |
| POST | `/auth/shopper/log-out` | body: `{ ... }` |
| DELETE | `/shopper/:userId` | path: `userId` |
| PUT | `/fcmToken` | body: `{ fcmToken }` |


## 💳 Cards

| Method | Endpoint | Params |
|--------|----------|--------|
| POST | `/card/add-card-details` | body: card details |
| GET | `/card/get-cards-detail/:id` | path: `id` (shopperId) |
| POST | `/card/set-primary` | body: card identifier |
| POST | `/card/delete-card` | body: card identifier |


## 🛒 Cart

| Method | Endpoint | Params |
|--------|----------|--------|
| POST | `/auth/shopper/:userId/link-device` | path: `userId`, body: device info |
| GET | `/cart/:cartId/getAllProducts` | path: `cartId` |
| GET | `/cart/last-active-cart/:shopperId` | path: `shopperId` |
| POST | `/promos/applyPromo` | body: promo code details |
| DELETE | `/cart/:cartId/deleteProduct` | path: `cartId`, body: product info |


## 💰 Payments

| Method | Endpoint | Params |
|--------|----------|--------|
| POST | `/card/create-intent` | body: card + amount details |
| POST | `/cart/:cartId/soldProducts` | path: `cartId`, body: payment info |
| GET | `/shopper/:shopperId/getOrderDetails` | path: `shopperId` |


## 👤 Profile

| Method | Endpoint | Params |
|--------|----------|--------|
| GET | `/shopper/:shopperId` | path: `shopperId` |
| PUT | `/shopper/:userId` | path: `userId`, body: profile data |
| POST | `/shopper/:userId/verify-email` | path: `userId`, body: `{ email }` |
| POST | `/shopper/:userId/verify-email-otp` | path: `userId`, body: `{ otp }` |
| POST | `/shopper/:userId/verify-phone` | path: `userId`, body: `{ phone }` |
| POST | `/shopper/:userId/verify-phone-otp` | path: `userId`, body: `{ otp }` |
| GET | `/device/merchants/:merchantId` | path: `merchantId` (used for branding/theme) |