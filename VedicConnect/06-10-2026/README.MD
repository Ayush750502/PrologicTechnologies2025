# VedicConnect Chat Module Architecture & Socket.IO Events Documentation

This document provides a comprehensive technical overview of the Chat feature in VedicConnect, detailing component architecture, custom hooks, REST API integrations, and Socket.IO real-time event schemas.

---

## 🏗️ 1. Architecture & Component Structure

The Chat feature is located at:
`src/views/screens/BottomTabs/ChatHistory/ChatScreen/`

It follows a strict **Separation of Concerns** architecture, decoupling presentational JSX components from business logic and state management.

```
ChatScreen/
├── ChatScreen.tsx             # Presentational screen orchestrating sub-components & modals
├── useChatScreen.ts           # Core custom hook (state, socket, APIs, timers, scroll, keyboard)
├── ChatHeader.tsx             # Top navigation bar with timer countdown and participant details
├── ChatTypes.ts               # TypeScript interfaces & message normalizing utilities
├── styles.ts                  # Screen StyleSheet styles
├── Component/
│   ├── ChatInput.tsx          # Bottom text input & attachment picker bar
│   ├── MessageItem.tsx        # Message bubbles with dynamic Date Header Pills & formatted time
│   └── RequestNotification.tsx # Notification banner for consultation extensions
└── functions/
    └── index.ts               # Helper utilities & logging functions
```

### Component Responsibilities:

- **`ChatScreen.tsx`**: High-level wrapper component. It calls `useChatScreen({ navigation, route })` and renders `ChatHeader`, `KeyboardAvoidingView`, `FlatList` with `MessageItem`, `ChatInput`, and confirmation alert modals (`ImagePickerAlert`, `EndChatAlert`, `CancelAppointmentAlert`).
- **`useChatScreen.ts`**: Encapsulates all state management, Socket.IO lifecycle, REST API queries/mutations (`useSendMessageApi`, `useGetMessagesApi`, `useReadChatApi`, `useCallChatEnd`, `useContinueChatAmountDeduct`), Jotai global atoms (`UserData`, `UserChatStatus`, `HeaderData`), hardware back press handling, and auto-scroll logic.
- **`MessageItem.tsx`**: Renders message bubbles dynamically aligned based on sender (`Patient` vs `Doctor`). Automatically computes dynamic Date Header Pills (`Today`, `Yesterday`, `Month DD, YYYY`) and formats message timestamps to `h:mm A`.
- **`ChatHeader.tsx`**: Top navigation header showing participant name, profile photo, active consultation countdown timer, back navigation, and end consultation trigger button.
- **`ChatInput.tsx`**: Bottom input bar supporting text messages, image attachment previews, loading state, and disabled UI state when a participant leaves.
- **`RequestNotification.tsx`**: Top notification banner displayed when a patient requests a consultation extension or when fee deduction is processed.

---

## 🌐 2. REST API Integration Map

| Endpoint | Hook | Method | Description |
| :--- | :--- | :--- | :--- |
| `/messages` | `useGetMessagesApi` | `GET` | Fetches historic paginated chat messages for given `senderId` and `receiverId`. |
| `/sendmessage` | `sendMessageApi` | `POST` | Multipart endpoint to send text messages or image/file attachments. |
| `/chat-read` | `callReadChatApi` | `POST` | Marks incoming unread messages as read. |
| `/end-chat` | `callChatEnd` | `POST` | Finalizes consultation status (`eStatus: 'completed'`). |
| `/amount-deduct` | `amountDeductApi` | `POST` | Processes wallet deduction for extending consultation duration. |

---

## 📤 3. Socket.IO Emitted Events (Client -> Server)

### Summary Table

| Event Name | Trigger Context | Payload / Event Data Summary |
| :--- | :--- | :--- |
| **`joinRoom`** | Sent automatically upon socket connection (`connect`) | `{ userId, token }` |
| **`sendMessage`** | Sent when sending a text message or file attachment | `{ room, message, token, receiverId, appointmentId, senderId, iRoleId, vFile_Url }` |
| **`typing`** | Triggered when user starts typing text in input | `{ userId }` |
| **`stopTyping`** | Triggered 1 second after user stops typing | `{ userId }` |
| **`patient_response`** | Patient accepts request to extend/continue chat | `{ userId, response: "yes" }` |
| **`doctor_accept`** | Doctor accepts or rejects patient's continue chat request | `{ patientId, doctorId, newAppointmentFee, appointmentId, token, requestType, userId }` |
| **`patientConnect`** | Patient ends active chat session | `{ patientId, userId }` |
| **`doctorConnect`** | Doctor ends active chat session | `{ doctorId, userId }` |
| **`ping`** | 25-second heartbeat interval (keeps iOS WebSocket active) | *(No payload data sent)* |

---

### Detailed Payload Schemas

#### 1. `joinRoom`
- **Description**: Registers user to socket room upon connecting.
```json
{
  "userId": 1146,
  "token": "eyJhbGciOi..."
}
```

