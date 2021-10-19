import React from 'react';
import { Nav, Button } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';
import './Navigation.css';

function IssueDetailNavBar({ title, linkUrl, ...props }) {
    return (
        <NavBar title={"Issue: " + title} {...props} bg="light" sticky="top" render={() => (
            <Nav>
                {props.render && typeof props.render === "function" && props.render()}
                <LinkButton variant="outline-dark" to={linkUrl ? linkUrl + "/new" : "./new"}>Add New Issue</LinkButton>
            </Nav>
        )}/>    
    )
}




export default IssueDetailNavBar;