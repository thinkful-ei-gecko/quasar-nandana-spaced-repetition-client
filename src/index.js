import 'unfetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import {LangProvider} from './contexts/LangContext';
import App from './components/App/App';
import './setup-icons';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
