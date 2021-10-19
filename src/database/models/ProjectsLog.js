const Table = require('./Table');

class ProjectsLog {
    constructor() {
        this.table = new Table("projects_log");
    }

    getProjectLog(projectId) {
        return this.table.getEntrys("*", `projectId='${projectId}'`, null, ['ORDER BY createdAt']);
    }

}

module.exports = new ProjectsLog;