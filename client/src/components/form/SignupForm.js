import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { SignupSchema } from '../../utility/schema/validation';

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
                    <Row as="h3" lg={1}>Sign Up</Row>

                    <Row>
                        <Col>
                            <label htmlFor="firstName">First Name</label>
                        </Col>
                        <Col>
                            <Field name="firstName" type="text" className="form-input" />
                            <ErrorMessage name="firstName" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="lastName">Last Name</label>
                        </Col>
                        <Col>
                            <Field name="lastName" type="text" className="form-input" />
                            <ErrorMessage name="lastName" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="email">Email Address</label>
                        </Col>
                        <Col>
                            <Field name="email" type="text" className="form-input" />
                            <ErrorMessage name="email" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="userName">Display Name</label>
                        </Col>
                        <Col>
                            <Field name="userName" type="text" className="form-input" autoComplete="off"/>
                            <ErrorMessage name="userName" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="password">Password</label>
                        </Col>
                        <Col>
                            <Field name="password" type="password" className="form-input" autoComplete="off"/>
                            <ErrorMessage name="password" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </Col>
                        <Col>
                            <Field name="confirmPassword" type="password" className="form-input" />
                            <ErrorMessage name="confirmPassword" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
                    </Row>
                    
                    <p>Already have an account? <Link to="login">Log in</Link> to continue.</p>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm;