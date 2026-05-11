# Tasks: (SkipQ Mobile App)

## Lists of tasks provided:

1. Branding - Yet to decide how the parameters will be mapped with the components for proper UI configuration.

---

## To-Do

1. ✅ get all product api - hit only when cart id is available. 

```ts
  const { data: allProducts } = useGetAllProductApi({
      qurey: {
        cartId: route?.params?.cartId,
      },
    });
```

2. create intend - getting 200 status for no product found

3. phone number api - currently we are sending the concatinated string of both country code and phone number, but now we need it in the edit profile section in separated ways.

```ts
  type phone_number = {
    country_code : number;
    number: number;
  }
```

4. Cart in and out actions update

  **4.1 on logout from the cart -(TBD: Rajiv Sir)** notification will be send to the mobile to logout the from app simultaneously.

  **4.2 mobile app is active and user login using number / otp in the device -(TBD: Ajay)** notification will be send when the user logs in the cart.

  **4.3 Cart checkout / payment update from the cart -(TBD: Ajay)** notification will be send to the mobile app for getting update for payment success.

> Note: in these scenarios the mobile app is in foreground and user is logged in the mobile app.


5. promo code - not yet enabled

6. transactions - not yet enabled

7. Edit profile form and apis - yet to resolve.