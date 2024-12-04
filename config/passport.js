const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const { validationResult, body } = require('express-validator');

// Serialize and deserialize user for session management
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Signup Strategy
passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // Allows us to access req in the callback
        },
        async function (req, email, password, done) {
            try {
                // Perform validation
                await body('email').isEmail().withMessage('Invalid Email').run(req);
                await body('password')
                    .isLength({ min: 4 })
                    .withMessage('Password must be at least 4 characters')
                    .run(req);

                const errors = validationResult(req); // Collect validation errors
                if (!errors.isEmpty()) {
                    const messages = errors.array().map(err => err.msg);
                    return done(null, false, req.flash('error', messages));
                }

                // Check if the email already exists
                const existingUser = await User.findOne({ email: email });
                if (existingUser) {
                    return done(null, false, req.flash('error', ['Email already in use']));
                }

                // Create and save a new user
                const newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encryptPassword
                    ? newUser.encryptPassword(password)
                    : password; // Fallback for testing (should hash in production)

                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Signin Strategy
passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async function (req, email, password, done) {
            try {
                // Perform validation
                await body('email').isEmail().withMessage('Invalid Email').run(req);
                await body('password')
                    .isLength({ min: 4 })
                    .withMessage('Password must be at least 4 characters')
                    .run(req);

                const errors = validationResult(req); // Collect validation errors
                if (!errors.isEmpty()) {
                    const messages = errors.array().map(err => err.msg);
                    return done(null, false, req.flash('error', messages));
                }

                // Check if user exists
                const existingUser = await User.findOne({ email: email });
                if (!existingUser) {
                    return done(null, false, req.flash('error', ['No user found']));
                }

                // Validate password
                if (!existingUser.validPassword(password)) {
                    return done(null, false, req.flash('error', ['Invalid password']));
                }

                // Success
                return done(null, existingUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);
