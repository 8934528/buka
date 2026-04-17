# Buka Web

Discover your zodiac sign with Buka - a beautiful, interactive web application that reveals your cosmic identity through ancient wisdom.

## Features

- **Authentication** - Secure login and registration system
- **Zodiac Discovery** - Find your zodiac sign by entering your birth date
- **History Tracking** - Keep track of all your zodiac discoveries
- **User Profile** - View your account information and stats
- **Beautiful UI** - Modern design with smooth animations and hover effects
- **Responsive** - Works perfectly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router DOM** - Navigation
- **Bootstrap 5** - Styling & Grid System
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Icons** - Icon Library
- **Axios** - API Communication

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd buka-web

# Install dependencies
npm install

# Optional: configure backend URL
# (defaults to http://localhost:5280/api)
echo VITE_API_BASE_URL=http://localhost:5280/api > .env

# Start development server
npm run dev
```

## Usage

- Create an account - Sign up with your name, email, and password
- Login - Access your personalized dashboard
- Find your zodiac - Select your birth date and discover your sign
- View history - See all your previous zodiac discoveries
- Check profile - View your account details and stats

## Design Highlights

- Gradient backgrounds - Modern and eye-catching
- Smooth animations - Page transitions and hover effects
- Card-based layout - Clean and organized content
- Responsive grid - Adapts to any screen size
- Custom color scheme - Elegant purple theme

---

## Project Structure

      buka-web/
      ├── src/
      │   ├── components/    # Reusable components
      │   ├── pages/         # Page components
      │   ├── services/      # API services
      │   ├── types/         # TypeScript definitions
      │   ├── App.tsx        # Main app component
      │   └── main.tsx       # Entry point
      ├── public/            # Static assets
      └── package.json       # Dependencies

---

## Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build

## Future Enhancements

- Dark mode toggle
- Zodiac compatibility checker
- Daily horoscope readings
- Social sharing features
- Export history as PDF
