# TO DO

## 1. Device Lift Cycle Implementation:(TBD)

<img src='./image.png' />

```mermaid
---
title: Device Life Cycle Flow
---
flowchart TD
	A[In-warehouse]
	A1[Peripherals Checking]
	A2[Camera Check]
	A3[Scanner Check]
	A4[LED Check]
	A5[NFC Check]
	A6[Network Check]

	B[Device Not registered]
	B1[Register Device]
	B2[Allocated]

	C[Device Installation]
	C1[Network Connected Check]
	C2[Power Connected Check]
	C3[Physically Mounted Check]

	D[Pending Activation]
	D1[Activated]
	D2[Application Mode]
	D21[Test]
	D22[Trial]
	D23[Production]

	E[Device Working]

	A --> B --> C --> D --> E

	A --> A1 --> A2 --> A3 --> A4 --> A5 --> A6

	B --> B1 --> B2

	C --> C1 --> C2 --> C3

	D --> D1 --> D2

	D2 --> D21 

	D2 --> D22

	D2 --> D23

```

## 2. Device checking with application:

Testing of the device compoenents with application

### a. Scanner Testing* - using SDK
### b. Light Testing* - using SDK
### c. Display Testing - using Native Code
### d. Camera Testing* - using Native Code
### e. Touch Testing - using Native Code
### f. NFC Testing (TBD) - using Native Code

## 3. Device Health Timer & checks for device activation: