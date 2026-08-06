# AuraFit AI - Personalized Fitness Trainer & Tracker Web App

AuraFit AI is a full-stack, personalized AI-powered fitness trainer app built with **React 18**, **Tailwind CSS**, **Recharts**, **Firebase (Firestore, Authentication, Cloud Functions)**, and **Google Gemini 2.5 Flash API**.

---

## 🌟 Key Features

- **Multi-Screen AI Onboarding Flow**: 5-screen intake collecting personal profile, lifestyle, fitness level, target physique, equipment available, health conditions, and dietary preferences.
- **8-Week Periodized Workout Plan Generator**: Powered by Google Gemini API with smart algorithmic fallback. Tailors reps, sets, rest times, and exercise selection specifically to equipment and injuries.
- **Daily Workout & Activity Logger**: Interactive today/tomorrow workout cards, exercise step-by-step form guides, common mistakes to avoid, workout completion logging, calorie & macro meal logger, sleep hours, energy slider, and notes.
- **Streak & Consistency Tracker**: Circular SVG progress ring tracking consecutive workout and diet log days.
- **Advanced Recharts Analytics Engine**:
  - **Today Tab**: Caloric intake & Macro breakdown (Protein, Carbs, Fats) donut chart, meal itemization.
  - **This Week Tab**: Weekly Mon-Sun completion heatmap, workout volume bar chart, average sleep & diet adherence metrics.
  - **This Month Tab**: 30-day weight trend line chart, total training volume curve, best streak historical milestone.
- **Pre-populated Exercise Database**: 85+ detailed exercises covering all muscle groups, difficulties, equipment types, step-by-step form guides, common mistakes, and variations.
- **PWA Ready**: Web app manifest & progressive web app support.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Vite
- **Styling**: Tailwind CSS + Custom CSS (Glassmorphism, custom scrollbars, gradient accents)
- **UI Components & Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Backend & Database**: Firebase (Firestore, Cloud Functions, Authentication) + LocalStorage Sync
- **AI Engine**: Google Gemini API (`@google/genai`)

---

## 🚀 Quick Start (Running Locally)

1. **Navigate to project folder**:
   ```bash
   cd fitness-trainer-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Set Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables in Vercel settings:
   - `VITE_GEMINI_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID` (and other Firebase variables)
6. Click **Deploy**.

---

## 🔥 Firebase Setup & Deployment

1. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Cloud Functions**:
   ```bash
   cd functions
   npm install
   firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
   firebase deploy --only functions
   ```
