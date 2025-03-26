import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './src/App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(
<Auth0Provider
    domain="dev-6-2fm190.us.auth0.com"
    clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

    <App />
  </Auth0Provider>
);
