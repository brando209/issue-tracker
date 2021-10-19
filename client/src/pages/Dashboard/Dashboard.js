import React from 'react';
import { Button, Container } from 'react-bootstrap';

import LinkButton from '../../components/display/Button/LinkButton';
import './Dashboard.css';

function Dashboard() {

    return (
        <Container className="tile-container">
            <LinkButton to="/projects" className="tile">Projects&Issues</LinkButton>
            <Button className="tile">Reports (Coming Soon)</Button>
        </Container>       
    )
}

export default Dashboard;