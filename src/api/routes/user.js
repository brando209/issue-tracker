const express = require('express');
const router = express.Router();

const UserService = require('../../services/user/UserService');
const authorization = require('../middlewares/authorization');

router.use(authorization.authorizeJWT);

router.get('/', async (req, res) => {
    try {
        const userRecord = await UserService.getAccountDetails(req.user.id);
        return res.status(200).send(userRecord);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        await UserService.deleteAccount(req.user.id);
        return res.sendStatus(200);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.patch('/', async (req, res) => {
    try {
        const updatedUser = await UserService.changeAccountDetails(req.user.id, req.body);
        return res.status(200).send(updatedUser);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.patch('/changePassword', async (req, res) => {
    try {
        await UserService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
        return res.sendStatus(200);
    } catch(err) {
        return res.status(401).send({ error: true, message: err.message });
    }
});

router.get('/login', async (req, res) => {
    try {
        const userRecord = await UserService.getAccountDetails(req.user.id);
        return res.status(200).send(userRecord);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await UserService.getAllAccountDetails();
        return res.status(200).send(users);
    } catch(err) {
        return res.status(400).send({ error: true, message: err.message });
    }
});

module.exports = router;