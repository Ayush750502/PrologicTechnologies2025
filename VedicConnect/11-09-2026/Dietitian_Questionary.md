# Dietitian Patient Questionnaire

**Pre-Consultation Health & Nutrition Assessment — Mobile App**

**Flow:**
Basic Details → Medical History → Goals → Food Habits → Allergies / Intolerances → Lifestyle / Activity → Review → Submit

---

# 1. Basic Details

## Personal Details

| Field         | Input Type              | Options / Values                          | Required | Conditional |
| ------------- | ----------------------- | ----------------------------------------- | -------- | ----------- |
| Full Name     | Text Input              | Free text                                 | Yes      | —           |
| Date of Birth | Date Picker             | Date                                      | Yes      | —           |
| Gender        | Bottom Sheet / Dropdown | Male / Female / Other / Prefer not to say | Yes      | —           |
| Mobile Number | Phone Input             | Phone number                              | Yes      | —           |
| Email         | Email Input             | Email address                             | No       | —           |
| Profile Photo | Image Upload            | Camera / Gallery                          | No       | —           |

## Body Measurements

| Field                | Input Type           | Options / Values                               | Required | Conditional                                  |
| -------------------- | -------------------- | ---------------------------------------------- | -------- | -------------------------------------------- |
| Current Weight       | Number Input         | kg                                             | Yes      | —                                            |
| Height               | Feet & Inches Input  | Feet + Inches                                  | Yes      | —                                            |
| Waist Measurement    | Number Input         | cm                                             | No       | —                                            |
| Recent Weight Change | Radio / Bottom Sheet | No change / Increased / Decreased              | Yes      | —                                            |
| Amount of Change     | Number Input         | kg                                             | Yes*     | Recent Weight Change = Increased / Decreased |
| **Time Period***          | Dropdown             | <1 month / 1–3 months / 3–6 months / >6 months | Yes*     | Recent Weight Change = Increased / Decreased |

> [!NOTE]
> Add Time Period in JSON

## Additional

| Field                  | Input Type     | Options / Values                                                                  | Required | Conditional        |
| ---------------------- | -------------- | --------------------------------------------------------------------------------- | -------- | ------------------ |
| Occupation             | Dropdown       | Office Work / On-Field Work / Student / Homemaker / Retired / Manual Work / Other | Yes      | —                  |
| **Other Occupation***       | Text Input     | Specify occupation                                                                | Yes*     | Occupation = Other |
| City / State / Country  | Location Input(Text) | City / State / Country                                                            | Yes      | —                  |

> [!NOTE]
> Add Other Occupation in JSON

---

# 2. Medical History

## Existing Conditions

| Field              | Input Type            | Options / Values                                                                                                                                                | Required | Conditional                |
| ------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------- |
| Medical Conditions | Multi-select Dropdown | Diabetes / Prediabetes / Thyroid / PCOS-PCOD / High Cholesterol / High BP / Heart / Kidney / Liver / GERD-Acidity / Anemia / Arthritis / Obesity / Other / None | Yes      | —                          |
| **Other Condition***    | Text Input            | Specify condition                                                                                                                                               | Yes*     | Medical Conditions = Other |

> [!NOTE]
> Add Other Condition in JSON

## Symptoms

| Field            | Input Type   | Options / Values                                                                                                        | Required | Conditional              |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------ |
| Current Symptoms | Multi-select | Fatigue / Acidity / Constipation / Diarrhea / Bloating / Headache / Dizziness / Nausea / Appetite Change / Other / None | Yes      | —                        |
| **Other Symptom***    | Text Input   | Specify symptom                                                                                                         | Yes*     | Current Symptoms = Other |
| Symptom Duration | Dropdown     | <1 week / 1–4 weeks / 1–6 months / >6 months                                                                            | Yes*     | Current Symptoms ≠ None  |

> [!NOTE]
> Add Other Symptom in JSON


## Medication & Supplements

* **Taking medication?** — Yes / No — Required
* **Medicine name, dosage, frequency, reason** — Conditional
* **Taking supplements?** — Yes / No — Required
* **Supplements** — Protein / Multivitamin / Vitamin D / B12 / Iron / Calcium / Omega-3 / Other — Conditional

