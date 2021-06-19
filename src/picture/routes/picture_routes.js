const express = require('express')
const router = express.Router();

const authentication = require('../../../config/authentication.js');

const picture_service = require('../controller/picture_upload')

router.post('/upload/profile', authentication.verifyJwtToken, picture_service.updateProfilPicture);

/*
router.post('/picture', authentication.verifyJwtToken, function (req, res) {
  const filePath = './public/uploads/' + req.body.pictureId
  return res.sendFile(filePath , { root: "." });
});*/

module.exports = router;