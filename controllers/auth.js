const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../controllers/logger');
require('dotenv').config();

// function to handle user logins
exports.userLoginController = async (req, res) => {

    // Get the user with the email and password entered 
    const user = await User.findOne({ email: req.body.email, password: req.body.password });

    // Define a secret key for signing the JWT. You should store this securely (e.g., in an environment variable).
    const JWT_SECRET = process.env.secretKey;

    //Check if the user exists or not
    if (!user) {
        // If the user is not found, return the login form with an error message.
        return res.status(401).send({
            error: "Invalid Email or Password"
        });
    } else {
        // If the user is found, generate a JWT token.
        const token = jwt.sign(
            { email: user.email, password: user.password },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // create a session for the user using his user id
        req.session.userId = user.id;
        logger.info(`user ${req.session.userId} has logged in`);
        // Optionally, you can send the token as a cookie, a response header, or a JSON response.
        // Example of sending it as a JSON response:

        // Redirect the user to tasks 
        res.redirect('/api/user/tasks');
    }
}


// function to handle user signups
exports.userSignUpController = async (req, res) => {

    // get the data from request object
    const body = req.body;

    // check if the user already exists using his/her email address
    const user = await User.findOne({ email: body.email });

    if (!user) {
        // If the user is not found, create new user 
        const result = await User.create({
            id: body.id,
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password
        })
        logger.info(result);
        return res.status('201').json({ msg: "success" })
    }
    else {
        // Send a error response if user already exists
        return res.status('409').send({ error: "User already exists!" });
    }
};

exports.getLogin = (req, res) => {
    if (req.session.userId != null) {
        res.redirect('/api/user/tasks');
    }
    logger.info('user is in login page');
    return res.render("../views/login.ejs");
}

exports.getSignUp = (req, res) => {
    logger.info('user is in signup page');
    return res.render("../views/signup.ejs");
}