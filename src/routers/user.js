const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// register new users to database
router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send({error: e.message});
    }
})

module.exports = router