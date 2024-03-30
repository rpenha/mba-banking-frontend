import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Sidebar} from '../components/Sidebar';
import {MainCustomerContent} from '../components/MainCustomerContent';
import {AccountPage} from "./AccountPage";

export const CustomerPage = () => {
    const [page, setPage] = useState('home');

    const changePageHandler = (pageName) => {
        setPage(pageName);
    }

    return (
        <main>
            <Sidebar changePage={changePageHandler} page={page}/>
            <Routes>
                <Route path="/login-callback" element={<Navigate to="/"/>}/>
                <Route path="/accounts/:accountId" element={<AccountPage/>}/>
                <Route path="/" element={<MainCustomerContent/>}/>
                {/*<Route path="/saque" element={<Saque />}/>*/}
                {/*<Route path="/deposito" element={<Deposito />}/>*/}
            </Routes>
        </main>
    );
}