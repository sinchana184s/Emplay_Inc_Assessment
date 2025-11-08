<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Angular-black?style=for-the-badge&logoColor=white&logo=angular&color=DD0031" alt="angular" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
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


