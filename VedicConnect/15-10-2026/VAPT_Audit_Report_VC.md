# VAPT Report — Android Application

**Assessment date:** 14 October 2026  
**Auditor:** Imperium Solutions  
**Audit conducted by:** Mr. Uday Gupta  
**Reviewed by:** Mr. Chris  
**Approved by:** Mr. Jude Dcosta  
**Classification:** Confidential

> This Markdown document reformats findings extracted from the supplied VAPT report. It is a remediation reference, not a replacement for the original signed report. Reported status for each finding is **New** and closure proof of concept is listed as **NA**. Retest before marking any finding closed.

## 1. Executive summary

The report contains ten findings:

| # | Finding | Reported severity | Primary area |
|---:|---|---|---|
| 1 | Client-side OTP validation bypass leading to account takeover | Critical | Backend authentication |
| 2 | Broken access control (IDOR) exposing sensitive user information | Critical | Backend authorization |
| 3 | Client-side appointment fee manipulation | Critical | Backend pricing/payments |
| 4 | Email OTP verification bypass during registration | High | Backend registration |
| 5 | Outdated PHP version disclosure | High | Server runtime/configuration |
| 6 | Hardcoded sensitive data | High | Android package/API-key configuration |
| 7 | External data storage | Medium | Android file handling |
| 8 | Weak encryption algorithms | Medium | Cryptography/dependency review |
| 9 | Weak hashing algorithms | Medium | Cryptography/dependency review |
| 10 | JavaScript enabled in a WebView | Medium | Android WebView/SDK configuration |

**Suggested order:** Fix IDOR and authentication/payment logic first. Then patch the server runtime and assess hardcoded values. Validate mobile static-analysis findings against actual code paths and data flows before changing dependencies or SDK behavior.


## Tools Used

| Sr. No. | Name of Tool / Software Used | Version of Tool / Software Used | Open Source / Licensed |
|---:|---|---:|---|
| 1 | Burp Suite Professional | 2025.5 | Licensed |
| 2 | ImmuniWeb | 5 | Licensed |

*Table 5.0 — Tools Used*

## 2. Detailed findings

## Finding 1 — Client-Side OTP Validation Bypass Leading to Account Takeover

