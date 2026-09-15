# Dietitian flow

Here mostly we are focusing on how we are going to implement Dietitian flow in the current application, that is the changes we are going to make in the current flow.

## App

### Adding Navigation for Dietitian Flow

## Auth

### Choose Role

* Dietitian Role will be added.

---

## Patient

### Profile

* Adding a button for switching between the Dietitian mode and Doctor Mode for treatment.

### Book Appointment

1. **Select Treatment Area:** Here we will show Nutritional Goal List.
2. **Select Doctor:** Here will show list of dietitian in same manner.
3. **Select Slot:** Here we are going to show the available slots of the dietitian.

---

## Dietitian

### Introducting New Role : Dietitian

---

## Features Listed in the Sheet

* Add a Dietician button in the role selection screen during registration. The rest of the registration flow will remain the same.
* In Practice Details, display treatment areas based on the selected role. If the role is Dietician, show only treatment areas whose type is Dietician. For all other roles, show the other applicable treatment areas.
* Apply the same treatment-area filtering logic to the Search Doctor screen.
* When the selected role is Dietician, hide the Follow-up Amount field.
* When a patient selects a Dietician, do not show the consultation fee pop-up. Directly navigate to the Slots screen, as consultations with a Dietician will always be considered Initial Consultations.
* When an appointment with a Dietician is completed, show the Suggested Lab Tests screen to the Dietician, where they can select the tests that the patient needs to take.
* In the Past Appointments screen, show the Lab Tests button only for completed appointments with a Dietician. The same functionality should be available for the Dietician as well.
* A Dietician can only view the lab reports uploaded by the patient.
* The Patient can upload lab reports and can modify or replace the uploaded reports for a limited period of time after uploading them. Once this time period expires, the patient can no longer modify the uploaded reports.
* Health record save
* display health record during call

---
