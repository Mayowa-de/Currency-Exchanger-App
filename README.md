# FX Checker

This project is a Vite + React implementation of the Frontend Mentor FX Checker challenge. It is built as a modern currency-conversion experience that combines a polished user interface with live exchange-rate data, historical trends, comparison views, saved favorites, and a conversion history log.

## Project Overview

FX Checker is a currency converter app designed to help users:
- convert an amount from one currency to another in real time
- browse and search a large list of currencies
- view live market rates and daily change information
- explore historical exchange-rate trends over different time ranges
- compare converted values across multiple currencies
- save favorite currency pairs for quick access
- keep a record of recent conversions

The app is intended to feel responsive, accessible, and practical for real-world use while staying aligned with the Frontend Mentor design challenge.

## Key Features

### Currency Conversion
- Enter an amount and see the converted result instantly
- Choose both the send and receive currencies from a searchable picker
- Swap the selected currencies with one click
- Save the current currency pair as a favorite
- Record every conversion in a history log

### Currency Picker
- Search currencies by name or code
- Display popular currencies separately from the full list
- Highlight the currently selected currency clearly

### Market Information
- Show exchange rates for selected currency pairs
- Display daily movement indicators where available

### Historical Rate Charts
- View price history over multiple periods such as daily, weekly, monthly, and yearly ranges
- Switch between chart ranges to compare performance over time

### Comparison and Favorites
- Compare values across several currencies at once
- Pin favorite currency pairs for faster access
- Reload saved favorites back into the converter when needed

### Conversion Log
- Keep a recent history of conversions
- Remove single entries or clear the full log
- Persist user activity in the browser so it remains available after refreshes

## Tech Stack

- Vite
- React
- JavaScript / JSX
- ESLint
- REST API for live exchange-rate data

## Project Structure

- src/ - React app components and UI logic
- public/ - static assets and public files
- package.json - project scripts and dependencies
- vite.config.js - Vite configuration

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

### 5. Run linting

```bash
npm run lint
```

## API Notes

This project is designed to work with a live exchange-rate API such as Frankfurter. A live API allows the app to fetch current rates, currency lists, and historical data without requiring a private key.

## Notes

- Favorites and the conversion log should persist across browser sessions.
- The interface should remain accessible with keyboard navigation and clear focus states.
- The experience is intended to be a polished frontend solution for the FX Checker challenge.

## Summary

This repository brings together the core ideas of the FX Checker challenge in a single Vite-powered React app. It is a strong example of a practical finance-focused UI that combines data fetching, state management, and user interaction in one experience.
