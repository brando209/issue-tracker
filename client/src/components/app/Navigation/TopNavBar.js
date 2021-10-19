import React from 'react';
import { Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';
import useAuth from '../../../hooks/useAuth';

import logo from '../../../logo.svg';

function TopNavBar(props) {
    const auth = useAuth();

    const logout = () => {
        auth.logout(() => {
            console.log("Logged out")
        })
    }
    
    return (
        <NavBar title="Issue Tracker" logo={logo} bg="dark" expand="md" render={() => (
            <Nav >
                { !auth.user ? <LinkButton className="m-sm-1" to="login">Login</LinkButton> : null }
                { !auth.user ? <LinkButton className="m-sm-1" to="signup">Signup</LinkButton> : null }
                { auth.user ? <LinkButton className="m-sm-1" to="/dashboard">Dashboard</LinkButton> : null }
                { auth.user ? <LinkButton className="m-sm-1" to="/account">Account</LinkButton> : null }
                { auth.user ? <LinkButton className="m-sm-1" onClick={logout}>Logout</LinkButton> : null }
            </Nav>
        )} />
    )
}

export default TopNavBar;