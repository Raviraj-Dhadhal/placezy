# Placezy 🌍

> Urban discovery, curated venue explorer, and trip-planning web platform for Rajkot and Gujarat. Built with a modern, feature-based **MERN Stack** (React 19 + TypeScript + Vite + Tailwind CSS & Node.js + Express + TypeScript + MongoDB).

---

## 🚀 Quick Start Guide (macOS / Linux / Windows)

### 1. Prerequisites
Make sure you have installed on your Mac:
- **Node.js** (v18 or higher): `node -v`
- **npm** (v9 or higher): `npm -v`
- **MongoDB** (optional for frontend preview; required for local backend DB):
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```

---

### 2. Clone or Extract Project
If cloned via Git or unzipped from Google Drive:
```bash
cd Placezy
```

---

### 3. Setup & Run the Frontend (`client`)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The web application will open at:
👉 **`http://localhost:5173`**

---

### 4. Setup & Run the Backend (`server`)

In a new terminal window:
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run server in development mode
npm run dev
```

The backend API will run at:
👉 **`http://localhost:5000`**

Health check endpoint:
👉 `http://localhost:5000/health`

---

## 📁 Project Architecture

```
Placezy/
├── client/                     # Frontend (React 19, TypeScript, Vite, Tailwind CSS)
│   ├── src/
│   │   ├── app/                # Application setup, AppProviders, and AppRouter
│   │   ├── components/         # Atomic UI primitives (ui/) & shared components (shared/)
│   │   ├── features/           # Domain modules (auth, places, reviews, trips, owner, admin)
│   │   ├── layouts/            # Shell layouts (UserLayout, OwnerLayout, AdminLayout, AuthLayout)
│   │   ├── services/           # Axios API client & interceptors
│   │   ├── types/              # TypeScript definitions & data models
│   │   └── utils/              # Mock data & utility helpers
│   └── public/images/          # Places and gallery photography assets
│
└── server/                     # Backend (Node.js, Express, TypeScript, Mongoose)
    ├── src/
    │   ├── config/             # DB & environment configuration
    │   ├── middleware/         # JWT auth & error-handling middleware
    │   ├── modules/            # Domain modules (auth, users, places, etc.)
    │   ├── utils/              # Token generation & API response wrappers
    │   ├── app.ts              # Express application setup
    │   └── server.ts           # Server bootstrap & listener
    ├── .env                    # Local environment secrets (not committed to git)
    └── .env.example            # Sample environment variables template
```

---

## 🎨 Implemented Modules & Screens (40 Screens)

1. **User Discovery & Planning (23 Screens):**
   - Splash, Sign In, Sign Up, Category Interests, Forgot Password.
   - Home Feed, Explore Venues, Filter Modal, Place Details, Write Review.
   - Nearby Radar, Interactive Map View, Wishlist, Trip Planner, Plan New Trip.
   - Profile, Settings, Notifications, Help Center, FAQs, Terms, Privacy, Contact.
2. **Owner Business Portal (8 Screens):**
   - Business Onboarding, Dashboard, Listings Manager, Reviews & Replies, Photo Gallery, Analytics, Business Settings, Alerts.
3. **Admin Governance Console (9 Screens):**
   - Overview Dashboard, Users Management, Business Directory, Categories Taxonomy, Review Moderation, System Reports, Platform Settings, Admin Profile, Notifications.

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```ini
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/placezy
JWT_SECRET=placezy_super_secret_jwt_key_2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)
```ini
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🛠 Available Scripts

### Frontend
- `npm run dev`: Starts local Vite dev server with Hot Module Replacement.
- `npm run build`: Type-checks and builds production-ready bundle.
- `npm run preview`: Previews the production build locally.

### Backend
- `npm run dev`: Runs TypeScript backend with auto-reload via `ts-node` + `nodemon`.
- `npm run build`: Compiles TypeScript to `dist/`.
- `npm start`: Runs compiled production JavaScript bundle.
