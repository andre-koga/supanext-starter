# Agent Guidelines for Next.js PWA Starter

> **Important**: Read this document before making changes to understand project conventions and architecture.

## Project Overview

This is a **production-ready PWA starter template** built with Next.js 16 and Supabase, structured as a **pnpm monorepo**. It includes authentication, offline support, and modern development tooling.

## Architecture

### Monorepo Structure

```
nextjs-pwa-starter/
├── frontend/          # Next.js 16 application
│   ├── app/          # App Router (pages, layouts, routes)
│   ├── components/   # React components
│   │   └── ui/      # Shadcn UI components
│   ├── lib/         # Utilities and Supabase clients
│   └── public/      # Static assets, PWA manifest, service worker
├── backend/          # Supabase local development
│   ├── supabase/    # Migrations, config, functions
│   └── scripts/     # Utility scripts (smart-start.js)
└── package.json     # Root workspace configuration
```

### Why This Structure?

- **Separation of concerns**: Frontend and backend are isolated
- **Local Supabase**: Full control over auth, database, and storage
- **pnpm workspaces**: Efficient dependency management

## Tech Stack

### Frontend
- **Next.js 16** with App Router and Turbopack
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3** for styling
- **Shadcn UI** for components (NOT Tailwind UI or other libraries)
- **Supabase SSR** for authentication
- **PWA** features (manifest, service worker, offline support)

### Backend
- **Supabase** (local development with Docker)
- **PostgreSQL 17**
- **GoTrue** for authentication

### Package Manager
- **pnpm** (Do NOT use npm or yarn)

## Development Setup

### Prerequisites
1. Node.js 18+
2. pnpm installed globally
3. Docker Desktop running (for Supabase)
4. Supabase CLI (`pnpm install -g supabase`)

### First-Time Setup
```bash
# Install dependencies
pnpm install

# Start both frontend and backend
pnpm dev

# Frontend: http://localhost:3000
# Supabase Studio: http://localhost:54323
# Mailpit (emails): http://localhost:54324
```

