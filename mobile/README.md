# Buka App

Buka is a mobile zodiac application that allows users to discover their zodiac sign based on their birth date, with history tracking and profile viewing.

---

## Features

### Zodiac System

- Select birth date
- Get zodiac sign, strengths, weaknesses, and colors
- Animated result display
- Zodiac grid overview

### History

- Stores all zodiac calculations per user
- View past results with animations

### Profile

- Displays user information
- Shows basic stats (future-ready)

---

## Tech Stack

### Frontend (Flutter)

- Flutter SDK
- Material UI
- HTTP package
- Flutter Secure Storage
- Font Awesome Icons
- Custom animations (Fade, Slide, Scale)

---

## Project Structure (Frontend)

        lib/
        ├── models/
        │ └── zodiac_model.dart
        ├── screens/
        │ ├── login_screen.dart
        │ ├── register_screen.dart
        │ ├── zodiac_screen.dart
        │ ├── history_screen.dart
        │ └── profile_screen.dart
        ├── services/
        │ ├── auth_service.dart
        │ ├── zodiac_service.dart
        │ ├── user_service.dart
        │ └── storage_service.dart
        └── main.dart

---

## Setup Instructions

### 1. Clone Project

        bash
        git clone <your-repo-url>
        cd buka_app

### 2. Install Flutter Dependencies

        bahs
        flutter pub get

### 3. Run Flutter App

        bash
        flutter run

## Backend Configuration

The app now auto-detects Android device type:

- Android emulator -> uses `http://10.0.2.2:5280`
- Physical Android device (USB debug) -> uses `http://127.0.0.1:5280`

For physical Android via USB debugging, run this once before `flutter run`:

`adb reverse tcp:5280 tcp:5280`

Optional override (any device):

`flutter run --dart-define=API_BASE_URL=http://192.168.1.20:5280`

### API Endpoints Used

`**Authentication**

- POST /api/auth/login
- POST /api/auth/register

`**User**

- GET /api/user/profile

`**Zodiac**

- GET /api/zodiac/{month}/{day}
- GET /api/zodiac/history

---

## Database

- PostgreSQL
- Entity Framework Core
- Table: Zodiacs

Fields:

- Id
- Sign
- Strengths
- Weaknesses
- Colors
- CreatedAt

## Security

- JWT authentication for protected endpoints
- Token stored securely in device storage
- API requests include Bearer token header

## UI Design

- Light grey modern UI theme
- Deep purple primary accent
- Grid-based zodiac layout
- Smooth animations (fade, slide, scale)
- Mobile-first responsive design

## Notes

- Backend must be running before Flutter app requests data
- Android emulator uses 10.0.2.2 to access localhost API

- Zodiac images must be placed in:

`assets/images/zodiac/`

## Future Improvements

- Logout system
- Auto-login session restore
- Push notifications
- Social sharing of zodiac results
- Daily horoscope feature

## Author

Built as a learning project for full-stack mobile development using Flutter + ASP.NET Core.
