import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
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
                    <SignupForm onSubmit={signup} />
                </Container>
    )
}

export default SignupPage;