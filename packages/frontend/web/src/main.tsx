import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { BirthProvider } from './contexts/BirthContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

// Taken into account that CheckBirthdate can come before authentication,
// AgeProvider will be placed around AuthProvider.
// If Authentication came before, AgeProvider should be placed inside of AuthProvider.
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BirthProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </BirthProvider>
    </React.StrictMode>,
  );
}
