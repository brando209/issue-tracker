const { Projects, Issues, Comments, Files, IssueAttachments, IssuesLog } = require('../../database/models');
const { currentDatetime } = require('../utils');

class IssueService {

    async createIssue(projectId, creatorId, issue) {
        const assignTo = issue.assigneeId;
        delete issue.assigneeId;

        let issueCreated = await Issues.createIssue(issue, projectId, creatorId);
        if (!issueCreated.success) throw new Error(issueCreated.message);
        if (assignTo && assignTo !== "") {
            console.log("This issue is being assigned on creation", issue);
            issueCreated = await this.assignIssue(projectId, issueCreated.id, assignTo, creatorId);
        }
        return this.getIssueDetails(projectId, issueCreated.id);
    }

    async getIssueDetails(projectId, issueId) {
        const issueRecord = await Issues.getSingleIssue(projectId, issueId);
        if (!issueRecord.success) throw new Error("Unable to retrieve issue details");
        const attachmentsData = await IssueAttachments.getIssueAttachments(projectId, issueId)
        if(attachmentsData.success) {
            issueRecord.data.attachmentHandles = attachmentsData.data.map(attachment => (attachment.fileId));
        } else issueRecord.data.attachmentHandles = [];
        return issueRecord.data;
    }

    async getAllIssues(projectId) {
        const issues = await Issues.getAllIssues(projectId);
        if (!issues.success) throw new Error("Unable to retrieve issue details");

        const issueIds = issues.data.map(issue => issue.id);
        const attachmentsData = await IssueAttachments.getIssueAttachments(projectId, issueIds);
        
        if(attachmentsData.success) {
            issues.data = issues.data.map(issue => {
                const attachmentHandles = attachmentsData.data
                    .filter(attachment => attachment.issueId === issue.id)
                    .map(attachment => (attachment.fileId));
                return { ...issue, attachmentHandles: attachmentHandles }
            });
        } else issues.data.attachmentHandles = [];

        return issues.data;
    }

    async updateIssueDetails(projectId, issueId, details, actorId) {
        const issueUpdated = await Issues.updateIssue(projectId, issueId, details, actorId);
        if (!issueUpdated.success) throw new Error("Unable to update issue details");
        return this.getIssueDetails(projectId, issueId);
    }

    async removeIssue(projectId, issueId, actorId) {
        const issueRemoved = await Issues.removeIssue(projectId, issueId, actorId);
        if (!issueRemoved.success) throw new Error("Unable to remove issue");
        return issueRemoved.data;
    }

    async assignIssue(projectId, issueId, assignedToId, assignedById) {
        const issueAssigned = await Issues.updateIssue(projectId, issueId, { assigneeId: assignedToId, status: "open" }, assignedById);
        if (!issueAssigned.success) throw new Error("Unable to assign issue to user");
        
        const issue = await Issues.getSingleIssue(projectId, issueId);
        return issue.data;
    }

    async advanceIssue(projectId, issueId, userId, status) {
        let issueRecord = await Issues.getSingleIssue(projectId, issueId);
        if(!issueRecord.success) throw new Error(issueRecord.message);
        
        const issue = issueRecord.data;
        if(issue.assineeId !== userId && issue.creatorId !== userId) throw new Error("User not allowed to advance issue");
        
        const issueUpdated = await Issues.updateIssue(projectId, issueId, { status: status }, userId);
        if(!issueUpdated.success) throw new Error("Unable to advance issue");

        issueRecord = await Issues.getSingleIssue(projectId, issueId);

        return issueRecord.data;
    }

    async addComment(projectId, issueId, userId, commentBody) {
        const added = await Comments.addComment(projectId, issueId, userId, commentBody);
        if(!added.success) throw new Error("Unable to add new comment");
        const comment = await Comments.getComment(projectId, issueId, added.id);
        return comment.data;
    }

    async removeComment(projectId, issueId, commentId) {
        const comment = await Comments.removeComment(projectId, issueId, commentId);
        return comment.data;
    }

    async getComment(projectId, issueId, commentId) {
        const comment = await Comments.getComment(projectId, issueId, commentId);
        return comment.data;
    }

    async editComment(projectId, issueId, commentId, userId, update) {
        let comment = await Comments.getComment(projectId, issueId, commentId);
        if(!comment.success) throw new Error("Something went wrong, cannot update comment");
        if(comment.data.creatorId !== userId) throw new Error("Cannot edit comment, not creator");

        comment = await Comments.editComment(projectId, issueId, commentId, update, currentDatetime());
        console.log("edited", comment);
        return comment.data;
    }

    async getIssueComments(projectId, issueId) {
        const comment = await Comments.getAllIssueComments(projectId, issueId);
        return comment.data;
    }

    async addAttachment(projectId, issueId, filePath, fileName) {
        const file = await Files.createFile(filePath, fileName);
        await IssueAttachments.createAttachment(projectId, issueId, file.id);
        return file
    }

    async removeAttachment(projectId, issueId, fileId) {
        const file = await Files.removeFile(fileId);
        return file;
    }

    async getAttachment(projectId, issueId, fileId) {
        const attachment = await IssueAttachments.getAttachment(projectId, issueId, fileId);
        const file = attachment.success && await Files.getSingleFile(fileId);
        return file;
    }

    async getIssueAttachmentHandles(projectId, issueId) {
        const attachments = await IssueAttachments.getIssueAttachments(projectId, issueId);
        const handles = attachments.success && attachments.data.map(attachment => attachment.fileId);
        return handles;
    }

    async editAttachment(projectId, issueId, fileId, update) {

    }

    async getReport(projectId, issueId) {
        const report = await IssuesLog.getIssueLog(projectId, issueId);
        if(!report.success) throw new Error(report.message);
        return report.data
    }
}

module.exports = new IssueService;