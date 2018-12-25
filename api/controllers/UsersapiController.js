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
const nodemailer = require('nodemailer');
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
      Usersapi.findOne({phone_number:req.params.all().phone_number,status:"active"}, function (err,user) {
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
      Usersapi.findOne({email:req.params.all().email,status:"active"}, function (err,user) {
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
  loginAdmin:function(req,res,next){
    if(req.params.all().phone_number){
      Usersapi.findOne({phone_number:req.params.all().phone_number,status:"active",role:"1"}, function (err,user) {
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
      Usersapi.findOne({email:req.params.all().email,status:"active",role:"1"}, function (err,user) {
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
  changePassword:function (req,res,next) {
    Usersapi.update({ email:req.params.all().email })
    .set({
      password:req.params.all().password,
    }).exec(function (err,data) {
      if(err){
        console.log(err);
        return res.json(err
        )
      }else{
        console.log(data);
        return res.json(data
          )
      }
    })
  },
  sendEmail:function (req,res,next) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: "toanpro7x@gmail.com", // generated ethereal user
          pass: "lncbhenspsdlgous" // generated ethereal password
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Hacker" <toanpro7x@gmail.com>', // sender address
      to: req.params.all().email, // list of receivers
      subject: 'Verify ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<a href="http://localhost:1337/admin/verify/${req.params.all().token}">Vào đường dẫn này để lấy lại mật khẩu</a>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.json(error)
      }else{
return res.json(data)
      }


      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
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
  },
updateStatus:function (req,res,next) {
Usersapi.update({id:req.params.all().id}).set({
status:req.params.all().status
}).exec(function (err,data) {
  if(err){
    console.log(err)
  }else{
    console.log(data);
    return res.json(data)
  }
})
},
search:function (req,res,next) {
  Usersapi.find(req.params.all(), function (err,data) {
    if(err) return res.serverError(err);
    return res.json(data)
  })
}
};

