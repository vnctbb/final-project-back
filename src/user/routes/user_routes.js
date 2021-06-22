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

router.post('/authenticate/admin', user_authenticate_controller.authenticateAdmin);

router.get('/check/admin', authentication.verifyJwtToken, user_authenticate_controller.isAdmin);

router.post('/find', authentication.verifyJwtToken, user_find_controller.findOneById);

router.post('/find/min', authentication.verifyJwtToken, user_find_controller.findOneMinById);

router.post('/search', authentication.verifyJwtToken,user_find_controller.search);

router.get('/profile', authentication.verifyJwtToken, user_profile_controller.userProfile);

router.post('/profile/picture', authentication.verifyJwtToken, user_profile_controller.profilePicture);

router.post('/update', authentication.verifyJwtToken, user_update_controller.updateProfile);

router.post('/set/profile/picture', authentication.verifyJwtToken, user_update_controller.setProfilPicture);

router.get('/unset/profile/picture', authentication.verifyJwtToken, user_update_controller.unsetProfilPicture);

router.get('/delete', authentication.verifyJwtToken, user_delete_controller.deleteUser);

router.post('/find/list', authentication.verifyJwtToken, security_level.get, user_find_controller.findList);

router.post('/delete/admin', authentication.verifyJwtToken, security_level.get, user_delete_controller.deleteUserAdmin);

module.exports = router;