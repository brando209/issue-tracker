const Table = require('./Table');

class Projects {
    constructor() {
        this.table = new Table("projects");
    }

    createProject(newProject, creatorId) {
        return this.table.createEntry({ ...newProject, creatorId }, creatorId);
    }

    getSingleProject(projectId) {
        const columns = ["projects.id", "projects.name", "projects.description", "users.userName as creator"];
        const joinOptions = {
            joinTable: "users",
            joinColumns: "projects.creatorId = users.id"
        }
        return this.table.getEntry(columns, `projects.id=${projectId}`, joinOptions);
    }

    getProjectsByUserId(userId) {
        const columns = [
            "projects.id", "projects.name", "projects.description", "users.userName as creator", 
            "count(distinct pc2.collaboratorId) as totalCollaborators", "count(distinct i.id) as totalAssignedIssues"
        ];
        const joinOptions = [{
            joinTable: "users",
            joinColumns: "projects.creatorId = users.id"
        }, {
            joinTable: "project_collaborators pc1",
            joinColumns: "pc1.projectId = projects.id"
        }, {
            joinTable: "project_collaborators pc2",
            joinColumns: "pc2.projectId = projects.id"
        }, {
            joinTable: "issues i",
            joinColumns: "i.projectId = projects.id and i.assigneeId = pc1.collaboratorId"
        }];
        return this.table.getEntrys(columns, `pc1.collaboratorId=${userId}`, joinOptions, ["GROUP BY projects.id"]);
    }

    updateProject(projectId, updateObject, actorId = null) {
        return this.table.updateEntrys(`id=${projectId}`, updateObject, actorId);
    }

    removeProject(projectId, actorId = null) {
        return this.table.removeEntrys(`id=${projectId}`, actorId);
    }

}

module.exports = new Projects;