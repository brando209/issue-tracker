import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
import ToggleButton from '../../components/display/Button/ToggleButton';
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
    const [issueView, setIssueView] = useState('1');

    const handleSelectIssueView = (view) => {
        setIssueView(view);
    }

    const handleDeleteIssue = async ({ data }) => {
        await props.onDelete(data.projectId, data.issueId);
        notificationBanner.showNotificationWithText("Issue Successfully Deleted!");
    }

    const handleAssignIssue = async ({ data, values }) => {
        await props.onAssign(data.projectId, data.issueId, values.collaboratorId);
        notificationBanner.showNotificationWithText("Issue Successfully Assigned!")
    }

    const handleStartIssue = async ({ data }) => {
        await props.onStart(data.projectId, data.issueId);
        notificationBanner.showNotificationWithText("Issue Successfully Advanced to In-Progress!");
    }

    const handleCloseIssue = async ({ data, values }) => {
        await props.onClose(data.projectId, data.issueId, values.status);
        notificationBanner.showNotificationWithText("Issue Completed!");
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
                                    variant="outline-primary"
                                    onClick={() => { props.history.push('/projects') }}
                                >
                                    Back to Projects
                                </Button>
                                <div>View style:</div>
                                <ToggleButton 
                                    radioValue={issueView} 
                                    radios={[
                                        { name: 'List', value: '1' },
                                        { name: 'Table', value: '2' }
                                    ]}
                                    onSelect={handleSelectIssueView}
                                />
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
                        <IssueList 
                            projectId={props.match.params.projectId} 
                            collaborators={collaborators.data}
                            issueList={issues}
                            viewAs={issueView}

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