import React, { useState, useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './withEdit.css';

const withEdit = (WrappedComponent, type) => (
    ({ onEdit, name, isEditing = false, ...props }) => { // isEditing prop is used to force editing mode from outside
        const [editing, setEditing] = useState(isEditing);
        const [value, setValue] = useState(props.value);
        const inputRef = useRef();

        useEffect(() => {
            inputRef && inputRef.current && inputRef.current.focus();
        }, [editing, isEditing]);

        const handleClick = () => {
            if(isEditing) return;
            setEditing(true);
        }

        const handleKeyPress = (e) => {
            if(e.key === "Enter") {
                handleSubmit(e);
            }
        }

        const handleChange = (e) => {
            setValue(e.target.value);
        }

        const handleBlur = () => {
            (props.onBlur && props.onBlur()) || setEditing(false);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            onEdit({ [inputRef.current.name]: value });
            setEditing(false);
        }

        const inputComponent = () => {
            if(type === "text") {
                return (
                    <input 
                        ref={inputRef} 
                        name={name}
                        type={type} 
                        defaultValue={value} 
                        onChange={handleChange} 
                    />
                )
            } else if(type === "textarea") {
                return (
                    <textarea 
                        ref={inputRef}
                        name={name} 
                        defaultValue={value} 
                        rows={5}
                        cols={75}
                        onChange={handleChange} 
                        onKeyPress={handleKeyPress}
                    />
                )
            } else if(type === "select") {
                return (
                    <select
                        ref={inputRef}
                        name={name}
                        defaultValue={value}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    >
                        {
                            props.options && props.options.map((opt, idx) => (
                                <option key={idx} value={opt}>
                                    {opt}
                                </option>
                            ))
                        }
                    </select>
                )
            }
            return null;
        }

        return editing ? (
            <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
                <form onBlur={handleBlur} onSubmit={handleSubmit}>
                    {inputComponent()}
                </form>
            </Col>
        ) : (
            <div className="component-wrapper">
                <WrappedComponent {...props} onClick={handleClick}>
                    {props.children}
                </WrappedComponent>
            </div>
        )
    }
)

export default withEdit;