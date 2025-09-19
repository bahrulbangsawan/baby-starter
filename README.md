# Next.js 15+ Production Boilerplate

A modern, production-ready boilerplate built with Next.js 15+, featuring a comprehensive tech stack for building scalable web applications with authentication, database integration, search capabilities, AI features, and more.

## Tech Stack

- **Framework**: Next.js 15+ with App Router and Turbopack
- **Database**: Drizzle ORM + PostgreSQL (Neon-ready)
- **Authentication**: BetterAuth with database session strategy
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **State Management**: TanStack Query for server state
- **Data Tables**: TanStack Table with React Virtual
- **Search**: Typesense with server proxy
- **AI Integration**: Vercel AI SDK with OpenAI
- **Maps**: Leaflet with client-side rendering
- **Development**: TypeScript, ESLint, pnpm

## Quickstart

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud like Neon)
- pnpm package manager

### Installation

1. **Clone and install dependencies**:
```bash
git clone <your-repo-url>
cd my-app
pnpm install
```

2. **Environment Setup**:
```bash
cp .env.example .env.local
```

3. **Configure environment variables** in `.env.local`:
```env
# Database
DATABASE_URL="postgres://user:pass@host:5432/dbname"

# BetterAuth
AUTH_SECRET="generate-a-secret-key"
AUTH_URL="http://localhost:3000"

# OpenAI / Vercel AI SDK
OPENAI_API_KEY="sk-your-openai-key"

# Typesense
TYPESENSE_HOST="localhost"
TYPESENSE_PORT="8108"
TYPESENSE_PROTOCOL="http"
TYPESENSE_ADMIN_API_KEY="your-admin-key"
TYPESENSE_SEARCH_ONLY_API_KEY="your-search-key"
TYPESENSE_COLLECTION="orgs"
```

4. **Run the development server**:
```bash
pnpm dev
```

5. **Open your browser** to `http://localhost:3000`

## Database Setup with Drizzle

### Configuration

The boilerplate uses Drizzle ORM with PostgreSQL. The configuration is in `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true,
  strict: true,
});
```

### Running Migrations

1. **Generate migrations**:
```bash
pnpm drizzle:gen
```

2. **Push schema to database**:
```bash
pnpm drizzle:push
```

3. **Alternative migration command**:
```bash
pnpm db:migrate
```

### Schema Structure

The database schema includes:
- `users` table (for BetterAuth)
- `orgs` table (example organization data)

Located in `db/schema.ts`:

```typescript
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orgs = pgTable("orgs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Typesense Search Setup

### Local Development

1. **Run Typesense with Docker**:
```bash
docker run -it --name typesense -p 8108:8108 \
  -v $(pwd)/typesense-data:/data \
  typesense/typesense:latest \
  --data-dir /data \
  --api-key=xyz_admin_key \
  --enable-cors
