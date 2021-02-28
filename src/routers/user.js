const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (err, req, res, next) => {
        if (err) {
          return res.send(err)
        }
        res.json({
          message: 'Signup successful',
          user: req.user
        });
    }
  );

module.exports = router