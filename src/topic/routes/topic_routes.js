'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const topic_create_controller = require('../controller/topic_create_controller');
const topic_find_controller = require('../controller/topic_find_controller');
const topic_update_controller = require('../controller/topic_update_controller');
const topic_delete_controller = require('../controller/topic_delete_controller');

// findOne, ListAll, listByOwnerId, create, update, delete, delete ADMIN

router.post('/create', authentication.verifyJwtToken, topic_create_controller.createTopic);

router.get('/count', authentication.verifyJwtToken, topic_find_controller.count);

router.post('/find', authentication.verifyJwtToken, topic_find_controller.findOne);

router.post('/find/list', authentication.verifyJwtToken, topic_find_controller.list);

router.post('/find/list/owner', authentication.verifyJwtToken, topic_find_controller.listByOwnerId);

router.post('/update', authentication.verifyJwtToken, topic_update_controller.updateTopic);

router.post('/delete', authentication.verifyJwtToken, topic_delete_controller.deleteTopic);

router.post('/delete/admin', authentication.verifyJwtToken, security_level.get, topic_delete_controller.deleteTopicAdmin);

module.exports = router;