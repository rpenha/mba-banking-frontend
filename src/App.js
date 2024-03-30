import React from 'react';
import './App.css';
import {useAuth} from "react-oidc-context";
import {CustomerPage} from "./pages/CustomerPage";
import {LoginPage} from "./pages/LoginPage";

function App() {
  const auth = useAuth();

  const login = async () => await auth.signinRedirect();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  return auth.isAuthenticated
      ? <CustomerPage/>
      : <LoginPage loginHandler={login} />;
}

export default App;
