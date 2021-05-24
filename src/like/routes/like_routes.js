'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../../../config/authentication.js');

const like_create_controller = require('../controller/like_create_controller');
const like_find_controller = require('../controller/like_find_controller');
const like_delete_controller = require('../controller/like_delete_controller');

router.post('/create', like_create_controller.createLike);

router.post('/find', like_find_controller.findLike);

router.post('/list', like_find_controller.findListByPostID)

router.post('/delete', like_delete_controller.deleteLike);

module.exports = router;