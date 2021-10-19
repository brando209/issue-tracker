import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Row, Col, Button} from 'react-bootstrap';

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
                    <Row as="h3">Log In</Row>
                    <Row>
                        <Col>
                            <label htmlFor="userName">Username</label>
                        </Col>
                        <Col>
                            <Field name="userName" type="text" className="form-input" />
                            <ErrorMessage name="userName" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="password">Password</label>
                        </Col>
                        <Col>
                            <Field name="password" type="password" className="form-input" />
                            <ErrorMessage name="password" className="form-error" />
                        </Col>
                    </Row>

                    {props.error && <div className="form-error">{props.error.message}</div>}

                    <Row>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Row>

                    <p>Don't have an account yet? Please <Link to="signup">Sign up</Link> to continue.</p>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;