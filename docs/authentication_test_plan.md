# Authentication Functionality Test Plan

This document outlines the manual test plan for the authentication functionalities of the project, including signup, login, logout, error handling, and UI verification.

## 1. Signup Functionality

### Test Cases:
- TC1: Successful signup with valid name, email (ending with @gmail.com), and password.
- TC2: Signup fails with missing required fields (name, email, or password).
- TC3: Signup fails with invalid email format (not ending with @gmail.com).
- TC4: Signup fails if email is already registered.
- TC5: Verify that after successful signup, user is logged in and redirected to home page.
- TC6: Verify error messages are displayed appropriately on failure.

### Steps:
1. Navigate to Signup page.
2. Fill in the form fields according to the test case.
3. Submit the form.
4. Observe the result and verify expected behavior.

## 2. Login Functionality

### Test Cases:
- TC1: Successful login with valid email and password.
- TC2: Login fails with missing email or password.
- TC3: Login fails with invalid email format.
- TC4: Login fails with incorrect email or password.
- TC5: Verify that after successful login, user is redirected to home page.
- TC6: Verify error messages are displayed appropriately on failure.

### Steps:
1. Navigate to Login page.
2. Fill in the form fields according to the test case.
3. Submit the form.
4. Observe the result and verify expected behavior.

## 3. Logout Functionality

### Test Cases:
- TC1: Successful logout when clicking the Logout button.
- TC2: Verify that after logout, user session is cleared and user is redirected or page is reloaded.
- TC3: Verify that protected routes are inaccessible after logout.

### Steps:
1. Login successfully.
2. Click the Logout button.
3. Observe the result and verify expected behavior.

## 4. Error Handling

- Verify that all error messages are user-friendly and informative.
- Verify that network or server errors are handled gracefully.

## 5. UI Verification

- Verify that Signup, Login, and Logout UI elements are present and styled correctly.
- Verify navigation links between Login and Signup pages work correctly.

---

# Automated Testing Suggestions

- Use Jest and React Testing Library for unit and integration tests.
- Mock AuthService methods to simulate API responses.
- Write tests for Signup, Login, and Logout components covering success and failure scenarios.
- Test Redux authSlice reducers and actions.
