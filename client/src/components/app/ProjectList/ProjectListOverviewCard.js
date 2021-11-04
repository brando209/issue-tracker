import React from 'react';
import { Card, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import LinkButton from '../../display/Button/LinkButton';

function ProjectListOverviewCard({ project, onDelete, onAddCollaborator }) {
    return (
        <Card className="project-list-card">
            <Card.Body className="left-side">
                <Row>
                    <Col className="my-1" xs={12} sm={6} xl={6}>
                        <Card.Title>{project.name}</Card.Title>
                    </Col>
                    <Col className="my-1" sm={6} xl={6}>
                        <LinkButton size="sm" className="" to={`/projects/${project.id}`}>Details</LinkButton>
                        <Button size="sm" className="m-1" onClick={() => onDelete({ projectId: project.id })}>Delete</Button>
                    </Col>
                    <Col className="my-1" xs={12} xl={12}>
                        <Card.Text>
                            {project.description}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>

            <Card.Body className="right-side">
                <Row>                    
                    <Col xs={12} xl={3} className="content-group">
                        <Card.Title className="content-group-title">Collaborators</Card.Title>
                        <ButtonGroup className="buttons mx-2">
                            <LinkButton size="sm">View</LinkButton>
                            <Button variant="primary" size="sm" onClick={() => onAddCollaborator({projectId: project.id})}>Add</Button>
                        </ButtonGroup>
                        <Card.Text>
                            {"There are " + project.totalCollaborators + " collaborators"}
                        </Card.Text>
                    </Col>

                    <Col sm={12} xl={4}  className="content-group">
                        <Card.Title className="content-group-title">Your Issues</Card.Title>
                        <LinkButton className="mx-2" size="sm">View My Issues</LinkButton>
                        <Card.Text>
                            {"You have " + project.totalAssignedIssues + " issues assigned to you"}
                        </Card.Text>
                    </Col>

                    <Col sm={12} xl={5}  className="content-group">
                        <Card.Title className="content-group-title">All Issues</Card.Title>
                        <ButtonGroup className="buttons mx-2">
                            <LinkButton variant="outline-primary" to={`/projects/${project.id}/issues`} size="sm">View Issues</LinkButton>
                            <LinkButton variant="primary" to={`/projects/${project.id}/issues/new`} size="sm">Create Issue</LinkButton>
                        </ButtonGroup>
                        <Card.Text>
                            {"There are " + project.issues.length + " issues related to this project"}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ProjectListOverviewCard;