| Field                     | Input Type                | Options / Values                                                            | Required | Conditional / Validation                   |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------------ |
| **Taking Medication?**    | Radio / Segmented Control | Yes / No                                                                    | Yes      | —                                          |
| **Medicine Name**         | Text Input                | Medicine name                                                               | Yes*     | Display when **Taking Medication = Yes**.  |
| **Dosage**                | Text Input                | Dosage amount and unit                                                      | Yes*     | Display when **Taking Medication = Yes**.  |
| **Frequency**             | Dropdown / Text Input     | As prescribed / Once daily / Twice daily / Thrice daily / Other             | Yes*     | Display when **Taking Medication = Yes**.  |
| **Reason for Medication** | Text Input / Text Area    | Reason for taking medicine                                                  | Yes*     | Display when **Taking Medication = Yes**.  |
| **Taking Supplements?**   | Radio / Segmented Control | Yes / No                                                                    | Yes      | —                                          |
| **Supplements**           | Multi-select Dropdown     | Protein / Multivitamin / Vitamin D / B12 / Iron / Calcium / Omega-3 / Other | Yes*     | Display when **Taking Supplements = Yes**. |
| **Other Supplement***     | Text Input                | Specify supplement                                                          | Yes*     | Display when **Supplements = Other**.      |

> [!NOTE]
> 1. Need to add Medicine Details: Name, unit, dosage in proper format in JSON.
> 2. Add Other Supplement in JSON

## History & Reports

* **Surgery?** — Yes / No; name/date if Yes — Required
* **Was Hospitalization?** — Yes / No — Required
* **Family history** — Diabetes / Heart / BP / Obesity / Thyroid / Cancer / Kidney / Other / None — Required
* **Recent medical/lab reports?** — Yes / No — Required
* **Upload Reports up to specific limit** — PDF / JPG / PNG — Conditional

| Field                           | Input Type                | Options / Values                                                           | Required | Conditional / Validation                                                                               |
| ------------------------------- | ------------------------- | -------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| **Surgery?**                    | Radio / Segmented Control | Yes / No                                                                   | Yes      | —                                                                                                      |
| **Surgery Name**                | Text Input                | Name/type of surgery                                                       | Yes*     | Display when **Surgery = Yes**.                                                                        |
| **Surgery Date**                | Date Picker               | Date of surgery                                                            | Yes*     | Display when **Surgery = Yes**.                                                                        |
| **Was Hospitalization?**        | Radio / Segmented Control | Yes / No                                                                   | Yes      | —                                                                                                      |
| **Family History**              | Multi-select Dropdown     | Diabetes / Heart / BP / Obesity / Thyroid / Cancer / Kidney / Other / None | Yes      | If **None** is selected, other options should not be selectable.                                       |
| **Other Family History**        | Text Input                | Specify condition/history                                                  | Yes*     | Display when **Family History = Other**.                                |
| **Recent Medical/Lab Reports?** | Radio / Segmented Control | Yes / No                                                                   | Yes      | —                                                                                                      |
| **Upload Reports**              | File Upload               | PDF / JPG / PNG                                                            | Yes*     | Display when **Recent Medical/Lab Reports = Yes**. Apply the configured maximum file count/size limit. |

> [!NOTE]
> 1. Surgury Details like Name and data are not added properly in JSON.
> 2. Other Family History option need to add in JSON.

---

# ~~3. Goals~~

## ~~Primary Goal~~

* ~~**Goal (dropdown)** — Weight Loss / Weight Gain / Maintain Weight / Muscle Gain / General Health / Energy / Digestion / Diabetes / Cholesterol / BP / PCOS-PCOD / Sports Nutrition / Pregnancy Nutrition / Child Nutrition / Other — Required~~

## ~~Target~~

* ~~**Target Weight** — kg — Conditional~~
* ~~**Preferred Timeline** — 1 month / 3 months / 6 months / No specific timeline — Conditional~~

## ~~Motivation~~

