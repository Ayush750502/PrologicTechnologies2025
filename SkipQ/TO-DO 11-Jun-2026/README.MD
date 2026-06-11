# TO-DO 11-Jun-2026

**Objective -** Integrating new apis to the applications.

> [!IMPORTANT]
> **Before Updating Progress**
>
> * Mark **☐** for APIs that are yet to be integrated.
> * Mark **☑** once integration and testing are complete.
> * Only one status should represent the current state of an API.

## [Hanshow Device APIs](./Hanshow_Device_Apis.md)


| Method | Endpoint                                   | In Progress | Done |
| ------ | ------------------------------------------ | ----------- | ---- |
| POST   | `/auth/shopper/login`                      | ☑           | ☐    |
| POST   | `/auth/shopper/device-verify-otp`          | ☑           | ☐    |
| POST   | `/auth/shopper/device-log-out`             | ☑           | ☐    |
| POST   | `/device/getDeviceDetails`                 | ☑           | ☐    |
| POST   | `/device/register-device`                  | ☑           | ☐    |
| PUT    | `/device/health`                           | ☐           | ☐    |
| POST   | `/device-installation/{deviceId}/complete` | ☑           | ☐    |
| POST   | `/device/addDeviceAlerts`                  | ☐           | ☐    |
| GET    | `/cart/{cartId}/getAllProducts`            | ☑           | ☐    |
| POST   | `/products/barcode`                        | ☑           | ☐    |
| PUT    | `/cart/{cartId}/adjustQuantity`            | ☑           | ☐    |
| POST   | `/cart/{cartId}/addProduct`                | ☐           | ☐    |
| PUT    | `/cart/{cartId}/uploadProductVideo`        | ☐           | ☐    |
| POST   | `/auth/staff/login`                        | ☑           | ☐    |
| POST   | `/auth/staff/logout`                       | ☑           | ☐    |
| GET    | `/hil/hil-list/{store}`                    | ☐           | ☐    |
| POST   | `/store/staff/escalate`                    | ☐           | ☐    |
| POST   | `/store/staff/cart-abandon`                | ☑           | ☐    |
| POST   | `/store/staff/approve-item`                | ☑           | ☐    |
| DELETE | `/cart/{cartId}/deleteProduct`             | ☐           | ☐    |
| POST   | `/store/staff/manage-quantity`             | ☐           | ☐    |
| GET    | `/cart/cart-event-group`                   | ☑           | ☐    |
| GET    | `/card/get-cards-detail/{userId}`          | ☐           | ☐    |
| POST   | `/card/create-intent`                      | ☐           | ☐    |
| POST   | `/cart/{cartId}/soldProducts`              | ☐           | ☐    |
| POST   | `/promo/validate`                          | ☐           | ☐    |
| POST   | `/promos/applyPromo`                       | ☐           | ☐    |

---

## [Mobile Application APIs](./Mobile_App_Apis.md)

| Method | Endpoint                              | In Progress | Done |
| ------ | ------------------------------------- | ----------- | ---- |
| POST   | `/auth/shopper/login`                 | ☐           | ☐    |
| POST   | `/auth/shopper/verify-otp`            | ☐           | ☐    |
| POST   | `/auth/shopper/log-out`               | ☐           | ☐    |
| DELETE | `/shopper/:userId`                    | ☐           | ☐    |
| PUT    | `/fcmToken`                           | ☐           | ☐    |
| POST   | `/card/add-card-details`              | ☐           | ☐    |
| GET    | `/card/get-cards-detail/:id`          | ☐           | ☐    |
| POST   | `/card/set-primary`                   | ☐           | ☐    |
| POST   | `/card/delete-card`                   | ☐           | ☐    |
| POST   | `/auth/shopper/:userId/link-device`   | ☐           | ☐    |
| GET    | `/cart/:cartId/getAllProducts`        | ☐           | ☐    |
| GET    | `/cart/last-active-cart/:shopperId`   | ☐           | ☐    |
| POST   | `/promos/applyPromo`                  | ☐           | ☐    |
| DELETE | `/cart/:cartId/deleteProduct`         | ☐           | ☐    |
| POST   | `/card/create-intent`                 | ☐           | ☐    |
| POST   | `/cart/:cartId/soldProducts`          | ☐           | ☐    |
| GET    | `/shopper/:shopperId/getOrderDetails` | ☐           | ☐    |
| GET    | `/shopper/:shopperId`                 | ☐           | ☐    |
| PUT    | `/shopper/:userId`                    | ☐           | ☐    |
| POST   | `/shopper/:userId/verify-email`       | ☐           | ☐    |
| POST   | `/shopper/:userId/verify-email-otp`   | ☐           | ☐    |
| POST   | `/shopper/:userId/verify-phone`       | ☐           | ☐    |
| POST   | `/shopper/:userId/verify-phone-otp`   | ☐           | ☐    |
| GET    | `/device/merchants/:merchantId`       | ☐           | ☐    |