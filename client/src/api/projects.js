import axios from 'axios';
import { authHeader } from './util';

async function createProject(projectInfo, authToken) {
    try {
        const headers = authHeader(authToken)
        const project = await axios.post("/api/projects", projectInfo, { headers });
        return project;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function updateProject(projectId, authToken, update) {
    try {
        const headers = authHeader(authToken);
        const project = await axios.patch(`/api/projects/${projectId}`, update, { headers });
        return project;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function deleteProject(projectId, authToken) {
    try {
        const headers = authHeader(authToken);
        const project = await axios.delete(`/api/projects/${projectId}`, { headers });
        return project;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function addProjectCollaborator(projectId, collaboratorId, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.post(`/api/projects/${projectId}/collaborators`, { collaboratorId }, { headers })
        return result;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function removeProjectCollaborator(projectId, collaboratorId, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.delete(`/api/projects/${projectId}/collaborators`, { collaboratorId }, { headers })
        return result;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

const projectsApi = {
    createProject, updateProject, deleteProject, addProjectCollaborator, removeProjectCollaborator
}

export default projectsApi;