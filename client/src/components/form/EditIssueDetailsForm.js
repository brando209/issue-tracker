import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { IssueSchema } from '../../utility/schema/validation';


function EditIssueDetailsForm(props) {
    return(
        <Formik
            initialValues={{ 
                title: props.initialTitle,
                description: props.initialDescription,
                category: props.initialCategory,
                priority: props.initialPriority
            }}
            onSubmit={(values) => {
                props.onSubmit(values);
            }}
            validationSchema={IssueSchema}
        >
            {() => (
                <Form id="edit-issue-form" >
                    <Row className="justify-content-center title">
                        <Col>
                            <Field name="title" type="text" className="form-input" />
                            <span className="form-error">
                                <ErrorMessage name="title" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <label htmlFor="description">Description</label>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Field name="description" as="textarea" className="form-input" />
                            <span className="form-error">
                                <ErrorMessage name="description" className="form-error" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <label htmlFor="category">Category</label>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Field name="category" as="select" className="form-input">
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                                <option value="task">Task</option>
                                <option value="other">Other</option>
                            </Field>
                            <span className="form-error">
                                <ErrorMessage name="category" className="form-error" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4} md={4} sm={4} xs={4}>
                            <label htmlFor="priority">Priority</label>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <Field name="priority" as="select" className="form-input">
                                <option value="trivial">Trivial</option>
                                <option value="low">Low</option>
                                <option value="regular">Regular</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </Field>
                            <span className="form-error">
                                <ErrorMessage name="priority" className="form-error" />
                            </span>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default EditIssueDetailsForm;