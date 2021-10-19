const Table = require('./Table');

class IssueAttachments {
    constructor() {
        this.table = new Table("issue_attachments");
    }

    createAttachment(projectId, issueId, fileId) {
        return this.table.createEntry({ issueId, fileId });
    }

    getAttachment(projectId, issueId, fileId) {
        return this.table.getEntry("*", `issueId=${issueId} AND fileId=${fileId}`);
    }

    getIssueAttachments(projectId, issueIds) {
        if(Array.isArray(issueIds)) {
            return this.table.getEntrys("*", `issueId IN (${issueIds})`);
        }
        return this.table.getEntrys("*", `issueId=${issueIds}`);
    }

    updateAttachment(projectId, issueId, updateObject) {

    }
    
    // removeAttachment(projectId, issueId, fileId) { 
    //     removing from the 'files' table will trigger removal from this this table('issue_attachments')
    // }
}

module.exports = new IssueAttachments;