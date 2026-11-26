import { describe, expect, it } from 'vitest';
import { databaseUrl, parseServerConfig } from './config.js';

describe('server configuration', () => {
  it('uses local defaults when environment values are absent', () => {
    expect(parseServerConfig({})).toEqual({
      mode: 'development',
      port: 3001,
      appOrigin: 'http://localhost:5173',
    });
  });

  it('rejects invalid ports and production origins without HTTPS', () => {
    expect(() => parseServerConfig({ PORT: '65536' })).toThrow('PORT');
    expect(() =>
      parseServerConfig({ NODE_ENV: 'production', APP_ORIGIN: 'http://example.test' }),
    ).toThrow('APP_ORIGIN');
  });

  it('accepts an unset database URL and rejects non-PostgreSQL URLs', () => {
    expect(databaseUrl({ DATABASE_URL: '' })).toBeUndefined();
    expect(databaseUrl({ DATABASE_URL: 'postgresql://localhost/todo' })).toBe(
      'postgresql://localhost/todo',
    );
    expect(() => databaseUrl({ DATABASE_URL: 'https://example.test' })).toThrow('DATABASE_URL');
  });
});
