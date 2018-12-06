/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
module.exports = {
	create:function(req,res,next){
    Usersapi.create(req.params.all(), function (err,data) {
      if(err) return res.serverError(err);
      return res.json({
        message:'successfully!',
        data: data
      })
  })
  },
  createFacebookApi:function (req,res,next) {
    Usersapi.findOrCreate({ id: req.params.all().id }, req.params.all())
.exec(async(err, user, wasCreated)=> {
  if (err) { return res.serverError(err); }

  if(wasCreated) {
    sails.log('Created a new user: ' + user.username);
  }
  else {
    return console.log(user.username,"Da ton tai");
  }
});
  },
  login:function(req,res,next){
    if(req.params.all().phone_number){
      Usersapi.findOne({phone_number:req.params.all().phone_number}, function (err,user) {
        if (err) return next(err);
        if(!user){
          return res.json({
            data:"err"
          })
        }else if(user){
          if(bcrypt.compareSync(req.params.all().password, user.password)) {
            // Passwords match
            console.log("dung roi");
            return res.json({
              data:user
            })
           } else {
             console.log("sai mat khau roi");
             return res.json({
              data:"err"
            })
           }

        }
      });
    }else if(req.params.all().email){
      Usersapi.findOne({email:req.params.all().email}, function (err,user) {
        if (err) return next(err);
        if(!user){
          return res.json({
            data:"err"
          })
        }else if(user){
          if(bcrypt.compareSync(req.params.all().password, user.password)) {
            // Passwords match
            console.log("dung roi");
            return res.json({
              data:user
            })

           } else {
             console.log("sai mat khau roi");
            // Passwords don't match
            return res.json({
              data:"err"
            })
           }

        }
      });
    }
  },
  tokenUserLogin:function(req,res,next){
    if(localStorage.getItem("tokenData")){
      return res.send(localStorage.getItem("tokenData"));
    }else{
      return res.send("");
    }

  },
  updateInfo:function (req,res,next) {
    Usersapi.update({ id:req.params.all().id })
    .set({
      email:req.params.all().email,
      username:req.params.all().username,
      phone_number:req.params.all().phone_number
    }).exec(function (err,data) {
      if(err){
        console.log(err)
      }else{
        console.log(data);
      }
    })
  }
};

