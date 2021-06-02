'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const postcom_create_controller = require('../controller/postcom_create_controller');
const postcom_find_controller = require('../controller/postcom_find_controller');
const postcom_update_controller = require('../controller/postcom_update_controller');
const postcom_delete_controller = require('../controller/postcom_delete_controller');

router.post('/create', postcom_create_controller.createPostCom);

router.post('/find', postcom_find_controller.findOne);

router.post('/list/post', postcom_find_controller.listByPostID);

router.post('/list/author', postcom_find_controller.listByAuthorID);

router.post('/update', postcom_update_controller.updatePostCom);

router.post('/delete', postcom_delete_controller.deletePostCom);

router.post('/delete/admin', postcom_delete_controller.deletePostComAdmin);

module.exports = router;