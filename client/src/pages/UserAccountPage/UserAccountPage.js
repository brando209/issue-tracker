import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { useAuth } from '../../hooks';

import UserInfo from '../../components/app/UserInfo/UserInfo';

import '../page.css';
import './UserAccountPage.css';
import { Link, Route, Switch } from 'react-router-dom';
import ChangePasswordForm from '../../components/form/ChangePasswordForm';

export default function UserAccountPage(props) {
    const auth = useAuth();

    const handlePasswordChange = async (currentPassword, newPassword) => {
        auth.changePassword(currentPassword, newPassword, async (err) => {
            if(!err) {
                await auth.logout(() => props.history.push('/dashboard'));
            } else console.log(err);
         });
        
    }

    return (
        <Switch>
            <Route path={props.match.url} exact render={() => (
                <Container fluid className="page" id="user-account">
                    <Row as="h4">Account Information</Row>
                    <Row>
                        <UserInfo user={auth.user} />
                    </Row>
                    <Row>
                        <div>To change your password, click&nbsp;</div>
                        <Link to="account/changePassword">here</Link>{"."}
                    </Row>
                </Container>
            )}/>

            <Route path={props.match.url + "/changePassword"} exact render={() => (
                <Container fluid className="page" id="change-password">
                    <div> Change Password </div>
                    <ChangePasswordForm onSubmit={handlePasswordChange} error={auth.error} />
                </Container>
            )}/>
        </Switch>
    )
};