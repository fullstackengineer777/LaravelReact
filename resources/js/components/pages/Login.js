import React, {useContext, useEffect, useState} from "react";

import {useForm} from "../../hooks/useForm";
import {useAuth} from "../../hooks/useAuth";
import AuthContext from "../../context/authContext";
import axios from 'axios';

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const {setAsLogged} = useAuth();

    const {authData} = useContext(AuthContext);

    useEffect(() => {
        if(!authData.signedIn) {
            navigate('/');
        }
    }, []);

    const { setErrors, renderFieldError, message, setMessage, navigate } = useForm();

    const makeRequest = (e) => {
        e.preventDefault();

        setErrors(null);

        setMessage('');

        // make request first to sanctum/csrf-cookie
        axios.get('/sanctum/csrf-cookie').then(() => {

            const payload = {
                email,
                password
            };

            if(remember) {
                payload.remember = true;
            }

            axios.post('/api/login', payload, {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {

                if(response.data.user) {

                    alert("Login success");

                    setAsLogged(response.data.user);
                }
            }).catch(error => {
                console.log(error);

                if(error.response) {
                    if (error.response.data.message) {
                        setMessage(error.response.data.message);
                    }

                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            });
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Login</div>

                    <div className="card-body">

                        {
                            message && <div className="alert alert-danger">{message}</div>
                        }

                        <form method="POST" action="#" onSubmit={makeRequest}>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email"
                                           className="form-control" name="email"
                                            required autoComplete="email" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                                    {renderFieldError('email')}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password"
                                           className="form-control" name="password"
                                           required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                                    { renderFieldError('password') }
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember"
                                               id="remember" onChange={e => { setRemember(e.target.checked ? 1 : 0) } } />

                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};