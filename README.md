# MediHelp

A simple web service that lets you search for medicine information using the OpenFDA API, summarized into plain language using Google Gemini AI.

## Features

- Search medicines by name and get AI-simplified info
- Get results in multiple languages (EN, LT, DE, PL)
- Save medicines to a personal list
- Delete medicines from saved list

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **AI:** Google Gemini API
- **Medicine data:** OpenFDA API
- **Storage:** JSON file

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/medicines/search` | Search medicine by name |
| GET | `/medicines/:name?lang=` | Get medicine info by name |
| GET | `/medicines/saved` | Get all saved medicines |
| POST | `/medicines/saved` | Save a medicine |
| DELETE | `/medicines/saved/:id` | Delete a saved medicine |

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env # add your Gemini API key
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

```env
GEMINI_API_KEY=your_key_here
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)
