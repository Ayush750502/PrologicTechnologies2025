# TO DO

## 1. Device Lift Cycle Implementation:(TBD)

<img src='./image.png' />

```mermaid
---
title: Device Life Cycle Flow
---
flowchart TD
	A{{In-warehouse}}
	A1[Peripherals Checking]
	A2[Camera Check]
	A3[Scanner Check]
	A4[LED Check]
	A5[NFC Check]
	A6[Network Check]

	B{{Device Not registered}}
	B1[Register Device]
	B2[Allocated]

	C{{Device Installation}}
	C1[Network Connected Check]
	C2[Power Connected Check]
	C3[Physically Mounted Check]

	D{{Pending Activation}}
	D1[Activated]
	D2[Application Mode]
	D21[Trial]
	D211[Dummy Login]
	D212[Shopping Flow]
	D22[Testing]
	D221[Staff Login]
	D23[Production]
	D231[Phone Login]
	D232[QR Login]
	D233[Checkout & Payments]

	E{{Device Working}}

	A --> B --> C --> D --> E

	A --> A1 --> A2 --> A3 --> A4 --> A5 --> A6

	B --> B1 --> B2

	C --> C1 --> C2 --> C3

	D --> D1 --> D2

	D2 --> D21 

	D2 --> D22

	D2 --> D23

	D21 --> D211

	D21 --> D212

	D22 --> D211

	D22 --> D212

	D22 --> D221

	D23 --> D231

	D23 --> D232

	D23 --> D221

	D23 --> D233

```

## 2. Device checking with application:

Testing of the device compoenents with application

### a. Scanner Testing(*) - using SDK
### b. Light Testing(*) - using SDK
### c. Display Testing - using Native Code
### d. Camera Testing(*) - using Native Code
### e. Touch Testing - using Native Code
### f. NFC Testing (TBD) - using Native Code

## 3. Device Health Timer & checks for device activation: