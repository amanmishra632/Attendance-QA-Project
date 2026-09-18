# Attendance Management System - Test Cases
## TC01 - Teacher Login with Valid Credentials

- **Precondition:** The application is running.
- **Test Steps:**
  1. Open the application.
  2. Enter `teacher@test.com` in the email field.
  3. Enter `Teacher@123` in the password field.
  4. Click the Login button.
- **Expected Result:** The application should display `Login successful`.
- **Actual Result:** `Login successful` was displayed.
- **Status:** PASS

## TC02 - Teacher Login with Incorrect Password

- **Precondition:** The application is running.
- **Test Steps:**
  1. Open the application.
  2. Enter `teacher@test.com` in the email field.
  3. Enter `Teacher@127` in the password field.
  4. Click the Login button.
- **Expected Result:** The application should display `Invalid email or password`.
- **Actual Result:** `Invalid email or password` was displayed.
- **Status:** PASS

## TC03 - Teacher Can Mark Attendance as Present

- **Precondition:** The application is running.
- **Test Steps:**
  1. Open the application.
  2. Select `Teacher` as the role.
  3. Enter student ID `102`.
  4. Select `Present` as the attendance status.
  5. Click the Save Attendance button.
- **Expected Result:** The application should display `Attendance saved successfully` and student 102's attendance should be saved as `Present`.
- **Actual Result:** `Attendance saved successfully` was displayed and student 102's attendance was saved as `Present`.
- **Status:** PASS

## TC04 - Teacher Can Mark Attendance as Absent

- **Precondition:** The application is running.
- **Test Steps:**
  1. Open the application.
  2. Select `Teacher` as the role.
  3. Enter student ID `102`.
  4. Select `Absent` as the attendance status.
  5. Click the Save Attendance button.
- **Expected Result:** The application should display `Attendance saved successfully` and student 102's attendance should be saved as `Absent`.
- **Actual Result:** `Attendance saved successfully` was displayed and student 102's attendance was saved as `Absent`.
- **Status:** PASS

## TC05 - A student must not be allowed to modify attendance.

- **Precondition:** The application is running.
- **Test Steps:**
  1. Open the application.
  2. Select `Student` as the role.
  3. Enter student ID `102`.
  4. Select `Absent` as the attendance status.
  5. Click the Save Attendance button.
- **Expected Result:** The application should display `Only teachers can modify attendance` and student 102's attendance should be saved as `Present`.
- **Actual Result:** Only teachers can modify attendance was displayed and student 102's attendance remained Present.
- **Status:** PASS

## Test Summary

- Total Test Cases: 5
- Passed: 5
- Failed: 0