- **Severity:** Critical; **Status:** New; **Observation:** New
- **Affected endpoints:** `/api/verifyEmailOTP`, `/api/ResetPassword`
- **CWE:** [CWE-602](https://cwe.mitre.org/data/definitions/602.html), [CWE-287](https://cwe.mitre.org/data/definitions/287.html), [CWE-640](https://cwe.mitre.org/data/definitions/640.html)

### Observation
During forgot-password testing, an invalid OTP (`1234`) was submitted. The tester intercepted the response using Burp Suite, changed the HTTP status to `200` and response parameter `success` to `true`. The application then allowed the password-reset workflow to proceed. This suggests that the client may trust response handling without the server independently enforcing OTP verification.

### Impact
An attacker may bypass OTP verification and potentially reset another user's password, leading to account takeover. Actual impact depends on whether the backend independently validates OTPs before authorizing a reset.

### Recommendations
1. Validate OTPs on the server before authorizing password reset.
2. Never treat client-controlled response fields or HTTP status handling as proof of authentication.
3. Bind each OTP to the intended account and reset transaction.
4. Enforce expiry, single-use behavior, attempt limits, and rate limiting.
5. Issue a short-lived reset token only after successful server-side verification.
6. Invalidate outstanding reset tokens and relevant sessions as appropriate after a password change.
7. Test invalid, expired, reused, missing, and tampered OTPs, including direct API calls.

**Closure tests:** Modify the response in a proxy and verify reset remains blocked; call reset without a server-issued reset token; verify OTPs cannot be reused or transferred between accounts.

**References:** [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html), [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).  
**Closure proof of concept in source report:** NA

---

## Finding 2 — Broken Access Control (IDOR): Unauthorized Access to Sensitive User Information

- **Severity:** Critical; **Status:** New; **Observation:** New
- **Affected endpoint:** `/api/getUserDetails?userId=`
- **CWE:** [CWE-639](https://cwe.mitre.org/data/definitions/639.html), [CWE-862](https://cwe.mitre.org/data/definitions/862.html), [CWE-359](https://cwe.mitre.org/data/definitions/359.html)

### Observation
The report observed a request using `userId=MTE2MA%3D%3D`, a Base64-encoded identifier that decodes to `1160`. Replacing it with another user's identifier, such as `1159` encoded in Base64, reportedly returned that user's information without proper server-side authorization. Exposed fields reportedly included mobile numbers, ABHA addresses and numbers, access tokens, device tokens, and bcrypt password hashes. Base64 is encoding, not security or authorization.

### Impact
A valid user could potentially enumerate identifiers and access other users' personal and health-related information. Exposed tokens may enable additional misuse depending on validity and scope. Password-hash disclosure can facilitate offline cracking attempts.

### Recommendations
1. Enforce server-side authorization for every object and request.
2. Derive the authenticated identity from a validated session/token; do not trust client-supplied `userId` for authorization.
3. Use role/attribute-based controls for legitimate administrative access.
4. Remove password hashes, access tokens, and device tokens from general user-detail responses.
5. Revoke/rotate potentially exposed tokens and assess logs for misuse.
6. Audit related endpoints for IDOR/Broken Object Level Authorization.
7. Rate-limit and monitor systematic identifier enumeration.
8. Treat Base64 only as a representation format.

**Closure tests:** Authenticate as User A and request User B's record; expect denial. Verify sensitive fields are not returned and review/rotate exposed tokens as necessary.

**References:** [OWASP IDOR Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html), [OWASP API Security — Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/).  
**Closure proof of concept in source report:** NA

---

## Finding 3 — Client-Side Price Manipulation Leading to Unauthorized Appointment Fee Reduction

- **Severity:** Critical; **Status:** New; **Observation:** New
- **Affected endpoint:** `/api/getDiscountedValue`
- **CWE:** [CWE-602](https://cwe.mitre.org/data/definitions/602.html), [CWE-472](https://cwe.mitre.org/data/definitions/472.html), CWE-840

### Observation
During appointment booking, the application requested a discounted value using a promo code and appointment fee. The report states that an invalid promo-code response was intercepted and modified to indicate success, setting `DiscountedAppointmentFee` to ₹1 instead of the original ₹300. The modified amount was reportedly displayed through checkout, including Razorpay. Actual financial impact depends on whether the backend independently validates order amount and payment.

### Impact
If the backend accepts the manipulated amount, an attacker may pay less than the valid fee and obtain paid services, causing financial loss.

### Recommendations
1. Calculate appointment fees and validate promo codes exclusively on the server.
2. Never trust client-side prices or response data as authoritative.
3. Create Razorpay orders using the backend-calculated amount.
4. Verify amount, currency, transaction status, and appointment details server-side before confirming booking.
5. Reject invalid, expired, ineligible, or tampered discounts.
6. Bind payment verification and appointment confirmation to the same server-generated order.
7. Test that response/request tampering cannot produce an accepted underpriced payment.

**Closure tests:** Alter the displayed fee and client response; verify server order amount remains correct. Test invalid/expired promo codes and confirm payment signature and amount validation before booking confirmation.

**References:** [OWASP Business Logic Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html), [Razorpay Orders API](https://razorpay.com/docs/api/orders/), [Razorpay payment signature verification](https://razorpay.com/docs/payments/server-integration/standard/integration-steps/#verify-payment-signature).  
**Closure proof of concept in source report:** NA

---

## Finding 4 — Email OTP Verification Bypass During Account Registration

- **Severity:** High; **Status:** New; **Observation:** New
- **Affected endpoint:** `/api/verifyEmailOTP`
- **CWE:** [CWE-602](https://cwe.mitre.org/data/definitions/602.html), [CWE-287](https://cwe.mitre.org/data/definitions/287.html), [CWE-345](https://cwe.mitre.org/data/definitions/345.html)

### Observation
The tester submitted an incorrect email OTP and modified the intercepted response from `success: false` to `success: true`. Registration reportedly proceeded, suggesting email verification may be trusted on the client rather than enforced by the server.

### Impact
An attacker may register using an email address they do not control, potentially enabling fraudulent registrations and bypassing email-ownership controls.

### Recommendations
1. Verify email OTP on the server before marking an address verified or completing registration.
2. Do not trust client-controlled success indicators.
3. Bind OTPs to the email address and registration transaction.
4. Enforce expiry, single-use behavior, attempt limits, and rate limiting.
5. Prevent unverified accounts from accessing protected features.
6. Reject incorrect, expired, reused, and missing OTPs.

**Closure tests:** Tamper with the response and submit invalid OTPs; registration and protected API access must remain blocked.

**References:** [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).  
**Closure proof of concept in source report:** NA

---

## Finding 5 — Outdated PHP Version Disclosure

- **Severity:** High (as assigned by the source report); **Status:** New
- **Affected asset:** `staging.ayurverse.health`
- **CWE:** CWE-200; CWE-1104 is noted in the source report as not directly applicable solely because PHP 8.3.14 was old while PHP 8.3 remained in its support lifecycle at the time referenced.

### Observation
The HTTP `X-Powered-By` header reportedly disclosed `PHP/8.3.14`. The report states that later PHP 8.3 patch releases with security fixes were available as of the assessment date. A version header alone does not prove a specific exploitable vulnerability; the runtime and extensions must be checked against advisories.

### Impact
An outdated runtime may contain known vulnerabilities depending on release, extensions, configuration, and code paths. Version disclosure also provides attackers with technology information.

### Recommendations
1. Upgrade to the latest patched compatible PHP release or a newer supported branch after testing.
2. Review official PHP advisories and enabled extensions.
3. Remove/suppress unnecessary `X-Powered-By` disclosure.
4. Establish routine patch management and regression testing.

**Closure tests:** Verify the deployed version is patched, confirm unnecessary headers are absent, and run staging regression tests.

**References:** [PHP Supported Versions](https://www.php.net/supported-versions.php), [PHP 8 changelog](https://www.php.net/ChangeLog-8.php), [PHP 8.3.14 release announcement](https://www.php.net/releases/8_3_14.php), [CWE-200](https://cwe.mitre.org/data/definitions/200.html).  
**Closure proof of concept in source report:** NA

---

## Finding 6 — Hardcoded Sensitive Data

- **Severity:** High; **Status:** New
- **Affected asset:** `res/values/strings.xml`
- **CWE:** [CWE-798 — Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)

### Observation
Potentially sensitive hardcoded data was identified in the Android package. APK contents can often be extracted through reverse engineering. The exact values must be classified to determine whether they are true secrets, public client identifiers, or restricted API keys.

### Impact
Exposed credentials or secrets may enable API abuse, data leakage, or unauthorized access. Not every mobile API key is a secret; risk depends on its permissions, restrictions, and services.

### Recommendations
1. Identify and classify each exposed value.
2. Never embed server credentials, passwords, private keys, or privileged secrets in the APK.
3. Enforce authorization on the server.
4. Apply least-privilege restrictions to client keys, including Android app/signing-certificate restrictions and API/service restrictions where supported.
5. Rotate genuine exposed credentials when warranted.
6. Scan the release APK and monitor key usage.
7. Do not blindly remove generated Firebase configuration values; verify restrictions and functionality first.

**Closure tests:** Inspect the release APK without publishing secrets, test key restrictions using authorized requests, verify release Firebase functionality, and document any rotations.

**References:** [CWE-798](https://cwe.mitre.org/data/definitions/798.html), [OWASP MASWE](https://mas.owasp.org/MASWE/), [OWASP MASTG](https://mas.owasp.org/MASTG/).  
**Closure proof of concept in source report:** NA

---

## Finding 7 — External Data Storage

- **Severity:** Medium; **Status:** New
- **CWE:** [CWE-922 — Insecure Storage of Sensitive Information](https://cwe.mitre.org/data/definitions/922.html)
- **Affected compiled classes/libraries reported:** `com/rnfs/RNFSManager.java`, `com/ReactNativeBlobUtil/ReactNativeBlobUtil.java`, `com/htmltopdf/HtmlToPdfModule.java`, `io/invertase/firebase/utils/ReactNativeFirebaseUtilsModule.java`, `C/d.java`, `M6/p.java`, `Z0/f.java`, `Z0/r.java`, `f1/C0525b.java`, `o1/C0971a.java`.

> These include compiled/decompiled identifiers and obfuscated names, not necessarily source files to edit directly. The source report repeats the RNFS entry.

### Observation
The application can read/write external storage. Shared external storage may be accessible to other applications under some conditions. The presence of storage APIs in a library does not by itself prove that sensitive data is stored insecurely.

### Impact
If sensitive files, tokens, or personal information are written to inadequately protected shared storage, they may be exposed or modified. Risk depends on actual paths, Android version, permissions, and content.

### Recommendations
1. Avoid storing sensitive data in shared external storage.
2. Prefer app-specific internal storage for confidential files.
3. Encrypt sensitive data at rest when external storage is unavoidable.
4. Validate files read from external storage before processing.
5. Trace RNFS, React Native Blob Util, HTML-to-PDF, and related library data flows.
6. Do not remove file-handling libraries solely because a scanner found storage APIs.

**Closure tests:** Identify exact paths and file contents; check whether prescription PDFs, medical reports, tokens, or personal data are stored there; verify permissions and cross-app access. Library API presence alone is not proof.

**References:** [OWASP MASVS — Storage](https://mas.owasp.org/MASVS/05-MASVS-STORAGE/), [Android app-specific storage](https://developer.android.com/training/data-storage/app-specific), [CWE-922](https://cwe.mitre.org/data/definitions/922.html).  
**Closure proof of concept in source report:** NA

---

## Finding 8 — Weak Encryption Algorithms

- **Severity:** Medium; **Status:** New
- **Affected compiled class:** `N2/AbstractC0939b.java`
- **CWE:** [CWE-327 — Use of a Broken or Risky Cryptographic Algorithm](https://cwe.mitre.org/data/definitions/327.html)

### Observation
The report states that weak or outdated encryption algorithms/configurations were identified, but the extracted text does not specify the exact algorithm, mode, key size, IV handling, key source, or protected data. Those details must be established before making changes.

### Impact
Weak algorithms or insecure configurations may expose protected data to cryptographic attacks. Risk depends on implementation and the information protected.

### Recommendations
1. Identify the algorithm, mode, key size, IV/nonce handling, key management, and purpose.
2. Prefer authenticated encryption such as AES-GCM for new symmetric-encryption designs where appropriate.
3. Avoid deprecated algorithms and insecure modes such as DES, RC4, and ECB.
4. Store/manage keys securely; use Android Keystore where appropriate.
5. Never hardcode cryptographic keys in the APK.
6. Trace whether the code belongs to the app or a third-party SDK.

**Closure tests:** Trace the flagged class using JADX or equivalent, document the implementation/data flow, test compatibility after changes, and provide evidence or a reasoned false-positive assessment.

**References:** [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html), [CWE-327](https://cwe.mitre.org/data/definitions/327.html), [NIST SP 800-57](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final).  
**Closure proof of concept in source report:** NA

---

## Finding 9 — Weak Hashing Algorithms

- **Severity:** Medium; **Status:** New
- **Affected compiled classes:** `C1/AbstractC0264a.java`, `P7/k.java`
- **CWE:** [CWE-327](https://cwe.mitre.org/data/definitions/327.html)

### Observation
The report mentions MD2, MD4, MD5, and SHA-1 as examples of weak hashes, but does not identify which algorithm is used by each flagged class or whether it is used for password storage, checksums, cache keys, or another purpose.

### Impact
Weak hashes can be unsuitable for collision-resistant security uses. If a weak or fast hash is used for password storage, stolen hashes may be subjected to offline cracking. Risk depends on algorithm and purpose.

### Recommendations
1. Trace each algorithm and identify its purpose.
2. For password storage, use a dedicated password-hashing function such as Argon2id, bcrypt, or scrypt, with unique salts and appropriate work factors.
3. Do not use MD5, SHA-1, or unsalted SHA-256/SHA-512 for password storage.
4. Choose modern algorithms appropriate to non-password use cases.
5. Review third-party SDK ownership and update/configure the relevant component where necessary.
6. Plan safe migration if existing password hashes need replacement.

**Closure tests:** Record the algorithm and purpose for each class, verify password storage is handled appropriately server-side, test compatibility/migration, and document any non-security-sensitive use.

**References:** [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [CWE-327](https://cwe.mitre.org/data/definitions/327.html), [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html).  
**Closure proof of concept in source report:** NA

---

## Finding 10 — JavaScript Enabled in a WebView

- **Severity:** Medium; **Status:** New
- **Affected compiled classes:** `B/RunnableC0249d.java`, `com/razorpay/MagicXActivity.java`
- **CWE:** [CWE-79 — Cross-Site Scripting](https://cwe.mitre.org/data/definitions/79.html), [CWE-749 — Exposed Dangerous Method or Function](https://cwe.mitre.org/data/definitions/749.html)

### Observation
The report states that JavaScript is enabled in a WebView. JavaScript can be risky when untrusted content is loaded or native interfaces are exposed. Enabling JavaScript is not automatically exploitable in every app; the content, navigation controls, bridges, and SDK requirements matter.

### Impact
Depending on WebView content and exposed interfaces, script injection or untrusted navigation may expose data or invoke native functionality. Payment SDKs may require JavaScript, so disabling it indiscriminately may break payment flows.

### Recommendations
1. Disable JavaScript where it is not required.
2. Where required, restrict content to trusted, controlled sources.
3. Apply strict URL allowlisting and block untrusted navigation.
4. Review JavaScript bridges and avoid exposing sensitive native methods.
5. Keep Android System WebView and SDKs updated.
6. Review the Razorpay SDK implementation before changing `MagicXActivity` behavior.

**Closure tests:** Identify WebViews and URLs, verify navigation restrictions, inspect bridge methods, regression-test payments, and document the business need/compensating controls if JavaScript is required.

**References:** [Android WebView security tips](https://developer.android.com/privacy-and-security/security-tips#webview), [WebView API](https://developer.android.com/reference/android/webkit/WebView.html), [WebSettings API](https://developer.android.com/reference/android/webkit/WebSettings.html).  
**Closure proof of concept in source report:** NA

---

## 3. Remediation priority

| Priority | Findings | Action |
|---|---|---|
| P0 | 2 — IDOR | Fix authorization, remove sensitive response fields, assess token exposure. |
| P0 | 1 — Password-reset OTP bypass | Enforce OTP and reset-token validation server-side. |
| P0 | 3 — Appointment fee manipulation | Calculate price server-side and validate Razorpay order/payment before booking. |
| P1 | 4 — Registration OTP bypass | Enforce email verification before activation/protected access. |
| P1 | 5 — PHP version disclosure | Patch runtime and suppress unnecessary version headers. |
| P1 | 6 — Hardcoded sensitive data | Classify values, restrict client keys, rotate real secrets. |
| P2 | 7–10 — Storage, encryption, hashing, WebView | Trace actual data flows and remediate confirmed weaknesses. |

This ordering is an engineering recommendation based on reported impact; it does not change the auditor's severity ratings.

## 4. React Native / Android notes

- OTP validation, object authorization, appointment pricing, promo-code validation, and payment confirmation must be enforced by the **backend**; TypeScript UI changes alone cannot close them.
- Decompiled/obfuscated names such as `N2/AbstractC0939b.java` are not necessarily source files. Trace them to original application code or a dependency.
- Firebase values such as `google_api_key`, `google_crash_reporting_api_key`, `google_app_id`, and `google_storage_bucket` may be generated configuration. Do not delete them blindly. Identify the exact value, restrict client keys appropriately, and verify the Firebase services used.
- Do not assume every hash is used for passwords; identify its purpose.
- Do not disable WebView JavaScript without checking payment SDK requirements.
- Confirm actual storage paths and data rather than treating use of a file API as proof of insecure storage.
- Retest the release APK because debug/release configurations may differ.

## 5. Retest checklist

- [ ] Invalid, expired, reused, or tampered OTP cannot authorize password reset.
- [ ] User A cannot retrieve User B's records.
- [ ] Password hashes, access tokens, and device tokens are not returned in general user-detail responses.
- [ ] Client tampering cannot reduce the server-calculated appointment fee.
- [ ] Registration cannot complete without server-validated email OTP.
- [ ] PHP runtime is patched and unnecessary version headers are suppressed.
- [ ] Exposed values are classified; real secrets are rotated where warranted; client keys are restricted.
- [ ] Sensitive files are not stored in unsafe shared locations.
- [ ] Encryption algorithms/configurations are identified and reviewed.
- [ ] Hash algorithms and their purposes are identified and reviewed.
- [ ] WebView URLs, JavaScript requirements, and native bridges are reviewed.
- [ ] Release-build regression tests pass.
- [ ] Closure evidence is sanitized and contains no real credentials, OTPs, tokens, or patient information.
- [ ] Auditor has reviewed evidence and updated finding statuses.

## 6. Auditor disclaimer (reformatted)

Imperium Solutions conducted the VAPT of the Android application as it existed on 14 October 2026. Security threats continually change and no application can be guaranteed 100% secure by testing alone.

The original report states that it does not protect against personal or business loss resulting from use of the described systems and offers no warranties, representations, or legal certifications. It does not warrant that testing was complete or error-free, that the application is suitable for a particular task, free of all defects, compliant with all standards, or compatible with every operating system, hardware platform, or application.

The application team is responsible for mitigating vulnerabilities. Maintenance, reconfiguration, or other changes after assessment may alter the findings and recommendations.

## 7. Glossary

| Acronym | Meaning |
|---|---|
| CERT-In | Computer Emergency Response Team — India |
| OWASP | Open Worldwide Application Security Project |
| SANS | SysAdmin, Audit, and Network Security Institute |
| PTES | Penetration Testing Execution Standard |
| CIS | Center for Internet Security |
| ATT&CK | Adversarial Tactics, Techniques, and Common Knowledge |
| CVE | Common Vulnerabilities and Exposures |
| CVSS | Common Vulnerability Scoring System |
| CWE | Common Weakness Enumeration |
| IDOR | Insecure Direct Object Reference |
| OTP | One-Time Password |
| API | Application Programming Interface |
| APK | Android Package |

## 8. Appendix A — CERT-In compliance status

The source report marks the following areas **Not in Scope**:

- ICT clock synchronization with NIC/NPL.
- Cyber-incident reporting policy, including CERT-In timelines and templates.
- Designation of a CERT-In point of contact.
- Logging enablement, secure storage, 180-day rolling retention, and storage of logs in India.
- Five-year record retention for data-center, VPS, VPN, or cloud-service providers.
- Five-year KYC and transaction record retention for virtual-asset service providers, exchanges, or custodian wallet providers.
- Reconstruction of virtual-asset transactions including parties, IP addresses, timestamps/time zones, transaction IDs, identifiers, nature/date, and amounts.

Contact details reproduced in the source report:

- **Email:** `incident@cert-in.org.in`
- **Phone:** `1800-11-4949`
- **Fax:** `1800-11-6969`
- **Website:** https://www.cert-in.org.in

Verify current official CERT-In guidance before relying on contact details or reporting procedures.

## 9. Sign-off

- **Audit conducted by:** Mr. Uday Gupta
- **Report reviewed by:** Mr. Chris
- **Report approved by:** Mr. Jude Dcosta
- **Date:** 14 October 2026

---

## Document maintenance

| Field | Value |
|---|---|
| Document | Markdown VAPT findings and remediation reference |
| Source report date | 14 October 2026 |
| Remediation status | Not independently verified in this document |
| Intended use | Engineering remediation, retesting, and audit closure tracking |
| Classification | Confidential — restrict distribution |
