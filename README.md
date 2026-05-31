# my-porto-web

Portfolio website built with **Next.js**, **TypeScript**, and prepared for **Supabase** integration.

The UI is adapted from the Figma file `Porto website`, including dark and light mode behavior. The dark mode follows the centered editorial/globe composition, while the light mode shifts the hero into a more left-aligned portfolio layout so the same page can visually change by theme.

## Tech stack

- Next.js App Router
- React
- TypeScript
- CSS variables for design tokens and theme switching
- Supabase client placeholder, to be connected after project setup
- Docker and Docker Compose for containerized run

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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

## Supabase setup later

Supabase is intentionally prepared but not connected yet.

When ready:

```bash
cp .env.local.example .env.local
```

Then fill:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The placeholder client is available at:

```ts
lib/supabase.ts
```

## Available routes

- `/` - portfolio landing page
- `/projects/neural-sync` - project detail page
- `/blog` - blog listing page
- `/blog/monolithic-fallacy` - blog article detail page
- `/contact` - contact page

## Development notes

The project is intentionally designed with static content first. Supabase can later be used for dynamic projects, blog posts, contact submissions, or authentication without changing the current visual structure.
