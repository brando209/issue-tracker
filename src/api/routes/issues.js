const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer({ dest: './uploads' });
const path = require("path")
const fs = require("fs");

const IssueService = require('../../services/projects/IssueService');
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');

router.use(authorization.authorizeJWT);

router.post('/', validation.issue, async (req, res) => {
    const projectId = res.locals.params.projectId;

    console.log(req.body);
    try {
        const issue = await IssueService.createIssue(projectId, req.user.id, req.body);
        return res.status(200).send(issue);
    } catch (err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.get('/', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const issues = await IssueService.getAllIssues(projectId);
        console.log(issues);
        return res.status(200).send(issues);
    } catch (err) {
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.get('/:issueId', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const issue = await IssueService.getIssueDetails(projectId, req.params.issueId);
        return res.status(200).send(issue);
    } catch (err) {
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.patch('/:issueId/assign', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const issue = await IssueService.assignIssue(projectId, req.params.issueId, req.body.assigneeId, req.user.id);
        return res.status(200).send(issue);
    } catch (err) {
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.patch('/:issueId/advance', async (req, res) => {
    const projectId = res.locals.params.projectId;
    console.log(req.body);
    try {
        const issue = await IssueService.advanceIssue(projectId, req.params.issueId, req.user.id, req.body.status);
        return res.status(200).send(issue);
    } catch (err) {
        console.log(err);
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.patch('/:issueId', validation.editIssue, async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        console.log("Requesting user is:", req.user.id)
        const updateIssue = await IssueService.updateIssueDetails(projectId, req.params.issueId, req.body, req.user.id);
        return res.status(200).send(updateIssue);
    } catch (err) {
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.delete('/:issueId', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        await IssueService.removeIssue(projectId, req.params.issueId, req.user.id);
        return res.sendStatus(200);
    } catch (err) {
        return res.status(404).send({ error: true, message: err.message });
    }
});

router.get('/:issueId/comments', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const comments = await IssueService.getIssueComments(projectId, req.params.issueId);
        return res.status(200).send(comments);
    } catch (err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.post('/:issueId/comments', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const comment = await IssueService.addComment(projectId, req.params.issueId, req.user.id, req.body.comment);
        return res.send(comment);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.delete('/:issueId/comments/:commentId', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const comment = await IssueService.removeComment(projectId, req.params.issueId, req.params.commentId);
        return res.send(comment);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.patch('/:issueId/comments/:commentId', async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const comment = await IssueService.editComment(
            projectId, 
            req.params.issueId, 
            req.params.commentId, 
            req.user.id,
            req.body.comment
        );
        return res.send(comment);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.get('/:issueId/attachments', async (req, res) => {
    const projectId = res.locals.params.projectId;

    try {
        const handles = await IssueService.getIssueAttachmentHandles(projectId, req.params.issueId);
        return res.send(handles);
    } catch(err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.get('/:issueId/attachments/:fileId', async (req, res) => {
    const projectId = res.locals.params.projectId;

    try {
        const file = await IssueService.getAttachment(projectId, req.params.issueId, req.params.fileId);
        const filePath = file.success && path.resolve(__dirname + "/../../../" + file.data.path);
        if(!filePath) return res.send("File does not exist");
        fs.readFile(filePath, (err, data) => {
            if(err) console.log(err);
            res.contentType('application/pdf')
                .append('Content-Filename', file.data.name)
                .append('Content-FileID', file.data.id)
                .append('Access-Control-Expose-Headers', 'Content-Filename')
                .send(`data:application/pdf;base64,${new Buffer.from(data).toString('base64')}`);
        });

    } catch(err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.post('/:issueId/attachments', storage.single('attachments'), async (req, res) => {
    const projectId = res.locals.params.projectId;
    try {
        const file = req.file && await IssueService.addAttachment(projectId, req.params.issueId, req.file.path, req.file.originalname);
        return file ? res.send(file) : res.send("No file attached");
    } catch(err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }

});

router.patch('/:issueId/attachments/:fileId', async (req, res) => {

});

router.delete('/:issueId/attachments/:fileId', async (req, res) => {
    const projectId = res.locals.params.projectId;

    try {
        const file = await IssueService.removeAttachment(projectId, req.params.issueId, req.params.fileId);
        console.log(file);
        return res.send('File attachment removed');
    } catch(err) {
        console.log(err);
        return res.status(400).send({ error: true, message: err.message });
    }

});

router.get('/:issueId/reports', async (req, res) => {
    try {
        const report = await IssueService.getReport(res.locals.params.projectId, req.params.issueId);
        return res.status(200).send(report);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

module.exports = router;