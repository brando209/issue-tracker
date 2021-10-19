const Table = require('./Table');

class Issue { 
    constructor() {
        this.table = new Table("issues");
        this.joinOptions = [{ 
            joinTable: "projects", 
            joinColumns: `issues.projectId = projects.id`
        }, {
            joinTable: "users creator",
            joinColumns:  "creator.id = issues.creatorId"
        }, {
            joinType: "LEFT",
            joinTable: "users assignee",
            joinColumns: "assignee.id = issues.assigneeId"
        }];
        this.selection = "issues.*, creator.userName as creator, assignee.userName as assignee";
    }

    createIssue(issue, projectId, creatorId) {
        return this.table.createEntry({ ...issue, creatorId, projectId }, creatorId);
    }

    getSingleIssue(projectId, issueId) {
        return this.table.getEntry(
            this.selection, 
            `issues.id=${issueId}`,
            this.joinOptions
        );
    }

    getAllIssues(projectId) {
        return this.table.getEntrys(
            this.selection,
            `issues.projectId=${projectId}`,
            this.joinOptions
        );
    }

    updateIssue(projectId, issueId, updateObject, actorId = null) {
        const result = this.table.updateEntrys( `id=${issueId}`, updateObject, actorId)
        if(result.success) {
            return this.table.getEntry("*", `id=${issueId}`);
        }
        return result;
    }

    removeIssue(projectId, issueId, actorId = null) {
        return this.table.removeEntrys(`id=${issueId}`, actorId);
    }

}

module.exports = new Issue;