* ~~**Main reason** — Health / Appearance / Fitness / Energy / Medical condition / Doctor recommendation / Event / Other — Required~~
* ~~**Motivation** — 1 to 5 — Required~~

---

# 4. Food Habits

## Diet Preference

* **Diet type** — Vegetarian / Vegan / Eggetarian / Non-Vegetarian / Jain / Other — Required

| Field               | Input Type                     | Options / Values                                                | Required | Conditional / Validation                                           |
| ------------------- | ------------------------------ | --------------------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| **Diet Type**       | Single-select Dropdown / Radio | Vegetarian / Vegan / Eggetarian / Non-Vegetarian / Jain / Other | Yes      | —                                                                  |
| **Other Diet Type** | Text Input                     | Specify diet type                                               | Yes*     | Display when **Diet Type = Other**. Add the entered value to JSON. |

> [!NOTE]
> Other Diet Type option is not mentioned in JSON.

## Meal Pattern

* **Meals per day** — 1 / 2 / 3 / 4 / 5+ — Required
* **Breakfast, Lunch, Dinner times** — Time — Required
* **Snacks between meals?** — Yes / No; typical snacks if Yes — Required

| Field                     | Input Type                     | Options / Values                 | Required | Conditional / Validation                     |
| ------------------------- | ------------------------------ | -------------------------------- | -------- | -------------------------------------------- |
| **Meals per Day**         | Single-select Dropdown / Radio | 1 / 2 / 3 / 4 / 5+               | Yes      | —                                            |
| **Breakfast Time**        | Time Picker                    | Time                             | Yes      | —                                            |
| **Lunch Time**            | Time Picker                    | Time                             | Yes      | —                                            |
| **Dinner Time**           | Time Picker                    | Time                             | Yes      | —                                            |
| **Snacks Between Meals?** | Radio / Segmented Control      | Yes / No                         | Yes      | —                                            |
| **Typical Snacks**        | Text Input / Text Area         | Specify commonly consumed snacks | Yes*     | Display when **Snacks Between Meals = Yes**. |

## Food Frequency

| Field            | Input Type             | Options / Values                               | Required | Conditional / Validation |
| ---------------- | ---------------------- | ---------------------------------------------- | -------- | ------------------------ |
| **Fruits**       | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Vegetables**   | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Dairy**        | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Eggs**         | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Chicken/Meat** | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Fish**         | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Fried Food**   | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Fast Food**    | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Sweets**       | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |
| **Soft Drinks**  | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely / Never | Yes      | —                        |

> [!NOTE]
> options are different than that in documentation i.e they are same as that in Meal Pattern.


## Eating Behaviour

* **Outside/home delivery** — Daily / 3–5× week / 1–2× week / Rarely
* **Meal skipping** — Never / Occasionally / Frequently / Almost daily
* **Late-night eating** — Never / Sometimes / Often / Daily
* **Water** — <1L / 1–2L / 2–3L / >3L
* **Sugary drinks** — Never / Occasionally / Daily / Multiple/day
* **Desserts** — Rarely / 1–2× week / 3–5× week / Daily

| Field                            | Input Type             | Options / Values                                 | Required | Conditional / Validation |
| -------------------------------- | ---------------------- | ------------------------------------------------ | -------- | ------------------------ |
| **Outside Food / Home Delivery** | Single-select Dropdown | Daily / 3–5× week / 1–2× week / Rarely           | Yes      | —                        |
| **Meal Skipping**                | Single-select Dropdown | Never / Occasionally / Frequently / Almost daily | Yes      | —                        |
| **Late-night Eating**            | Single-select Dropdown | Never / Sometimes / Often / Daily                | Yes      | —                        |
| **Water Intake**                 | Single-select Dropdown | <1L / 1–2L / 2–3L / >3L                          | Yes      | —                        |
| **Sugary Drinks**                | Single-select Dropdown | Never / Occasionally / Daily / Multiple/day      | Yes      | —                        |
| **Desserts**                     | Single-select Dropdown | Rarely / 1–2× week / 3–5× week / Daily           | Yes      | —                        |

