import React, {useState} from "react";
import {useForm} from "../../hooks/useForm";
import axios from 'axios';

const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const { setErrors, renderFieldError, navigate } = useForm();

    const makeRequest = (e) => {
        e.preventDefault();

        setErrors(null);

        axios.post('/api/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }).then(response => {

            console.log(response.data.user);

            if(response.data.user) {
                alert("Register success");

                navigate('/login');
            }
        }).catch(error => {
            console.log(error);

            if(error.response) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Register</div>

                    <div className="card-body">
                        <form method="POST" action="#" onSubmit={makeRequest}>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-end">Name</label>

                                <div className="col-md-6">
                                    <input id="name" type="text"
                                           className="form-control" name="name" required autoComplete="name" autoFocus value={name} onChange={e => setName(e.target.value)} />
                                    {renderFieldError('name')}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-end">E-Mail Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email"
                                           className="form-control" name="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    {renderFieldError('email')}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-end">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password"
                                           className="form-control"
                                           name="password" required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
                                    {renderFieldError('password')}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                                <div className="col-md-6">
                                    <input id="password-confirm" type="password" className="form-control"
                                           name="password_confirmation" required autoComplete="new-password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
                                    {renderFieldError('password_confirmation')}
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-6 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Register
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

export {Register};