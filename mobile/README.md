# Medisafe Android (Expo)

This is a native Android client added alongside the existing Medisafe web app. It reuses the existing Supabase project, PostgreSQL tables, private `prescriptions` Storage bucket, and Flask API. It does not create a second backend.

## 1. Prerequisites
- Node.js LTS and npm
- Android Studio + Android SDK (for local emulator/device builds), or an Expo account for EAS cloud builds
- Access to the existing Supabase project and the deployed Flask API

## 2. Configure environment
Copy `.env.example` to `.env` in this folder and set:
- `EXPO_PUBLIC_SUPABASE_URL`: the exact URL used by the web app's `VITE_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: the same publishable/anon key used by the web app (never a secret/service-role key)
- `EXPO_PUBLIC_API_URL`: deployed Flask API base ending in `/api`, e.g. `https://your-api.example.com/api`

The Flask backend must be publicly reachable over HTTPS and configured with the same Supabase project URL. The Android app sends the user's Supabase access token as a Bearer token to existing `/medications` and `/vitals` routes.

## 3. Install and run
```bash
cd mobile
npm install
npx expo start
```
Press `a` to open Android emulator, or scan the Expo Go QR code for UI iteration. Native notification testing and release builds should use a development/release build, not rely on Expo Go.

## 4. Build APK / Play Store AAB
Install EAS CLI and sign in:
```bash
npm install -g eas-cli
eas login
eas build:configure
```
Replace `REPLACE_WITH_YOUR_EAS_PROJECT_ID` in `app.json` with the project ID created by EAS, then:
```bash
eas build --profile preview --platform android   # installable APK
eas build --profile production --platform android # Play Store AAB
```

## 5. Shared data model
- Flask API: medications and vital readings
- Supabase: schedules, dose logs, prescriptions, profiles and alerts
- Supabase Storage: private `prescriptions` bucket, signed URLs for viewing
- Auth: existing Supabase email/password accounts

Enable and verify Row Level Security for every table and private Storage policies before real users' health data is used. The app assumes the existing web project's schema and policies are present.

## 6. Reminder behaviour
The app asks for Android notification permission and schedules the next 30 days of active schedules locally. It refreshes on dashboard launch and after medicine/schedule changes. Android exact-alarm and battery settings vary by OS/device; reminders can be delayed or suppressed if the user force-stops the app, denies permissions, or restricts background activity. Test on physical devices, after reboot, timezone changes, and Android 12+ exact-alarm settings before production use.

## 7. Important implementation notes
- The current mobile add-medicine flow creates one daily schedule at the selected time. Edit/delete schedule management and full weekly recurrence UI should be added before declaring feature parity with web.
- Medication logs are displayed from the shared tables. Dose Taken / Skip actions are not yet wired in this first implementation.
- Prescription document signed links are generated for 60 seconds. This initial screen displays the secure link; a native PDF/image viewer can be added next.
- No Supabase secret key or database password belongs in the mobile app.
- Run `npm run typecheck` and a full Android build, then exercise all CRUD and cross-platform sync paths before release.
