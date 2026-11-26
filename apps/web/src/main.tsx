import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { FoundationPage } from './foundation-page';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Application root element is missing.');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoundationPage />} />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-xl p-6">
              <h1 className="text-2xl font-semibold">Page unavailable</h1>
              <Link to="/" className="mt-3 inline-block underline">
                Return home
              </Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
