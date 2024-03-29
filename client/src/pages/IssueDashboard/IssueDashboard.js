import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import IssueNavBar from '../../components/app/Navigation/IssueNavBar';
import IssueList from '../../components/app/IssueList/IssueList';
import IssueFilterControl from '../../components/app/IssueFilterControl/IssueFilterControl';
import IssueDetails from '../../pages/IssueDetails/IssueDetails';

import useDialogBox from '../../hooks/useDialogBox';
import useListParams from '../../hooks/useListParams';
import SelectForm from '../../components/form/SelectForm';
import InlineSearch from '../../components/form/InlineSearch';
import IssueDetailNavBar from '../../components/app/Navigation/IssueDetailNavBar';
import IssueLog from '../IssueLog/IssueLog';
import useNotificationBanner from '../../hooks/useNotificationBanner';

const initialFilterValue = {
    category: {
        bug: true, 
        feature: true,
        task: true,
        other: true
    },
    priority: {
        critical: true,
        high: true,
        regular: true,
        low: true,
        trivial: true
    },
    status: {
        unassigned: true,
        open: true,
        inprogress: true,
        resolved: true,
        closed: true
    }
}

function IssueDashboard({ issues, ...props }) {
    const auth = useAuth();
    const notificationBanner = useNotificationBanner();
    const [collaborators, ] = useResource(
        `/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    );
    const { show: showDeleteIssueDialogBox, RenderDialogBox: DeleteIssueDialogBox } = useDialogBox();
    const { show: showAssignIssueDialogBox, RenderDialogBox: AssignIssueDialogBox } = useDialogBox();
    const { show: showStartIssueDialogBox, RenderDialogBox: StartIssueDialogBox } = useDialogBox();
    const { show: showCloseIssueDialogBox, RenderDialogBox: CloseIssueDialogBox } = useDialogBox();
    const [listParams, changeListParams] = useListParams({ order: "desc", group: "category", filter: initialFilterValue, search: "" });

    const handleDeleteIssue = async ({ data }) => {
        try {
            await props.onDelete(data.projectId, data.issueId)
            notificationBanner.showNotificationWithText("Issue Successfully Deleted!");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const handleAssignIssue = async ({ data, values }) => {
        try {
            await props.onAssign(data.projectId, data.issueId, values.collaboratorId)
            notificationBanner.showNotificationWithText("Issue Successfully Assigned!");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const handleStartIssue = async ({ data }) => {
        try {
            props.onStart(await data.projectId, data.issueId)
            notificationBanner.showNotificationWithText("Issue Successfully Advanced to In-Progress!");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const handleCloseIssue = async ({ data, values }) => {
        try {
            await props.onClose(data.projectId, data.issueId, values.status)
            notificationBanner.showNotificationWithText("Issue Completed!");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }
    
    return (
        <>
            <DeleteIssueDialogBox
                heading="Delete Issue"
                submitButtonText="Delete"
                onSubmit={handleDeleteIssue}
                render={({ data }) => (
                    'Are you sure you would like to delete issue ' + data.issueId
                )}
            />
            <AssignIssueDialogBox
                heading="Assign Issue"
                submitButtonText="Assign"
                formId="project-collaborators"  
                onSubmit={handleAssignIssue}
                render={() => (
                    <SelectForm 
                        formId="project-collaborators"  
                        fieldName="collaboratorId"
                        initialValues={{ "collaboratorId": ""}} 
                        selectItems={collaborators.data} 
                        itemKey="userName"
                    />
                )}
            />
            <StartIssueDialogBox
                heading="Begin Issue"
                submitButtonText="Advance"
                onSubmit={handleStartIssue}
                render={({ data }) => 'Are you sure you would like to begin issue ' + data.issueId + '? The status of this issue will be advanced to "inprogress".'}
            />
            <CloseIssueDialogBox
                heading="Complete Issue"
                submitButtonText="Complete"
                formId="complete-status"  
                onSubmit={handleCloseIssue}
                render={() => (
                    <>
                        <div>Please select how you would like to complete this issue? </div>
                        <SelectForm 
                            formId="complete-status"  
                            fieldName="status"
                            initialValues={{ "status": ""}} 
                            selectItems={[{ status: "closed" }, { status: "resolved" }]} 
                            itemKey="status"
                        />
                    </>
                )}
            />
            <Switch>
                <Route path={props.match.path} exact render={() => (
                    <>
                        <IssueNavBar render={() => (
                            <>
                                <Button 
                                    className="stick-left" 
                                    variant="outline-secondary"
                                    onClick={() => { props.history.push('/projects') }}
                                >
                                    All Projects
                                </Button>
                                <InlineSearch 
                                    className="search-bar"
                                    onSubmit={(searchText) => { changeListParams("search", searchText) }}
                                />
                                <IssueFilterControl 
                                    className="filter-controls"
                                    filters={listParams.filter}
                                    onSelect={changeListParams}
                                />
                            </>
                        )}/>
                        <Container fluid className="page light">
                            <IssueList 
                                projectId={props.match.params.projectId} 
                                collaborators={collaborators.data}
                                issueList={issues}

                                groupBy={listParams.group}
                                orderBy={listParams.order}
                                filter={listParams.filter}
                                searchText={listParams.search}
                                searchKeys={["title", "description"]}

                                onDelete={showDeleteIssueDialogBox}
                                onAssign={showAssignIssueDialogBox}
                                onStart={showStartIssueDialogBox}
                                onClose={showCloseIssueDialogBox}
                            />
                        </Container>
                    </>
                )}/>
                <Route path={`${props.match.path}/:issueId`} exact render={(routerProps) => {
                    const issueIdx = issues.findIndex(iss => iss.id === Number(routerProps.match.params.issueId));
                    const issue = (issueIdx !== -1) ? issues[issueIdx] : null; 
                    if(!issue) return;
                    return (
                        <>
                            <IssueDetails 
                                {...routerProps} 
                                issue={issue}
                                collaborators={collaborators.data}
                                onEdit={props.onEdit}
                                onDelete={showDeleteIssueDialogBox}
                                onAssign={showAssignIssueDialogBox}
                                onStart={showStartIssueDialogBox}
                                onClose={showCloseIssueDialogBox}
                                onCreateAttachmentRequest={props.onCreateAttachmentRequest}
                                onAddAttachment={props.onAddAttachment}
                                onRemoveAttachment={props.onRemoveAttachment}
                            />
                        </>
                    )
                }} />
                <Route path={`${props.match.path}/:issueId/log`} exact render={(routerProps) => {
                    const issueIdx = issues.findIndex(iss => iss.id === Number(routerProps.match.params.issueId));
                    const issue = (issueIdx !== -1) ? issues[issueIdx] : null; 
                    const urlParts = routerProps.match.url.split('/');
                    urlParts.pop(); urlParts.pop(); // Remove last two elements( ':issueId/log' ) from url
                    if(!issue) return;
                    return (
                        <>
                            <IssueDetailNavBar title={issue.title} linkUrl={urlParts.join("/")} render={() => {
                                return (
                                    <Button 
                                        className="stick-left" 
                                        onClick={() => { props.history.goBack() }}
                                    >Back to Issue Details</Button>
                                )
                            }}/>
                            <IssueLog collaborators={collaborators.data} {...routerProps} />
                        </>
                    )
                }} />
            </Switch>
        </>
    )
}

export default IssueDashboard;