> [!NOTE]
> In JSON it contains option that should be in Food Frequency

## Typical Daily Food

* **Breakfast** — Free text
* **Mid-morning** — Free text
* **Lunch** — Free text
* **Evening snack** — Free text
* **Dinner** — Free text
* **Late-night food** — Free text

| Field               | Input Type | Options / Values                        | Required | Conditional / Validation |
| ------------------- | ---------- | --------------------------------------- | -------- | ------------------------ |
| **Breakfast**       | Text Area  | Describe typical breakfast              | Yes      | —                        |
| **Mid-morning**     | Text Area  | Describe typical mid-morning food/drink | Yes      | —                        |
| **Lunch**           | Text Area  | Describe typical lunch                  | Yes      | —                        |
| **Evening Snack**   | Text Area  | Describe typical evening snack          | Yes      | —                        |
| **Dinner**          | Text Area  | Describe typical dinner                 | Yes      | —                        |
| **Late-night Food** | Text Area  | Describe typical late-night food/drink  | Yes      | —                        |

> [!NOTE]
> In JSON it contains options that should be in Eating Behaviour

## 24-Hour Recall (Recommended)

* **Yesterday's meals/drinks** — Meal-by-meal time + approximate quantity
* **Meal photo** — Optional upload

| Field                        | Input Type           | Options / Values                                        | Required | Conditional / Validation                                          |
| ---------------------------- | -------------------- | ------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| **Yesterday's Meals/Drinks** | Dynamic Meal Entries | Meal name / Food & drinks / Time / Approximate quantity | Yes      | Allow the patient to add multiple meal entries.                   |
| **Meal Photo**               | Image Upload         | JPG / PNG                                               | No       | Optional. Allow one or multiple photos based on configured limit. |

### Meal Entry Structure

| Field                    | Input Type             | Required | Description                                                                   |
| ------------------------ | ---------------------- | -------- | ----------------------------------------------------------------------------- |
| **Meal Type**            | Dropdown               | Yes      | Breakfast / Mid-morning / Lunch / Evening Snack / Dinner / Late-night / Other |
| **Time**                 | Time Picker            | Yes      | Time at which the meal/drink was consumed                                     |
| **Food / Drink**         | Text Input / Text Area | Yes      | Food and beverages consumed                                                   |
| **Approximate Quantity** | Text Input             | Yes      | Approximate quantity, e.g. 2 rotis, 1 bowl, 250 ml, 1 cup                     |
| **Meal Photo**           | Image Upload           | No       | Optional photo associated with the meal                                       |

> [!NOTE]
> In Json it is a text area.

---

# 5. Allergies / Intolerances

## Food Allergy

* **Any food allergy?** — Yes / No / Not sure — Required
* **Allergies** — Milk/Dairy / Eggs / Peanuts / Tree nuts / Wheat / Gluten / Soy / Fish / Shellfish / Other — Conditional
* **Other allergy** — Text — Conditional

| Field                 | Input Type                | Options / Values                                                                          | Required | Conditional / Validation                                           |
| --------------------- | ------------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| **Any Food Allergy?** | Radio / Segmented Control | Yes / No / Not sure                                                                       | Yes      | —                                                                  |
| **Allergies**         | Multi-select Dropdown     | Milk/Dairy / Eggs / Peanuts / Tree Nuts / Wheat / Gluten / Soy / Fish / Shellfish / Other | Yes*     | Display when **Any Food Allergy = Yes**.                           |
| **Other Allergy**     | Text Input                | Specify allergy                                                                           | Yes*     | Display when **Allergies = Other**. |


## Food Intolerance

* **Any intolerance/discomfort?** — Yes / No / Not sure — Required
* **Trigger food** — Free text — Conditional
* **Reaction** — Bloating / Gas / Diarrhea / Stomach pain / Skin reaction / Headache / Other — Conditional

