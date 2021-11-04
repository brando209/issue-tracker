import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import NewProjectForm from '../../components/form/NewProjectForm';
import useNotificationBanner from '../../hooks/useNotificationBanner';

function NewProjectPage(props) {
    const auth = useAuth();
    const notificationBanner = useNotificationBanner();
    const [redirect, setRedirect] = useState(false);

    const createNewProject = async (newProject) => {
        try {
            await props.onSubmit(newProject);
            notificationBanner.showNotificationWithText("Project successfully created!");
            setRedirect(true);
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    return (
        redirect === true ?
            <Redirect to="/projects" /> :
            <Container fluid className="page">
                <Row className="form-container">
                    <Col xs={12} sm={8} md={5} xl={4}>
                        <NewProjectForm onSubmit={createNewProject} />
                    </Col>
                </Row>
            </Container>
    )
}

export default NewProjectPage;