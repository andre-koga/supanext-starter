# Yoga Practice & Wellness Tracker

A modern, PWA-compatible yoga and wellness tracking application built with Next.js 16 and Supabase.

## Features

- **Progressive Web App (PWA)**: Installable on mobile and desktop, offline support, and app-like experience.
- **Monorepo Structure**: Separate frontend (Next.js) and backend (Supabase) for clean architecture.
- **Authentication**: Secure user authentication via Supabase Auth.
- **Modern UI**: Built with Tailwind CSS and Shadcn UI.

## Project Structure

```
yoga-app/
├── frontend/          # Next.js 16 application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   └── public/       # Static assets & PWA manifest
├── backend/           # Supabase local development
│   ├── supabase/     # Migrations, functions, config
│   └── scripts/      # Utility scripts (e.g., smart-start)
└── package.json       # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker (for local Supabase)
- Supabase CLI (`pnpm install -g supabase`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yoga-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   This command will automatically:
   - Start the local Supabase instance (handling port conflicts automatically)
   - Start the Next.js frontend
   - Open the app at [http://localhost:3000](http://localhost:3000)

### Development Commands

- `pnpm dev`: Start both frontend and backend
- `pnpm dev:frontend`: Start only the Next.js frontend
- `pnpm dev:backend`: Start only the Supabase backend
- `pnpm supabase:start`: Start Supabase services
- `pnpm supabase:stop`: Stop Supabase services
- `pnpm supabase:status`: Check Supabase status

## PWA Features

The app is fully PWA compatible. You can verify this by:
1. Running the app locally or in production
2. Opening Chrome DevTools -> Application tab
3. Checking "Manifest" and "Service Workers" sections

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Package Manager**: pnpm (Workspace mode)
