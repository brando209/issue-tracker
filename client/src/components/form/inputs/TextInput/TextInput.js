import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormControl } from 'react-bootstrap';

import './TextInput.css';

export default function TextInput(props) {
    return (
        <span className="text-input-container">
            <label htmlFor={props.name}>{props.label}</label>
            <span  className="form-error">
                <ErrorMessage name={props.name} />
            </span>
            <Field as={FormControl} name={props.name} type={props.type} className="form-input" />
        </span>
    )
}