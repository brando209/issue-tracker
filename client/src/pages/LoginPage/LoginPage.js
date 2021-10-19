import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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

    if(auth.isLoading) return <div>Loading...</div>;
    if(auth.user) return <Redirect to={fromState ? fromState.pathname : "/"} />;
    
    return (
        <Container fluid className="page">
            <LoginForm onSubmit={login} error={auth.error} />
        </Container>
    )
}

export default LoginPage;