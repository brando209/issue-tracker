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
        const columns = ["projects.id", "projects.name", "projects.description", "users.userName as creator"];
        const joinOptions = [{
            joinTable: "users",
            joinColumns: "projects.creatorId = users.id"
        }, {
            joinTable: "project_collaborators pc",
            joinColumns: "pc.projectId = projects.id"
        }];
        return this.table.getEntrys(columns, `pc.collaboratorId=${userId}`, joinOptions);
    }

    updateProject(projectId, updateObject, actorId = null) {
        return this.table.updateEntrys(`id=${projectId}`, updateObject, actorId);
    }

    removeProject(projectId, actorId = null) {
        return this.table.removeEntrys(`id=${projectId}`, actorId);
    }

}

module.exports = new Projects;