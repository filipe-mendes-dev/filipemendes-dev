import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './shared/theme/theme.css';
import './shared/styles/reset.css';
import './shared/styles/base.css';
import { App } from './App';
import { applyThemeTokens } from './shared/theme/applyThemeTokens';
import { themeTokens } from './shared/theme/tokens';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root element not found');
}

applyThemeTokens(themeTokens);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
