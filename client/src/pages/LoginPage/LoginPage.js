import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/form/LoginForm';

import '../page.css';

function LoginPage(props) {
    const auth = useAuth();

    const login = (credentials) => (
        auth.login(credentials, (user) => {
            console.log("Signed in as " + user.userName + "!");
        })
    );

    const fromState = props.location.state ? props.location.state.from : null;

    if (auth.isLoading) return <div>Loading...</div>;
    if (auth.user) return <Redirect to={fromState ? fromState.pathname : "/"} />;

    return (
        <Container fluid className="page">
            <Row className="form-container">
                <Col xs={12} sm={8} md={6} lg={5}>
                    <LoginForm onSubmit={login} error={auth.error} />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;