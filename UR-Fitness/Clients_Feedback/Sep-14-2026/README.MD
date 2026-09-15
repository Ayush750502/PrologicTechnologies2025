# Milestone 1 — Client Feedback & Requirements

## Overview

This document captures the client feedback and requirements identified during the **Milestone 1 review**. The feedback is organized by functional area, along with the current status and any dependencies or open questions.

---

# 1. UI

## 1.1 Logo Visibility and Typography `To Do`

* Use a **white background** to ensure the logo (mobile app icon) stands out.

| Change    | From                                     | To                                        |
|-----------|------------------------------------------|-------------------------------------------|
|     :-    | <img src="./appIcon.png" height=250 />   | <img src="./newAppIcon.png" height=250 /> |
---

## 1.2 Application Color Theme `To Do`

* Confirm whether both applications should use the **same color theme** or different themes.

| Titles    | 1                                        | 2                                        |
|-----------|------------------------------------------|------------------------------------------|
| **Phone** | Redmi Note 8                             | Redmi 9A                                 |
| **Image** | <img src="./redmi-v11.png" height=700 /> | <img src="./redmi-v10.png" height=700 /> |

---

## 1.3 Mobile UI Theme Variants `To Do`

Provide client-specific mobile screen theme variants:

1. **Light Variant**

   * Lighter grey background
   * Dark cards

2. **Dark Variant**

   * Dark background
   * Lighter cards

---

## 1.4 SHRED Mobile App Screen Design References `Waiting for Client`

Use the **SHRED screen references provided by the client** as the design baseline for the following sections:

* Nutrition
* Training
* Education
* Profile

### Dependency

* Client needs to provide the SHRED screen references.

---

# 2. Diet

## 2.1 Meal Master Data Configuration `Waiting for Client`

* Client will provide the **master data for Meals**.
* Admin should be able to configure meal information, including:

  * Meal name
  * Base quantity / portion size
  * Calories
  * Other relevant meal information

### Dependency

* Client needs to provide the Meal master data.

---

## 2.2 Diet Plan and Calorie Adjustment `Waiting for Client`

Client will provide the **diet plan catalog**.

Users should be able to modify the quantity of assigned meal items. The system should automatically:

* Recalculate calorie counts based on the modified quantity.
* Update the remaining daily calorie allowance accordingly.

### 2.2.1 Partial Meal Consumption Tracking

If a user consumes less than the recommended quantity, the system should calculate calories based on the **actual quantity consumed**.

**Example:**

> If 4 chapatis are recommended for breakfast and the user consumes only 2, calories should be calculated for 2 chapatis.

### 2.2.2 Alternate Meal Options

* Nutritionists will provide alternate meal options.
* Approximately **3 overall meal alternatives** should be available.
* Users should not be restricted to a single meal option.

### 2.2.3 Manual Meal Selection

If predefined alternatives are not available, users should be able to:

1. Search from existing meals.
2. Add a meal manually if it does not already exist.
3. Enter the calorie value for the manually added meal.

### Dependency

* Client needs to provide the diet plan catalog and meal alternatives.

---

## 2.3 Weekly Calorie Averages `To Do`

Provide **weekly calorie averages**.

Users should be able to:

* Review weekly calorie intake.
* Manage/review calorie consumption based on daily calorie data.

---

# 3. Web / Staff Management

## 3.1 Staff Schedule and Availability `To Do`

Provide a staff roster/schedule view that allows users to identify:

* Staff schedule
* Staff availability
* Whether a staff member is on leave

---

# 4. Web / Responsive Design

## 4.1 Mobile-Responsive Web Application `To Do`

The web application must be **mobile responsive**.

### Client Preference

* Client prefers a mobile-friendly web experience.

---

# 5. Web / Lead Management

## 5.1 Lead Ownership and Role-Based Management `To Do`

Leads should be managed according to the following roles:

| Lead Stage  | Responsible Role |
| ----------- | ---------------- |
| All stages  | Front Desk       |
| Trial stage | Front Desk       |
| Trial stage | Floor Manager    |
| Trial stage | Trainer          |

### Expected Behavior

* Front Desk should manage leads throughout all stages.
* During the trial stage, the **Floor Manager** and **Trainer** should also have lead management access.

---

# 6. Web / Membership

## 6.1 Membership Upgrade Discount `To Do`

Apply an appropriate discount when a client upgrades an existing membership.

### Example

A client currently having a **3-month membership** should receive an applicable discount when upgrading to another membership plan.

---

## 6.2 Student Membership Discount `Waiting for Client`

Allow users to qualify for a student discount by:

1. Selecting their university.
2. Entering their student ID.
3. Completing the required student verification process.

### Dependency

Client will provide:

* Login details
* Screen references

### Open Questions

* How should the system verify that the student is genuine?
* How should the system prevent a student from using another student's credentials?

---

# 7. Workout / Trainer

## 7.1 Daily and Ongoing Workout Modifications `To Do`

Trainers should be able to modify a client's workout:

1. **Overall workout**
2. **Specific day's workout**

   * Example: Goal Less Workout

### Change Tracking

Workout changes should be trackable, including:

* When a trainer leaves.
* When another trainer is assigned.
* Changes made by trainers.
* Relevant users should be notified when applicable.

### Workout History

Trainers should be able to view **past workouts assigned to a client**.

Past workout details should include:

* Workout Template Name
* Exercise List
* Exercise Name
* Sets
* Reps
* Other relevant exercise metadata

---

# 8. Status Summary

| Status               |  Items |
| -------------------- | -----: |
| `To Do`              |     10 |
| `Waiting for Client` |      4 |
| **Total**            | **14** |

---

# 9. Client Dependencies

The following items are currently dependent on information or assets from the client:

### UI

* SHRED mobile app screen references

### Diet

* Meal master data
* Diet plan catalog
* Alternate meal options

### Membership

* Student membership login details
* Student membership screen references
* Clarification on student verification

---

# 10. Open Questions

The following points require clarification before implementation can be finalized:

1. Should both applications use the same color theme?
2. How should student authenticity be verified?
3. How should the system prevent students from using another student's credentials?
4. What exact discount should be applied when upgrading an existing membership?
5. What are the exact rules for calorie recalculation when meal quantities are modified?
6. What notification events should be triggered when trainers are reassigned or workouts are modified?

---

# 11. Implementation Priority

Based on the current status:

### Priority 1 — Client Inputs Required

* SHRED design references
* Meal master data
* Diet plan catalog
* Alternate meal options
* Student membership references and login details
* Student verification rules

### Priority 2 — Development Tasks

* Application theme confirmation and implementation
* Weekly calorie averages
* Staff schedule and availability
* Responsive web application
* Lead ownership and role-based management
* Membership upgrade discounts
* Workout modification and history tracking

### Priority 3 — Clarifications

* Application color theme
* Student verification mechanism
* Student credential misuse prevention
* Membership discount rules
* Workout change notification rules
