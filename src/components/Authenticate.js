import {useState, useEffect} from 'react';
import DATA from '../data';
import { LoginPage } from './LoginPage';
import { ClientDashboard } from './ClientDashboard';

export const Authenticate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [client, setClient] = useState(null);
    const localUsers = localStorage.getItem('users');
    
    if(!localUsers) {
      localStorage.setItem('users', JSON.stringify(DATA));
    }

    const clients = JSON.parse(localStorage.getItem('users'));

    useEffect(() => {
        const loggedInUser = localStorage.getItem('currentUser');
        if (loggedInUser) {
            setClient(JSON.parse(loggedInUser));
            setIsLoggedIn(true);
        }
    }, []);

    const isLoginSuccess = (email, password) => {
      let isFound = false;

      clients.forEach(user => {
        if(user.email === email && user.password === password) {
            setClient(user)
            isFound = true;
            setNotif('');
        }
      });
  
      if(!isFound) setNotif({message: 'Nome de usuário ou senha incorretos.', style: 'danger'});
      return isFound;
    }
  
    const login = (username, password) => {
        if(isLoginSuccess(username, password)) {
            setIsLoggedIn(true);
            localStorage.setItem('currentUser', JSON.stringify(client));
        }
    }
  
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('currentUser');
        setNotif({message: 'Você deslogou.', style: 'success'});
    }
  
    if(isLoggedIn) {
        localStorage.setItem('currentUser', JSON.stringify(client));
        return <ClientDashboard client={client} users={clients} setClient={setClient} logout={logout} />
    } else {
        return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
    }
}
