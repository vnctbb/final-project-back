'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const post_create_controller = require('../controller/post_create_controller');
const post_find_controller = require('../controller/post_find_controller');
const post_update_controller = require('../controller/post_update_controller');
const post_delete_controller = require('../controller/post_delete_controller.js');

router.post('/create', post_create_controller.createPost);

router.post('/find', authentication.verifyJwtToken, post_find_controller.findOneById);

router.post('/find/list', authentication.verifyJwtToken, post_find_controller.findList);

router.post('/find/list/author', authentication.verifyJwtToken, post_find_controller.findListByAuthorId);

router.post('/update', post_update_controller.updatePost);

router.post('/delete', authentication.verifyJwtToken, post_delete_controller.deletePost);

router.post('/delete/admin', authentication.verifyJwtToken, security_level.get, post_delete_controller.deletePostAdmin);

// TODO : add like and unlike routes

module.exports = router;