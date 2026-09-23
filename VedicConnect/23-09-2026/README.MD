
# Pre-consultation Form Apis:

## 1. Health Details Form:

```cmd
curl --request GET \
  --url http://192.168.1.216/vedicconnectconsultancy/api/healthDetailQuestions \
  --header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiTVRFME5nPT0iLCJlbWFpbCI6Im1laGFrKzFAcHJvbG9naWN0ZWNobm9sb2dpZXMuaW4iLCJuYW1lIjoiVGVzdCIsImV4cCI6MTgyMTY3ODQ1OH0.sXssFR42YMOpBi1Mf3L7kqBi7pqfebRB3Qoh_Dm0Ick'
```

**response:**
```json
{
  "meta": {
    "success": true,
    "code": 200,
    "message": "Health detail questions fetched successfully."
  },
  "data": [
    {
      "iId": 23,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Stress",
      "jQuestionJson": [
        {
          "max": 5,
          "min": 1,
          "name": "stressLevel",
          "type": "number",
          "label": "Stress Level",
          "required": true
        },
        {
          "name": "stressAffectsEating",
          "type": "select",
          "label": "Does Stress Affect Eating?",
          "options": [
            "Eat More",
            "Eat Less",
            "Sometimes",
            "No"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:29:11"
    },
    {
      "iId": 22,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Work & Routine",
      "jQuestionJson": [
        {
          "name": "workSchedule",
          "type": "select",
          "label": "Work Schedule",
          "options": [
            "Day",
            "Night Shift",
            "Rotating",
            "WFH",
            "Irregular",
            "Other"
          ],
          "required": true
        },
        {
          "name": "sittingHoursPerDay",
          "type": "select",
          "label": "Sitting Hours per Day",
          "options": [
            "<2",
            "2–4",
            "4–6",
            "6–8",
            "8+"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:29:11"
    },
    {
      "iId": 21,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Sleep",
      "jQuestionJson": [
        {
          "name": "sleepHours",
          "type": "select",
          "label": "Hours per Night",
          "options": [
            "<5",
            "5–6",
            "6–7",
            "7–8",
            "8+"
          ],
          "required": true
        },
        {
          "max": 5,
          "min": 1,
          "name": "sleepQuality",
          "type": "number",
          "label": "Sleep Quality",
          "required": true
        },
        {
          "name": "usualSleepTime",
          "type": "time",
          "label": "Usual Sleep Time",
          "required": true
        },
        {
          "name": "wakeUpTime",
          "type": "time",
          "label": "Wake-up Time",
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:29:11"
    },
    {
      "iId": 20,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Daily Steps",
      "jQuestionJson": [
        {
          "name": "stepsPerDay",
          "type": "select",
          "label": "Steps per Day",
          "options": [
            "<2,000",
            "2,000–5,000",
            "5,000–8,000",
            "8,000–10,000",
            "10,000+",
            "Don't know"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:29:11"
    },
    {
      "iId": 19,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Physical Activity",
      "jQuestionJson": [
        {
          "name": "dailyActivity",
          "type": "select",
          "label": "Daily Activity",
          "options": [
            "Mostly Sitting",
            "Light",
            "Moderate",
            "Very Active",
            "Extremely Active"
          ],
          "required": true
        },
        {
          "name": "exercisesRegularly",
          "type": "radio",
          "label": "Exercise Regularly?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "exerciseType",
          "type": "multiselect",
          "label": "Exercise Type",
          "options": [
            "Walking",
            "Running",
            "Gym",
            "Yoga",
            "Cycling",
            "Swimming",
            "Sports",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "max": 7,
          "min": 1,
          "name": "exerciseDaysPerWeek",
          "type": "number",
          "label": "Days per Week",
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "name": "exerciseDuration",
          "type": "select",
          "label": "Duration",
          "options": [
            "<30 min",
            "30–60 min",
            "60–90 min",
            ">90 min"
          ],
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:29:11"
    },
    {
      "iId": 18,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Restrictions",
      "jQuestionJson": [
        {
          "name": "hasFoodAvoidance",
          "type": "radio",
          "label": "Foods Avoided for Personal, Cultural, or Other Reasons?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "avoidedFoods",
          "type": "text",
          "label": "Foods Avoided",
          "required": true,
          "condition": {
            "field": "hasFoodAvoidance",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Specify the foods you avoid"
        },
        {
          "name": "stronglyDislikedFoods",
          "type": "text",
          "label": "Foods Strongly Disliked",
          "required": false,
          "placeholder": "Enter foods you strongly dislike"
        }
      ],
      "dCreatedAt": "2026-09-14 17:26:33"
    },
    {
      "iId": 17,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Food Intolerance",
      "jQuestionJson": [
        {
          "name": "hasFoodIntolerance",
          "type": "radio",
          "label": "Any Intolerance / Discomfort?",
          "options": [
            "Yes",
            "No",
            "Not sure"
          ],
          "required": true
        },
        {
          "name": "triggerFood",
          "type": "text",
          "label": "Trigger Food",
          "required": true,
          "condition": {
            "field": "hasFoodIntolerance",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Enter the food that causes discomfort"
        },
        {
          "name": "intoleranceReaction",
          "type": "multiselect",
          "label": "Reaction",
          "options": [
            "Bloating",
            "Gas",
            "Diarrhea",
            "Stomach Pain",
            "Skin Reaction",
            "Headache",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "hasFoodIntolerance",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:26:33"
    },
    {
      "iId": 16,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Food Allergy",
      "jQuestionJson": [
        {
          "name": "hasFoodAllergy",
          "type": "radio",
          "label": "Any Food Allergy?",
          "options": [
            "Yes",
            "No",
            "Not sure"
          ],
          "required": true
        },
        {
          "name": "allergies",
          "type": "multiselect",
          "label": "Allergies",
          "options": [
            "Milk/Dairy",
            "Eggs",
            "Peanuts",
            "Tree Nuts",
            "Wheat",
            "Gluten",
            "Soy",
            "Fish",
            "Shellfish",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "hasFoodAllergy",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "name": "otherAllergy",
          "type": "text",
          "label": "Other Allergy",
          "required": true,
          "condition": {
            "field": "allergies",
            "value": "Other",
            "operator": "includes"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:26:33"
    },
    {
      "iId": 15,
      "vCategory": "Food Habits",
      "vSubCategory": "24-Hour Recall (Recommended)",
      "jQuestionJson": [
        {
          "name": "yesterdaysMeals",
          "type": "textarea",
          "label": "Yesterday's Meals / Drinks",
          "required": true,
          "placeholder": "Enter meal-by-meal time and approximate quantity"
        },
        {
          "name": "mealPhoto",
          "type": "file",
          "label": "Meal Photo",
          "accept": "image/*",
          "required": false
        }
      ],
      "dCreatedAt": "2026-09-14 17:23:54"
    },
    {
      "iId": 14,
      "vCategory": "Food Habits",
      "vSubCategory": "Typical Daily Food",
      "jQuestionJson": [
        {
          "name": "outsideHomeDelivery",
          "type": "select",
          "label": "Outside / Home Delivery",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely"
          ],
          "required": true
        },
        {
          "name": "mealSkipping",
          "type": "select",
          "label": "Meal Skipping",
          "options": [
            "Never",
            "Occasionally",
            "Frequently",
            "Almost daily"
          ],
          "required": true
        },
        {
          "name": "lateNightEating",
          "type": "select",
          "label": "Late-Night Eating",
          "options": [
            "Never",
            "Sometimes",
            "Often",
            "Daily"
          ],
          "required": true
        },
        {
          "name": "waterIntake",
          "type": "select",
          "label": "Water",
          "options": [
            "<1L",
            "1–2L",
            "2–3L",
            ">3L"
          ],
          "required": true
        },
        {
          "name": "sugaryDrinks",
          "type": "select",
          "label": "Sugary Drinks",
          "options": [
            "Never",
            "Occasionally",
            "Daily",
            "Multiple/day"
          ],
          "required": true
        },
        {
          "name": "desserts",
          "type": "select",
          "label": "Desserts",
          "options": [
            "Rarely",
            "1–2× week",
            "3–5× week",
            "Daily"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:18:48"
    },
    {
      "iId": 13,
      "vCategory": "Food Habits",
      "vSubCategory": "Eating Behavior",
      "jQuestionJson": [
        {
          "name": "fruitsFrequency",
          "type": "select",
          "label": "Fruits",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "vegetablesFrequency",
          "type": "select",
          "label": "Vegetables",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "dairyFrequency",
          "type": "select",
          "label": "Dairy",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "eggsFrequency",
          "type": "select",
          "label": "Eggs",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "chickenMeatFrequency",
          "type": "select",
          "label": "Chicken / Meat",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "fishFrequency",
          "type": "select",
          "label": "Fish",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "friedFoodFrequency",
          "type": "select",
          "label": "Fried Food",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "fastFoodFrequency",
          "type": "select",
          "label": "Fast Food",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "sweetsFrequency",
          "type": "select",
          "label": "Sweets",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "softDrinksFrequency",
          "type": "select",
          "label": "Soft Drinks",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:18:48"
    },
    {
      "iId": 12,
      "vCategory": "Food Habits",
      "vSubCategory": "Food Frequency",
      "jQuestionJson": [
        {
          "name": "mealsPerDay",
          "type": "select",
          "label": "Meals Per Day",
          "options": [
            1,
            2,
            3,
            4,
            "5+"
          ],
          "required": true
        },
        {
          "name": "breakfastTime",
          "type": "time",
          "label": "Breakfast Time",
          "required": true
        },
        {
          "name": "lunchTime",
          "type": "time",
          "label": "Lunch Time",
          "required": true
        },
        {
          "name": "dinnerTime",
          "type": "time",
          "label": "Dinner Time",
          "required": true
        },
        {
          "name": "snacksBetweenMeals",
          "type": "radio",
          "label": "Snacks Between Meals?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "typicalSnacks",
          "type": "text",
          "label": "Typical Snacks",
          "required": true,
          "condition": {
            "field": "snacksBetweenMeals",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:18:48"
    },
    {
      "iId": 11,
      "vCategory": "Food Habits",
      "vSubCategory": "Meal Pattern",
      "jQuestionJson": [
        {
          "name": "mealsPerDay",
          "type": "select",
          "label": "Meals Per Day",
          "options": [
            1,
            2,
            3,
            4,
            "5+"
          ],
          "required": true
        },
        {
          "name": "breakfastTime",
          "type": "time",
          "label": "Breakfast Time",
          "required": true
        },
        {
          "name": "lunchTime",
          "type": "time",
          "label": "Lunch Time",
          "required": true
        },
        {
          "name": "dinnerTime",
          "type": "time",
          "label": "Dinner Time",
          "required": true
        },
        {
          "name": "snacksBetweenMeals",
          "type": "radio",
          "label": "Snacks Between Meals?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "typicalSnacks",
          "type": "text",
          "label": "Typical Snacks",
          "required": true,
          "condition": {
            "field": "snacksBetweenMeals",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:18:48"
    },
    {
      "iId": 10,
      "vCategory": "Food Habits",
      "vSubCategory": "Diet Preference",
      "jQuestionJson": [
        {
          "name": "dietType",
          "type": "select",
          "label": "Diet Type",
          "options": [
            "Vegetarian",
            "Vegan",
            "Eggetarian",
            "Non-Vegetarian",
            "Jain",
            "Other"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:18:48"
    },
    {
      "iId": 9,
      "vCategory": "Goals",
      "vSubCategory": "Target",
      "jQuestionJson": [
        {
          "name": "targetWeight",
          "type": "number",
          "unit": "kg",
          "label": "Target Weight",
          "required": true,
          "condition": {
            "field": "goal",
            "value": "Weight Loss",
            "operator": "includes"
          }
        },
        {
          "name": "preferredTimeline",
          "type": "select",
          "label": "Preferred Timeline",
          "options": [
            "1 month",
            "3 months",
            "6 months",
            "No specific timeline"
          ],
          "required": true,
          "condition": {
            "field": "goal",
            "value": "Weight Loss",
            "operator": "includes"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:17:11"
    },
    {
      "iId": 8,
      "vCategory": "Goals",
      "vSubCategory": "Primary Goal",
      "jQuestionJson": [
        {
          "name": "goal",
          "type": "multiselect",
          "label": "Goal",
          "options": [
            "Weight Loss",
            "Weight Gain",
            "Maintain Weight",
            "Muscle Gain",
            "General Health",
            "Energy",
            "Digestion",
            "Diabetes",
            "Cholesterol",
            "BP",
            "PCOS-PCOD",
            "Sports Nutrition",
            "Pregnancy Nutrition",
            "Child Nutrition",
            "Other"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:17:11"
    },
    {
      "iId": 7,
      "vCategory": "Medical History",
      "vSubCategory": "History",
      "jQuestionJson": [
        {
          "name": "hadSurgery",
          "type": "radio",
          "label": "Surgery?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "surgeryDetails",
          "type": "textarea",
          "label": "Surgery Details",
          "required": true,
          "condition": {
            "field": "hadSurgery",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Surgery name and date"
        },
        {
          "name": "wasHospitalized",
          "type": "radio",
          "label": "Was Hospitalized?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "familyHistory",
          "type": "multiselect",
          "label": "Family History",
          "options": [
            "Diabetes",
            "Heart",
            "BP",
            "Obesity",
            "Thyroid",
            "Cancer",
            "Kidney",
            "Other",
            "None"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:11:35"
    },
    {
      "iId": 6,
      "vCategory": "Medical History",
      "vSubCategory": "Medication & Supplements",
      "jQuestionJson": [
        {
          "name": "takingMedication",
          "type": "radio",
          "label": "Taking Medication?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "medicineDetails",
          "type": "textarea",
          "label": "Medicine Details",
          "required": true,
          "condition": {
            "field": "takingMedication",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Medicine name, dosage, frequency, reason"
        },
        {
          "name": "takingSupplements",
          "type": "radio",
          "label": "Taking Supplements?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "supplements",
          "type": "multiselect",
          "label": "Supplements",
          "options": [
            "Protein",
            "Multivitamin",
            "Vitamin D",
            "B12",
            "Iron",
            "Calcium",
            "Omega-3",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "takingSupplements",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:11:35"
    },
    {
      "iId": 5,
      "vCategory": "Medical History",
      "vSubCategory": "Symptoms",
      "jQuestionJson": [
        {
          "name": "currentSymptoms",
          "type": "multiselect",
          "label": "Current Symptoms",
          "options": [
            "Fatigue",
            "Acidity",
            "Constipation",
            "Diarrhea",
            "Bloating",
            "Headache",
            "Dizziness",
            "Nausea",
            "Appetite change",
            "Other",
            "None"
          ],
          "required": true
        },
        {
          "name": "symptomDuration",
          "type": "select",
          "label": "Symptom Duration",
          "options": [
            "<1 week",
            "1–4 weeks",
            "1–6 months",
            ">6 months"
          ],
          "required": true,
          "condition": {
            "field": "currentSymptoms",
            "value": "None",
            "operator": "not_equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 17:11:35"
    },
    {
      "iId": 4,
      "vCategory": "Medical History",
      "vSubCategory": "Existing Conditions",
      "jQuestionJson": [
        {
          "name": "medicalCondition",
          "type": "multiselect",
          "label": "Medical Condition",
          "options": [
            "Diabetes",
            "Prediabetes",
            "Thyroid",
            "PCOS-PCOD",
            "High cholesterol",
            "High BP",
            "Heart",
            "Kidney",
            "Liver",
            "GERD-Acidity",
            "Anemia",
            "Arthritis",
            "Obesity",
            "Other",
            "None"
          ],
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:11:35"
    },
    {
      "iId": 3,
      "vCategory": "Basic Details",
      "vSubCategory": "Additional",
      "jQuestionJson": [
        {
          "name": "occupation",
          "type": "select",
          "label": "Occupation",
          "options": [
            "Office Work",
            "Field Work",
            "Student",
            "Homemaker",
            "Retired",
            "Labour",
            "Other"
          ],
          "required": true
        },
        {
          "name": "city",
          "type": "text",
          "label": "City",
          "required": true
        },
        {
          "name": "state",
          "type": "text",
          "label": "State",
          "required": true
        },
        {
          "name": "country",
          "type": "text",
          "label": "Country",
          "required": true
        }
      ],
      "dCreatedAt": "2026-09-14 17:01:16"
    },
    {
      "iId": 2,
      "vCategory": "Basic Details",
      "vSubCategory": "Body Measurements",
      "jQuestionJson": [
        {
          "name": "currentWeight",
          "type": "number",
          "unit": "kg",
          "label": "Current Weight",
          "required": true
        },
        {
          "name": "height",
          "type": "height",
          "unit": "ft inch",
          "label": "Height",
          "fields": [
            {
              "name": "heightFeet",
              "type": "number",
              "label": "Feet",
              "required": true
            },
            {
              "name": "heightInches",
              "type": "number",
              "label": "Inches",
              "required": true
            }
          ],
          "required": true
        },
        {
          "name": "waistMeasurement",
          "type": "number",
          "unit": "cm",
          "label": "Waist Measurement",
          "required": false
        },
        {
          "name": "recentWeightChange",
          "type": "select",
          "label": "Recent Weight Change",
          "options": [
            {
              "label": "No change",
              "value": "no_change"
            },
            {
              "label": "Increased",
              "value": "increased"
            },
            {
              "label": "Decreased",
              "value": "decreased"
            }
          ],
          "required": true
        },
        {
          "name": "amountOfChange",
          "type": "number",
          "unit": "kg",
          "label": "Amount of Change",
          "required": true,
          "condition": {
            "field": "recentWeightChange",
            "value": "no_change",
            "operator": "not_equals"
          }
        }
      ],
      "dCreatedAt": "2026-09-14 16:58:30"
    },
    {
      "iId": 1,
      "vCategory": "Basic Details",
      "vSubCategory": "Personal",
      "jQuestionJson": [
        {
          "name": "fullName",
          "type": "text",
          "label": "Full Name",
          "required": true
        },
        {
          "name": "dateOfBirth",
          "type": "date",
          "label": "Date of Birth",
          "required": true
        },
        {
          "name": "gender",
          "type": "select",
          "label": "Gender",
          "options": [
            {
              "label": "Male",
              "value": "male"
            },
            {
              "label": "Female",
              "value": "female"
            },
            {
              "label": "Other",
              "value": "other"
            },
            {
              "label": "Prefer not to say",
              "value": "prefer_not_to_say"
            }
          ],
          "required": true
        },
        {
          "name": "mobileNumber",
          "type": "tel",
          "label": "Mobile Number",
          "required": true
        },
        {
          "name": "email",
          "type": "email",
          "label": "Email",
          "required": false
        },
        {
          "name": "profilePhoto",
          "type": "file",
          "label": "Profile Photo",
          "accept": "image/*",
          "required": false
        }
      ],
      "dCreatedAt": "2026-09-14 16:58:30"
    }
  ]
}
```

