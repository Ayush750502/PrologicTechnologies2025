# SkipQ:


## Complete Scenario Library (What is left)

### 4.1 Standard Shopping FLow

#### Scenario 3:
Scan Then Decide Not to Buy (Scan, No Drop)
> When user scans a product he / she can't move forward until we get addProductDetected event.
#### Scenario 4:
Multiple Different Products in Quick Succession
> Not tested for quick succession


### 4.3 Product Removal Scenarios

#### Scenario 11:
Single Pickup Without Scan (Unscanned Removal)
> Event Sequence doesn't matches, we are showing a list of product to the user from which the user can adjust the quantity of the product
*Implementation* - User can scan the product after removal to filter out the product from the list and then adjust the quantity of the product.

#### Scenario 15:
Bulk Removal (Multiple Items Removed at Once)
> Will be implemented but in a different way


### 4.4 Complex Multi-Event Chains

#### Scenario 18:
Drop Without Scan, Pickup Another Product While Resolving
> Yet to be ressolved.

#### Scenario 20:
Camera Obstruction During Shopping
> On Cover detection we are showing a modal but we could not get the before and after video or images for HIL dashboard


### 4.5 Quantity Adjustment Scenarios

> Apis are added but motion detection is yet to be implemented


### 4.6 Age Verification Scenarios

> Staff flow is yet to be implemented


### 4.7 Session Boundary Scenarios

#### Scenario 28:
Personal Item Declaration at Session Start
> Api yet to be implemented.

#### Scenario 29:
Personal Item Skipped (No Declaration)
> Api yet to be implemented.

#### Scenario 30:
Payment With Pending Anomalies
> All anomalies are yet to be read.


### 4.8 Edge Cases and Adversarial Scenarios

> Mainly for backend consideration

---

## Overall Pending Details:

### 1. ~~Payment Implementation:~~
### 2. NFC Options:
### 3. Negative Test Cases:
### 4. Device Offine Mode:
### 5. Kiosk Mode:
### 6. ~~IOS project implementation:~~
### 7. ~~Mobile App Is not fully active:~~

---

## Problems to ressolve:

1. [X] after logout -> when user re-logins : app is crashing
2. [X] Events and apis are yet to be serialised
3. [X] New Event mapping logic 
	We are going to use chainID and proof ID for simplifying groupping logic and getting video in backend.