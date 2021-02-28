const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post(
    '/signup',
    passport.authenticate('signup', { session: false, failWithError: true }),
    async (req, res, next) => {
        res.json({
          message: 'Signup successful',
          user: req.user
        });
    },
    async (error, req, res, next) => {
        res.json({
          message: 'Signup failed',
          error: error.errors
        })
    }
  );

module.exports = router