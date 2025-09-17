# Platforms Monorepo

A Turborepo monorepo containing two Next.js applications for subdomain management and tenant resolution.

## Structure

```
├── apps/
│   ├── admin/          # Admin app for subdomain creation and management (port 3001)
│   └── tenant/         # Tenant app for subdomain resolution (port 3000)
├── packages/
│   ├── shared/         # Shared utilities and functions
│   ├── types/          # Shared TypeScript types
│   └── ui/             # Shared UI components
└── turbo.json          # Turborepo configuration
```

## Apps

### Admin App (`apps/admin`)
- **Port**: 3001
- **Purpose**: Subdomain creation and management
- **Features**:
  - Create new subdomains with custom emojis
  - Admin dashboard to view and delete subdomains
  - Form validation and error handling

### Tenant App (`apps/tenant`)
- **Port**: 3000
- **Purpose**: Subdomain resolution and tenant data loading
- **Features**:
  - Resolves subdomains and displays tenant-specific content
  - Handles subdomain routing via middleware
  - Shows custom emoji and tenant information

## Packages

### Shared (`packages/shared`)
- Utility functions (`cn`, `isValidIcon`)
- Domain configuration (`protocol`, `rootDomain`)

### Types (`packages/types`)
- TypeScript type definitions
- Shared interfaces for subdomain data

### UI (`packages/ui`)
- Reusable UI components
- Radix UI components with custom styling

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development servers:
   ```bash
   pnpm dev
   ```

3. Access the applications:
   - Admin app: http://localhost:3001
   - Tenant app: http://localhost:3000

## Development

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages

## Environment Variables

Set the following environment variables:

```bash
NEXT_PUBLIC_ROOT_DOMAIN=your-domain.com
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## Subdomain Testing

For local development, you can test subdomains by:
1. Adding entries to your `/etc/hosts` file:
   ```
   127.0.0.1 test.localhost
   127.0.0.1 admin.localhost
   ```
2. Accessing `http://test.localhost:3000` for tenant app
3. Accessing `http://admin.localhost:3001` for admin app