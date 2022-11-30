import React, {useContext, useEffect} from "react";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

import AuthContext from "../context/authContext";
import axios from 'axios';

export const useAuth = () => {
    let navigate = useNavigate();

    const [userData, setUserdata] = React.useState({signedIn: false, user: null});

    const {setAuthData} = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData.signedIn]);

    function getAuthCookieExpiration()
    {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

    function setAsLogged(user) {

        const cookie = new Cookies();

        cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        setUserdata({signedIn: true, user});

        navigate('/');
    }

    function setLogout() {
        const cookie = new Cookies();

        cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        setUserdata({signedIn: false, user: null});

        navigate('/login');
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();
        if(cookie.get('is_auth')) {

            axios.post('/api/me').then(response => {
                setUserdata({signedIn: true, user: response.data.user});
                navigate('/');
            }).catch(error => {
                setUserdata({signedIn: false, user: null});
                setLogout();
            });

        } else {
            setUserdata({signedIn: false, user: null});
            navigate('/login');
        }
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup
    }

};