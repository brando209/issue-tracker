import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import IssueListButtonToolbar from './IssueListButtonToolbar';

function IssueListOverviewCard({ projectId, issue, ...props }) {
    return (
        <Card className="issue-list-card-container">
            <Card.Body className="issue-list-card-body">
                <Row className="issue-list-row">
                    <Col sm={5} xl={2}>
                        <Card.Title>{issue.title}</Card.Title>
                    </Col>
                    <Col sm={7} xl={3}>
                        <Card.Text>
                            {issue.description.slice(0, 64) + " ..."}
                        </Card.Text>
                    </Col>
                    
                    <Col xs={6} sm={2} xl={1} className="py-2">
                        <Card.Subtitle>Category</Card.Subtitle>
                        <Card.Text>
                            {issue.category}
                        </Card.Text>
                    </Col>


                    <Col xs={6} sm={2} xl={1} className="py-2">
                        <Card.Subtitle>Priority</Card.Subtitle>
                        <Card.Text>
                            {issue.priority}
                        </Card.Text>
                    </Col>

                    <Col xs={6} sm={2} xl={1} className="py-2">
                        <Card.Subtitle>Status</Card.Subtitle>
                        <Card.Text>
                            {issue.status}
                        </Card.Text>
                    </Col>


                    <Col xs={6} sm={2} xl={1} className="py-2">
                        <Card.Subtitle>Assigned</Card.Subtitle>
                        <Card.Text>
                            {issue.assignee ? issue.assignee : "None"}
                        </Card.Text>
                    </Col>

                    <Col xs={12} sm={4} xl={1} className="py-2">
                        <IssueListButtonToolbar 
                            projectId={projectId} issue={issue} {...props}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default IssueListOverviewCard;