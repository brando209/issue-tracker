import React from 'react';
import { Card, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import LinkButton from '../../display/Button/LinkButton';

function ProjectListOverviewCard({ project, onDelete, onEdit, onAddCollaborator }) {
    return (
        <Card className="project-list-card">
            <Card.Body className="left-side">
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>
                    {project.description}
                </Card.Text>
                <ButtonGroup className="buttons">
                    <LinkButton variant="primary" to={`/projects/${project.id}`} >View Project</LinkButton>
                    <DropdownButton variant="secondary" title="Settings">
                        <Dropdown.Item onClick={() => onEdit(project.id)}>Edit Project</Dropdown.Item>
                        <Dropdown.Item onClick={() => onDelete({ projectId: project.id })}>Delete Project</Dropdown.Item>
                        <Dropdown.Item onClick={() => onAddCollaborator({ projectId: project.id })}>Add Collaborator</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </Card.Body>

            <Card.Body className="right-side" style={{ borderLeft: '1px solid black' }}>
                <Card.Title>Issue Details</Card.Title>
                <Card.Text>
                    {"There are " + project.issues.length + " issues related to this project"}
                </Card.Text>
                <ButtonGroup className="buttons">
                    <LinkButton variant="primary" to={`/projects/${project.id}/issues`}>View Issues</LinkButton>
                    <LinkButton variant="secondary" to={`/projects/${project.id}/issues/new`}>Add New Issue</LinkButton>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default ProjectListOverviewCard;