import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import Upload from './inputs/Upload/Upload';
import TextInput from './inputs/TextInput/TextInput';
import SelectInput from './inputs/SelectInput/SelectInput';
import { IssueSchema } from '../../utility/schema/validation';

function NewIssueForm({ onSubmit, collaborators }) {
    const [uploadCallbacks, setUploadCallbacks] = useState({
        progressCb: (percentCompleted) => { console.log(percentCompleted) },
        successCb: () => { console.log("Successful upload") },
        failureCb: () => { console.log("Failed upload") }
    });

    return (
        <Formik
            initialValues={{ title: "", description: "", category: "other", priority: "regular", status: "unassigned", assigneeId: "" }}
            validationSchema={IssueSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    const newIssue = values;

                    await onSubmit(newIssue, uploadCallbacks);

                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, setFieldValue, submitForm, resetForm }) => (
                <Form className="form" id="new-issue-form">
                    <Row as="h3">Add New Issue</Row>

                    <TextInput name="title" type="text" label="Issue Title" />

                    <TextInput name="description" type="textarea" label="Description" />

                    <SelectInput name="category" label="Category">
                        <option value="bug">Bug</option>
                        <option value="feature">Feature</option>
                        <option value="task">Task</option>
                        <option value="other">Uncategorized</option>
                    </SelectInput>

                    <SelectInput name="priority" label="Priority">
                        <option value="trivial">Trivial</option>
                        <option value="low">Low</option>
                        <option value="regular">Regular</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </SelectInput>

                    <Row className="input-container">
                        <label htmlFor="attachments">Attachments</label>
                        <Col xl={6}>
                            <Field
                                name="attachments"
                                as={Upload}
                                onChange={val => setFieldValue('attachments', val)}
                                setUploadCallbacks={setUploadCallbacks}
                                className="form-input"
                            />
                        </Col>
                    </Row>

                    <SelectInput name="assign" label="Assign">
                        <option value="">Unassigned</option>
                        {
                            collaborators.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)
                        }
                    </SelectInput>

                    <Field name="createAnother" type="checkbox" style={{ display: "none" }}></Field>

                    <Row>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Add Issue
                        </Button>
                        <Button
                            variant="outline-primary"
                            className="mx-1"
                            disabled={isSubmitting}
                            onClick={async () => {
                                setFieldValue("createAnother", true);
                                await submitForm();
                                resetForm();
                            }}
                        >
                            Add And Create Another
                        </Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )
}

export default NewIssueForm;