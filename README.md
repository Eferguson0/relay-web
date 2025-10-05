# Relay Frontend

A production-ready Next.js frontend for Relay, an AI-powered communication assistant.

## Features

- **Clean FE/BE Split**: Typed API client with Axios
- **Cookie-gated Authentication**: Guest sessions and placeholder tokens
- **SSE Proxy**: Node runtime streaming endpoint for reliable real-time communication
- **Onboarding Flow**: Multi-step setup with progress tracking
- **Route Protection**: Middleware-based authentication gating
- **Modern Stack**: Next.js App Router, TypeScript, React Query, Zustand

## Tech Stack

- **Next.js 15** with App Router and Turbopack
- **TypeScript** in strict mode
- **TailwindCSS** for minimal utility styling
- **React Query** for data fetching and caching
- **Zustand** for client state management
- **Axios** for API client with automatic token injection

## Quick Start

### 1. Environment Setup

Copy the environment file and configure your API base URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Relay
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 4. Build & Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/          # Public login page
│   ├── (authed)/              # Protected routes
│   │   ├── onboarding/        # Multi-step setup
│   │   ├── inbox/            # Main dashboard
│   │   └── thread/[id]/       # Individual threads
│   ├── api/stream/           # SSE proxy endpoint
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Public splash page
│   └── providers.tsx         # React Query provider
├── lib/
│   ├── api.ts                # Axios client with auth
│   ├── session.ts            # Cookie management
│   └── log.ts                # Analytics stubs
├── store/
│   └── onboarding.ts         # Zustand onboarding state
└── middleware.ts              # Route protection
```

## API Configuration

The frontend connects to your backend via the `NEXT_PUBLIC_API_BASE_URL` environment variable. The API client automatically:

- Adds `Authorization: Bearer <token>` headers from cookies
- Handles request/response interceptors
- Provides typed helpers: `getJSON<T>()`, `postJSON<T>()`, etc.

## Authentication Flow

1. **Public Routes**: `/` (splash), `/login`
2. **Guest Sessions**: "Continue as guest" sets placeholder cookies
3. **Protected Routes**: All `/(authed)/*` routes require `relay_session` cookie
4. **Middleware**: Automatically redirects unauthenticated users to login

## SSE Streaming

The `/api/stream` endpoint provides a proxy for Server-Sent Events:

```typescript
// POST /api/stream
{
  "url": "http://localhost:8000/stream/endpoint",
  "headers": { "Custom-Header": "value" },
  "body": { "data": "payload" }
}
```

- Runs on Node runtime for reliable streaming
- Validates URLs against `NEXT_PUBLIC_API_BASE_URL`
- Preserves SSE headers and CORS settings

## Testing the Stream Proxy

Test the SSE proxy with any reachable endpoint:

```bash
curl -X POST http://localhost:3000/api/stream \
  -H "Content-Type: application/json" \
  -d '{"url": "https://httpbin.org/stream/10"}'
```

## Development Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint

## Backend Integration TODOs

When connecting to a real backend:

1. **JWT Issuance**: Replace placeholder tokens with real JWT authentication
2. **Onboarding Persistence**: Save onboarding data to backend
3. **SSE Endpoint**: Configure the correct streaming endpoint path
4. **Error Handling**: Implement proper error boundaries and retry logic
5. **Analytics**: Integrate with PostHog, Mixpanel, or similar service

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |
| `NEXT_PUBLIC_APP_NAME` | Application display name | `Relay` |

## Security Notes

- Only `NEXT_PUBLIC_*` variables are exposed to the client
- Server secrets should never be included in client bundles
- Cookie-based authentication with secure flags in production
- CORS headers configured for the streaming proxy