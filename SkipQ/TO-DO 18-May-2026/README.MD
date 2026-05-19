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

## 2. Device checking with application:

Testing of the device compoenents with application

### a. Scanner Testing(*) - using SDK
### b. Light Testing(*) - using SDK
### c. Display Testing - using Native Code
### d. Camera Testing(*) - using Native Code
### e. Touch Testing - using Native Code
### f. NFC Testing (TBD) - using Native Code

## 3. Device Health Timer & checks for device activation: