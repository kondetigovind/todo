# Unified personal and team task manager

Sign in once to manage private tasks and collaborate in multiple teams. The same task interface shows the active workspace and its tasks, filters and dashboard. Planned features include exact deadlines, priorities, assignments, progress checkpoints, comments, activity, invitations and live team updates.

**Status:** Phase 1 scaffold passes the static checks, configuration tests and build. Live startup and PostgreSQL verification are pending.

## Stack and layout

React, Vite, TypeScript, Tailwind CSS and React Router for the browser. Node.js, Express, Prisma, PostgreSQL and Socket.IO for the server. Argon2id and cookie-based sessions for authentication. Vitest, React Testing Library and PostgreSQL integration tests for verification.

```text
apps/
  web/src/             Routes, workspace navigation and task UI
  api/src/             REST routes, services, policies and sockets
  api/prisma/          Schema and versioned database migrations
packages/
  contracts/           Browser-safe API types and validation contracts
```

## Local setup

Use Node.js 22.12+ (22.x) or Node.js 24.x, npm 10+, and a local PostgreSQL instance with a dedicated development database and login. Run `npm ci` to install the dependencies pinned in `package-lock.json`. Copy `.env.example` to `.env` and supply a local PostgreSQL connection URL in `DATABASE_URL`. Use a separate test database for `TEST_DATABASE_URL` once integration tests are introduced.

| Command                                 | Purpose                                                               |
| --------------------------------------- | --------------------------------------------------------------------- |
| `npm run dev`                           | Starts the browser and API. Open http://localhost:5173.               |
| `npm run db:validate`                   | Validates the Prisma schema.                                          |
| `npm run db:check`                      | Runs a read-only `SELECT 1` through Prisma against `DATABASE_URL`.    |
| `npm run lint` / `npm run format:check` | Checks code rules and formatting.                                     |
| `npm run typecheck` / `npm test`        | Checks TypeScript and runs the configuration tests.                   |
| `npm run build`                         | Builds the browser and API into their respective `dist/` directories. |

The starter page checks `/api/health`. Vite forwards that request to Express using `PORT` from the root environment. The page reports whether the API responds. Use the separate database command to verify PostgreSQL. `APP_ORIGIN` is validated at startup and reserved for enforcing the browser origin when sessions are introduced. Prisma currently declares the PostgreSQL provider. Feature phases will add models, the generated client and versioned migrations.

## Roadmap

| Phase | Deliverable                                                                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Inspect workspace, document design and obtain approval.                                                                                                               |
| 1     | Scaffold client and API, configure tooling and Git, verify the local PostgreSQL connection.                                                                           |
| 2     | Register, log in and out, protect routes and verify sessions.                                                                                                         |
| 3     | Create and select personal or team workspaces and verify access. The registration flow will provision personal workspaces atomically when this phase introduces them. |
| 4     | Implement task CRUD, archive, deadlines, priority and filters.                                                                                                        |
| 5     | Add progress checkpoints, comments, history and late completion.                                                                                                      |
| 6     | Add team settings, membership, roles, invitations, assignment and activity.                                                                                           |
| 7     | Add authorized Socket.IO updates and verify across sessions.                                                                                                          |
| 8     | Polish dashboard, notifications, responsive layout and accessibility.                                                                                                 |
| 9     | Complete security, integration and performance reviews.                                                                                                               |
| 10    | Prepare and verify production deployment steps and estimate operating costs.                                                                                          |

## Deployment outline

Build the frontend as static assets. Route those assets, REST requests and WebSocket traffic through one HTTPS domain. Run Express on a Node.js host with a private PostgreSQL connection. Supply production settings through the host's environment, apply reviewed migrations as a release step, configure redacted logs and monitoring, and verify database backup restoration. Phase 10 will compare hosting options and current costs before any deployment or purchase.

See [ARCHITECTURE.md](ARCHITECTURE.md), [AGENTS.md](AGENTS.md) and [HANDOFF.md](HANDOFF.md).
