'use strict';

const express = require('express');
const router = express.Router();

const user_find_controller = require('../controllers/user_find_controller.js');
const user_create_controller = require('../controllers/user_create_controller.js');
const user_authenticate_controller = require('../controllers/user_authenticate_controller.js');
const user_profile_controller = require('../controllers/user_profile_controller.js');
const authentication = require('../config/authentication.js');

router.get('/find/:email', user_find_controller.findOneByEmail);

router.get('/profile', authentication.verifyJwtToken, user_profile_controller.userProfile);

router.post('/create', user_create_controller.createUser);

router.post('/authenticate', user_authenticate_controller.authenticate);

module.exports = router;