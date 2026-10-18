# MIKEANIMATE

A cinematic African history storytelling platform that brings historical African kings, queens, warriors, leaders, kingdoms, and cultural figures to life through immersion, research, and digital storytelling.

## Overview

MIKEANIMATE combines cinematic storytelling, AI-assisted exploration, historical profiles, interactive maps, timeline navigation, educational quizzes, and richly designed gallery experiences. The project is built for modern browsers and is designed to be mobile-friendly, accessible, and expandable.

## Features implemented

- Cinematic intro sequence with skip and replay
- 7-second 3D-style brand animation on a dark cinematic background
- Responsive homepage hero section and premium museum-inspired layout
- Character gallery for twenty historical figures
- Unique character routes and profile pages
- AI history assistant with demo mode fallback
- Historical timeline, map, video gallery, and related sections
- Bookmarks using localStorage
- Daily history fact, discovery feature, and quiz
- About page and footer branding
- Express backend with AI API integration and .env configuration

## Local setup

1. Install dependencies:
   npm install
2. Copy environment variables:
   cp .env.example .env
3. Start the app:
   npm run dev
4. Open the site in the browser at http://localhost:5173

## AI configuration

The server includes a backend endpoint at `/api/ai`.

- If `OPENAI_API_KEY` is set, the app sends requests to the OpenAI API using `MODEL`.
- If not set, the app runs in clearly labeled demo mode using curated historical answers.

Set values in `.env`:

```bash
PORT=3001
OPENAI_API_KEY=your_key_here
MODEL=gpt-4o-mini
```

## Project structure

```text
src/
  App.tsx
  main.tsx
  styles.css
  data/
    characters.ts
server/
  server.js
README.md
.env.example
vite.config.ts
```

## Deployment

- Frontend: deploy to Vite-compatible static hosting or a Node server with build output.
- AI assistant: requires a backend process with env variables. If using a static-only platform, keep the AI endpoint on a serverless or Node host.

## Notes

This project is intentionally designed as a strong foundation for expansion. Historical images and article references should be reviewed and expanded as editorial research develops.