## 2. Update / Save Details:

```cmd
curl --request POST \
  --url http://192.168.1.216/vedicconnectconsultancy/api/saveHealthDetailAnswers \
  --header 'content-type: multipart/form-data' \
  --header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiTVRFME5nPT0iLCJlbWFpbCI6Im1laGFrKzFAcHJvbG9naWN0ZWNobm9sb2dpZXMuaW4iLCJuYW1lIjoiVGVzdCIsImV4cCI6MTgyMTY3ODQ1OH0.sXssFR42YMOpBi1Mf3L7kqBi7pqfebRB3Qoh_Dm0Ick' \
  --form iAppointmentId=MTc3Ng== \
  --form 'jAnswers=[
    {
        "iQuestionId": 1,
        "jAnswerJson": {
            "fullName": "Ayush Sharma",
            "dateOfBirth": "1995-05-15",
            "gender": "Male",
            "mobileNumber": "9876543210",
            "email": "ayush@example.com",
            "profilePhoto": null
        }
    },
    {
        "iQuestionId": 2,
        "jAnswerJson": {
            "currentWeight": 72,
            "heightFeet": 5,
            "heightInches": 9,
            "waistMeasurement": 85,
            "recentWeightChange": "Increased",
            "amountOfChange": 5,
            "period": "3-6 months"
        }
    },
    {
        "iQuestionId": 3,
        "jAnswerJson": {
            "occupation": "Office",
            "city": "Patiala",
            "state": "Punjab",
            "country": "India"
        }
    },
    {
        "iQuestionId": 4,
        "jAnswerJson": {
            "medicalCondition": [
                "Diabetes",
                "High BP"
            ],
            "otherCondition": null
        }
    },
    {
        "iQuestionId": 5,
        "jAnswerJson": {
            "currentSymptoms": [
                "Fatigue",
                "Bloating"
            ],
            "symptomDuration": "1-6 months",
            "otherSymptom": null
        }
    },
    {
        "iQuestionId": 6,
        "jAnswerJson": {
            "takingMedication": "Yes",
            "medicineDetails": [
                {
                    "medicineName": "Medicine Name",
                    "dosage": "500 mg",
                    "frequency": "Once daily",
                    "reason": "Diabetes"
                }
            ],
            "takingSupplements": "Yes",
            "supplements": [
                "Vitamin D",
                "B12"
            ],
            "otherSupplement": null,
            "supplementDetails": null
        }
    },
    {
        "iQuestionId": 7,
        "jAnswerJson": {
            "surgery": {
                "answer": "No",
                "name": null,
                "date": null
            },
            "hospitalization": "No",
            "familyHistory": [
                "Diabetes",
                "High BP"
            ],
            "recentMedicalLabReports": "Yes",
            "uploadReports": [
                "report_1.pdf"
            ]
        }
    },
    {
        "iQuestionId": 8,
        "jAnswerJson": {
            "goal": [
                "Weight Loss",
                "General Health"
            ],
            "otherGoal": null
        }
    },
    {
        "iQuestionId": 9,
        "jAnswerJson": {
            "targetWeight": 65,
            "preferredTimeline": "3 months"
        }
    },
    {
        "iQuestionId": 10,
        "jAnswerJson": {
            "dietType": "Vegetarian",
            "otherDietType": null
        }
    },
    {
        "iQuestionId": 11,
        "jAnswerJson": {
            "mealsPerDay": 3,
            "breakfastTime": "08:00",
            "lunchTime": "13:00",
            "dinnerTime": "20:00",
            "snacksBetweenMeals": "Yes",
            "typicalSnacks": [
                "Fruit",
                "Nuts"
            ]
        }
    },
    {
        "iQuestionId": 12,
        "jAnswerJson": {
            "foodFrequency": {
                "fruits": "Daily",
                "vegetables": "Daily",
                "dairy": "3-5x week",
                "eggs": "1-2x week",
                "chickenMeat": "Rarely",
                "fish": "Never",
                "friedFood": "1-2x week",
                "fastFood": "Rarely",
                "sweets": "1-2x week",
                "softDrinks": "Never"
            }
        }
    },
    {
        "iQuestionId": 13,
        "jAnswerJson": {
            "outsideHomeDelivery": "1-2x week",
            "mealSkipping": "Occasionally",
            "lateNightEating": "Sometimes",
            "water": "2-3L",
            "sugaryDrinks": "Occasionally",
            "desserts": "1-2x week"
        }
    },
    {
        "iQuestionId": 14,
        "jAnswerJson": {
            "breakfast": "Poha and tea",
            "midMorning": "Apple",
            "lunch": "Dal, rice and vegetables",
            "eveningSnack": "Tea and biscuits",
            "dinner": "Roti, vegetables and curd",
            "lateNightFood": "None"
        }
    },
    {
        "iQuestionId": 15,
        "jAnswerJson": {
            "yesterdaysMeals": [
                {
                    "time": "08:00",
                    "meal": "Breakfast",
                    "food": "Poha",
                    "quantity": "1 bowl"
                },
                {
                    "time": "11:00",
                    "meal": "Mid-morning",
                    "food": "Apple",
                    "quantity": "1"
                },
                {
                    "time": "13:30",
                    "meal": "Lunch",
                    "food": "Dal, rice and vegetables",
                    "quantity": "1 plate"
                },
                {
                    "time": "17:00",
                    "meal": "Evening snack",
                    "food": "Tea and biscuits",
                    "quantity": "1 cup tea + 3 biscuits"
                },
                {
                    "time": "20:30",
                    "meal": "Dinner",
                    "food": "Roti, paneer and salad",
                    "quantity": "2 roti + 1 bowl"
                },
                {
                    "time": "23:00",
                    "meal": "Late-night food",
                    "food": "None",
                    "quantity": null
                }
            ],
            "mealPhoto": null
        }
    },
    {
        "iQuestionId": 16,
        "jAnswerJson": {
            "anyFoodAllergy": "Yes",
            "allergies": [
                "Peanuts"
            ],
            "otherAllergy": null
        }
    },
    {
        "iQuestionId": 17,
        "jAnswerJson": {
            "anyIntoleranceOrDiscomfort": "Yes",
            "triggerFood": "Milk",
            "reaction": [
                "Bloating",
                "Gas"
            ],
            "otherReaction": null
        }
    },
    {
        "iQuestionId": 18,
        "jAnswerJson": {
            "foodsAvoided": "Yes",
            "foodsAvoidedDetails": "Very spicy food",
            "foodsStronglyDisliked": "Bitter gourd"
        }
    },
    {
        "iQuestionId": 19,
        "jAnswerJson": {
            "dailyActivity": "Moderate",
            "exerciseRegularly": "Yes",
            "exerciseType": [
                "Walking",
                "Gym"
            ],
            "daysPerWeek": 5,
            "duration": "30-60 min"
        }
    },
    {
        "iQuestionId": 20,
        "jAnswerJson": {
            "stepsPerDay": "5,000-8,000"
        }
    },
    {
        "iQuestionId": 21,
        "jAnswerJson": {
            "hoursPerNight": "6-7",
            "sleepQuality": 3,
            "usualSleepTime": "23:00",
            "wakeUpTime": "06:30"
        }
    },
    {
        "iQuestionId": 22,
        "jAnswerJson": {
            "workSchedule": "Day",
            "sittingHoursPerDay": "6-8"
        }
    },
    {
        "iQuestionId": 23,
        "jAnswerJson": {
            "stressLevel": 3,
            "stressAffectsEating": "Sometimes"
        }
    }
]'
```

