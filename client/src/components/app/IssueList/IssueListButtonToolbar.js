import React from 'react';
import { Button, Dropdown, DropdownButton, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import LinkButton from '../../display/Button/LinkButton';

const IssueListButtonToolbar = ({ projectId, issue, onDelete, onAssign, onStart, onClose }) => {
    const handleDeleteIssue = () => onDelete({ projectId: projectId, issueId: issue.id });
    const handleAssignIssue = () => onAssign({ projectId: projectId, issueId: issue.id });
    const handleStartIssue = () => onStart({ projectId: projectId, issueId: issue.id });
    const handleCloseIssue = () => onClose({ projectId: projectId, issueId: issue.id });
    const handleAdvanceIssueClick = (e) => {
        if(issue.status === "unassigned") return handleAssignIssue(e);
        if(issue.status === "open") return handleStartIssue(e);
        if(issue.status === "inprogress") return handleCloseIssue(e);
    }

    const advanceIssueButtonText = () => {
        if(issue.status === "unassigned") return "Assign"
        if(issue.status === "open" || issue.status === "inprogress") return "Advance"
        if(issue.status === "resolved") return "Resolved";
        return "Closed";
    }

    return (
        <ButtonToolbar style={{width: '100%'}}>
            <ButtonGroup>
                <LinkButton variant="primary" to={`/projects/${projectId}/issues/${issue.id}`}>View</LinkButton>
                <Button 
                    variant="primary" 
                    onClick={handleAdvanceIssueClick}
                    disabled={issue.status === "resolved" || issue.status === "closed"}

                >
                    {advanceIssueButtonText()}
                </Button>
                <DropdownButton as={ButtonGroup} variant="secondary" title="Settings">
                    <Dropdown.Item >Edit Issue</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteIssue}>Delete Issue</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default IssueListButtonToolbar;