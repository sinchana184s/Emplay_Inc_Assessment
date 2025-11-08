<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Angular-black?style=for-the-badge&logoColor=white&logo=angular&color=DD0031" alt="angular" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-RxJS-black?style=for-the-badge&logoColor=white&logo=reactivex&color=B7178C" alt="rxjs" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=vercel&color=000000" alt="zod" />
  </div>
  <h1 align="center">Emplay Inc Assessment</h1>
  <h3 align="center">Responsive card manager</h3>
</div>

A responsive Angular application for displaying and editing cards with dynamic content. Built as part of the Emplay technical assessment.

## 📋 Overview

This Angular application displays a list of cards loaded from a JSON file. Users can view card information and edit descriptions through an intuitive modal interface. All changes are persisted within the current session.

## ⚙️ Tech Stack

- **Angular 19** with Standalone Components
- **TypeScript**
- **RxJS** for reactive state management
- **Zod** for runtime schema validation

## ✨ Key Features

### Core Functionality
- ✅ Dynamic card display from JSON data
- ✅ Edit card descriptions via modal popup
- ✅ Real-time updates without page reload
- ✅ Form validation (description cannot be empty)
- ✅ Session-based persistence

### UI/UX
- Responsive grid layout (3 columns → 2 → 1 based on screen size)
- Clean, modern dark theme design
- Intuitive modal with Save/Cancel actions
- Mobile-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Setup

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:4200/](http://localhost:4200/) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📁 Project Structure

```
client/
├── public/data/cards.json       # Card data source
├── src/app/
│   ├── models/card.ts           # Card schema & type definitions
│   ├── services/card.service.ts # Data management service
│   ├── app.component.ts         # Main component logic
│   ├── app.component.html       # Card grid & modal template
│   └── app.component.css        # Styling
└── package.json
```

## 📊 Data Structure

Cards are defined in `public/data/cards.json`:

```json
[
  {
    "id": 1,
    "card_title": "Project Timeline",
    "card_description": "Track key milestones and deadlines"
  }
]
```

## 🎯 Assessment Requirements Met

- ✅ Display list of cards with title and description
- ✅ Edit button on each card
- ✅ Modal popup for editing descriptions
- ✅ Dynamic data handling from JSON
- ✅ Save/Cancel functionality in modal
- ✅ Form validation
- ✅ Real-time UI updates
- ✅ Clean, responsive design

## 🧪 Testing

```bash
npm test
```

---

**Developed for Emplay Inc. Technical Assessment**


- Static data loading from `public/data/cards.json`
- Edit card descriptions via a modal dialog
- Session-based persistence for user edits (per tab/session)
- Dark theme background with edge-to-edge layout (no default body margin)

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up and run the client locally.

**Prerequisites**

- `https://git-scm.com/`
- `https://nodejs.org/en`
- `https://www.npmjs.com/`

**Clone and Install**

```bash
git clone <your_repo_url>
cd Emplay_Inc_Assessment/client
npm install
```

**Run the Development Server**

```bash
npm start
# or
ng serve
```

Open `http://localhost:4200/` in your browser. The app live-reloads on changes.

**Build for Production**

```bash
npm run build
```

Build artifacts are output under `dist/`.

## <a name="project-structure">🏗️ Project Structure</a>

```text
client/
├── public/
│   └── data/
│       └── cards.json            # Static card data (served at /data/cards.json)
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── card.ts           # Zod schemas and Card type
│   │   ├── services/
│   │   │   └── card.service.ts   # Data loading + session persistence
│   │   ├── app.component.ts      # Root component logic
│   │   ├── app.component.html    # Root template (card grid, modal)
│   │   └── app.component.css     # Layout, grid, modal styles
│   ├── app.config.ts             # Angular app configuration
│   └── styles.css                # Global styles (dark background, box-sizing)
└── package.json
```

## <a name="data-and-services">📦 Data & Services</a>

### Static Data
- Source file: `public/data/cards.json`
- Served at: `GET /data/cards.json` (via Angular dev server)

Example card entry:

```json
{
  "id": 1,
  "card_title": "Project Timeline",
  "card_description": "Track key milestones ..."
}
```

### Card Schema (Zod)

```ts
// src/app/models/card.ts
import { z } from 'zod';

export const card_schema = z.object({
  id: z.number().int().nonnegative(),
  card_title: z.string().min(1, 'Card title is required.'),
  card_description: z.string().min(1, 'Card description is required.')
});

export type Card = z.infer<typeof card_schema>;
export const cards_schema = z.array(card_schema);
```

### Service Overview

- `src/app/services/card.service.ts` loads cards from `/data/cards.json`, validates with Zod, hydrates from `sessionStorage`, and exposes a reactive stream of cards.
- Updates to a card description are validated and persisted back to `sessionStorage`.

## <a name="storage-behavior">💾 Storage Behavior</a>

- Persistence: `window.sessionStorage`
- Storage key: `card_manager.cards`
- Scope: Current browser tab/session only (clears when the tab or browser closes)

## <a name="testing">🧪 Testing</a>

Run unit tests with Jasmine/Karma:

```bash
npm test
# or
ng test
```

## <a name="available-scripts">🛠️ Available Scripts</a>

The following scripts are available in `package.json`:

- `npm start` — launches the Angular dev server on `http://localhost:4200/`
- `npm run build` — builds for production, outputs to `dist/`
- `npm run watch` — development build with file watch
- `npm test` — runs unit tests via Karma/Jasmine

---

If you have questions or need enhancements (e.g., cross-tab persistence, filtering, or sorting), feel free to open an issue or PR.
