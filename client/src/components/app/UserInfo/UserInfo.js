import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './UserInfo.css';

export default function UserInfo(props) {
    return (
        <div className="user-info">
            <Row>
                <Col lg={6} md={6} s={4} xs={12} className="label">First Name: </Col>
                <Col lg={6} md={6} s={8} xs={12} className="user-detail">{ props.user.firstName }</Col>
            </Row>

            <Row>
                <Col lg={6} md={6} s={4} xs={12} className="label">Last Name: </Col>
                <Col lg={6} md={6} s={8} xs={12} className="user-detail">{ props.user.lastName }</Col>
            </Row>

            <Row>
                <Col lg={6} md={6} s={4} xs={12} className="label">User Name: </Col>
                <Col lg={6} md={6} s={8} xs={12} className="user-detail">{ props.user.userName }</Col>
            </Row>

            <Row>
                <Col lg={6} md={6} s={4} xs={12}className="label">Email: </Col>
                <Col lg={6} md={6} s={8} xs={12}className="user-detail">{ props.user.email }</Col>
            </Row>

        </div>
    )
}