**response:**
```json
{
  "meta": {
    "success": true,
    "code": 200,
    "message": "Health detail answers saved successfully."
  },
  "data": {
    "iAppointmentId": 1776
  }
}
```

## 3. Get Saved Health Details:

responce:
```cmd
curl --request GET \
  --url 'http://192.168.1.216/vedicconnectconsultancy/api/healthDetailQuestionsAnswers?iAppointmentId=MTc3Ng%3D%3D' \
  --header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiTVRFME5nPT0iLCJlbWFpbCI6Im1laGFrKzFAcHJvbG9naWN0ZWNobm9sb2dpZXMuaW4iLCJuYW1lIjoiVGVzdCIsImV4cCI6MTgyMTY3ODQ1OH0.sXssFR42YMOpBi1Mf3L7kqBi7pqfebRB3Qoh_Dm0Ick'
```

**responce:**
```json
{
  "meta": {
    "success": true,
    "code": 200,
    "message": "Health detail questions and answers fetched successfully."
  },
  "data": [
    {
      "iQuestionId": 1,
      "vCategory": "Basic Details",
      "vSubCategory": "Personal",
      "jQuestionJson": [
        {
          "name": "fullName",
          "type": "text",
          "label": "Full Name",
          "required": true
        },
        {
          "name": "dateOfBirth",
          "type": "date",
          "label": "Date of Birth",
          "required": true
        },
        {
          "name": "gender",
          "type": "select",
          "label": "Gender",
          "options": [
            {
              "label": "Male",
              "value": "male"
            },
            {
              "label": "Female",
              "value": "female"
            },
            {
              "label": "Other",
              "value": "other"
            },
            {
              "label": "Prefer not to say",
              "value": "prefer_not_to_say"
            }
          ],
          "required": true
        },
        {
          "name": "mobileNumber",
          "type": "tel",
          "label": "Mobile Number",
          "required": true
        },
        {
          "name": "email",
          "type": "email",
          "label": "Email",
          "required": false
        },
        {
          "name": "profilePhoto",
          "type": "file",
          "label": "Profile Photo",
          "accept": "image/*",
          "required": false
        }
      ],
      "answer": {
        "iAnswerId": 1,
        "jAnswerJson": {
          "email": "ayush@example.com",
          "gender": "Male",
          "fullName": "Ayush Sharma",
          "dateOfBirth": "1995-05-15",
          "mobileNumber": 9876543210,
          "profilePhoto": null
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 2,
      "vCategory": "Basic Details",
      "vSubCategory": "Body Measurements",
      "jQuestionJson": [
        {
          "name": "currentWeight",
          "type": "number",
          "unit": "kg",
          "label": "Current Weight",
          "required": true
        },
        {
          "name": "height",
          "type": "height",
          "unit": "ft inch",
          "label": "Height",
          "fields": [
            {
              "name": "heightFeet",
              "type": "number",
              "label": "Feet",
              "required": true
            },
            {
              "name": "heightInches",
              "type": "number",
              "label": "Inches",
              "required": true
            }
          ],
          "required": true
        },
        {
          "name": "waistMeasurement",
          "type": "number",
          "unit": "cm",
          "label": "Waist Measurement",
          "required": false
        },
        {
          "name": "recentWeightChange",
          "type": "select",
          "label": "Recent Weight Change",
          "options": [
            {
              "label": "No change",
              "value": "no_change"
            },
            {
              "label": "Increased",
              "value": "increased"
            },
            {
              "label": "Decreased",
              "value": "decreased"
            }
          ],
          "required": true
        },
        {
          "name": "amountOfChange",
          "type": "number",
          "unit": "kg",
          "label": "Amount of Change",
          "required": true,
          "condition": {
            "field": "recentWeightChange",
            "value": "no_change",
            "operator": "not_equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 2,
        "jAnswerJson": {
          "period": "3-6 months",
          "heightFeet": 5,
          "heightInches": 9,
          "currentWeight": 72,
          "amountOfChange": 5,
          "waistMeasurement": 85,
          "recentWeightChange": "Increased"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 3,
      "vCategory": "Basic Details",
      "vSubCategory": "Additional",
      "jQuestionJson": [
        {
          "name": "occupation",
          "type": "select",
          "label": "Occupation",
          "options": [
            "Office Work",
            "Field Work",
            "Student",
            "Homemaker",
            "Retired",
            "Labour",
            "Other"
          ],
          "required": true
        },
        {
          "name": "city",
          "type": "text",
          "label": "City",
          "required": true
        },
        {
          "name": "state",
          "type": "text",
          "label": "State",
          "required": true
        },
        {
          "name": "country",
          "type": "text",
          "label": "Country",
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 3,
        "jAnswerJson": {
          "city": "Patiala",
          "state": "Punjab",
          "country": "India",
          "occupation": "Office"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 4,
      "vCategory": "Medical History",
      "vSubCategory": "Existing Conditions",
      "jQuestionJson": [
        {
          "name": "medicalCondition",
          "type": "multiselect",
          "label": "Medical Condition",
          "options": [
            "Diabetes",
            "Prediabetes",
            "Thyroid",
            "PCOS-PCOD",
            "High cholesterol",
            "High BP",
            "Heart",
            "Kidney",
            "Liver",
            "GERD-Acidity",
            "Anemia",
            "Arthritis",
            "Obesity",
            "Other",
            "None"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 4,
        "jAnswerJson": {
          "otherCondition": null,
          "medicalCondition": [
            "Diabetes",
            "High BP"
          ]
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 5,
      "vCategory": "Medical History",
      "vSubCategory": "Symptoms",
      "jQuestionJson": [
        {
          "name": "currentSymptoms",
          "type": "multiselect",
          "label": "Current Symptoms",
          "options": [
            "Fatigue",
            "Acidity",
            "Constipation",
            "Diarrhea",
            "Bloating",
            "Headache",
            "Dizziness",
            "Nausea",
            "Appetite change",
            "Other",
            "None"
          ],
          "required": true
        },
        {
          "name": "symptomDuration",
          "type": "select",
          "label": "Symptom Duration",
          "options": [
            "<1 week",
            "1–4 weeks",
            "1–6 months",
            ">6 months"
          ],
          "required": true,
          "condition": {
            "field": "currentSymptoms",
            "value": "None",
            "operator": "not_equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 5,
        "jAnswerJson": {
          "otherSymptom": null,
          "currentSymptoms": [
            "Fatigue",
            "Bloating"
          ],
          "symptomDuration": "1-6 months"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 6,
      "vCategory": "Medical History",
      "vSubCategory": "Medication & Supplements",
      "jQuestionJson": [
        {
          "name": "takingMedication",
          "type": "radio",
          "label": "Taking Medication?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "medicineDetails",
          "type": "textarea",
          "label": "Medicine Details",
          "required": true,
          "condition": {
            "field": "takingMedication",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Medicine name, dosage, frequency, reason"
        },
        {
          "name": "takingSupplements",
          "type": "radio",
          "label": "Taking Supplements?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "supplements",
          "type": "multiselect",
          "label": "Supplements",
          "options": [
            "Protein",
            "Multivitamin",
            "Vitamin D",
            "B12",
            "Iron",
            "Calcium",
            "Omega-3",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "takingSupplements",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 6,
        "jAnswerJson": {
          "supplements": [
            "Vitamin D",
            "B12"
          ],
          "medicineDetails": [
            {
              "dosage": "500 mg",
              "reason": "Diabetes",
              "frequency": "Once daily",
              "medicineName": "Medicine Name"
            }
          ],
          "otherSupplement": null,
          "takingMedication": "Yes",
          "supplementDetails": null,
          "takingSupplements": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 7,
      "vCategory": "Medical History",
      "vSubCategory": "History",
      "jQuestionJson": [
        {
          "name": "hadSurgery",
          "type": "radio",
          "label": "Surgery?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "surgeryDetails",
          "type": "textarea",
          "label": "Surgery Details",
          "required": true,
          "condition": {
            "field": "hadSurgery",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Surgery name and date"
        },
        {
          "name": "wasHospitalized",
          "type": "radio",
          "label": "Was Hospitalized?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "familyHistory",
          "type": "multiselect",
          "label": "Family History",
          "options": [
            "Diabetes",
            "Heart",
            "BP",
            "Obesity",
            "Thyroid",
            "Cancer",
            "Kidney",
            "Other",
            "None"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 7,
        "jAnswerJson": {
          "surgery": {
            "date": null,
            "name": null,
            "answer": "No"
          },
          "familyHistory": [
            "Diabetes",
            "High BP"
          ],
          "uploadReports": [
            "report_1.pdf"
          ],
          "hospitalization": "No",
          "recentMedicalLabReports": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 8,
      "vCategory": "Goals",
      "vSubCategory": "Primary Goal",
      "jQuestionJson": [
        {
          "name": "goal",
          "type": "multiselect",
          "label": "Goal",
          "options": [
            "Weight Loss",
            "Weight Gain",
            "Maintain Weight",
            "Muscle Gain",
            "General Health",
            "Energy",
            "Digestion",
            "Diabetes",
            "Cholesterol",
            "BP",
            "PCOS-PCOD",
            "Sports Nutrition",
            "Pregnancy Nutrition",
            "Child Nutrition",
            "Other"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 8,
        "jAnswerJson": {
          "goal": [
            "Weight Loss",
            "General Health"
          ],
          "otherGoal": null
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 9,
      "vCategory": "Goals",
      "vSubCategory": "Target",
      "jQuestionJson": [
        {
          "name": "targetWeight",
          "type": "number",
          "unit": "kg",
          "label": "Target Weight",
          "required": true,
          "condition": {
            "field": "goal",
            "value": "Weight Loss",
            "operator": "includes"
          }
        },
        {
          "name": "preferredTimeline",
          "type": "select",
          "label": "Preferred Timeline",
          "options": [
            "1 month",
            "3 months",
            "6 months",
            "No specific timeline"
          ],
          "required": true,
          "condition": {
            "field": "goal",
            "value": "Weight Loss",
            "operator": "includes"
          }
        }
      ],
      "answer": {
        "iAnswerId": 9,
        "jAnswerJson": {
          "targetWeight": 65,
          "preferredTimeline": "3 months"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 10,
      "vCategory": "Food Habits",
      "vSubCategory": "Diet Preference",
      "jQuestionJson": [
        {
          "name": "dietType",
          "type": "select",
          "label": "Diet Type",
          "options": [
            "Vegetarian",
            "Vegan",
            "Eggetarian",
            "Non-Vegetarian",
            "Jain",
            "Other"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 10,
        "jAnswerJson": {
          "dietType": "Vegetarian",
          "otherDietType": null
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 11,
      "vCategory": "Food Habits",
      "vSubCategory": "Meal Pattern",
      "jQuestionJson": [
        {
          "name": "mealsPerDay",
          "type": "select",
          "label": "Meals Per Day",
          "options": [
            1,
            2,
            3,
            4,
            "5+"
          ],
          "required": true
        },
        {
          "name": "breakfastTime",
          "type": "time",
          "label": "Breakfast Time",
          "required": true
        },
        {
          "name": "lunchTime",
          "type": "time",
          "label": "Lunch Time",
          "required": true
        },
        {
          "name": "dinnerTime",
          "type": "time",
          "label": "Dinner Time",
          "required": true
        },
        {
          "name": "snacksBetweenMeals",
          "type": "radio",
          "label": "Snacks Between Meals?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "typicalSnacks",
          "type": "text",
          "label": "Typical Snacks",
          "required": true,
          "condition": {
            "field": "snacksBetweenMeals",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 11,
        "jAnswerJson": {
          "lunchTime": "13:00",
          "dinnerTime": "20:00",
          "mealsPerDay": 3,
          "breakfastTime": "08:00",
          "typicalSnacks": [
            "Fruit",
            "Nuts"
          ],
          "snacksBetweenMeals": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 12,
      "vCategory": "Food Habits",
      "vSubCategory": "Food Frequency",
      "jQuestionJson": [
        {
          "name": "mealsPerDay",
          "type": "select",
          "label": "Meals Per Day",
          "options": [
            1,
            2,
            3,
            4,
            "5+"
          ],
          "required": true
        },
        {
          "name": "breakfastTime",
          "type": "time",
          "label": "Breakfast Time",
          "required": true
        },
        {
          "name": "lunchTime",
          "type": "time",
          "label": "Lunch Time",
          "required": true
        },
        {
          "name": "dinnerTime",
          "type": "time",
          "label": "Dinner Time",
          "required": true
        },
        {
          "name": "snacksBetweenMeals",
          "type": "radio",
          "label": "Snacks Between Meals?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "typicalSnacks",
          "type": "text",
          "label": "Typical Snacks",
          "required": true,
          "condition": {
            "field": "snacksBetweenMeals",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 12,
        "jAnswerJson": {
          "foodFrequency": {
            "eggs": "1-2x week",
            "fish": "Never",
            "dairy": "3-5x week",
            "fruits": "Daily",
            "sweets": "1-2x week",
            "fastFood": "Rarely",
            "friedFood": "1-2x week",
            "softDrinks": "Never",
            "vegetables": "Daily",
            "chickenMeat": "Rarely"
          }
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 13,
      "vCategory": "Food Habits",
      "vSubCategory": "Eating Behavior",
      "jQuestionJson": [
        {
          "name": "fruitsFrequency",
          "type": "select",
          "label": "Fruits",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "vegetablesFrequency",
          "type": "select",
          "label": "Vegetables",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "dairyFrequency",
          "type": "select",
          "label": "Dairy",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "eggsFrequency",
          "type": "select",
          "label": "Eggs",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "chickenMeatFrequency",
          "type": "select",
          "label": "Chicken / Meat",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "fishFrequency",
          "type": "select",
          "label": "Fish",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "friedFoodFrequency",
          "type": "select",
          "label": "Fried Food",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "fastFoodFrequency",
          "type": "select",
          "label": "Fast Food",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "sweetsFrequency",
          "type": "select",
          "label": "Sweets",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        },
        {
          "name": "softDrinksFrequency",
          "type": "select",
          "label": "Soft Drinks",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely",
            "Never"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 13,
        "jAnswerJson": {
          "water": "2-3L",
          "desserts": "1-2x week",
          "mealSkipping": "Occasionally",
          "sugaryDrinks": "Occasionally",
          "lateNightEating": "Sometimes",
          "outsideHomeDelivery": "1-2x week"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 14,
      "vCategory": "Food Habits",
      "vSubCategory": "Typical Daily Food",
      "jQuestionJson": [
        {
          "name": "outsideHomeDelivery",
          "type": "select",
          "label": "Outside / Home Delivery",
          "options": [
            "Daily",
            "3–5× week",
            "1–2× week",
            "Rarely"
          ],
          "required": true
        },
        {
          "name": "mealSkipping",
          "type": "select",
          "label": "Meal Skipping",
          "options": [
            "Never",
            "Occasionally",
            "Frequently",
            "Almost daily"
          ],
          "required": true
        },
        {
          "name": "lateNightEating",
          "type": "select",
          "label": "Late-Night Eating",
          "options": [
            "Never",
            "Sometimes",
            "Often",
            "Daily"
          ],
          "required": true
        },
        {
          "name": "waterIntake",
          "type": "select",
          "label": "Water",
          "options": [
            "<1L",
            "1–2L",
            "2–3L",
            ">3L"
          ],
          "required": true
        },
        {
          "name": "sugaryDrinks",
          "type": "select",
          "label": "Sugary Drinks",
          "options": [
            "Never",
            "Occasionally",
            "Daily",
            "Multiple/day"
          ],
          "required": true
        },
        {
          "name": "desserts",
          "type": "select",
          "label": "Desserts",
          "options": [
            "Rarely",
            "1–2× week",
            "3–5× week",
            "Daily"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 14,
        "jAnswerJson": {
          "lunch": "Dal, rice and vegetables",
          "dinner": "Roti, vegetables and curd",
          "breakfast": "Poha and tea",
          "midMorning": "Apple",
          "eveningSnack": "Tea and biscuits",
          "lateNightFood": "None"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 15,
      "vCategory": "Food Habits",
      "vSubCategory": "24-Hour Recall (Recommended)",
      "jQuestionJson": [
        {
          "name": "yesterdaysMeals",
          "type": "textarea",
          "label": "Yesterday's Meals / Drinks",
          "required": true,
          "placeholder": "Enter meal-by-meal time and approximate quantity"
        },
        {
          "name": "mealPhoto",
          "type": "file",
          "label": "Meal Photo",
          "accept": "image/*",
          "required": false
        }
      ],
      "answer": {
        "iAnswerId": 15,
        "jAnswerJson": {
          "mealPhoto": null,
          "yesterdaysMeals": [
            {
              "food": "Poha",
              "meal": "Breakfast",
              "time": "08:00",
              "quantity": "1 bowl"
            },
            {
              "food": "Apple",
              "meal": "Mid-morning",
              "time": "11:00",
              "quantity": 1
            },
            {
              "food": "Dal, rice and vegetables",
              "meal": "Lunch",
              "time": "13:30",
              "quantity": "1 plate"
            },
            {
              "food": "Tea and biscuits",
              "meal": "Evening snack",
              "time": "17:00",
              "quantity": "1 cup tea + 3 biscuits"
            },
            {
              "food": "Roti, paneer and salad",
              "meal": "Dinner",
              "time": "20:30",
              "quantity": "2 roti + 1 bowl"
            },
            {
              "food": "None",
              "meal": "Late-night food",
              "time": "23:00",
              "quantity": null
            }
          ]
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 16,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Food Allergy",
      "jQuestionJson": [
        {
          "name": "hasFoodAllergy",
          "type": "radio",
          "label": "Any Food Allergy?",
          "options": [
            "Yes",
            "No",
            "Not sure"
          ],
          "required": true
        },
        {
          "name": "allergies",
          "type": "multiselect",
          "label": "Allergies",
          "options": [
            "Milk/Dairy",
            "Eggs",
            "Peanuts",
            "Tree Nuts",
            "Wheat",
            "Gluten",
            "Soy",
            "Fish",
            "Shellfish",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "hasFoodAllergy",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "name": "otherAllergy",
          "type": "text",
          "label": "Other Allergy",
          "required": true,
          "condition": {
            "field": "allergies",
            "value": "Other",
            "operator": "includes"
          }
        }
      ],
      "answer": {
        "iAnswerId": 16,
        "jAnswerJson": {
          "allergies": [
            "Peanuts"
          ],
          "otherAllergy": null,
          "anyFoodAllergy": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 17,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Food Intolerance",
      "jQuestionJson": [
        {
          "name": "hasFoodIntolerance",
          "type": "radio",
          "label": "Any Intolerance / Discomfort?",
          "options": [
            "Yes",
            "No",
            "Not sure"
          ],
          "required": true
        },
        {
          "name": "triggerFood",
          "type": "text",
          "label": "Trigger Food",
          "required": true,
          "condition": {
            "field": "hasFoodIntolerance",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Enter the food that causes discomfort"
        },
        {
          "name": "intoleranceReaction",
          "type": "multiselect",
          "label": "Reaction",
          "options": [
            "Bloating",
            "Gas",
            "Diarrhea",
            "Stomach Pain",
            "Skin Reaction",
            "Headache",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "hasFoodIntolerance",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 17,
        "jAnswerJson": {
          "reaction": [
            "Bloating",
            "Gas"
          ],
          "triggerFood": "Milk",
          "otherReaction": null,
          "anyIntoleranceOrDiscomfort": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 18,
      "vCategory": "Allergies / Intolerances",
      "vSubCategory": "Restrictions",
      "jQuestionJson": [
        {
          "name": "hasFoodAvoidance",
          "type": "radio",
          "label": "Foods Avoided for Personal, Cultural, or Other Reasons?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "avoidedFoods",
          "type": "text",
          "label": "Foods Avoided",
          "required": true,
          "condition": {
            "field": "hasFoodAvoidance",
            "value": "Yes",
            "operator": "equals"
          },
          "placeholder": "Specify the foods you avoid"
        },
        {
          "name": "stronglyDislikedFoods",
          "type": "text",
          "label": "Foods Strongly Disliked",
          "required": false,
          "placeholder": "Enter foods you strongly dislike"
        }
      ],
      "answer": {
        "iAnswerId": 18,
        "jAnswerJson": {
          "foodsAvoided": "Yes",
          "foodsAvoidedDetails": "Very spicy food",
          "foodsStronglyDisliked": "Bitter gourd"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 19,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Physical Activity",
      "jQuestionJson": [
        {
          "name": "dailyActivity",
          "type": "select",
          "label": "Daily Activity",
          "options": [
            "Mostly Sitting",
            "Light",
            "Moderate",
            "Very Active",
            "Extremely Active"
          ],
          "required": true
        },
        {
          "name": "exercisesRegularly",
          "type": "radio",
          "label": "Exercise Regularly?",
          "options": [
            "Yes",
            "No"
          ],
          "required": true
        },
        {
          "name": "exerciseType",
          "type": "multiselect",
          "label": "Exercise Type",
          "options": [
            "Walking",
            "Running",
            "Gym",
            "Yoga",
            "Cycling",
            "Swimming",
            "Sports",
            "Other"
          ],
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "max": 7,
          "min": 1,
          "name": "exerciseDaysPerWeek",
          "type": "number",
          "label": "Days per Week",
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        },
        {
          "name": "exerciseDuration",
          "type": "select",
          "label": "Duration",
          "options": [
            "<30 min",
            "30–60 min",
            "60–90 min",
            ">90 min"
          ],
          "required": true,
          "condition": {
            "field": "exercisesRegularly",
            "value": "Yes",
            "operator": "equals"
          }
        }
      ],
      "answer": {
        "iAnswerId": 19,
        "jAnswerJson": {
          "duration": "30-60 min",
          "daysPerWeek": 5,
          "exerciseType": [
            "Walking",
            "Gym"
          ],
          "dailyActivity": "Moderate",
          "exerciseRegularly": "Yes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 20,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Daily Steps",
      "jQuestionJson": [
        {
          "name": "stepsPerDay",
          "type": "select",
          "label": "Steps per Day",
          "options": [
            "<2,000",
            "2,000–5,000",
            "5,000–8,000",
            "8,000–10,000",
            "10,000+",
            "Don't know"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 20,
        "jAnswerJson": {
          "stepsPerDay": "5,000-8,000"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 21,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Sleep",
      "jQuestionJson": [
        {
          "name": "sleepHours",
          "type": "select",
          "label": "Hours per Night",
          "options": [
            "<5",
            "5–6",
            "6–7",
            "7–8",
            "8+"
          ],
          "required": true
        },
        {
          "max": 5,
          "min": 1,
          "name": "sleepQuality",
          "type": "number",
          "label": "Sleep Quality",
          "required": true
        },
        {
          "name": "usualSleepTime",
          "type": "time",
          "label": "Usual Sleep Time",
          "required": true
        },
        {
          "name": "wakeUpTime",
          "type": "time",
          "label": "Wake-up Time",
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 21,
        "jAnswerJson": {
          "wakeUpTime": "06:30",
          "sleepQuality": 3,
          "hoursPerNight": "6-7",
          "usualSleepTime": "23:00"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 22,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Work & Routine",
      "jQuestionJson": [
        {
          "name": "workSchedule",
          "type": "select",
          "label": "Work Schedule",
          "options": [
            "Day",
            "Night Shift",
            "Rotating",
            "WFH",
            "Irregular",
            "Other"
          ],
          "required": true
        },
        {
          "name": "sittingHoursPerDay",
          "type": "select",
          "label": "Sitting Hours per Day",
          "options": [
            "<2",
            "2–4",
            "4–6",
            "6–8",
            "8+"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 22,
        "jAnswerJson": {
          "workSchedule": "Day",
          "sittingHoursPerDay": "6-8"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    },
    {
      "iQuestionId": 23,
      "vCategory": "Lifestyle / Activity",
      "vSubCategory": "Stress",
      "jQuestionJson": [
        {
          "max": 5,
          "min": 1,
          "name": "stressLevel",
          "type": "number",
          "label": "Stress Level",
          "required": true
        },
        {
          "name": "stressAffectsEating",
          "type": "select",
          "label": "Does Stress Affect Eating?",
          "options": [
            "Eat More",
            "Eat Less",
            "Sometimes",
            "No"
          ],
          "required": true
        }
      ],
      "answer": {
        "iAnswerId": 23,
        "jAnswerJson": {
          "stressLevel": 3,
          "stressAffectsEating": "Sometimes"
        },
        "answerCreatedAt": "2026-09-14 12:23:31",
        "answerUpdatedAt": "2026-09-23 04:28:58"
      }
    }
  ]
}
```
