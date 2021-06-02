'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const topicmessage_create_controller = require('../controller/topicmessage_create_controller');
const topicmessage_find_controller = require('../controller/topicmessage_find_controller');
const topicmessage_update_controller = require('../controller/topicmessage_update_controller');
const topicmessage_delete_controller = require('../controller/topicmessage_delete_controller');

// findOne, ListByTopicId, (listByOwnerId), create, update, delete, delete ADMIN

router.post('/create', topicmessage_create_controller.createTopicMessage);

router.post('/find', topicmessage_find_controller.findTopicMessage)

router.post('/list/topic', topicmessage_find_controller.listByTopicId)

router.post('/list/author', topicmessage_find_controller.listByAuthorId)

router.post('/update', topicmessage_update_controller.updateTopicMessage);

router.post('/delete', topicmessage_delete_controller.deleteTopicMessage);

router.post('/delete/admin', topicmessage_delete_controller.deleteTopicMessageAdmin);

module.exports = router;