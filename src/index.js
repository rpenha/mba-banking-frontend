import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {WebStorageStateStore} from "oidc-client-ts";
import {AuthProvider} from "react-oidc-context";

const oidcConfig = {
    authority: "http://localhost:8080/realms/banking",
    client_id: "banking-webapp",
    redirect_uri: "http://localhost:3000/login-callback",
    userStore: new WebStorageStateStore({store: window.localStorage})
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <Router>
        <AuthProvider {...oidcConfig}>
            <App/>
        </AuthProvider>
    </Router>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
