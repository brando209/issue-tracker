const Table = require('./Table');

class Comments {
    constructor() {
        this.table = new Table("comments");
    }

    async addComment(projectId, issueId, userId, comment) {
        return this.table.createEntry({ body: comment, creatorId: userId, issueId });
    }

    async removeComment(projectId, issueId, commentId) {
        return this.table.removeEntrys([`issueId='${issueId}' AND id='${commentId}'`]);
    }

    async getComment(projectId, issueId, commentId) {
        const joinOptions = [{
            joinTable: "users creator",
            joinColumns: "creator.id = comments.creatorId"
        }]    
        return this.table.getEntry("comments.*, creator.userName as creator", [`comments.issueId='${issueId}' AND comments.id='${commentId}'`], joinOptions);
    }

    async editComment(projectId, issueId, commentId, commentBody, editedAt) {
        const updateObject = { body: commentBody, edited_at: editedAt }
        const result = await this.table.updateEntrys( `issueId=${issueId} AND id=${commentId}`, updateObject);
        if(result.success) {
            return this.getComment(projectId, issueId, commentId);
        }
        return result;
    }

    async getAllIssueComments(projectId, issueId) {
        const joinOptions = [{
            joinTable: "users creator",
            joinColumns: "creator.id = comments.creatorId"
        }]
        return this.table.getEntrys("comments.*, creator.userName as creator", `comments.issueId=${issueId}`, joinOptions);
    }

}

module.exports = new Comments;