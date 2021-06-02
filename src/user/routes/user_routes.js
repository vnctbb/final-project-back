'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const user_create_controller = require('../controller/user_create_controller.js');
const user_authenticate_controller = require('../controller/user_authenticate_controller.js');
const user_find_controller = require('../controller/user_find_controller.js');
const user_profile_controller = require('../controller/user_profile_controller.js');
const user_update_controller = require('../controller/user_update_controller.js');
const user_delete_controller = require('../controller/user_delete_controller.js');

router.post('/create', user_create_controller.createUser);

router.post('/create/admin', authentication.verifyJwtToken, security_level.get, user_create_controller.createAdmin);

router.post('/authenticate', user_authenticate_controller.authenticate);

router.post('/find', user_find_controller.findOneById);

router.post('/find/min', user_find_controller.findOneMinById);

router.post('/find/list', user_find_controller.findList);

router.post('/find/list/min', user_find_controller.findListMin);

router.get('/profile', authentication.verifyJwtToken, user_profile_controller.userProfile);

router.post('/update', user_update_controller.updateProfile);

router.get('/delete', user_delete_controller.deleteUser);

router.post('/delete/admin', user_delete_controller.deleteUserAdmin);

module.exports = router;