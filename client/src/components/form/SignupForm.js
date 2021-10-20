import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import { SignupSchema } from '../../utility/schema/validation';
import TextInput from './inputs/TextInput/TextInput';

import './form.css';

function SignupForm(props) {
    return (
        <Formik
            initialValues={{ firstName: "", lastName: "", email: "", userName: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, form) => {
                form.setSubmitting(true);
                try {
                    await props.onSubmit(values);
                } catch (err) {
                    console.log(err);
                }
                form.setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form" autoComplete="false">
                    <Row as="h3" lg={1} className="center-align heading">Sign Up</Row>

                    <Row as="h5" className="left-align subheading">Sign up for an account</Row>
                    <Row as="p" className="left-align message">Sign up today and you can begin keeping track of all tasks and issues related to your projects with [insert issue tracker name here]!</Row>

                    <Row className="mx-4">
                        <Col xs={12} md={6}>
                            <TextInput name="firstName" type="text" label="First name" />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextInput name="lastName" type="text" label="Last name" />
                        </Col>
                    </Row>

                    <Row className="mx-4">
                        <Col xs={12} md={6}>
                            <TextInput name="userName" type="text" label="User name" />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextInput name="email" type="text" label="Email" />
                        </Col>
                    </Row>

                    <Row className="mx-4">
                        <Col xs={12} md={6}>
                            <TextInput name="password" type="password" label="Password" />
                        </Col>
                        <Col xs={12} md={6}>
                            <TextInput name="confirmPassword" type="password" label="Confirm Password" />
                        </Col>
                    </Row>

                    <Row className="my-3">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>Sign up</Button>
                    </Row>
                    
                    <Row as="p" className="center-align message">Already have an account? Please <Link to="login">&nbsp;Log in&nbsp;</Link> to continue.</Row>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm;