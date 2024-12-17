import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render app with Suspense to handle i18n loading
root.render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </React.StrictMode>
);
