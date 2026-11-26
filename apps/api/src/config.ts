export function parseServerConfig(env: NodeJS.ProcessEnv) {
  const mode = env.NODE_ENV ?? 'development';
  if (mode !== 'development' && mode !== 'test' && mode !== 'production') {
    throw new Error('NODE_ENV must be development, test, or production.');
  }

  const port = Number(env.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  const appOrigin = env.APP_ORIGIN ?? (mode === 'production' ? '' : 'http://localhost:5173');
  const origin = URL.parse(appOrigin);
  if (
    !origin ||
    origin.origin !== appOrigin ||
    (origin.protocol !== 'https:' && !(mode !== 'production' && origin.protocol === 'http:'))
  ) {
    throw new Error('APP_ORIGIN must be a canonical HTTP(S) origin, using HTTPS in production.');
  }

  return { mode, port, appOrigin };
}

export function databaseUrl(env: NodeJS.ProcessEnv) {
  const value = env.DATABASE_URL?.trim();
  if (!value) return undefined;

  const url = URL.parse(value);
  if (!url?.hostname || (url.protocol !== 'postgresql:' && url.protocol !== 'postgres:')) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection URL.');
  }
  return value;
}
