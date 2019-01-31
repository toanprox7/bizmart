/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var im = require("imagemagick");
var jwt= require("jsonwebtoken");
module.exports = {
	uploadHandler:function  (req, res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    req.file('file').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/upload'),
      maxBytes:4 * 1024 * 1024
    },function (err, files) {
      if (err){
        return res.serverError(err);
      }else{
        localStorage.setItem("imgLink",JSON.stringify(files));
        return res.json({
          message: files.length + ' file(s) uploaded successfully!'+ require('path').resolve(sails.config.appPath, 'assets/images/upload'),
          files: files
        });
      }
    });
    }else{
      res.json({
        message: "error 404"
      })
    }
  }else{
    res.json({
      message: "error 404"
    })
  }
  },
  resizeImg: function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    var imgLink = localStorage.getItem("imgLink");
    if(imgLink){

      var arrayLink = JSON.parse(imgLink);
      // console.log(imgLink);
      // console.log(__dirname);
      arrayLink.map((item,index) => {
        var stringPath = item.fd;
          var start= stringPath.indexOf("upload/");
          var end = stringPath.length;
          var fileNameImage = stringPath.slice(start+7, end);
        im.resize({
          srcPath: require('path').resolve(sails.config.appPath, 'assets/images/upload/'+fileNameImage),
          dstPath: require('path').resolve(sails.config.appPath, 'assets/images/upload/small/'+fileNameImage),
          width:   356
        }, function(err, stdout, stderr){
          if (err) console.log (err);
          console.log('resized kittens.jpg to fit within 256x256px');
        });
      })
    }
    }else{
      res.json({
        message: "error 404"
      })
    }
  }else{
    res.json({
      message: "error 404"
    })
  }
  }
};

