import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormControl } from 'react-bootstrap';

import './TextInput.css';

const InputComponent = (props) => (
    <FormControl 
        name={props.name} 
        as={props.type === "textarea" ? "textarea" : "input"} 
        {...props}
        className="form-input"
    />
);

export default function TextInput(props) {
    return (
        <span className="text-input-container my-2">
            <label htmlFor={props.name}>{props.label}</label>
            <span  className="form-error">
                <ErrorMessage {...props} />
            </span>
            <Field as={InputComponent} {...props} className="form-input" />
        </span>
    )
}