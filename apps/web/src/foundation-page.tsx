import type { HealthResponse } from '@todo/contracts';
import { useEffect, useState } from 'react';

async function checkApi(signal: AbortSignal) {
  const response = await fetch('/api/health', { signal });
  if (!response.ok) throw new Error('API health check failed.');
  const result: Partial<HealthResponse> | null = await response.json();
  if (result?.status !== 'ok') throw new Error('Unexpected API health response.');
}

export function FoundationPage() {
  const [status, setStatus] = useState('Checking the API…');

  useEffect(() => {
    const controller = new AbortController();
    checkApi(controller.signal)
      .then(() => {
        if (!controller.signal.aborted) setStatus('API connected.');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('API unavailable. Check that it is running.');
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-6 text-slate-900">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Unified Tasks</h1>
        <p className="mt-4 text-slate-700" role="status">
          {status}
        </p>
      </section>
    </main>
  );
}
