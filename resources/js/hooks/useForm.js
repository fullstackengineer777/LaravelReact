import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export const useForm = () => {
    let navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState('');

    function renderFieldError(field) {
        if(errors && errors.hasOwnProperty(field)) {
            return errors[field][0] ? (
                <span className="invalid-feedback" role="alert"><strong>{errors[field][0]}</strong></span>
            ) : null;
        }

        return null;
    }

    return {
        navigate,
        errors,
        setErrors,
        message,
        setMessage,
        renderFieldError
    }
}