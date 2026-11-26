import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

export function loadLocalEnv(url: URL) {
  if (process.env.NODE_ENV !== 'production' && existsSync(url)) {
    loadEnvFile(url);
  }
}
