# Appium Mobile Automation Testing — TheApp (Login Flow)

Mobile UI automation project built with **Appium** and **WebDriver (wd)** to test the login flow of **TheApp**, HeadSpin's open-source sample Android app. The suite drives a real Android emulator end-to-end: launching the app, filling in the login form, and asserting the app routes to the correct screen for both valid and invalid credentials.

Built as part of **SQT 3043 – Mobile Application Testing**.

## What this demonstrates

- Setting up a full mobile test automation environment from scratch (Node.js, JDK, Android Studio/AVD, Appium Server)
- Writing Appium automation scripts in JavaScript using accessibility IDs and XPath locators
- Driving an Android emulator programmatically (element location, input, clicks, wait strategies)
- Validating both the "happy path" (successful login) and a negative case (invalid login) in the same test
- Reading and debugging Appium/WebDriver session logs

## Tech stack

| Layer | Tool |
|---|---|
| Automation framework | [Appium](https://appium.io/) 2.x |
| Client library | [wd](https://www.npmjs.com/package/wd) (WebDriver client for Node.js) |
| Language | JavaScript (Node.js) |
| Target app | [TheApp](https://github.com/headspinio/theapp) by HeadSpin (sample Android app) |
| Device | Android Emulator — Pixel 8, API 34 |
| Driver | UiAutomator2 |

## Project structure

```
appium-theapp-mobile-testing/
├── README.md
├── package.json
├── .gitignore
├── src/
│   └── appiumTest.js        # login automation script
└── docs/
    └── screenshots/         # environment setup + test run evidence
```

## Prerequisites

- [Node.js](https://nodejs.org) (v18+ recommended)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Android Studio](https://developer.android.com/studio) with an Android Virtual Device (AVD) configured
- [Appium Server](https://appium.io/) (Desktop app or CLI)
- The [TheApp](https://github.com/headspinio/theapp) APK for Android

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start an Android emulator**
   Open Android Studio → Device Manager → launch your AVD (e.g. Pixel 8, API 34).

3. **Install TheApp on the emulator**
   Drag-and-drop the `.apk` onto the running emulator, or install via `adb install TheApp.apk`.

4. **Start the Appium server**
   ```bash
   appium
   ```
   or launch Appium Desktop and click **Start Server** (default: `http://localhost:4723`).

5. **Update capabilities**
   In `src/appiumTest.js`, set the `app` path (and `deviceName` if different) to match your local setup.

## Running the tests

```bash
npm test
```

This runs `src/appiumTest.js`, which:
1. Opens TheApp and navigates to the **Login Screen** demo
2. Submits valid credentials and asserts navigation to the **Secret Area** screen
3. Submits invalid credentials and asserts the expected error message is shown
4. Prints pass/fail output to the console and closes the session

## Test scenario walkthrough

| Step | Action | Expected result |
|---|---|---|
| 1 | Tap "Login Screen" on TheApp's home menu | Login form is displayed |
| 2 | Enter valid username/password, submit | App navigates to "Secret Area" |
| 3 | Enter invalid credentials, submit | App shows an "Invalid login credentials" error |

## Evidence / screenshots

All screenshots referenced below live in [`docs/screenshots`](./docs/screenshots).

| # | Screenshot | Description |
|---|---|---|
| 1 | `01-node-version.png` | Node.js installed and verified (`node -v`) |
| 2 | `02-java-version.png` | JDK installed and verified (`java -version`) |
| 3 | `03-appium-install.png` | Installing Appium globally via npm |
| 4 | `04-appium-version.png` | Verifying Appium install (`appium --version`) |
| 5 | `05-appium-server-ui.png` | Appium Desktop server UI |
| 6 | `06-appium-server-running.png` | Appium server running and listening on port 4723 |
| 7 | `07-avd-manager.png` | Android Virtual Device configured (Pixel 8, API 34) |
| 8 | `08-emulator-home.png` | Emulator home screen |
| 9 | `09-theapp-menu.png` | TheApp's demo menu (Login Screen, Echo Box, etc.) |
| 10 | `10-npm-init.png` | Initializing the Node.js project (`npm init -y`) |
| 11 | `11-npm-install-appium.png` | Installing the `appium` package as a project dependency |
| 12 | `12-npm-install-wd.png` | Installing the `wd` WebDriver client |
| 13 | `13-login-test-code.png` | The `loginTest` automation function |
| 14 | `14-test-console-output.png` | Console/session log from a successful test run |
| 15 | `15-demo-recording.gif` | Screen recording of the automated run on the emulator |

> **Note:** `15-demo-recording.gif` is a large file (~12 MB). If your GitHub push is slow or you'd rather keep the repo lightweight, consider trimming/compressing it (e.g. with [ezgif.com](https://ezgif.com/optimize)) or using [Git LFS](https://git-lfs.com/) for it.

## Result

✅ Login succeeded with valid username & password, and correctly failed (with the expected error) for invalid credentials.
