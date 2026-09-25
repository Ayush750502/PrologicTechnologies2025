# Dynamic Form System Documentation

## Overview

The Dynamic Form System is a **configuration-driven form renderer** that builds complex health assessment forms from API responses. It powers the `DynamicQuestionScreen` component used for rendering pre-consultation health categories (Basic Details, Medical History, Goals, Food Habits, Allergies/Intolerances, Lifestyle/Activity).

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DynamicQuestionScreen                     │
│  (Screen-level: Formik, validation, section grouping, save)      │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SubCategorySection                         │
│  (Groups fields by vSubCategory, renders section title)          │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                          DynamicField                            │
│  (Main dispatcher: visibility, type switch, renders field)       │
└────────────────────────────────┬────────────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
       ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │   Text      │    │   Select    │    │  Multiselect│
       │  Inputs     │    │   Fields    │    │             │
       └─────────────┘    └─────────────┘    └─────────────┘
              ▼                  ▼                  ▼
       ┌─────────────────────────────────────────────────────┐
       │  Special: Date, Time, Height, File, Radio,          │
       │  Repeatable (nested forms)                          │
       └─────────────────────────────────────────────────────┘
```

---

## Core Types

### 1. API Response Types (`src/types/healthDetailQuestions.types.ts`)

```typescript
// Top-level category group from API
export interface CategoryGroup {
  vCategory: string;           // e.g., "Basic Details", "Medical History"
  questions: CategoryQuestion[];
}

// Individual question within a category
export interface CategoryQuestion {
  iQuestionId?: string | number;
  vSubCategory?: string;       // e.g., "Personal", "Body Measurements"
  jQuestionJson?: QuestionField[];  // Field definitions (THE FORM CONFIG)
  vQuestion?: string;
  vQuestionType?: string;
  vAnswerType?: string;
  vPlaceholder?: string;
  vValidation?: string;
  vDefaultValue?: string;
  vCategory?: string;
  iSortOrder?: number;
  bIsRequired?: boolean;
  bIsActive?: boolean;
  answer?: QuestionAnswer;     // Existing answers from backend
}

// Answer object from API
export interface QuestionAnswer {
  iAnswerId?: string | number;
  iAppointmentId?: string | number | null;
  jAnswerJson?: Record<string, any>;  // Actual answer values
  vAnswer?: string;
  answerCreatedAt?: string;
  answerUpdatedAt?: string;
}

// Field condition for conditional visibility
export interface FieldCondition {
  field: string;               // Parent field name to watch
  operator: 'equals' | 'not_equals' | 'contains' | 'includes' | string;
  value: any;                  // Value to compare against
}

// Complete field definition (THE FORM BUILDING BLOCK)
export interface QuestionField {
  name: string;                // Unique field identifier (formik name)
  label: string;               // Display label
  type: 'text' | 'tel' | 'email' | 'number' | 'date' | 'time' | 
        'select' | 'radio' | 'multiselect' | 'height' | 'file' | 
        'repeatable' | string;
  required?: boolean;
  unit?: string;               // e.g., "kg", "cm", "ft inch"
  options?: (string | number | { label: string; value: any })[];
  condition?: FieldCondition;  // Conditional visibility logic
  fields?: QuestionField[];    // Nested fields (for repeatable type)
  accept?: string | string[];  // File types for file input
  multiple?: boolean;          // Allow multiple files
  min?: number;                // Min value/items
  max?: number;                // Max value
  minItems?: number;           // Min items for repeatable
  addButtonLabel?: string;     // Button text for repeatable
  placeholder?: string;
  defaultValue?: any;
  validation?: string;
}
```

---

## Component Hierarchy & Props

### 1. DynamicQuestionScreen (Screen Entry Point)

**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/index.tsx`

**Navigation Params**:
```typescript
interface DynamicQuestionScreenParams {
  title: string;                    // Category title (e.g., "Basic Details")
  category: string;                 // Category name
  questions: CategoryQuestion[];    // Questions for this category
  allCategories?: CategoryGroup[];  // All categories (for navigation)
  appointmentId?: string;
  memberId?: string;
  patientId?: string;
  doctorId?: string;
}
```

**Responsibilities**:
- Initialize Formik with extracted initial values
- Build Yup validation schema from field definitions
- Group questions by `vSubCategory` into sections
- Handle form submission (save → navigate back)
- Render `SubCategorySection` for each sub-category

---

### 2. SubCategorySection

**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/SubCategorySection.tsx`

**Props**:
```typescript
interface SubCategorySectionProps {
  title: string;                    // Sub-category title (e.g., "Personal")
  fields: QuestionField[];          // All fields in this sub-category
  values: Record<string, any>;      // Formik values
  errors: Record<string, any>;      // Formik errors
  touched: Record<string, any>;     // Formik touched
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, value: boolean) => void;
}
```

**Responsibilities**:
- Render section title
- Map fields to `DynamicField` components
- Pass Formik handlers down

---

### 3. DynamicField (Main Dispatcher)

**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicField.tsx`

