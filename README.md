# Renekin AI — Website

Next.js 15 website and user dashboard for Renekin AI products.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — Renekin AI product hub with Ghost showcase |
| `/login` | Email/password + Google OAuth login |
| `/register` | Account registration |
| `/dashboard` | User dashboard — credits, usage, settings |
| `/dashboard/billing` | Credit purchase and billing history |
| `/download` | Ghost desktop app download page |
| `/pricing` | Credit pricing plans |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

Open http://localhost:3000

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Lucide Icons
- TypeScript

## Build

```bash
npm run build
npm start
```
