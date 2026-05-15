# NutriStats (Macrometric)

A professional nutrition and weight tracking dashboard with secure Firebase authentication and real-time data persistence.

## Features
- **Secure Authentication**: Google Login via Firebase.
- **Nutrition Tracking**: Log proteins, calories, fats, and carbs.
- **Weight Monitoring**: Track weight progress with visual charts.
- **Responsive Design**: Sleek "Macrometric" dark theme.
- **Data Persistence**: Powered by Firestore Enterprise.

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root based on `.env.example`:
```env
GEMINI_API_KEY="YOUR_API_KEY"
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **Backend/Database**: Firebase (Auth & Firestore).
- **Animations**: Motion (formerly Framer Motion).
- **Charts**: Recharts.
- **Icons**: Lucide React.
