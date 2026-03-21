# Renekin AI — Website

Next.js website and user dashboard for Renekin AI products.

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

## Environment Setup

Copy `.env.example` and create env files:

| File | Purpose | Backend |
|------|---------|---------|
| `.env.local` | Local development | `http://localhost:8000/api/v1` |
| `.env.dev` | Dev (deployed backend) | `https://api.renekin.com/api/v1` |

## Development

```bash
npm install

# Local — uses localhost backend
npm run local

# Dev — uses api.renekin.com
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Env | Description |
|---------|-----|-------------|
| `npm run local` | `.env.local` | Next.js dev server (localhost backend) |
| `npm run dev` | `.env.dev` | Next.js dev server (deployed backend) |
| `npm run build:local` | `.env.local` | Next.js production build (localhost) |
| `npm run build:dev` | `.env.dev` | Next.js production build (deployed) |
| `npm start` | — | Start production server |

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide Icons
- TypeScript
- dotenv-cli (env file loading)

## Credit Plans

| Plan | Price | Credits |
|------|-------|---------|
| Free | $0 | 20 |
| Starter | $10 | 100 |
| Popular | $19 | 220 |
| Best Value | $28 | 400 |
