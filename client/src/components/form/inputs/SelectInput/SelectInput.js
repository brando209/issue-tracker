import React from 'react';
import { Field, ErrorMessage } from 'formik';

import './SelectInput.css';

export default function SelectInput(props) {
    return (
        <span className="input-container my-2">
            <label htmlFor={props.name}>{props.label}</label>
            <span className="form-error">
                <ErrorMessage {...props} />
            </span>
            
            <Field as="select" {...props} className="form-input">
                {props.children}
            </Field>
        </span>
    )
}