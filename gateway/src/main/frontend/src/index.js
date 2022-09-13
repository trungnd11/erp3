import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { configStore } from "./store";
import { bindActionCreators } from 'redux';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './store/auth/authentication/authentication';
import {getUserInfo} from './store/user-profile'

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configStore();
const actions = bindActionCreators({ clearAuthentication,getUserInfo }, store.dispatch);
setupAxiosInterceptors(() => {
  window.location.assign('/login');
  actions.clearAuthentication('login.error.unauthorized');
})



root.render(
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();