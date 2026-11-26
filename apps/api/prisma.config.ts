import { defineConfig } from 'prisma/config';
import { databaseUrl } from './src/config.ts';
import { loadLocalEnv } from './src/load-env.ts';

loadLocalEnv(new URL('../../.env', import.meta.url));
const url = databaseUrl(process.env);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  ...(url ? { datasource: { url } } : {}),
});
