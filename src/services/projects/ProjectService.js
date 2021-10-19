const { Projects, Collaborators } = require('../../database/models');
const IssueService = require('./IssueService');
const ProjectsLog = require('../../database/models/ProjectsLog');

class ProjectService {

    async createProject(project, userId) {
        const projectCreated = await Projects.createProject(project, userId);
        if (!projectCreated.success) throw new Error(projectCreated.message);
        await this.addCollaborator(projectCreated.id, userId);
        return this.getProjectDetails(projectCreated.id);
    }

    async getProjectDetails(projectId) {
        const projectRecord = await Projects.getSingleProject(projectId);
        if (!projectRecord.success) throw new Error("Unable to retrieve project record");
        return projectRecord.data;
    }

    async getProject(projectId) {
        const projectRecord = await this.getProjectDetails(projectId);
        const issues = await IssueService.getAllIssues(projectId);
        return { ...projectRecord, issues };
    }

    async getProjectsByUser(userId) {
        const projectRecords = await Projects.getProjectsByUserId(userId);
        if (!projectRecords.success) throw new Error("Unable to retrieve project record(s)");

        const projects = [];
        for(let i = 0; i < projectRecords.data.length; i++) {
            const issues = await IssueService.getAllIssues(projectRecords.data[i].id);
            projects.push({ ...projectRecords.data[i], issues });
        }

        return projects;
    }

    async changeProjectDetails(projectId, newDetails, actorId) {
        const projectChanged = await Projects.updateProject(projectId, newDetails, actorId);
        if (!projectChanged.success) throw new Error(projectChanged.message);
        return this.getProjectDetails(projectId);
    }

    async removeProject(projectId, actorId) {
        //Never delete this record from the database
        if(projectId === 18) throw new Error("Unable to delete this project (Issue Tracker)");

        const projectRemoved = await Projects.removeProject(projectId, actorId);
        if (!projectRemoved.success) throw new Error(projectRemoved.message);
        return projectRemoved.data;
    }

    async addCollaborator(projectId, collaboratorId, actorId) {
        const collabAdded = await Collaborators.addProjectCollaborator(projectId, collaboratorId, actorId);
        if (!collabAdded.success) throw new Error(collabAdded.message);
    }

    async removeCollaborator(projectId, collaboratorId, actorId) {
        const collabRemoved = await Collaborators.removeProjectCollaborator(projectId, collaboratorId, actorId);
        if (!collabRemoved.success) throw new Error(collabRemoved.message);
    }

    async getCollaborators(projectId) {
        const collaborators = await Collaborators.getAllProjectCollaborators(projectId);
        if (!collaborators.success) throw new Error("Unable to retrieve project collaborators");
        return collaborators.data;
    }

    async getReport(projectId) {
        const report = await ProjectsLog.getProjectLog(projectId);
        if(!report.success) throw new Error(report.message);
        return report.data;
    }

}

module.exports = new ProjectService;