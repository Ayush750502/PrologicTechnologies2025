# Stable Jotai Usage

Based on everything we've discussed—and considering your experience with both Redux and Jotai—I think there's a pattern that gives you the best of both worlds:

* ✅ Feels like `useState`
* ✅ Organized like Redux slices
* ✅ Minimal boilerplate
* ✅ Good performance
* ✅ Easy to maintain as the project grows

---

## Recommended Folder Structure

```text
src/
└── store/
    ├── auth/
    │   ├── atom.ts
    │   ├── hooks.ts
    │   ├── actions.ts
    │   └── types.ts
    │
    ├── user/
    │   ├── atom.ts
    │   ├── hooks.ts
    │   ├── actions.ts
    │   └── types.ts
    │
    ├── cart/
    └── settings/
```

Each feature is self-contained, similar to a Redux slice.

---

## 1. Atom

```ts
// atom.ts

import { atom } from 'jotai';

export interface UserState {
    name: string;
    age: number;
    email: string;
}

export const userAtom = atom<UserState>({
    name: '',
    age: 0,
    email: '',
});
```

---

## 2. Hooks

Separate **reading** and **writing**.

```ts
// hooks.ts

import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom } from './atom';

export const useUser = () => useAtomValue(userAtom);

export const useSetUser = () => useSetAtom(userAtom);
```

Why?

If a component only updates the user, it shouldn't re-render when the user changes.

---

## 3. Actions

```ts
// actions.ts

import { useCallback } from 'react';
import { useSetUser } from './hooks';

export const useUserActions = () => {
    const setUser = useSetUser();

    const setName = useCallback((name: string) => {
        setUser(prev => ({
            ...prev,
            name,
        }));
    }, [setUser]);

    const setAge = useCallback((age: number) => {
        setUser(prev => ({
            ...prev,
            age,
        }));
    }, [setUser]);

    const reset = useCallback(() => {
        setUser({
            name: '',
            age: 0,
            email: '',
        });
    }, [setUser]);

    return {
        setName,
        setAge,
        reset,
    };
};
```

Notice:

* Components never manipulate state directly.
* Business logic stays in one place.
* Very similar to Redux actions.

---

## 4. Usage

```tsx
const user = useUser();
const { setName, setAge } = useUserActions();

<Text>{user.name}</Text>

<Button
    title="Update"
    onPress={() => setName('Ayush')}
/>
```

Simple.

---

## Derived State

Instead of storing computed values:

```ts
const fullName = firstName + lastName;
```

Create a derived atom.

```ts
export const fullNameAtom = atom(get =>
    `${get(firstNameAtom)} ${get(lastNameAtom)}`
);
```

Never duplicate state.

---

## Async Operations

Don't put API calls inside atoms.

Instead:

```ts
const { setName } = useUserActions();

const updateProfile = async () => {
    const response = await api.getProfile();

    setName(response.name);
};
```

Or even better, use **TanStack Query** for server state and Jotai for client state.

---

## Large Objects vs Many Atoms

Instead of:

```ts
appState = {
    user,
    cart,
    settings,
    notification,
    chat,
}
```

Prefer:

```ts
userAtom
cartAtom
settingsAtom
notificationAtom
chatAtom
```

Each feature owns its own state.

---

## When to Create Another Atom

Good:

```ts
userAtom

cartAtom

themeAtom
```

Avoid:

```ts
nameAtom

ageAtom

emailAtom

phoneAtom

addressAtom
```

Splitting every field into its own atom usually becomes harder to manage unless those fields are updated independently.

Think in terms of **feature/domain atoms**, not **property atoms**.

---

## Naming Convention

```
userAtom
useUser()
useSetUser()
useUserActions()

cartAtom
useCart()
useCartActions()

themeAtom
useTheme()
useThemeActions()
```

This stays consistent across the project.

---

## What to Avoid

❌ Updating atoms directly in every component:

```ts
const [, setUser] = useAtom(userAtom);

setUser(...);
```

Now every component contains business logic.

---

❌ Huge global atom:

```ts
appAtom = {
    auth,
    user,
    cart,
    chat,
    settings,
    ...
}
```

You lose Jotai's biggest advantage: fine-grained updates.

---

❌ Mixing API calls inside atoms.

Keep server state and client state separate.

---

## My Final Architecture

```text
src/
│
├── store/
│   ├── auth/
│   │   ├── atom.ts
│   │   ├── hooks.ts
│   │   ├── actions.ts
│   │   └── types.ts
│   │
│   ├── user/
│   ├── cart/
│   ├── settings/
│   └── notification/
│
├── services/      // axios/api
├── queries/       // TanStack Query
├── screens/
├── components/
└── navigation/
```

#### Why I recommend this

Given your background with **Redux**, **Jotai**, and **TanStack Query**, this architecture strikes a good balance:

* **TanStack Query** → server state (API data, caching, refetching)
* **Jotai** → client/global state (auth, theme, UI state, selected items, local preferences)
* **Feature-based folders** → Redux-like organization without Redux's boilerplate
* **`useAtomValue` + `useSetAtom`** → avoids unnecessary subscriptions
* **Feature action hooks** → centralize business logic while keeping components clean

It remains easy to understand for a solo developer today, and it's structured enough to scale if the application becomes much larger or more collaborative.
