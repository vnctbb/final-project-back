'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const friend_create_controller = require('../controller/friend_create_controller');
const friend_update_controller = require('../controller/friend_update_controller');
const friend_find_controller = require('../controller/friend_find_controller');

router.post('/create', friend_create_controller.createFriend);

router.post('/update', friend_update_controller.updateFriend);

router.post('/exist', friend_find_controller.exist);

router.post('/findOne', friend_find_controller.findOneById);

router.post('/find/in', friend_find_controller.findInFriendListByUser);

router.post('/find/out', friend_find_controller.findOutFriendListByUser);

router.post('/find/accepted', friend_find_controller.findAcceptedFriendListByUser);

module.exports = router;