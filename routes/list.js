const express = require('express');
const router = express.Router();
const ListModel = require('../models/ListModel');

router.get('/list', async (req, res) => {
    const { user_list } = req.session
    console.log({user_list})
    res.render('template', {
        locals: {
            title: 'Create your own To-Do List!',
            is_logged_in: req.session.is_logged_in,
            user_list
        },
        partials: {
            body: 'partials/list'
        }
    })
});


router.post('/create', async (req, res) => {
    const { list_content, user_list } = req.body;
    const response = await ListModel.createList(list_content, user_list);
    res.redirect('/');
});



module.exports = router;