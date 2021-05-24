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

router.post('/create', topic_create_controller.createTopic);

router.post('/find', topic_find_controller.findTopic);

router.post('/find/list', topic_find_controller.findList);

router.post('/find/list/owner', topic_find_controller.findListByOwnerId);

router.post('/update', topic_update_controller.updateTopic);

router.post('/delete', topic_delete_controller.deleteTopic);

router.post('/delete/admin', topic_delete_controller.deleteTopicAdmin);

module.exports = router;