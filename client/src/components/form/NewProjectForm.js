import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { ProjectSchema } from '../../utility/schema/validation';

function NewProjectForm({ onSubmit }) {
    return (
        <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={ProjectSchema}
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
                    <Row as="h3">Create New Project</Row>

                    <Row>
                        <Col>
                            <label htmlFor="name">Project Name</label>
                        </Col>
                        <Col>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="description">Description</label>
                        </Col>
                        <Col>
                            <Field name="description" as="textarea" className="form-input" />
                            <ErrorMessage name="description" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Create Project
                        </Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )
}

export default NewProjectForm;