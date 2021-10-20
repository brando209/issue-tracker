import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import SignupForm from '../../components/form/SignupForm';
import useAuth from '../../hooks/useAuth';

import '../page.css';

function SignupPage() {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false); 

    const signup = async (userInfo) => {
        await auth.signup(userInfo, (data) => {
            console.log(data)
        });
        setRedirect(true);
    }

    return (
        auth.isLoading ? 
            <div>Loading...</div> :
            (auth.user || redirect) ?
                <Redirect to="/" /> :
                <Container fluid className="page">
                    <Row className="form-container">
                        <Col  xs={12} sm={10} md={8} xl={6}>
                            <SignupForm onSubmit={signup} />
                        </Col>
                    </Row>
                </Container>
    )
}

export default SignupPage;