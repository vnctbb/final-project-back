const mongoose = require('mongoose');
const multer  = require('multer')
const path = require('path');
const fs = require('fs');

const User = mongoose.model('User');

const user_service = require('../../user/service/user_service')

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null, Date.now() + "." + file.mimetype.split('/')[1])
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('file');;
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(!file){
      cb('Error: No image');
    }
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only');
    }
  }

exports.updateProfilPicture = async (req, res) => {
  
    const user = await User.findOne({_id : req._id})
    if(!user){
        return res.status(500).json({status : true, message : "User not found"})
    }

    let deleteOldPicture = false;
    if(user.profilPicture){
        deleteOldPicture = true;
    }

    // upload
    upload(req, res, (err) => {
        if(err){
          return res.status(400).json({status : true, message : err})
        } else {
          if(req.file == undefined){
            return res.status(400).json({status : true, message : "No file selected"})
          } else {
            user_service.saveProfilPicture(req._id, req.file.filename)

            if(deleteOldPicture){
            const filePath = './public/uploads/' + user.profilPicture

            fs.unlink(filePath, (err) => {
                if (err) throw err;
                console.log(filePath + ' was deleted');
            });
            }

            return res.status(200).json({status : true, message : "File upload"})
          }
        }
      });
  
}
