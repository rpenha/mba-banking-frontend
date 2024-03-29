import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MainClientContent } from './MainClientContent';
import { findAccount } from './Utils';
import Saque from './Saque';
import Deposito from './Deposito';

export const ClientDashboard = (props) => {
    const { logout, client, setClient } = props;
    const [page, setPage] = useState('home');

    const changePageHandler = (pageName) => {
        setPage(pageName);
        const currentUser = findAccount(client.number);
        setClient(currentUser);
    }

    return (
        <Router>
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={logout} />
                <Routes>
                    <Route path="/" element={<MainClientContent user={client} />} />
                    <Route path="/saque" element={<Saque client={client} />} />
                    <Route path="/deposito" element={<Deposito client={client} />} />
                </Routes>
            </main>
        </Router>
    );
}
