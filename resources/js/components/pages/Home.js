import React, {useContext, useEffect} from "react";
import AuthContext from "../../context/authContext";
import {useNavigate} from "react-router-dom";

export const Home = () => {

    const {authData} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!authData.signedIn) {
            navigate('/login');
        }
    }, []);

    return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Laravel React Auth</div>

                        <div className="card-body">
                            {
                                authData.signedIn && authData.user && (
                                    <>
                                        <p>Signed in</p>
                                        <div>Hi {authData.user.name}</div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
};