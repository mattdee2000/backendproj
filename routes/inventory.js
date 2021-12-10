var express = require('express');
var router = express.Router();
let passport = require('passport');

let inventoryController = require('../controller/inventory');

// Connect to our model
let Inventory = require('../models/inventory');


// helper function for guard purposes
// function requireAuth(req, res, next)
// {
    // check if the user is logged in
    // if(!req.isAuthenticated())
    // {
    //     req.session.url = req.originalUrl;
    //     return res.redirect('/users/signin');
    // }
    
    // next();
// }

/* GET list of items */
router.get('/list', inventoryController.inventoryList);
router.get('/get-item/:id', inventoryController.invetoryByID, inventoryController.getItem);

// Routers for edit
// router.get('/edit/:id', requireAuth, inventoryController.displayEditPage);
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), inventoryController.processEdit);

// Delete
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), inventoryController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, inventoryController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', passport.authenticate('jwt', { session: false }), inventoryController.processAdd);

module.exports = router;