### Environment Variables

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<from supabase start output>
```

#### Backend (`backend/.env.local`)
```env
SUPABASE_SERVICE_ROLE_KEY=<secret key from supabase start>
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
S3_ACCESS_KEY=<from supabase start>
S3_SECRET_KEY=<from supabase start>
```

**Note**: These files are gitignored. Reference `.env.example` files for templates.

## Key Features

### PWA (Progressive Web App)
- **Manifest**: `frontend/public/manifest.json`
- **Service Worker**: `frontend/public/service-worker.js` (network-first caching)
- **Offline Page**: `frontend/app/offline/page.tsx`
- **Icons**: Located in `frontend/public/` (icon-192x192.png, icon-512x512.png, apple-touch-icon.png)
- **Meta Tags**: Configured in `frontend/app/layout.tsx`

**Important**: PWA assets must be excluded from authentication redirects in `frontend/proxy.ts` matcher config.

### Authentication Flow
1. **Sign Up**: User enters email/password → receives confirmation email
2. **OTP Verification**: 6-digit code sent to email (visible in Mailpit)
3. **Email Confirmations**: Enabled in `backend/supabase/config.toml` (`enable_confirmations = true`)
4. **OTP UI**: Uses Shadcn's `InputOTP` component at `/auth/verify`
5. **Protected Routes**: Middleware in `frontend/proxy.ts` redirects unauthenticated users

### Smart Supabase Start Script
**Location**: `backend/scripts/smart-start.js`

**Features**:
- Automatically detects port conflicts from other Supabase projects
- Stops conflicting projects before starting this one
- Does NOT use `--no-backup` (preserves database state across restarts)

**Why**: Developer may have multiple Supabase projects; this ensures smooth startup.

## Commands

### Root Commands
```bash
pnpm dev              # Start frontend + backend in parallel
pnpm dev:frontend     # Start only frontend
pnpm dev:backend      # Start only backend
pnpm build            # Build frontend for production
pnpm lint             # Run ESLint on frontend
pnpm typecheck        # Run TypeScript type checking
pnpm supabase:start   # Manually start Supabase
pnpm supabase:stop    # Stop Supabase
pnpm supabase:status  # Check Supabase status
```

### Frontend-Only Commands
```bash
cd frontend
pnpm dev              # Start Next.js dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checks
```

### Backend-Only Commands
```bash
cd backend
pnpm dev              # Start Supabase (runs smart-start.js)
pnpm stop             # Stop Supabase
pnpm status           # Check Supabase services
pnpm reset            # Reset database (DESTRUCTIVE)
pnpm gen:types        # Generate TypeScript types from DB schema
```

## Coding Conventions

### File Naming
- **Components**: PascalCase (e.g., `VerifyForm.tsx`)
- **Utilities**: kebab-case (e.g., `smart-start.js`)
- **Pages**: kebab-case (e.g., `sign-up`, `verify`)

### Component Patterns
1. **Use "use client" directive** for client components (forms, interactive UI)
2. **Shadcn UI components**: Always use existing UI components from `components/ui/`
3. **Styling**: Use Tailwind CSS classes, avoid inline styles
4. **Form handling**: Manage state with `useState`, use Supabase client SDK
5. **Suspense boundaries**: Wrap components that use `useSearchParams()` in `<Suspense>`

### Import Paths
- Use `@/` alias for imports (e.g., `@/components/ui/button`)
- Defined in `frontend/tsconfig.json`

### TypeScript
- **Avoid `any`**: Use proper types
- **Use `ComponentRef`**: NOT the deprecated `ElementRef`
- **Strict mode**: Enabled in `tsconfig.json`

### Supabase Client Usage
- **Client components**: Use `@/lib/supabase/client`
- **Server components**: Use `@/lib/supabase/server`
- **Middleware**: Use `@/lib/supabase/proxy`

## Important Configuration Files

### Frontend
- `frontend/eslint.config.mjs`: ESLint config (ignores `.next/`, `node_modules/`)
- `frontend/next.config.ts`: Next.js configuration
- `frontend/tailwind.config.ts`: Tailwind CSS configuration
- `frontend/tsconfig.json`: TypeScript configuration
- `frontend/proxy.ts`: Middleware for auth (Next.js 15+ uses this name, not `middleware.ts`)

### Backend
- `backend/supabase/config.toml`: Supabase configuration
  - `site_url = "http://localhost:3000"` (NOT 127.0.0.1 to avoid cookie issues)
  - `enable_confirmations = true` (email verification required)
  - Ports: API (54321), DB (54322), Studio (54323), Mailpit (54324)

### Root
- `pnpm-workspace.yaml`: Defines workspaces (`frontend`, `backend`)
- `package.json`: Root-level scripts and metadata

## Known Issues & Gotchas

### 1. Localhost vs 127.0.0.1
**Problem**: Using `127.0.0.1` in `site_url` causes cookie/redirect issues when browsing at `localhost:3000`.

**Solution**: Always use `localhost:3000` in `backend/supabase/config.toml`:
```toml
site_url = "http://localhost:3000"
additional_redirect_urls = ["http://localhost:3000"]
```

### 2. Supabase Config Changes Require Restart
**Problem**: Changes to `backend/supabase/config.toml` don't apply until restart.

**Solution**: Stop and restart Supabase (`pnpm dev` or `pnpm supabase:stop && pnpm supabase:start`).

### 3. Frontend Starts Before Backend
**Problem**: `pnpm dev` starts both in parallel; frontend may fail to connect during backend startup.

**Solution**: Wait for "Supabase started successfully!" message, then refresh browser.

### 4. Database Resets
**Problem**: If `--no-backup` flag is used with `supabase stop`, database resets on restart.

**Solution**: `smart-start.js` now omits this flag. Data persists across restarts.

### 5. PWA Assets Must Be Excluded from Auth
**Problem**: `proxy.ts` matcher was redirecting `/manifest.json` and `/service-worker.js` to login.

**Solution**: Matcher explicitly excludes these:
```typescript
matcher: [
  "/((?!_next/static|_next/image|favicon.ico|manifest.json|service-worker.js|offline|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
],
```

### 6. Email Confirmations
**Problem**: Emails not appearing in Mailpit.

**Cause**: `enable_confirmations = false` in `config.toml` auto-confirms users without sending emails.

**Solution**: Set `enable_confirmations = true` in `backend/supabase/config.toml`.

## UI/UX Guidelines

### Design Principles
- **Modern & Premium**: Use vibrant colors, gradients, smooth animations
- **Shadcn UI Components**: Consistent design system
- **Responsive**: Mobile-first approach
- **Accessibility**: Proper ARIA labels, semantic HTML

### Component Library
- **Buttons**: `@/components/ui/button`
- **Cards**: `@/components/ui/card`
- **Inputs**: `@/components/ui/input`
- **Labels**: `@/components/ui/label`
- **OTP Input**: `@/components/ui/input-otp` (6 digits)
- **Dropdowns**: `@/components/ui/dropdown-menu`

**Important**: Do NOT install or use other UI libraries. Extend Shadcn as needed.

## Testing

### Local Testing
1. Sign up flow: Create account → verify OTP → access protected route
2. PWA: Check manifest, service worker registration, offline mode
3. Auth: Test login, logout, protected routes
4. Email: Verify emails arrive in Mailpit (http://localhost:54324)

### Pre-Deployment Checks
```bash
pnpm typecheck    # Must pass
pnpm lint         # Must pass
pnpm build        # Must succeed
```

## Deployment Notes

### Frontend (Vercel/Netlify)
- Build command: `pnpm build`
- Output directory: `frontend/.next`
- Environment variables: Point to production Supabase URL/keys

### Backend (Supabase Cloud)
- Push migrations: `cd backend && supabase db push`
- Link project: `supabase link --project-ref <YOUR_PROJECT_REF>`
- Generate types: `pnpm gen:types`

## Troubleshooting

### "Port already allocated" Error
**Cause**: Another Supabase project is using the same ports.

**Solution**: `smart-start.js` handles this automatically. If it fails, manually stop the other project or kill Docker containers.

### "fetch failed" / "ECONNRESET" in Frontend
**Cause**: Frontend tried to connect to Supabase before it was ready.

**Solution**: Wait for backend to fully start, then refresh browser.

### TypeScript Errors in UI Components
**Cause**: Using deprecated `ElementRef` instead of `ComponentRef`.

**Solution**: Replace all `React.ElementRef<T>` with `React.ComponentRef<T>`.

### Lint Errors from `.next/` Directory
**Cause**: ESLint not ignoring build artifacts.

**Solution**: Already fixed in `eslint.config.mjs` with `ignores` array.

## What NOT to Do

1. ❌ Do NOT use npm or yarn (use pnpm only)
2. ❌ Do NOT rename `proxy.ts` to `middleware.ts` (Next.js 15+ convention)
3. ❌ Do NOT use `--no-backup` with `supabase stop` (causes data loss)
4. ❌ Do NOT use 127.0.0.1 in `site_url` (use localhost)
5. ❌ Do NOT install UI libraries other than Shadcn
6. ❌ Do NOT commit `.env.local` files (they're gitignored for security)
7. ❌ Do NOT modify `smart-start.js` without understanding port conflict logic

## Future Enhancements

Potential improvements to consider:
- Custom database schema for your application
- User profile management and settings
- Progressive enhancement of offline functionality
- Push notifications (PWA)
- Social features and sharing capabilities

---

**Last Updated**: 2025-11-19  
**Maintainer**: User (kogru)  
**Agent Version**: Claude 3.5 Sonnet
