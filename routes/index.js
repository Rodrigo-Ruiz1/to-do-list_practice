const express = require('express');
const router = express.Router();
const ListModel = require('../models/ListModel');

router.get('/', async (req, res) => {
    let user_list;
    !!req.session.user_list
    ? (user_list = await ListModel.getAll(req.session.user.id))
    : (user_list = []);

    const theLists = await ListModel.getAllLists();
    console.log('All lists: ', theLists);
    res.render ('template', {
        locals: {
            title: 'Your To-Do List!',
            user_list,
            list: theLists,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/home'
        }
    })
});


module.exports = router;