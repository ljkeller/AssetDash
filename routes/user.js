// External
const express = require('express'),
    { check, validationResult } = require('express-validator/check/'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    router = express.Router();

// Internal
const User = require('../model/User'),
      auth = require('../middleware/auth');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
            .not().isEmpty(),
        check("email", "Please enter a valid Email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const {
            username,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: "User already exists" });

            user = new User({ username, email, password });

            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = { user: { id: user.id } };
            jwt.sign(payload, "randomString", { expiresIn: 10000 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - POST
 * @param - /login
 * @description - User login with email & password
 */
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (!user) return res.status(400).json({ message: 'User Does Not Exist' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Incorrect Password' });

            const payload = { user: { id: user.id } };
            jwt.sign(
                payload,
                'randomString',
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json(token);
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Server Error' });
        }
    }
)

/**
 * @method - get
 * @param - /me
 * @description - get logged in User
 */
router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            res.json(user);
        } 
        catch (e) { res.send({ message: 'Error in Fetching User' })}
    }
);

module.exports = router;