```

2. **Create a collection** (example for organizations):
```bash
curl -X POST "http://localhost:8108/collections" \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: xyz_admin_key" \
-d '{
  "name": "orgs",
  "fields": [
    {"name": "name", "type": "string"},
    {"name": "active", "type": "bool"},
    {"name": "id", "type": "string"}
  ]
}'
```

### Cloud Deployment

For production, use [Typesense Cloud](https://cloud.typesense.org/) or self-host:

1. **Update environment variables**:
```env
TYPESENSE_HOST="your-cluster.typesense.net"
TYPESENSE_PORT="443"
TYPESENSE_PROTOCOL="https"
TYPESENSE_ADMIN_API_KEY="your-cloud-admin-key"
TYPESENSE_SEARCH_ONLY_API_KEY="your-cloud-search-key"
```

2. **Keep collection schema synchronized** with your database schema.

### Usage in Components

The search functionality is implemented in:
- `src/app/api/search/route.ts` (server-side API)
- `src/app/search/page.tsx` (client-side UI)

Example search implementation:
```typescript
// Server-side API route
const result = await searchClient.collections(collection).documents().search({
  q,
  query_by: "name",
  per_page: 20,
});
```

## Vercel AI SDK with OpenAI

### Setup

1. **Get OpenAI API key** from [OpenAI Dashboard](https://platform.openai.com/api-keys)

2. **Configure in `.env.local`**:
```env
OPENAI_API_KEY="sk-your-openai-key"
```

### Implementation

The AI streaming feature is implemented in:
- `src/app/api/ai/route.ts` (edge API route)
- `src/app/ai-demo/page.tsx` (client-side demo)

### Example Usage

```typescript
// Server-side streaming API
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await streamText({
    model: openai.chat.completions.create,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  return new StreamingTextResponse(result.toAIStream());
}

// Client-side usage
const res = await fetch("/api/ai", {
  method: "POST",
  body: JSON.stringify({ prompt })
});
const reader = res.body!.getReader();
// Stream the response...
```

## Using a Custom Anthropic Claude Model (glm-4.5)

For enhanced development assistance using the glm-4.5 model with Claude Code, follow these steps:

### Setup

1. **The setup script is provided** in `set.sh`:
```bash
#!/bin/bash
export ANTHROPIC_API_KEY="your-claude-api-key-here"
```

2. **Claude settings are configured** in `.claude/settings.json`:
```json
{
  "model": "glm-4.5",
  "dangerous_skip_permissions": true
}
```

3. **Install the Claude Code CLI**:
```bash
curl -fsSL https://claude.ai/install.sh | sh
```

4. **Configure your API key** by editing `set.sh` and replacing `your-claude-api-key-here` with your actual Anthropic API key.

5. **Run `source set.sh`** to load your API key into the environment:
```bash
source set.sh
```

6. **Start the CLI with**:
```bash
claude --dangerous-skip-permissions
```

### Features with glm-4.5

- **Enhanced code understanding**: Deep comprehension of your Next.js boilerplate structure
- **Intelligent file operations**: Seamless editing and creation of TypeScript/React files
- **Advanced search capabilities**: Find and understand complex code patterns across your codebase
- **Smart error debugging**: Intelligent resolution suggestions for Next.js, Drizzle, and BetterAuth issues
- **Architecture guidance**: Best practices for scaling your production application
- **Component generation**: Automatic creation of shadcn/ui components with proper TypeScript types
- **Database schema assistance**: Help with Drizzle migrations and PostgreSQL optimizations

### Usage Examples

```bash
# Start Claude with the custom model
source set.sh
claude

# Ask Claude to analyze your codebase
"Analyze my Next.js app structure and suggest improvements"

# Generate new components
"Create a new shadcn/ui component for data visualization"

# Debug issues
"Help me fix this Drizzle migration error"
```

## Available Routes

### Public Routes
- `/` - Homepage with feature overview
- `/search` - Typesense-powered search interface
- `/ai-demo` - AI streaming demonstration
- `/map` - Leaflet map component
- `/signin` - Authentication page (UI to be implemented)

### Private Routes (Protected)
- `/(private)/orgs` - Organization management (requires authentication)

### API Routes
- `/api/auth/[...all]` - BetterAuth authentication endpoints
- `/api/search` - Typesense search proxy (edge runtime)
- `/api/ai` - AI streaming endpoint (edge runtime)

## Authentication with BetterAuth

### Current Setup
- **Strategy**: Database sessions (configurable to JWT)
- **Providers**: Email/password enabled
- **Protected Routes**: Middleware handles authentication

### Extending Authentication

Add OAuth providers in `lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ... existing config
  providers: {
    emailPassword: { enabled: true },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

## Development Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checking

# Database
pnpm drizzle:gen      # Generate Drizzle migrations
pnpm drizzle:push     # Push schema to database
pnpm db:migrate       # Alternative migration command
```

## Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on push

### Other Platforms

Ensure you have:
- Node.js 18+ runtime
- PostgreSQL database connection
- All environment variables set
- Build command: `pnpm build`
- Start command: `pnpm start`

## Project Structure

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (private)/         # Protected routes
│   │   ├── api/               # API routes
│   │   ├── actions/           # Server actions
│   │   ├── providers/         # React providers
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   └── tables/            # Custom table components
│   └── lib/                   # Utility libraries
├── db/                        # Database configuration
│   ├── schema.ts             # Database schema
│   ├── index.ts              # Database client
│   └── migrations/            # Drizzle migrations
├── drizzle.config.ts         # Drizzle configuration
├── middleware.ts             # Authentication middleware
├── next.config.ts            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## Contributing

This boilerplate is designed to be a solid foundation for production applications. Feel free to customize and extend it according to your project needs.

## License

This project is open source and available under the MIT License.