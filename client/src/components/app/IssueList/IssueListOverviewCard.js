import React from 'react';
import { Card } from 'react-bootstrap';
import IssueListButtonToolbar from './IssueListButtonToolbar';

function IssueListOverviewCard({ projectId, issue, ...props }) {
    return (
        <Card style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <Card.Body style={{ flex: 5 }}>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text>
                    {issue.description}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, height: "100%", borderLeft: '1px solid black' }}>
                <Card.Title>Category</Card.Title>
                <Card.Text>
                    {issue.category}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Priority</Card.Title>
                <Card.Text>
                    {issue.priority}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Status</Card.Title>
                <Card.Text>
                    {issue.status}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Assigned</Card.Title>
                <Card.Text>
                    {issue.assignee ? issue.assignee : "None"}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 2, height: "100%", borderLeft: '1px solid black' }}>
                <IssueListButtonToolbar 
                    projectId={projectId} issue={issue} {...props}
                />
            </Card.Body>
        </Card>
    )
}

export default IssueListOverviewCard;