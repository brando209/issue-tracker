const express = require('express');
const router = express.Router();

const AuthService = require('../../services/user/AuthService');
const validation = require('../middlewares/validation');

router.post('/register', validation.register, async (req, res) => {
    const newUser = req.body;
    let userRecord;
    try {
        userRecord = await AuthService.register(newUser);
    } catch(err) {
        return res.status(400).send({ success: false, message: err.message });
    }
    if (!userRecord) return res.status(400).send({ success: false, message: "Unable to register new user."});
    return res.status(200).send({ success: true, user: userRecord });
});

router.post('/login', validation.signin, async (req, res) => {
    try {
        const { user, token } = await AuthService.login({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(200).json({ success: true, user, token });
    } catch(err) {
        return res.status(401).json({ success: false, message: err.message });
    }
});

module.exports = router;