**Props**:
```typescript
interface DynamicFieldProps {
  field: QuestionField;             // Field configuration
  value: any;                       // Current field value
  allValues: Record<string, any>;   // All form values (for conditions)
  errors: Record<string, any>;      // Formik errors
  touched: Record<string, any>;     // Formik touched
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, value: boolean) => void;
}
```

**Responsibilities**:
- Evaluate conditional visibility via `evaluateCondition()`
- Switch on `field.type` to render appropriate component
- Handle common props (label, required, error, touched, unit, placeholder)

**Type Mapping Table**:

| `field.type` | Rendered Component | Key Props |
|---|---|---|
| `text` | `DynamicTextInput` | `keyboardType="default"`, `unit` |
| `tel` | `DynamicTextInput` | `keyboardType="phone-pad"`, `maxLength=10` |
| `email` | `DynamicTextInput` | `keyboardType="email-address"`, `autoCapitalize="none"` |
| `number` | `DynamicTextInput` | `keyboardType="numeric"`, `unit` |
| `date` | `DynamicDatePicker` | `maximumDate`, `minimumDate` |
| `time` | `DynamicTimePicker` | - |
| `select` | `DynamicSelect` | `options`, `placeholder` |
| `radio` | `DynamicRadio` | `options` |
| `multiselect` | `DynamicMultiSelect` | `options`, `placeholder` |
| `height` | `DynamicHeightInput` | `onBlurFeet`, `onBlurInches` |
| `file` | `DynamicFileInput` | `accept`, `multiple` |
| `repeatable` | `DynamicRepeatable` | `field` (nested fields), `value` (array) |
| *default* | `DynamicTextInput` | Fallback for unknown types |

---

### 4. Field Components

#### DynamicTextInput
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicTextInput.tsx`

```typescript
interface DynamicTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  unit?: string;              // Displayed as suffix
  editable?: boolean;
}
```

#### DynamicSelect
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicSelect.tsx`

```typescript
interface DynamicSelectProps {
  label: string;
  value: string;
  options?: (string | number | { label: string; value: any })[];
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
```
Uses `react-native-element-dropdown` Dropdown component.

