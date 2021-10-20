import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';

import TextInput from './inputs/TextInput/TextInput';
import { LoginSchema } from '../../utility/schema/validation'

function LoginForm({ onSubmit, ...props }) {
    return (
        <Formik
            initialValues={{ userName: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    await onSubmit(values)
                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                    <Row as="h3" className="center-align heading">Login</Row>

                    <Row as="h5" className="left-align subheading">Login to your account</Row>
                    <Row as="p" className="left-align message">Welcome! You must log in to your account to view and manage your projects with [insert issue tracker name here]!</Row>

                    <Row className="mx-4">
                        <TextInput name="userName" type="text" label="Username" />
                    </Row>

                    <Row className="mx-4">
                        <TextInput name="password" type="password" label="Password" />
                    </Row>

                    {props.error && <div className="form-error">{props.error.message}</div>}

                    <Row className="my-3">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Login
                        </Button>
                    </Row>

                    <Row as="p" className="center-align message">Don't have an account yet? Please <Link to="signup">&nbsp;Sign up&nbsp;</Link> to continue.</Row>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;