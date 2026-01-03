# amazon e‑commerce clone

amazon e‑commerce clone is a React and Vite–based e-commerce clone designed to demonstrate a modern online storefront by combining a component-driven frontend with Firebase Cloud Functions and a lightweight Express API. Leveraging Stripe for payments, Firebase emulators/deploy workflows, and a modular `src/` component architecture, this project aims to deliver a fast, responsive, and easy-to-follow starter for learning serverless integrations, payment flows, and practical web app structure.

## Project overview
- Frontend: Vite + React (source in `src/`)
- Cloud functions: `functions/` (Firebase Functions)
- Simple backend API: `amzon-api/`
- Hosting/config: `firebase.json`, `firestore.rules`, `firestore.indexes.json`

## Prerequisites
- Node.js (recommended: >=18). Note: Firebase functions here target Node 22.
- npm (or yarn)
- Firebase CLI (optional, for deploy and emulators)

## Install
From the project root:

```bash
npm install
```

Then install dependencies for subprojects if you will run them separately:

```bash
cd functions && npm install
cd ../amzon-api && npm install
```

## Run (development)
- Frontend (Vite):

```bash
npm run dev
```

- Local Express API (amzon-api):

```bash
cd amzon-api
npm start
```

- Firebase Functions (emulator):

```bash
cd functions
npm run serve
```

## Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment variables
- This project uses `.env` files for secrets (Stripe keys, Firebase config, etc.). Do not commit `.env` to source control.

## Folder structure (high level)
- `src/` — React app components, pages, and utilities
- `public/` — Static assets
- `functions/` — Firebase Cloud Functions
- `amzon-api/` — Simple Express backend used for API routes
- `index.html`, `vite.config.js` — Vite config and entry

## Firebase
- Emulator: `cd functions && npm run serve` (requires Firebase CLI)
- Deploy functions: `cd functions && npm run deploy`

## Notes
- Check `package.json` scripts for available commands. The root `package.json` contains `dev`, `build`, `preview`, and `start` scripts.

## License
ISC


