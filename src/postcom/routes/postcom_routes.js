'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');
const security_level = require('../../../config/security_level.js');

const postcom_create_controller = require('../controller/postcom_create_controller');
const postcom_find_controller = require('../controller/postcom_find_controller');
const postcom_update_controller = require('../controller/postcom_update_controller');
const postcom_delete_controller = require('../controller/postcom_delete_controller');

router.post('/create',  authentication.verifyJwtToken,postcom_create_controller.createPostCom);

router.post('/find',  authentication.verifyJwtToken,postcom_find_controller.findOne);

router.post('/list/post',  authentication.verifyJwtToken,postcom_find_controller.listByPostID);

router.post('/list/author',  authentication.verifyJwtToken,postcom_find_controller.listByAuthorID);

router.post('/update',  authentication.verifyJwtToken,postcom_update_controller.updatePostCom);

router.post('/delete',  authentication.verifyJwtToken,postcom_delete_controller.deletePostCom);

router.post('/author/delete',  authentication.verifyJwtToken,postcom_delete_controller.authorDeletePostCom);

router.post('/delete/admin', postcom_delete_controller.deletePostComAdmin);

module.exports = router;