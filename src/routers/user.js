const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post(
    '/signup',
    passport.authenticate('signup', { session: false, failWithError: true }),
    async (req, res, next) => {
        if (req.user) {
          res.json({
            message: 'Signup successful',
            user: req.user
          });
        } else {
          next()
        }
    },
    async (error, req, res, next) => {
        res.json({
          message: 'Signup failed',
          error: error.errors
        })
    }
  );

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error(info.message);

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

              return res.json({ token });
            }
          );
        } catch (error) {
          return next();
        }
      }
    )(req, res, next);
  },
  async (error, req, res, next) => {
    res.json({
      message: 'Login failed',
      error: error.message
    })
  }
);

module.exports = router