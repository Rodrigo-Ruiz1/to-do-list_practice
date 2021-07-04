const express = require('express');
const router = express.Router();
const ListModel = require('../models/ListModel');

// router.get('/list', async (req, res) => {
//     const { user_list } = req.session
//     console.log({user_list})
//     res.render('template', {
//         locals: {
//             title: 'Create your own To-Do List!',
//             is_logged_in: req.session.is_logged_in,
//             user_list
//         },
//         partials: {
//             body: 'partials/list'
//         }
//     })
// });


router.post('/add', async (req, res) => {
    const { list_content } = req.body;
    const user_list = req.session.user_id
    console.log('REQ.SESSION', req.session)
    const newList = new ListModel(null, null, list_content, user_list);
    const response = await newList.addList();
    console.log('CREATE RESPONSE IS: ', response);
    res.redirect('/');
});



module.exports = router;