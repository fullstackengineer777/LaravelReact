import React ,{useEffect} from "react";
import Navbar from "./Navbar";

import {useAuth} from "../hooks/useAuth";

export const Layout = ({ children }) => {

    const { loginUserOnStartup } = useAuth();

    useEffect(() => {
        loginUserOnStartup();
    }, []);

    return (
            <div>
                <Navbar />
                <div className="container">
                    { children }
                </div>
            </div>
    );
};