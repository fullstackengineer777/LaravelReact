import React,{useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/authContext";
import {useAuth} from "../hooks/useAuth";
import axios from 'axios';

function Navbar() {

    const {authData} = useContext(AuthContext);
    const {setLogout} = useAuth();

    const renderLinks = () => {
        if(!authData.signedIn) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </>
            )
        }

        return (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="">Hi {authData.user.name}</a>
                </li>
                <li className="nav-item">
                 <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
            </>
        )
    }

    const handleLogout = () => {
        axios.post('/api/logout').then(response => {
            setLogout();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand">Laravel React Auth</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        { renderLinks() }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;