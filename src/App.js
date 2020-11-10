import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

import history from './services/history';

import GlobalStyles from './styles/globals';

export default function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Routes />
      <ToastContainer
        // style={{ width: '60%' }}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}
