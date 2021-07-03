const express = require('express');
const router = express.Router();
const ListModel = require('../models/ListModel');

router.get('/', async (req, res) => {
    const theLists = await ListModel.getAllLists();
    console.log('All lists: ', theLists);
    res.render ('template', {
        locals: {
            title: 'Your To-Do List!',
            list: theLists,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/home'
        }
    })
});


module.exports = router;