#### DynamicMultiSelect
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicMultiSelect.tsx`

```typescript
interface DynamicMultiSelectProps {
  label: string;
  value: string[];            // Array of selected values
  options?: (string | number | { label: string; value: any })[];
  placeholder?: string;
  onChange: (items: string[]) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
```
**Special Logic**: Handles "None" option mutual exclusivity (if "None" selected, clear others; if other selected, clear "None").

#### DynamicRadio
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicRadio.tsx`

```typescript
interface DynamicRadioProps {
  label: string;
  value: string;
  options?: (string | number | { label: string; value: any })[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
```
Renders horizontal wrapping radio buttons.

#### DynamicDatePicker
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicDatePicker.tsx`

```typescript
interface DynamicDatePickerProps {
  label: string;
  value: string;              // Format: YYYY-MM-DD
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;       // Default: "YYYY-MM-DD"
  maximumDate?: Date;
  minimumDate?: Date;
}
```
Uses `react-native-modal-datetime-picker`. Parses multiple date formats.

#### DynamicTimePicker
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicTimePicker.tsx`

```typescript
interface DynamicTimePickerProps {
  label: string;
  value: string;              // Format: HH:mm
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;       // Default: "HH:mm"
}
```
Uses `react-native-modal-datetime-picker` in time mode.

#### DynamicHeightInput
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicHeightInput.tsx`

```typescript
interface DynamicHeightInputProps {
  label: string;
  value: { heightFeet?: string | number; heightInches?: string | number } | string;
  onChange: (value: { heightFeet: string; heightInches: string }) => void;
  onBlurFeet?: () => void;
  onBlurInches?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
```
Renders two side-by-side inputs (Feet / Inches). Stores as object `{heightFeet, heightInches}`.

#### DynamicFileInput
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicFileInput.tsx`

```typescript
interface DynamicFileInputProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
  accept?: string | string[];
  multiple?: boolean;
}
```
**Two Modes**:
- **Single** (`multiple=false`): Profile/image picker with camera/gallery modal
- **Multiple** (`multiple=true`): Document upload (PDF, JPG, PNG) with file list and remove

Uses `@react-native-documents/picker` for documents, custom `ImagePickerAlert` for images.

#### DynamicRepeatable
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/components/DynamicRepeatable.tsx`

```typescript
interface DynamicRepeatableProps {
  field: QuestionField;       // Contains nested `fields: QuestionField[]`
  value: Record<string, any>[];
  onChange: (value: Record<string, any>[]) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  touched?: boolean;
}
```
**Features**:
- Renders array of items as cards
- Add/Remove items (respects `minItems`)
- Nested sub-fields rendered via internal switch (supports: select, multiselect, radio, date, time, file, number, text)
- Custom "Add More" button label via `field.addButtonLabel`

---

## Utility Functions

### 1. Condition Evaluator
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/utils/conditionEvaluator.ts`

```typescript
evaluateCondition(condition: FieldCondition | undefined, values: Record<string, any>): boolean
```

**Operators Supported**:
| Operator | Description |
|---|---|
| `equals` | Exact match (case-insensitive, normalized) |
| `not_equals` | Not equal |
| `contains` / `includes` | Array includes value OR string includes substring |

**Normalization**: Lowercase, trim, remove spaces/underscores/hyphens.

---

### 2. Answer Extractor
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/utils/answerExtractor.ts`

```typescript
// Normalize option formats to {label, value}
normalizeOptions(options): { label: string; value: string }[]

// Get default value for field type
getFieldDefaultValue(field): any

// Extract single field value from answer JSON (handles aliases, nested structures)
extractAnswerForField(field, answerJson): any

// Extract ALL initial values for Formik
extractAllInitialValues(questions): Record<string, any>

// Flatten all fields from all questions
getAllFields(questions): QuestionField[]
```

**Key Features**:
- **Field Aliases Map** (`FIELD_ALIASES`): Maps frontend field names to backend API aliases
  - e.g., `fruits` ↔ `fruitsFrequency`, `water` ↔ `waterIntake`
- **Height Composite**: Handles nested `height` object with `heightFeet`/`heightInches`
- **Medication Array**: Extracts from `medicineDetails[0]` for medicine sub-fields
- **Type Coercion**: Converts numbers to strings for select/radio, arrays for multiselect

---

### 3. Validation Builder
**File**: `src/views/screens/Preconsultation/DynamicQuestionScreen/utils/validationBuilder.ts`

```typescript
buildYupSchema(fields: QuestionField[]): Yup.ObjectSchema<any>
```

**Validation Rules by Type**:
| Type | Validator |
|---|---|
| `text`, `tel` | `Yup.string()` |
| `email` | `Yup.string().email()` |
| `number` | `Yup.number()` with min/max |
| `date`, `time`, `select`, `radio` | `Yup.string()` |
| `multiselect` | `Yup.array().of(Yup.string())` with min(1) if required |
| `height` | `Yup.object({heightFeet, heightInches})` |
| `file` | `Yup.array()` (multiple) or `Yup.mixed()` |
| `repeatable` | `Yup.array()` with min(minItems) |

**Conditional Validation**: Uses `Yup.mixed().when()` with `evaluateCondition()` to make required fields optional when hidden.

---

## API Response Structure (Example)

### Full API Response
```json
{
  "meta": {
    "success": true,
    "code": 200,
    "message": "Health detail questions and answers fetched successfully."
  },
  "data": [
    {
      "vCategory": "Basic Details",
      "questions": [
        {
          "iQuestionId": 1,
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
                {"label": "Male", "value": "male"},
                {"label": "Female", "value": "female"},
                {"label": "Other", "value": "other"},
                {"label": "Prefer not to say", "value": "prefer_not_to_say"}
              ],
              "required": true
            }
          ],
          "answer": {
            "iAnswerId": 24,
            "jAnswerJson": {
              "email": "ayush@example.com",
              "gender": "Male",
              "fullName": "Mehak MotheR Update",
              "dateOfBirth": "1995-05-15",
              "mobileNumber": 9876543210,
              "profilePhoto": "health-details/profile/xxx.png"
            }
          }
        }
      ]
    },
    {
      "vCategory": "Medical History",
      "questions": [
        {
          "iQuestionId": 4,
          "vSubCategory": "Existing Conditions",
          "jQuestionJson": [
            {
              "name": "medicalCondition",
              "type": "multiselect",
              "label": "Medical Condition",
              "options": ["Diabetes", "Thyroid", "PCOS-PCOD", "High cholesterol", "None"],
              "required": true
            },
            {
              "name": "otherCondition",
              "type": "text",
              "label": "Please specify other medical condition",
              "required": true,
              "condition": {
                "field": "medicalCondition",
                "value": "Other",
                "operator": "contains"
              }
            }
          ],
          "answer": {
            "jAnswerJson": {
              "medicalCondition": ["Diabetes"],
              "otherCondition": null
            }
          }
        }
      ]
    }
  ]
}
```

---

## Field Type Mapping Table (API → Component)

| API `jQuestionJson[].type` | Component | Props Passed |
|---|---|---|
| `text` | `DynamicTextInput` | label, value, onChangeText, onBlur, required, error, touched, placeholder, unit |
| `tel` | `DynamicTextInput` | + keyboardType="phone-pad", maxLength=10 |
| `email` | `DynamicTextInput` | + keyboardType="email-address", autoCapitalize="none" |
| `number` | `DynamicTextInput` | + keyboardType="numeric" |
| `date` | `DynamicDatePicker` | label, value, onChange, onBlur, required, error, touched, placeholder, maximumDate, minimumDate |
| `time` | `DynamicTimePicker` | label, value, onChange, onBlur, required, error, touched, placeholder |
| `select` | `DynamicSelect` | label, value, options, placeholder, onChange, onBlur, required, error, touched |
| `radio` | `DynamicRadio` | label, value, options, onChange, onBlur, required, error, touched |
| `multiselect` | `DynamicMultiSelect` | label, value[], options, placeholder, onChange, onBlur, required, error, touched |
| `height` | `DynamicHeightInput` | label, value{feet,inches}, onChange, onBlurFeet, onBlurInches, required, error, touched |
| `file` | `DynamicFileInput` | label, value, onChange, onBlur, required, error, touched, accept, multiple |
| `repeatable` | `DynamicRepeatable` | field, value[], onChange, onBlur, required, error, touched |

---

## Conditional Visibility Examples

### From API Response (Medical History → Medications)

```json
{
  "name": "takingMedication",
  "type": "radio",
  "label": "Taking Medication?",
  "options": ["Yes", "No"]
}
{
  "name": "medicineName",
  "type": "text",
  "label": "Medicine Name",
  "required": true,
  "condition": {
    "field": "takingMedication",
    "value": "Yes",
    "operator": "equals"
  }
}
```

**Behavior**: `medicineName` field only renders when `takingMedication === "Yes"`.

### From API Response (Food Habits → Food Frequency)

```json
{
  "name": "snacksBetweenMeals",
  "type": "radio",
  "label": "Snacks Between Meals?",
  "options": ["Yes", "No"]
}
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
```

---

## Data Flow Summary

```
API Response (CategoryGroup[])
       │
       ▼
