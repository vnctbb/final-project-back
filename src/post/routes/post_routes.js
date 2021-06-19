'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const post_create_controller = require('../controller/post_create_controller');
const post_find_controller = require('../controller/post_find_controller');
const post_update_controller = require('../controller/post_update_controller');
const post_delete_controller = require('../controller/post_delete_controller.js');

router.post('/create', authentication.verifyJwtToken, post_create_controller.createPost);

router.post('/find', authentication.verifyJwtToken, post_find_controller.findOne);

router.post('/list', authentication.verifyJwtToken, post_find_controller.list);

router.post('/list/author', authentication.verifyJwtToken, post_find_controller.listByAuthorId);

router.post('/update', authentication.verifyJwtToken, post_update_controller.updatePost);

router.post('/delete', authentication.verifyJwtToken, post_delete_controller.deletePost);

router.post('/list/admin', authentication.verifyJwtToken, security_level.get, post_find_controller.listAdmin);

router.post('/delete/admin', authentication.verifyJwtToken, security_level.get, post_delete_controller.deletePostAdmin);

// TODO : add like and unlike routes

module.exports = router;