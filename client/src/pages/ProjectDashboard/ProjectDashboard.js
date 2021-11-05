import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import useResource from '../../hooks/useResource';

import ProjectsNavBar from '../../components/app/Navigation/ProjectsNavBar';
import ProjectList from '../../components/app/ProjectList/ProjectList';

import NewProjectPage from '../../pages/NewProjectPage/NewProjectPage';
import NewIssuePage from '../../pages/NewIssuePage/NewIssuePage';
import IssueDashboard from '../../pages/IssueDashboard/IssueDashboard';
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails';

import useDialogBox from '../../hooks/useDialogBox';
import SelectForm from '../../components/form/SelectForm';
import useNotificationBanner from '../../hooks/useNotificationBanner';

function ProjectDashboard({ match }) {
    const auth = useAuth();
    const projects = useProjects();
    const notificationBanner = useNotificationBanner();
    const [collaborators, ] = useResource('/api/user/all', auth.user ? auth.user.token : null);
    const { show: showDeleteProjectDialogBox, RenderDialogBox: DeleteDialogBox } = useDialogBox(); 
    const { show: showAddCollaboratorDialogBox, RenderDialogBox: AddCollaboratorDialogBox } = useDialogBox(); 

    return (
        <>
            <DeleteDialogBox
                heading="Delete Project"
                closeButtonText="Cancel"
                submitButtonText="Delete"
                onSubmit={async (project) => {
                    try {
                        await projects.handleDeleteProject(project)
                        notificationBanner.showNotificationWithText("Project Successfully Deleted!");
                    } catch(err) {
                         notificationBanner.showNotificationWithText(err.message);
                    }
                }}
                render={({ data }) => 'Are you sure you would like to delete project with id ' + data.projectId + '?'}
            />
            <AddCollaboratorDialogBox
                heading="Add Collaborator"
                submitButtonText="Add"
                formId="collaborator-select-form"
                onSubmit={async (data) => {
                    try {
                        await projects.handleAddCollaborator(data)
                        notificationBanner.showNotificationWithText("Collaborator Successfully Added to Project!");
                    } catch(err) {
                        notificationBanner.showNotificationWithText(err.message);
                    }
                }}
                render={() => ( 
                    <SelectForm 
                        formId="collaborator-select-form"
                        fieldName="collaboratorId"
                        initialValues={{ "collaboratorId": "" }}
                        selectItems={collaborators.data} 
                        itemKey="userName"
                    />
                )}
            />
            <Switch>
                <Route path={match.url} exact render={() => (
                    <>
                        <ProjectsNavBar />
                        <Container className="page light" fluid>
                            <ProjectList 
                                projectList={projects.data} 
                                onDelete={showDeleteProjectDialogBox} 
                                onEdit={projects.handleEditProject} 
                                onAddCollaborator={showAddCollaboratorDialogBox} 
                            />
                        </Container>
                    </>
                )}/>
                <Route path={`${match.url}/:projectId/issues/new`} exact render={(routerProps) => 
                    <NewIssuePage 
                        {...routerProps} 
                        onSubmit={projects.handleCreateIssue} 
                        onCreateAttachmentRequest={projects.handleIssueAttachmentRequest}
                        onAddAttachment={projects.addIssueAttachmentHandles}
                    />
                }/>
                <Route path={`${match.url}/:projectId/issues`} render={(routerProps) => {
                    const projectIdx = projects.data.findIndex(proj => proj.id === Number(routerProps.match.params.projectId));
                    const issues = (projectIdx !== -1) ? projects.data[projectIdx].issues : []; 
                    return (
                        <IssueDashboard 
                            {...routerProps} 
                            issues={issues} 
                            onDelete={projects.handleDeleteIssue} 
                            onAssign={projects.handleAssignIssue}
                            onStart={projects.handleStartIssue} 
                            onClose={projects.handleCloseIssue}
                            onEdit={projects.handleEditIssue}
                            onCreateAttachmentRequest={projects.handleIssueAttachmentRequest}
                            onAddAttachment={projects.addIssueAttachmentHandles}
                            onRemoveAttachment={projects.handleRemoveIssueAttachment}
                        />
                    )
                }}/>
                <Route path={`${match.url}/new`} exact render={(routerProps) => 
                    <NewProjectPage {...routerProps} onSubmit={projects.handleAddProject} />
                }/>
                <Route path={`${match.url}/:projectId/`} exact render={(routerProps) => {
                    const project = projects.data.find(proj => proj.id === Number(routerProps.match.params.projectId));
                    if(!project) return;
                    return <ProjectDetails project={project} {...routerProps} />
                }}/>
            </Switch>
        </>
    )
}

export default ProjectDashboard;