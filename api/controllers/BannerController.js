/**
 * BannerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require("jsonwebtoken");
module.exports = {
  create:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
   //content
   Banner.create(req.params.all()).then(data =>{
    return res.json("success");
   }).catch(err => console.log(err));
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
  update:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Banner.update({id:req.params.all().id}).set(req.params.all()).exec((err,data)=>{
              if(err){
                  console.log(err)
              }else{
                  res.json("success");
              }
          })
   //content
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
  destroy:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Banner.destroy(req.params.all()).then(data =>{
            return res.json(data);
           }).catch(err => console.log(err));
   //content
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
  list:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Banner.find(req.params.all()).then(data =>{
            return res.json(data);
           }).catch(err => console.log(err));
   //content
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
  search: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
        Banner.find(req.params.all()).exec(function (err, data) {
      if (err) return res.serverError(err);
      return res.json(data)
    })
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
  uploadImage:function (req,res) {

       req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/upload'),
        maxBytes: 10000000
       },(err,banner) => {
        if(err){
          res.status(400);
          console.log(err)
        }else{
         res.json(banner);
        }
          
      })

  },
  show:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
        Banner.findOne(req.params.all()).exec(function (err, data) {
      if (err) return res.serverError(err);
      return res.json(data)
    })
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

