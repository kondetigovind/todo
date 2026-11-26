# Project handoff

## Status

Phase 0 design was approved. Phase 1 scaffold is present. Completion is blocked on dependency installation, PostgreSQL verification and the Git checkpoint. Authentication, task management and collaboration are pending.

## Files and database

- Root workspace and tooling live in `package.json`, `tsconfig.base.json`, `eslint.config.js`, `.prettierrc.json` and `.prettierignore`.
- `apps/web/` contains React Router, the Tailwind/Vite setup, a starter page and the API proxy. `apps/api/` contains Express startup, environment validation, a Vitest configuration suite and the Prisma configuration. `packages/contracts/` defines the shared health response type.
- Updated AGENTS.md, ARCHITECTURE.md, README.md, HANDOFF.md, .gitignore and .env.example.
- The Prisma schema declares PostgreSQL. The connection check runs `SELECT 1`. No database was created, connected or migrated. There are no application tables yet.

## Verification and blockers

- Node 22.23.5 and npm 10.9.9 are available. Native Node assertions passed for configuration defaults, invalid ports, origin validation, environment modes and PostgreSQL URL validation. All ten JSON configuration files parsed.
- `npm ping` and `npm install` failed with `EAI_AGAIN` resolving registry.npmjs.org. There is no lockfile or installed dependency tree. Lint, formatting, type checking, build, Vitest, Prisma commands and dev startup were attempted and blocked by missing executables.
- Local PostgreSQL and Docker binaries were absent. The connection remains unverified.
- `git init` failed because the existing protected `.git/` directory is read-only. No checkpoint commit was possible.
- Follow-up recheck confirmed the registry DNS error, absent PostgreSQL binaries, and read-only Git metadata. The sandbox also denied a loopback connection attempt (EPERM). No new application or database verification was possible.

- With installation authorized, retried npm online and offline. Online failed with EAI_AGAIN and offline failed with ENOTCACHED for @eslint/js. An Ubuntu PostgreSQL 16 package download into /tmp also failed at DNS resolution. No dependencies were installed.

## Decisions and next steps

The browser, API and type-only contracts share an npm workspace. Development uses a Vite API proxy. Production is planned around one browser origin. Database health is checked independently from API liveness. See ARCHITECTURE.md for the approved workspace, authentication and permission model.

1. Restore npm registry access in an environment with writable Git metadata. Run `npm install` to generate the lockfile and initialize Git.
2. Start a local PostgreSQL instance with a dedicated development database. Create an ignored root `.env` from `.env.example` and set `DATABASE_URL`.
3. Run `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run db:validate` and `npm run db:check`. Start `npm run dev` and verify the health response through both Express and the Vite proxy, and the browser status page.
4. Update the handoff with results and commit the Phase 1 checkpoint. Phase 2 starts with the User and Session schema, Prisma Client generation, migrations and authentication.

## 2026-11-26 verification follow-up

The workspace now includes `package-lock.json` and an installed dependency tree. `npm ls --depth=0` passed. An offline `npm ci` in a temporary copy reached dependency lifecycle scripts, where esbuild's binary version probe returned `EPERM`. The working installation was preserved. The npm registry still returns `EAI_AGAIN`.

- Formatted `apps/api/tsconfig.json`, `ARCHITECTURE.md`, `eslint.config.js`, `package.json`, `packages/contracts/package.json`, `README.md` and `tsconfig.base.json`. Updated `README.md` for the existing lockfile and current verification status. No application logic or database schema changed.
- Lint, type checking, build, Prisma schema validation and all three configuration tests passed. Formatting passed after the cleanup.
- `npm run dev` failed when tsx tried to bind its IPC socket. Vite on its own and an independent loopback bind both returned `EPERM`. The Express health response, Vite proxy and browser status page remain unverified.
- `npm run db:check` could not run `SELECT 1` because no `DATABASE_URL` is configured. Local PostgreSQL and Docker executables are absent. No database was created or modified.
- Git status and diff could not run because the workspace has an empty, read-only `.git/` directory. No checkpoint was created.

Finish Phase 1 in an environment that permits local listeners and provides a dedicated PostgreSQL database and writable Git metadata. Use the existing lockfile with `npm ci`, verify the live health checks and create the checkpoint. Phase 2 then needs the Prisma Client and PostgreSQL adapter, followed by the initial migration and session authentication.

## GitHub checkpoint follow-up

Expanded `.gitignore` to cover local tooling, caches, temporary files, credential files and database artifacts. Kept `.env.example` available. A scan of project files found no common credential signatures. No application or database changes were made. Git 2.43.0 is installed, but `git init -b main` failed because the workspace's `.git/` mount is read-only. Git author name and email are unset. The GitHub remote at https://github.com/kondetigovind/todo.git could not be inspected from this environment because Git could not resolve github.com. The commit, remote configuration and push are pending.
