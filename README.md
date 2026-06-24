# Trrip — Travel Booking UI 🧳

The React frontend for **Trrip**, a MERN + AI app that turns your uploaded
travel documents into a smart, shareable, day-by-day itinerary.

Built with **React 18 · Vite · Tailwind CSS · Framer Motion**, with drag-and-drop
uploads, a polished animated UI, and a public itinerary-sharing experience.

> Backend repo: **Travel-Booking-Backend** (Express + MongoDB + AI + S3).

![stack](https://img.shields.io/badge/React-18-61dafb) ![vite](https://img.shields.io/badge/Vite-5-646cff) ![tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

---

## ✨ Highlights

- **Landing page** — animated hero, feature grid and "how it works" steps.
- **Auth** — split-screen Login / Register with JWT, password-strength meter and a one-click demo login.
- **Dashboard** — greeting, trip stats and recent itineraries.
- **Drag & drop upload** — multi-file upload (PDF/images) with live progress, then a grid of AI-extracted booking cards you can select from.
- **Itinerary view** — gradient hero, a beautiful day-by-day **timeline** with per-activity icons, travel tips, packing list and linked source documents.
- **Sharing** — toggle a trip public and copy a link, or share via the native share sheet / WhatsApp / email. Public pages are clean, branded and printable.
- **Print / Save as PDF**, inline trip renaming, search & delete in history.
- **Responsive** down to mobile, with toasts, skeleton loaders and smooth Framer Motion transitions throughout.

---

## 🗂️ Folder structure

```
src/
├── api/             # axios client + endpoint wrappers
│   ├── client.js    # base instance, token + 401 interceptors
│   ├── auth.js · bookings.js · itineraries.js
├── context/
│   └── AuthContext.jsx   # auth state, login/register/logout
├── components/      # reusable UI
│   ├── Navbar · Footer · MainLayout · ProtectedRoute
│   ├── UploadDropzone · BookingCard
│   ├── ItineraryHeader · ItineraryTimeline · ItineraryCard · TipsPacking
│   ├── ShareModal · ConfirmDialog · AuthLayout
│   └── Logo · Avatar · Spinner · EmptyState
├── pages/           # route screens
│   ├── Landing · Login · Register
│   ├── Dashboard · Upload · History
│   ├── ItineraryDetail · PublicItinerary · NotFound
├── utils/           # format helpers, type→icon/colour metadata
├── App.jsx          # routes
├── main.jsx         # entry (Router + AuthProvider + Toaster)
└── index.css        # Tailwind layers + design tokens
```

---

## 🚀 Getting started

### Prerequisites
- Node.js ≥ 18
- The **Travel-Booking-Backend** API running (locally or deployed)

### Install & configure
```bash
npm install
cp .env.example .env
```

`.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Run
```bash
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # eslint
```

> Tip: seed a demo account on the backend (`npm run seed`) then use the
> **"Use demo credentials"** button on the login page to explore instantly.

---

## 🎨 Design system

A small, consistent design language defined in `tailwind.config.js` + `index.css`:

- **Brand palette** — twilight indigo→violet primary, sunset-coral accent.
- **Type** — Sora (display) + Plus Jakarta Sans (body) via Google Fonts.
- **Reusable classes** — `.btn-*`, `.card`, `.input`, `.chip`, `.gradient-text`, `.section`.
- **Motion** — Framer Motion entrance animations + tasteful hover states.
- **Icons** — `lucide-react`, mapped per booking/activity type for a consistent visual vocabulary.

---

## 🌍 Deployment

A static Vite SPA — deploy to **Vercel**, **Netlify**, Cloudflare Pages, or any static host.

- Build command: `npm run build` · Output dir: `dist`
- Set `VITE_API_URL` to your deployed API base URL (e.g. `https://api.example.com/api/v1`).
- SPA routing fallbacks are included: `vercel.json` (rewrites) and `public/_redirects` (Netlify).
- Remember to add this app's URL to the backend's `CLIENT_URL` (CORS allow-list).

---

## 🔗 Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | public | Marketing landing page |
| `/login`, `/register` | public | Authentication |
| `/dashboard` | private | Stats + recent trips |
| `/upload` | private | Upload documents & generate itinerary |
| `/history` | private | All your itineraries |
| `/itinerary/:id` | private | Full itinerary detail |
| `/trip/:slug` | public | Shared itinerary view |
