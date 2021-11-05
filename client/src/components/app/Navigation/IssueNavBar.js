import React from 'react';
import { Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function IssueNavBar({ render }) {
    return (
        <NavBar title="Issues" bg="light" expand="lg" render={() => (
            <Nav>
                {render()}
                <LinkButton to="issues/new" variant="outline-secondary" className="m-sm-1">Add New Issue</LinkButton>
            </Nav>
        )}/>
    )
}

export default IssueNavBar;