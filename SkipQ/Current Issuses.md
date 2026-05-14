# Current Issuses[Since: April / 10 / 2026]:

1. (BUG) On item added without scan --> Asking user for what have you added --> user selected I have added a product --> for product not found it is openning modal for item scanned with previously scanned item not the current one(as product is not found).

2. ✓ ~~(ENHANCEMENT) Clearing the previous chain details (like proof path, previous scanned item etc.) once the chain is clear.~~

3. ✓ ~~(BUG) Prices are not in 2 decimal places.~~

4. (BUG) Currency Symbol should be confirgurable via branding api.

5. ~~(BUG) On logout or session end of the cart we are not deleting the proofs --> use `{event: "deleteSessionProof"}`[5.1.19 Delete all proof resources] for deleting all proofs from the device.~~ No need as beginTracking event deletes all the previous proofs.

6. ✓ ~~(BUG) On item removal anomally flow - when user comes in adjust quantity modal , user is able to confirm without adjust the quantity of the product.~~

7. ✓ ~~(BUG) On item removal anomally flow - when user selects `I have removed a product` and the user selects the removed product via scanning or from the list , and comes in adjust quantity modal , on confiming the quantity, the event which is passed to the api is of add product and the tag is bulkDrop. ,~~

8. ✓ ~~(BUG) Scanner is getting closed when we are contining shopping after the staff dashboard.~~

9. ✓ ~~(BUG) Show Loader when user clicks on "Cancel" button while closing "Personal Item" modal.~~

10. (BUG) In Events List of a product in staff flow Video is not running in loop.

11. (ENHANCEMENT) Video is tilted 90 degrees, needed to rotate it -90 degrees.