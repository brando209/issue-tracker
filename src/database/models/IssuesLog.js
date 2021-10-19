const Table = require('./Table');

class IssuesLog {
    constructor() {
        this.table = new Table("issues_log");
    }

    getIssueLog(projectId, issueId) {
        return this.table.getEntrys("*", `issueId=${issueId}`);
    }

}

module.exports = new IssuesLog;