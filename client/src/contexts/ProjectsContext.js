import React, { createContext } from 'react';

import useAuth from '../hooks/useAuth';
import useResource from '../hooks/useResource';
import issuesApi from '../api/issues';
import projectsApi from '../api/projects';

export const projectsContext = createContext({ });

export default function ProvideProjects(props) {
    const projects = useProvideProjects();

    return (
        <projectsContext.Provider value={projects}>
            {props.children}
        </projectsContext.Provider>
    );
}

function useProvideProjects() {
    const auth = useAuth();
    const [projects, setProjects] = useResource('/api/projects', auth.user ? auth.user.token : null);

    const handleDeleteProject = async ({ data }) => {
        await projectsApi.deleteProject(data.projectId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const index = projects.findIndex(elem => elem.id === data.projectId);
            projects.splice(index, 1);
            return { ...prev, data: projects };
        });
    }

    const handleAddProject = async (newProject) => {
        const project = await projectsApi.createProject(newProject, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            projects.push({ ...project.data, issues: [] }); // TODO: Modify backend to init empty array instead of here
            return { ...prev, data: projects };
        });
    }

    const handleEditProject = async (projectId, updates) => {

    }

    const handleAddCollaborator = async ({ data, values }) => {
        await projectsApi.addProjectCollaborator(data.projectId, values.collaboratorId, auth.user.token);
    }

    const handleCreateIssue = async (projectId, issueDetails) => {
        const newIssue = await issuesApi.createIssue(projectId, issueDetails, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            projects[projectIdx].issues.push(newIssue);
            return { ...prev, data: projects}
        });
        return newIssue;
    }

    const handleDeleteIssue = async (projectId, issueId) => {
        await issuesApi.deleteIssue(projectId, issueId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            projects[projectIdx].issues.splice(issueIdx, 1);
            return { ...prev, data: projects }
        });
    }
    
    const handleEditIssue = async (projectId, issueId, issueUpdates) => {
        //Do not fire request if there are no changes to the issue
        if(Object.keys(issueUpdates).length === 0) return;

        const updatedIssue = await issuesApi.updateIssue(projectId, issueId, issueUpdates, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    const handleAssignIssue = async (projectId, issueId, collaboratorId) => {
        const updatedIssue = await issuesApi.assignIssue(projectId, issueId, collaboratorId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    const handleStartIssue = async (projectId, issueId) => {
        const updatedIssue = await issuesApi.advanceIssue(projectId, issueId, "inprogress", auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    } 

    const handleCloseIssue = async (projectId, issueId, status) => {
        const updatedIssue = await issuesApi.advanceIssue(projectId, issueId, status, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    const handleIssueAttachmentRequest = async (projectId, issueId, data, cb) => {
        console.log("in context")
        return issuesApi.createAttachment(projectId, issueId, data, auth.user.token, cb);
    }

    const addIssueAttachmentHandles = (projectId, issueId, attachmentHandles) => {
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id === Number(projectId));
            const issueIdx = projects[projectIdx] 
                && projects[projectIdx].issues 
                && projects[projectIdx].issues.length > 0 
                && projects[projectIdx].issues.findIndex(issue => issue.id === Number(issueId));
            const currHandles = projects[projectIdx].issues[issueIdx].attachmentHandles || [];
            projects[projectIdx].issues[issueIdx].attachmentHandles = currHandles.concat(attachmentHandles);
            return { ...prev, data: projects }
        });
    }

    return {
        data: projects.data,
        handleDeleteProject,
        handleEditProject,
        handleAddProject,
        handleAddCollaborator,
        handleDeleteIssue,
        handleEditIssue,
        handleCreateIssue,
        handleAssignIssue,
        handleStartIssue,
        handleCloseIssue,
        handleIssueAttachmentRequest,
        addIssueAttachmentHandles
    }
}