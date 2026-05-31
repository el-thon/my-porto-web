# my-porto-web

Portfolio website built with **Next.js**, **TypeScript**, and prepared for **Supabase** integration.

The UI is adapted from the Figma file `Porto website`, including dark and light mode behavior and a portrait-led hero layout.

## Tech stack

- Next.js App Router
- React
- TypeScript
- CSS variables for design tokens and theme switching
- Supabase data layer for projects, posts, and contact submissions
- Docker and Docker Compose for containerized run

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** in Supabase and run `supabase/schema.sql`.
3. Copy `.env.local.example` to `.env.local`.
4. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-secret-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=portfolio-media
ADMIN_PASSWORD=your-admin-password
```

Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for new Supabase projects. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is still supported for older projects.

Use `SUPABASE_SECRET_KEY` for new Supabase projects. `SUPABASE_SERVICE_ROLE_KEY` is still supported for older projects. Both are server-only. Never prefix them with `NEXT_PUBLIC_`.

The site reads `projects` and `posts` from Supabase and falls back to local data when Supabase is not configured. The contact form writes to `contact_messages`.

## Admin panel

- Prefix: `/admin`
- Login: `/admin/login`
- Local fallback password: `admin`
- Production password: set `ADMIN_PASSWORD` in the environment

The admin panel can view counts, create projects, create posts, upload multiple images/videos to Supabase Storage, embed external Google Drive or YouTube videos, and read contact messages. Supabase admin features require `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`.

## Docker setup

Create the environment file first. Supabase values can stay empty while the integration is not active yet.

```bash
cp .env.local.example .env.local
```

Run with Docker Compose:

```bash
docker compose up --build
```

Open:

```bash
http://localhost:3000
```

Run in background:

```bash
docker compose up -d --build
```

Stop container:

```bash
docker compose down
```

Manual Docker build and run:

```bash
docker build -t my-porto-web .
docker run --name my-porto-web -p 3000:3000 --env-file .env.local my-porto-web
```

## Available routes

- `/` - portfolio landing page
- `/projects/my-porto-web` - project detail page
- `/blog` - blog listing page
- `/blog/about-elthon-jhon-kevin` - blog article detail page
- `/contact` - contact page
- `/admin` - admin dashboard

## Development notes

Project and blog content comes from Supabase. If Supabase is not configured or no rows exist yet, the public pages show an empty state instead of mock content.
