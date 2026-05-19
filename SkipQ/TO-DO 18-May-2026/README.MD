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
	A5[Network Check]

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
	D21[Testing]
	D211[Provisional ID Login]
	D212[Shopping Flow]
	D213[Staff Login]
	D22[Trial]
	D23[Production]
	D231[Phone Number Login]
	D232[QR Login]
	D233[Checkout & Payments]
	D24[Maintainance]

	A --> B --> C --> D

	A --> A1 --> A2 --> A3 --> A4 --> A5

	B --> B1 --> B2

	C --> C1 --> C2 --> C3

	D --> D1 --> D2

	D2 --> D21 
	D2 --> D22
	D2 --> D23
	D2 --> D24

	D21 --> D211
	D21 --> D212
	D21 --> D213

	D22 --> D231
	D22 --> D232
	D22 --> D212

	D23 --> D231
	D23 --> D232
	D23 --> D212
	D23 --> D213
	D23 --> D233

	%% =========================
	%% Main Nodes
	%% =========================
	style A fill:#1E3A8A,color:#ffffff,stroke:#0F172A,stroke-width:3px
	style B fill:#7C2D12,color:#ffffff,stroke:#431407,stroke-width:3px
	style C fill:#14532D,color:#ffffff,stroke:#052E16,stroke-width:3px
	style D fill:#581C87,color:#ffffff,stroke:#3B0764,stroke-width:3px

	%% =========================
	%% Level 1 Sub Nodes
	%% =========================
	style A1 fill:#DBEAFE,color:#111827,stroke:#2563EB
	style B1 fill:#FED7AA,color:#111827,stroke:#EA580C
	style C1 fill:#DCFCE7,color:#111827,stroke:#16A34A
	style D1 fill:#E9D5FF,color:#111827,stroke:#9333EA

	%% =========================
	%% Level 2 Sub Nodes
	%% =========================
	style A2 fill:#BFDBFE,color:#111827,stroke:#2563EB
	style A3 fill:#BFDBFE,color:#111827,stroke:#2563EB
	style A4 fill:#BFDBFE,color:#111827,stroke:#2563EB
	style A5 fill:#BFDBFE,color:#111827,stroke:#2563EB

	style B2 fill:#FDBA74,color:#111827,stroke:#EA580C

	style C2 fill:#BBF7D0,color:#111827,stroke:#16A34A
	style C3 fill:#BBF7D0,color:#111827,stroke:#16A34A

	style D2 fill:#D8B4FE,color:#111827,stroke:#9333EA

	%% =========================
	%% Level 3 Sub Nodes
	%% =========================
	style D21 fill:#F3E8FF,color:#111827,stroke:#A855F7
	style D22 fill:#F3E8FF,color:#111827,stroke:#A855F7
	style D23 fill:#F3E8FF,color:#111827,stroke:#A855F7
	style D24 fill:#F3E8FF,color:#111827,stroke:#A855F7

	%% =========================
	%% Level 4 Sub Nodes
	%% =========================
	style D211 fill:#FAF5FF,color:#111827,stroke:#C084FC
	style D212 fill:#FAF5FF,color:#111827,stroke:#C084FC
	style D213 fill:#FAF5FF,color:#111827,stroke:#C084FC
	style D231 fill:#FAF5FF,color:#111827,stroke:#C084FC
	style D232 fill:#FAF5FF,color:#111827,stroke:#C084FC
	style D233 fill:#FAF5FF,color:#111827,stroke:#C084FC

```

### A. Peripherals Checking

This is when are getting device has arrived in warehouse and before it could be used, it is testing for it's peripheral components to be working fine or not

**Peripheral Components**

	1. Cameras
	2. Scanner
	3. LED
	4. Network

Then it will go for registration flow.

### B. Device Registration Flow

This is where we register the new device to our system. and allocate it to a merchant and store.

Here first we check whether the device is registered with the system or not.
If not registered then we ask user for registering device or not
User will confirm for that by clicking on `Register Device` button
This will call an api which register the device with it's serial number.
And in return we get a device ID that can be seen in Admin panel.

Once admin allocates the device to a store and a merchant then device is ready to be shipped.
Once the shippment is confirmed then we will go for installation flow.

### C. On Ground Installation Flow

This is where we have a final check whether the device is working fine for the on ground environment

**CheckList Contains**

	1. Network Connection
	2. Power Connectino
	3. Phycally Device Mounting

These check points are for on ground team to make ensure that the device is working fine before it's activation.
Once it is confirmed from the staff's end , we are going to move to activation flow

### D. Activation Flow

Here we wait for admin to activate the device for usage

Once the admin activates the device , the we go to welcome screen.

### E. Active Account Modes:

Here we are going to enable the functionalities of the device's main usage according to the mode the device is in.

**Device Active Modes**

	1. **Trial** - Allows Provisional ID Login and Only Disable Checkout and Staff Login functionality 
	2. **Testing** - Allows Provisional ID Login and Staff Login and only disables Checkout functionality
	3. **Production** - All main feature are active and allows phone / otp number login and checkout and billing
	4. **Maintenance** - Here we are going to show a screen telling the user that applicaiton is in maintainance state and wait for admin to change the state of the device to some other state.



## 2. Device Health Timer & checks for device activation:

	a. We will get the time duration for device health api from the get device details.
	b. adjust the states and time interval for hitting the api accordingly.