QuestionsList → extracts category vCategory names
       │
       ▼
User selects category → navigates to DynamicQuestionScreen
       │
       ▼
DynamicQuestionScreen receives:
  - questions: CategoryQuestion[] (for selected category)
       │
       ▼
extractAllInitialValues(questions) → Formik initialValues
       │
       ├──► For each CategoryQuestion:
       │       For each QuestionField in jQuestionJson:
       │           extractAnswerForField(field, answer.jAnswerJson)
       │           → Handles aliases, height composite, medication array
       │
       ▼
getAllFields(questions) → flat QuestionField[]
       │
       ▼
buildYupSchema(fields) → Yup validation schema
       │
       ▼
Group by vSubCategory → sections[]
       │
       ▼
Render: SubCategorySection → DynamicField → Specific Component
       │
       ▼
User interacts → Formik handles state
       │
       ▼
On Save: handleSave(values) → navigation.goBack({ mergedAnswers: values })
```

---

## Key Design Patterns

1. **Configuration-Driven**: Form structure entirely from API (`jQuestionJson`)
2. **Single Dispatcher**: `DynamicField` routes to correct component via switch
3. **Conditional Rendering**: `evaluateCondition()` at field level + Yup `.when()` at validation level
4. **Answer Normalization**: `FIELD_ALIASES` map bridges frontend/backend naming differences
5. **Composite Fields**: `height` type stores `{feet, inches}` object
6. **Nested Forms**: `repeatable` type renders array of sub-forms
7. **Type Safety**: Full TypeScript interfaces for all data structures

---

## Extending the System

### Adding a New Field Type

1. Add type to `QuestionField.type` union in `healthDetailQuestions.types.ts`
2. Create component in `DynamicQuestionScreen/components/`
3. Add case in `DynamicField.tsx` switch statement
4. Add validation case in `validationBuilder.ts`
5. Add default value in `answerExtractor.ts` (`getFieldDefaultValue`)
6. Export from `components/index.ts`

### Adding a New Condition Operator

1. Add to `FieldCondition.operator` union type
2. Add case in `evaluateCondition()` switch
3. Update `validationBuilder.ts` if needed

---

## Known Limitations / TODO

1. **No `textarea` type** - Falls back to text input
2. **Repeatable sub-fields limited** - Only supports subset of types (no nested repeatable)
3. **Field aliases hardcoded** - `FIELD_ALIASES` map requires manual updates for new fields
4. **No async validation** - All validation synchronous Yup
5. **File upload not integrated** - `DynamicFileInput` stores local URIs, no upload to API in form
