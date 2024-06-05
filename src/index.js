import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@popperjs/core/dist/umd/popper';
import './assets/fontawesome-free-6.5.2-web/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
