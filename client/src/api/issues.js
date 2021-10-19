import axios from 'axios';
import { authHeader } from './util';

async function createIssue(projectId, issueInfo, authToken) {
    try {
        const headers = authHeader(authToken)
        const issue = await axios.post(`/api/projects/${projectId}/issues`, issueInfo, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function updateIssue(projectId, issueId, update, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(`/api/projects/${projectId}/issues/${issueId}`, update, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function deleteIssue(projectId, issueId, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.delete(`/api/projects/${projectId}/issues/${issueId}`, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function assignIssue(projectId, issueId, assigneeId, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(
            `/api/projects/${projectId}/issues/${issueId}/assign`,
            { assigneeId },
            { headers }
        )
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function advanceIssue(projectId, issueId, status, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(
            `/api/projects/${projectId}/issues/${issueId}/advance`,
            { status },
            { headers }
        )
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function addComment(projectId, issueId, comment, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.post(
            `/api/projects/${projectId}/issues/${issueId}/comments`,
            { comment },
            { headers }
        )
        console.log(result);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

async function updateComment(projectId, issueId, commentId, comment, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.patch(
            `/api/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
            { comment },
            { headers }
        )
        console.log(result);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

async function deleteComment(projectId, issueId, commentId, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.delete(
            `/api/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
            { headers }
        )
        console.log(result);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

// This function returns a promise instead of waiting for it to resolve. 
// The callback is passed the current percentage of the upload
async function createAttachment(projectId, issueId, data, authToken, cb) {
    try {
        const headers = authHeader(authToken);
        let config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                cb && (typeof cb === "function") && cb(percentCompleted);
            },
            headers
        };
        return axios.post(
            `/api/projects/${projectId}/issues/${issueId}/attachments`,
            data,
            config
        )
    } catch(err) {
        console.log(err);

    }
}

async function getAttachment(projectId, issueId, attachmentId, authToken) {
    try {
        const headers = authHeader(authToken);
        return axios.get(
            `/api/projects/${projectId}/issues/${issueId}/attachments/${attachmentId}`,
            { headers }            
        );
    } catch(err) {
        console.log(err);
    }
}

async function deleteAttachment(projectId, issueId, attachmentId, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = axios.delete(
            `/api/projects/${projectId}/issues/${issueId}/attachments/${attachmentId}`,
            { headers }
        )
        console.log(result);
        return result;
    } catch(err) {
        console.log(err);
    }
}

const issuesApi = {
    createIssue, updateIssue, deleteIssue, assignIssue, advanceIssue, 
    addComment, updateComment, deleteComment, 
    createAttachment, getAttachment, deleteAttachment
}

export default issuesApi;