| Field                             | Input Type                | Options / Values                                                            | Required | Conditional / Validation                                          |
| --------------------------------- | ------------------------- | --------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| **Any Intolerance / Discomfort?** | Radio / Segmented Control | Yes / No / Not sure                                                         | Yes      | —                                                                 |
| **Trigger Food**                  | Text Input / Text Area    | Specify food(s) that trigger discomfort                                     | Yes*     | Display when **Any Intolerance / Discomfort = Yes**.              |
| **Reaction**                      | Multi-select Dropdown     | Bloating / Gas / Diarrhea / Stomach Pain / Skin Reaction / Headache / Other | Yes*     | Display when **Any Intolerance / Discomfort = Yes**.              |
| **Other Reaction**                | Text Input                | Specify reaction                                                            | Yes*     | Display when **Reaction = Other**. |

> [!NOTE]
> Add Other Reaction field in JSON.

## Restrictions

* **Foods avoided for personal/cultural/other reasons?** — Yes / No; specify if Yes
* **Food avoided** — Conditional
* **Foods strongly disliked** — Free text — Optional

| Field                                                      | Input Type                | Options / Values                                     | Required | Conditional / Validation                                        |
| ---------------------------------------------------------- | ------------------------- | ---------------------------------------------------- | -------- | --------------------------------------------------------------- |
| **Foods Avoided for Personal / Cultural / Other Reasons?** | Radio / Segmented Control | Yes / No                                             | Yes      | —                                                               |
| **Food Avoided**                                           | Text Input / Text Area    | Specify food(s) being avoided                        | Yes*     | Display when **Foods Avoided = Yes**.                           |
| **Foods Strongly Disliked**                                | Text Input / Text Area    | Specify disliked food(s)                             | No       | Optional.                                                       |

---

# 6. Lifestyle / Activity

## Physical Activity

* **Daily activity** — Mostly sitting / Light / Moderate / Very active / Extremely active — Required
* **Exercise regularly?** — Yes / No — Required
* **Exercise type** — Walking / Running / Gym / Yoga / Cycling / Swimming / Sports / Other — Conditional
* **Days per week** — 1–7 — Conditional
* **Duration** — <30 / 30–60 / 60–90 / >90 min — Conditional

| Field                    | Input Type                     | Options / Values                                                     | Required | Conditional / Validation                                               |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| **Daily Activity Level** | Single-select Dropdown / Radio | Mostly Sitting / Light / Moderate / Very Active / Extremely Active   | Yes      | —                                                                      |
| **Exercise Regularly?**  | Radio / Segmented Control      | Yes / No                                                             | Yes      | —                                                                      |
| **Exercise Type**        | Multi-select Dropdown          | Walking / Running / Gym / Yoga / Cycling / Swimming / Sports / Other | Yes*     | Display when **Exercise Regularly = Yes**.                             |
| **Other Exercise Type**  | Text Input                     | Specify exercise type                                                | Yes*     | Display when **Exercise Type = Other**. Add the entered value to JSON. |
| **Days per Week**        | Single-select Dropdown         | 1 / 2 / 3 / 4 / 5 / 6 / 7                                            | Yes*     | Display when **Exercise Regularly = Yes**.                             |
| **Exercise Duration**    | Single-select Dropdown         | <30 min / 30–60 min / 60–90 min / >90 min                            | Yes*     | Display when **Exercise Regularly = Yes**.                             |

> [!NOTE]
> Other Exercise Type is not their in JSON

## Daily Steps

* **Steps/day** — <2,000 / 2,000–5,000 / 5,000–8,000 / 8,000–10,000 / 10,000+ / Don't know — Required

| Field             | Input Type                     | Options / Values                                                         | Required | Conditional / Validation |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------ | -------- | ------------------------ |
| **Steps per Day** | Single-select Dropdown / Radio | <2,000 / 2,000–5,000 / 5,000–8,000 / 8,000–10,000 / 10,000+ / Don't Know | Yes      | —                        |

## Sleep

* **Hours/night** — <5 / 5–6 / 6–7 / 7–8 / 8+ — Required
* **Sleep quality** — 1–5 — Required
* **Usual sleep time** — Time — Required
* **Wake-up time** — Time — Required

