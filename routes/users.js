const express = require('express');
const UsersModel = require('../models/Users');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/signup', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Create an account!',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/signup'
        }
    })
});

router.get('/login', async(req, res) => {
    res.render('template', {
        locals: {
            title: 'Login!',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/login'
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const response = await UsersModel.addUser(first_name, last_name, email, hash);
    console.log("The Request Body is: ", response);
    if(!!response.id) {
        res.redirect('/users/login');
    } else {
        res.status(500).send('ERROR: Please try submitting the form again.');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new UsersModel(null, null, null, email, password);
    const response = await user.login();

    if (!!response.isValid) {
        const { isValid, user_id, first_name, last_name } = response;
        req.session.is_logged_in = isValid;
        req.session.user_id = user_id;
        req.session.first_name = first_name;
        req.session.last_name = last_name;
        res.redirect('/');
    } else {
        res.sendStatus(403);
    }
});




module.exports = router;