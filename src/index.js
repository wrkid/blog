import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './components/App';
import { store } from './store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);
