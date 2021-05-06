'use strict';

const express = require('express');
const router = express.Router();

const user_find_controller = require('../controllers/user_find_controller.js')
const user_create_controller = require('../controllers/user_create_controller.js')
const user_authenticate_controller = require('../controllers/user_authenticate_controller.js')

router.get('/find/:email', user_find_controller.findOneByEmail)

router.post('/create', user_create_controller.createUser)

router.post('/authenticate', user_authenticate_controller.authenticate)

module.exports = router;