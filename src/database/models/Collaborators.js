const Table = require('./Table');

class Collaborators {
    constructor() {
        this.table = new Table("project_collaborators");
    }

    async addProjectCollaborator(projectId, collaboratorId, actorId = null) {
        return this.table.createEntry({ projectId, collaboratorId }, actorId);
    }

    async removeProjectCollaborator(projectId, collaboratorId, actorId = null) {
        return this.table.removeEntrys([`projectId='${projectId}' AND collaboratorId='${collaboratorId}'`], actorId);
    }

    async getSingleProjectCollaborator(projectId, collaboratorId) {     
        return this.table.getEntry("*", [`projectId='${projectId}' AND collaboratorId='${collaboratorId}'`]);
    }

    async getAllProjectCollaborators(projectId) {
        const joinOptions = {
            joinTable: "users u",
            joinColumns: "u.id = project_collaborators.collaboratorId"
        }
        return this.table.getEntrys("u.*", `projectId=${projectId}`, joinOptions);
    }

}

module.exports = new Collaborators;