#### 2. `sendMessage`
- **Text Message Payload**:
```json
{
  "room": "MTE0Ng==",
  "message": "Hello Doctor!",
  "token": "eyJhbGciOi...",
  "receiverId": "MTE0OQ==",
  "appointmentId": 452,
  "senderId": "MTE0Ng==",
  "iRoleId": 1,
  "vFile_Url": null
}
```
- **File / Image Attachment Payload**:
```json
{
  "room": "MTE0Ng==",
  "message": "photo.jpg",
  "token": "eyJhbGciOi...",
  "receiverId": "MTE0OQ==",
  "appointmentId": 452,
  "senderId": "MTE0Ng==",
  "iRoleId": 1,
  "vFile_Url": "https://vedic-connect.ayurverse.health/storage/chats/photo.jpg"
}
```

#### 3. `typing`
```json
{
  "userId": "MTE0Ng=="
}
```

#### 4. `stopTyping`
```json
{
  "userId": "MTE0Ng=="
}
```

#### 5. `patient_response`
```json
{
  "userId": "MTE0Ng==",
  "response": "yes"
}
```

#### 6. `doctor_accept`
```json
{
  "patientId": "MTE0Ng==",
  "doctorId": "MTE0OQ==",
  "newAppointmentFee": 500,
  "appointmentId": 452,
  "token": "eyJhbGciOi...",
  "requestType": true,
  "userId": "MTE0OQ=="
}
```

#### 7. `patientConnect` / `doctorConnect`
- **Patient**:
```json
{
  "patientId": "MTE0Ng==",
  "userId": "MTE0Ng=="
}
```
- **Doctor**:
```json
{
  "doctorId": "MTE0OQ==",
  "userId": "MTE0OQ=="
}
```

#### 8. `ping`
- *(No payload data body)*

---

## 📥 4. Socket.IO Listened Events (Server -> Client)

### Summary Table

| Event Name | Purpose / Handler Action | Received Payload Summary |
| :--- | :--- | :--- |
| **`connect`** | Connection established; emits `joinRoom`, refetches unread messages | *(None)* |
| **`twoUsersConnected`** | Triggered when both participants enter the session room | `{ userCount, dScheduledDate, dChatTime }` |
| **`message`** | Incoming real-time chat message | `{ id, sender_id, receiver_id, message, message_type, file_path, created_at }` |
| **`roomMessages`** | Initial history array received upon room join | `{ text: [...] }` |
| **`show_doctor_request`** | Doctor receives continuation notification from patient | `{ message }` |
| **`userTyping`** | Other user is typing | `{ userId }` |
| **`userStoppedTyping`** | Other user stopped typing | `{ userId }` |
| **`amount_deducted`** | Result of chat extension fee deduction | `{ request: "True" \| "False", dChatTime }` |
| **`first_disconnected`** | One of the users leaves the active chat session | `{ message: "doctor" \| "patient" }` |
| **`disconnect`** | Socket disconnect notification | `"io server disconnect"` *(string reason)* |
| **`connect_error`** | Socket connection failed | `Error` object |

---

### Detailed Data Schemas

#### 1. `twoUsersConnected`
```json
{
  "userCount": 2,
  "dScheduledDate": "2026-10-06T10:00:00.000Z",
  "dChatTime": "2026-10-06T10:00:00.000Z"
}
```

#### 2. `message`
```json
{
  "id": 9,
  "sender_id": "MTE0OQ==",
  "receiver_id": "MTE0Ng==",
  "message": "Hello Doctor! How are you?",
  "message_type": "text",
  "file_path": null,
  "file_name": null,
  "file_mime": null,
  "file_size": null,
  "read_at": null,
  "created_at": "2026-10-06 09:10:32"
}
```

#### 3. `roomMessages`
```json
{
  "text": [
    {
      "id": 1,
      "sender_id": "MTE0OQ==",
      "receiver_id": "MTE0Ng==",
      "message": "Hello Doctor!",
      "created_at": "2026-10-05 09:46:34"
    }
  ]
}
```

#### 4. `show_doctor_request`
```json
{
  "message": "Patient has requested to extend the consultation."
}
```

#### 5. `userTyping` / `userStoppedTyping`
```json
{
  "userId": "MTE0OQ=="
}
```

#### 6. `amount_deducted`
```json
{
  "request": "True",
  "dChatTime": "2026-10-06T10:15:00.000Z"
}
```

#### 7. `first_disconnected`
```json
{
  "message": "doctor"
}
```

---

## 👥 5. User Roles & Authorizations

- **Patient (`iRoleId === 1`)**:
  - `receiverId` is set to the Doctor / RMP ID (`doctor_id`).
  - Warned via `CancelAppointmentAlert` when remaining consultation time drops below thresholds (`count <= 45`).
  - Can initiate continuation requests which trigger fee deduction approvals.

- **Doctor / RMP / Dietitian (`iRoleId === 3` or `5`)**:
  - `receiverId` is set to Patient ID (`patient_id`).
  - Receives `show_doctor_request` notifications via `RequestNotification` banner when patient requests extra time.
  - Can approve or decline extension requests via `onDoctorAcceptHandler(type)`.

---

## 🕒 6. Date & Time Display Formatting Rules

- **Message Timestamp**: Formatted using `dayjs(date).format('h:mm A')` (e.g. `9:46 AM`, `11:31 AM`).
- **Date Section Header Pills**:
  - `Today`: If message timestamp matches today's date.
  - `Yesterday`: If message timestamp matches yesterday's date.
  - `MMMM D, YYYY` (e.g. `October 5, 2026`): For older message timestamps.
