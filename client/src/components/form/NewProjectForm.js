import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import TextInput from './inputs/TextInput/TextInput';
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

                    <TextInput name="name" type="text" label="Project name"/>

                    <TextInput name="description" type="textarea" label="Project description"/>

                    <Row className="my-4">
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