| Field                        | Input Type             | Options / Values          | Required | Conditional / Validation      |
| ---------------------------- | ---------------------- | ------------------------- | -------- | ----------------------------- |
| **Hours of Sleep per Night** | Single-select Dropdown | <5 / 5–6 / 6–7 / 7–8 / 8+ | Yes      | —                             |
| **Sleep Quality**            | Rating / Scale         | 1 / 2 / 3 / 4 / 5         | Yes      | 1 = Very Poor, 5 = Excellent. |
| **Usual Sleep Time**         | Time Picker            | Time                      | Yes      | —                             |
| **Wake-up Time**             | Time Picker            | Time                      | Yes      | —                             |

## Work & Routine

* **Work schedule** — Day / Night shift / Rotating / WFH / Irregular / Other — Required
* **Sitting hours/day** — <2 / 2–4 / 4–6 / 6–8 / 8+ — Required

| Field                     | Input Type                     | Options / Values                                       | Required | Conditional / Validation                                               |
| ------------------------- | ------------------------------ | ------------------------------------------------------ | -------- | ---------------------------------------------------------------------- |
| **Work Schedule**         | Single-select Dropdown / Radio | Day / Night Shift / Rotating / WFH / Irregular / Other | Yes      | —                                                                      |
| **Other Work Schedule**   | Text Input                     | Specify work schedule                                  | Yes*     | Display when **Work Schedule = Other**. Add the entered value to JSON. |
| **Sitting Hours per Day** | Single-select Dropdown         | <2 / 2–4 / 4–6 / 6–8 / 8+                              | Yes      | —                                                                      |

> [!NOTE]
> Other Work Schedule option is not their in JSON

## Stress

* **Stress level** — 1–5 — Required
* **Does stress affect eating?** — Eat more / Eat less / Sometimes / No — Required

| Field                          | Input Type                     | Options / Values                     | Required | Conditional / Validation     |
| ------------------------------ | ------------------------------ | ------------------------------------ | -------- | ---------------------------- |
| **Stress Level**               | Rating / Scale                 | 1 / 2 / 3 / 4 / 5                    | Yes      | 1 = Very Low, 5 = Very High. |
| **Does Stress Affect Eating?** | Single-select Dropdown / Radio | Eat More / Eat Less / Sometimes / No | Yes      | —                            |

---

# 7. Conditional Question Logic

* Diabetes/medical condition selected → show relevant follow-up questions and report upload.
* Weight Loss/Weight Gain selected → ask target weight and timeline.
* Allergy = Yes → ask affected food and reaction.
* Intolerance = Yes → ask trigger food and symptoms.
* Medication = Yes → ask medicine name, dosage, frequency and reason.
* Supplements = Yes → ask supplement type/details.
* Exercise = Yes → ask type, days/week and duration.
* Reports = Yes → enable medical/lab report upload.
* Other selected → show **"Please specify"** field.

---

# 8. Mobile Screen Flow

1. **Screen 1 — Basic Details**
2. **Screen 2 — Medical History**
3. **Screen 3 — Goals**
4. **Screen 4 — Food Habits**
5. **Screen 5 — Allergies / Intolerances**
6. **Screen 6 — Lifestyle / Activity**
7. **Screen 7 — Review Answers**
8. **Screen 8 — Submit & Confirmation**

---

# 9. Product Rules

* Show progress, e.g. **1 of 6**.
* Allow Back/Next without losing entered data.
* Validate required fields before Next.
* Use conditional questions to keep the questionnaire relevant.
* Provide a final Review Answers screen before submission.
* After submission, mark assessment as **Completed** and notify the dietitian.
* Do not automatically diagnose a medical condition from questionnaire answers.
* Clinical test requirements should be determined by the qualified clinician.
* Keep uploaded reports linked to the patient and relevant appointment.

---

# 10. Dietitian View After Submission

The dietitian should receive a structured patient summary containing:

* Basic Details
* Measurements
* Medical History
* Symptoms
* Medications
* Reports
* Goals
* Diet Preference
* Meal Pattern
* Food Recall
* Allergies/Intolerances
* Activity
* Sleep
* Work Routine
* Stress

This information is available before/during the video consultation and can be used while creating or editing the personalized diet plan.
