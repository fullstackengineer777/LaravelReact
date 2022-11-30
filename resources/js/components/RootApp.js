import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Layout} from "./Layout";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";


import {useAuth} from "../hooks/useAuth";
import AuthContext from "../context/authContext";


function RootApp() {
    const {userData} = useAuth();
    const [authData, setAuthData] = useState({signedIn: userData.signedIn, user: userData.user});
    return (
        <AuthContext.Provider value={{authData, setAuthData }}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home /> } />
                    <Route path="/login" element={<Login /> } />
                    <Route path="/register" element={<Register /> } />
                </Routes>
            </Layout>
        </AuthContext.Provider>
    );
}

export default RootApp;

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
            <RootApp />
        </BrowserRouter>
            , document.getElementById('app'));
}