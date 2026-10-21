# VedicConnect — Color Palette

A consistent color system for the VedicConnect healthcare mobile application, designed to maintain visual consistency across buttons, typography, status indicators, and backgrounds.

**Total colors:** 24  
**Groups:** Brand, Status, Text, Background & Neutral

## 1. Brand Colors

| Color Name          | HEX       |
| ------------------- | --------- |
| Primary             | `#37865F` |
| Primary Light       | `#E5F0E5` |
| Selected            | `#E5F0E5` |
| Disabled Button     | `#B7C9BE` |
| Disabled            | `#A5B9AE` |
| Disabled Button Alt | `#8AAFC4` |
| Secondary Navy      | `#243A5E` |
| Tertiary Mustard    | `#E2AB2F` |

## 2. Status Colors

| Color Name        | HEX         |
| ----------------- | ----------- |
| Success           | `#4CAF70`   |
| Warning Light     | `#FFF0CC`   |
| Error             | `#D32F2F`   |
| Error Transparent | `#FF000099` |
| Blue Accent       | `#066EAE`   |

## 3. Text Colors

| Color Name      | HEX         |
| --------------- | ----------- |
| Heading Text    | `#243A5E`   |
| Regular Text    | `#293846`   |
| Grey Text       | `#687780`   |
| Supporting Text | `#373737D9` |

## 4. Background & Neutral Colors

| Color Name      | HEX       |
| --------------- | --------- |
| Card Background | `#FFF9EC` |
| Border          | `#E7DDC8` |
| White           | `#FFFFFF` |
| Black           | `#000000` |
| Brown Grey      | `#7B7B7B` |
| Light Grey      | `#D2D4D2` |

## 5. Screen Background Gradient

The screen background uses a three-color gradient.

| Gradient Stop | HEX       |
| ------------- | --------- |
| Start         | `#FFF8E8` |
| Middle        | `#F9EED5` |
| End           | `#DDEBDD` |

### CSS Gradient

```css
.screen-background {
  background: linear-gradient(
    180deg,
    #FFF8E8 0%,
    #F9EED5 50%,
    #DDEBDD 100%
  );
}
```

## 6. Button Color Guidelines

| Button State       | Background | Text      | Border    |
| ------------------ | ---------- | --------- | --------- |
| Primary Active     | `#37865F`  | `#FFFFFF` | `#37865F` |
| Secondary Outlined | `#FFFFFF`  | `#37865F` | `#37865F` |
| Disabled           | `#B7C9BE`  | `#FFFFFF` | `#B7C9BE` |
| Alternate Disabled | `#8AAFC4`  | `#FFFFFF` | `#8AAFC4` |
| Navy Primary       | `#243A5E`  | `#FFFFFF` | `#243A5E` |

### Button Usage Notes

- Use **Primary (`#37865F`)** for enabled primary actions.
- Use **Secondary Outlined** for secondary actions, such as Continue or Already Have ABHA, when the design calls for an outlined button.
- Use **Disabled Button (`#B7C9BE`)** for unavailable actions.
- Use **Disabled Button Alt (`#8AAFC4`)** when the alternate muted blue-gray disabled style is required.
- Use **Secondary Navy (`#243A5E`)** for navy primary actions and heading text.
- Preserve the outlined green style of secondary buttons when a prominent navy primary button is already present.

## 7. React Native / TypeScript Color Tokens

```typescript
export const GlobalColors = {
  // Brand
  primary: '#37865F',
  primaryLight: '#E5F0E5',
  selected: '#E5F0E5',
  disabledButton: '#B7C9BE',
  disabled: '#A5B9AE',
  disabledButtonAlt: '#8AAFC4',
  secondaryNavy: '#243A5E',
  tertiaryMustard: '#E2AB2F',

  // Status
  success: '#4CAF70',
  warningLight: '#FFF0CC',
  error: '#D32F2F',
  errorTransparent: '#FF000099',
  blueAccent: '#066EAE',

  // Text
  headingText: '#243A5E',
  regularText: '#293846',
  greyText: '#687780',
  supportingText: '#373737D9',

  // Background & Neutral
  screenBackgroundStart: '#FFF8E8',
  screenBackgroundMiddle: '#F9EED5',
  screenBackgroundEnd: '#DDEBDD',
  cardBackground: '#FFF9EC',
  border: '#E7DDC8',
  white: '#FFFFFF',
  black: '#000000',
  brownGrey: '#7B7B7B',
  lightGrey: '#D2D4D2',
} as const;
```

## 8. Figma Variable Naming

Use a `VedicConnect` collection with the following variable groups:

```text
VedicConnect/
├── Brand/
├── Status/
├── Text/
└── Background & Neutral/
```

Recommended variable names include `Brand/Primary`, `Brand/Secondary Navy`, `Brand/Disabled Button`, `Text/Heading Text`, and `Background & Neutral/Card Background`.

## Notes

- `Primary Light` and `Selected` intentionally share the same HEX value.
- `#FF000099` and `#373737D9` are 8-digit HEX values that include alpha transparency.
- The screen background is a gradient, not a single solid color.
- Keep color tokens centralized so design and development remain consistent.
