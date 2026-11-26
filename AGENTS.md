# Agent instructions

Build one personal and team task manager with one account and a workspace switcher. Read this file and HANDOFF.md before editing. Inspect the actual code, Git status and unstaged changes. ARCHITECTURE.md describes the approved design. Check HANDOFF.md for verification status.

## Code and folders

Use npm workspaces with a React, Vite, TypeScript, Tailwind CSS and React Router client in `apps/web`, an Express, TypeScript, Prisma and Socket.IO server in `apps/api`, and browser-safe contracts in `packages/contracts`. Keep database schema and migrations under `apps/api/prisma`. Use strict TypeScript, validated inputs, readable names, reusable task components, ESLint and Prettier. Keep authorization in server policies and business rules in services. Keep changes focused and preserve existing behavior outside the requested scope.

Use `npm install` to bootstrap the lockfile and `npm ci` once it exists. Run `npm run dev`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test` and `npm run build` as applicable. Use Vitest, React Testing Library and integration tests against an isolated PostgreSQL test database. Verify workspace isolation and permission changes with multiple identities. Run the relevant tests and report their actual results and anything still unverified.

## Security and data

- Authenticate every protected request. Check personal ownership or current team membership and action permissions server-side. Scope all task and child lookups to the authorized workspace. Apply the same rules to sockets.
- Treat browser identifiers and roles as untrusted. Derive user identity from the session. Never expose hashes, secrets, tokens or connection strings in API output, logs, browser bundles or commits.
- Use Prisma query parameters. Keep database constraints and migration history in version control. Use transactions for related changes and handle concurrency. Store exact deadline instants and their original IANA zones. Preserve checkpoint history.
- Ask before destructive database operations, important file deletion, major architectural changes, deployment or paid services. Never run destructive test setup against a development or production database.

## Handoffs

Check which files other agents are editing before starting. Avoid concurrent edits to the same files. Preserve existing changes and inspect diffs before staging. Commit a checkpoint before major changes or switching agents when Git is available. Update HANDOFF.md after every meaningful session and before switching agents. Record exact files, working behavior, database changes, test results, blockers, decisions and next steps. Update architecture and setup docs when those details change.
