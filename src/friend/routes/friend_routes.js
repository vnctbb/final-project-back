'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const friend_create_controller = require('../controller/friend_create_controller');
const friend_update_controller = require('../controller/friend_update_controller');
const friend_find_controller = require('../controller/friend_find_controller');

router.post('/create', authentication.verifyJwtToken, friend_create_controller.createFriend);

router.post('/update', authentication.verifyJwtToken, friend_update_controller.updateFriend);

router.post('/answer', authentication.verifyJwtToken, friend_update_controller.answerFriend);

router.post('/exist', authentication.verifyJwtToken, friend_find_controller.exist);

router.post('/find', authentication.verifyJwtToken, friend_find_controller.findOne);

router.post('/list/in', authentication.verifyJwtToken, friend_find_controller.listInByUser);

router.post('/list/out', authentication.verifyJwtToken, friend_find_controller.listOutByUser);

router.post('/list/accepted', authentication.verifyJwtToken, friend_find_controller.listAcceptedByUser);


module.exports = router;