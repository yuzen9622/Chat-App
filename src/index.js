import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext';

ReactDOM.render(
  <HashRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HashRouter>,
  document.getElementById('root')
);

