# Checkpoint — Game Backlog Tracker

> A personal command center for organizing, tracking, and discovering your game collection.

## About

Checkpoint helps players turn an overflowing game collection into a clear and rewarding journey. Keep your library organized, decide what to play next, and follow your progress from backlog to completion.

The project is built as a monorepo with a web application and an API. Game information can be discovered and enriched through an external game catalog, while the games a player adds to their personal library are kept in the application's data store.

## Features

- **Personal library:** Save games to your collection and group them into custom lists.
- **Progress tracking:** Organize games by statuses such as not started, ongoing, completed, and dropped.
- **Game discovery:** Browse and search a catalog using details such as platform, genre, release period, rating, and estimated completion time.
- **Game details:** Review a game's cover, summary, platforms, genres, release information, and time-to-beat estimate before deciding what to play.
- **Dashboard:** See your profile, current games, backlog highlights, completion statistics, missions, and recent achievements in one place.
- **Backlog focus:** Get a quick view of the next games in your queue and use the available backlog actions to choose your next checkpoint.
- **Accounts:** Create an account and sign in to keep your personal library and progress associated with your profile.
- **Responsive interface:** Use the experience across desktop and mobile layouts with dedicated public, authentication, discovery, library, and dashboard views.

## Tech Stack

The repository is organized as a typed monorepo. Its main building blocks are:

- **Web:** Next.js, React, TypeScript, Tailwind CSS, and a small reusable UI layer.
- **API:** Hono running on Cloudflare Workers.
- **Data:** Cloudflare D1 with Drizzle ORM.
- **Game data:** External catalog integration for game search and metadata.
- **Quality:** Biome for formatting and code checks, with Vitest tests in the API workspace.

## Project Structure

```text
.
├── apps/
│   ├── web/                  # Web application and user-facing pages
│   └── api/                  # API, authentication, game services, and database
├── biome.json                # Shared code-quality configuration
└── package.json              # Workspace scripts and dependencies
```

The web application is organized around the main product areas: public landing pages, authentication, the dashboard, game discovery, game details, and the personal library. The API keeps authentication, user, and game concerns separated into focused modules and services.

## Getting Started

### Prerequisites

- Node.js with npm
- Credentials for the external game catalog when using catalog-backed API features
- A local Cloudflare D1 database for API development

### Install

From the repository root:

```bash
npm install
```

### Run the development apps

```bash
npm run dev
```

This starts the workspace development scripts for the web application and API. For app-specific work, run the scripts from the corresponding workspace:

```bash
npm run dev --workspace web
npm run dev --workspace api
```

The web app is available at `http://localhost:3000` by default. The API uses Wrangler's local development server.

### Database development

The API workspace includes scripts for generating Drizzle migrations, applying local D1 migrations, and opening the local database in Drizzle Studio:

```bash
npm run db:generate --workspace api
npm run db:migrate:local --workspace api
npm run db:studio --workspace api
```

## Available Checks

Run the main web checks from the repository root:

```bash
npm run lint
npm run format
```

Run the API test suite with:

```bash
npm test --workspace api
```

## Status

Checkpoint is under active development. Some screens currently use representative data while the product experience and backend capabilities continue to evolve.