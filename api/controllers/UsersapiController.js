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
var https = require('https');
var fs = require('fs');
module.exports = {
  register: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.findOne({phone_number:req.params.all().phone_number}, function (err, phone) {
      if (err) return res.serverError(err);
      else if(phone){
        return res.json("duplicatePhone")
      }else if(!phone){
        Usersapi.findOne({email:req.params.all().email}, function (err,email){
          if (err) return res.serverError(err);
          else if(email){
            return res.json("duplicateEmail");
          }else if(!email){
            Usersapi.create(req.params.all()).then(data => {
              return res.json("success")
            }).catch(err => {
              return res.serverError(err);
            })
          }
        })
      }
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
  createFacebookApi: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    // console.log(req.headers);
    // console.log(sails.config.appPath,"test");
    var file = fs.createWriteStream(`${sails.config.appPath}/assets/images/upload/${req.params.all().id}.jpg`);
    var request = https.get(req.params.all().image, function (response) {
      response.pipe(file);
    });
    var infoApiUserFacebook = {
      username: req.params.all().username,
      image: `/images/upload/${req.params.all().id}.jpg`,
      email: req.params.all().email,
      facebookId:req.params.all().id,
      status: "active",
      role: "1"
    }
    // console.log(request);
    Usersapi.findOne({facebookId:req.params.all().id}).then(user => {
      if(user){
        Usersapi.findOne({status:"active"}).then(data => {
          if(data){
            return res.json(data);
          }else{
            return res.json("block");
          }
        }).catch(err => console.log(err))
      }else{
        Usersapi.findOne({email:req.params.all().email}).then(email => {
          if(email){
            return res.json("exits");
          }else{
            Usersapi.create(infoApiUserFacebook).then(async (Created) => {
              await request;
              await Facebook.create({id:req.params.all().id,username:infoApiUserFacebook.username,email:infoApiUserFacebook.email,image:infoApiUserFacebook.image}).then(data => {
                return res.json(Created)
              }).catch(err => console.log(err))
            }).catch(err => console.log(err))
          }
        })
       
      }
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
  createGoogleApi: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    // console.log(sails.config.appPath,"test");
    var file = fs.createWriteStream(`${sails.config.appPath}/assets/images/upload/${req.params.all().id}.jpg`);
    var request = https.get(req.params.all().image, function (response) {
      response.pipe(file);
    });
    var infoApiUserGoogle = {
      username: req.params.all().username,
      image: `/images/upload/${req.params.all().id}.jpg`,
      email: req.params.all().email,
      status: "active",
      role: "1"
    }
    // console.log(request);
    Usersapi.findOne({googleId:req.params.all().id}).then(user => {
      if(user){
        Usersapi.findOne({status:"active"}).then(data => {
          if(data){
            return res.json(data);
          }else{
            return res.json("block");
          }
        }).catch(err => console.log(err))
      }else{
        Usersapi.findOne({email:infoApiUserGoogle.email}).then(email => {
          if(email){
            return res.json("exits");
          }else{
            Usersapi.create(infoApiUserGoogle).then(async (Created) => {
              await request;
              await Facebook.create({id:req.params.all().id,username:infoApiUserGoogle.username,email:infoApiUserGoogle.email,image:infoApiUserGoogle.image}).then(data => {
                return res.json(Created)
              }).catch(err => console.log(err))
            }).catch(err => console.log(err))
          }
        }).catch(err => console.log(err));
        
      }
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
  login: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if(authenToken){
      var decoded = jwt.verify(authenToken, 'toanpro');
      if(decoded.admin === "bizmart"){
        if (req.params.all().phone_number) {
          Usersapi.findOne({
            phone_number: req.params.all().phone_number,
            status: "active"
          }, function (err, user) {
            if (err) return next(err);
            if (!user) {
              return res.json({
                data: "err"
              })
            } else if (user) {
              if(!user.password || typeof user.password === "undefined"){
                return res.json({
                  data: "err"
                })
              }else{
                if (bcrypt.compareSync(req.params.all().password, user.password)) {
                  // Passwords match
                  // console.log("dung roi");
                  return res.json({
                    data: user
                  })
                } else {
                  // console.log("sai mat khau roi");
                  return res.json({
                    data: "err"
                  })
                }
              }
              
    
            }
          });
        } else if (req.params.all().email) {
          Usersapi.findOne({
            email: req.params.all().email,
            status: "active"
          }, function (err, user) {
            if (err) return next(err);
            if (!user) {
              return res.json({
                data: "err"
              })
            } else if (user) {
              if(!user.password || typeof user.password === "undefined"){
                return res.json({
                  data: "err"
                })
              }else{
                if (bcrypt.compareSync(req.params.all().password, user.password)) {
                  // Passwords match
                  // console.log("dung roi");
                  return res.json({
                    data: user
                  })
      
                } else {
                  // console.log("sai mat khau roi");
                  // Passwords don't match
                  return res.json({
                    data: "err"
                  })
                }
              }
            }
          });
        }
        
      }else{
        res.json({
          message: "error 404"
        })
      }
    }else{
      res.json({
        message:"error 404"
      })
    }
   
  },
  loginAdmin: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    if (req.params.all().phone_number) {
      Usersapi.findOne({
        phone_number: req.params.all().phone_number,
        status: "active",
        role: "2"
      }, function (err, user) {
        if (err) return next(err);
        if (!user) {
          return res.json({
            data: "err"
          })
        } else if (user) {
          if(!user.password || typeof user.password === "undefined"){
            return res.json({
              data: "err"
            })
          }else{
            if (bcrypt.compareSync(req.params.all().password, user.password)) {
              // Passwords match
              // console.log("dung roi");
              return res.json({
                data: user
              })
            } else {
              // console.log("sai mat khau roi");
              return res.json({
                data: "err"
              })
            }
          }
          

        }
      });
    } else if (req.params.all().email) {
      Usersapi.findOne({
        email: req.params.all().email,
        status: "active",
        role: "2"
      }, function (err, user) {
        if (err) return next(err);
        if (!user) {
          return res.json({
            data: "err"
          })
        } else if (user) {
          if(!user.password || typeof user.password === "undefined"){
            return res.json({
              data: "err"
            })
          }else{
            if (bcrypt.compareSync(req.params.all().password, user.password)) {
              // Passwords match
              // console.log("dung roi");
              return res.json({
                data: user
              })
  
            } else {
              // console.log("sai mat khau roi");
              // Passwords don't match
              return res.json({
                data: "err"
              })
            }
          }
        }
      });
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
  },
  changePassword: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.update({
      email: req.params.all().email
    })
    .set({
      password: req.params.all().password,
    }).exec(function (err, data) {
      if (err) {
        // console.log(err);
        return res.json(err)
      } else {
        // console.log(data);
        return res.json(data)
      }
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
  changePasswordAside: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.update({
      id: req.params.all().id
    })
    .set({
      password: req.params.all().password,
    }).exec(function (err, data) {
      if (err) {
        console.log(err);
        return res.json(err)
      } else {
        console.log(data);
        return res.json(data)
      }
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
  sendEmail: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
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
      } else {
        return res.json(data)
      }


      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
  tokenUserLogin: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    if (localStorage.getItem("tokenData")) {
      return res.send(localStorage.getItem("tokenData"));
    } else {
      return res.send("");
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

  },
  updateInfo: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.update({
      id: req.params.all().id
    })
    .set({
      email: req.params.all().email,
      username: req.params.all().username,
      phone_number: req.params.all().phone_number
    }).exec(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data);
        return res.json(data);
      }
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
  updateStatus: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.update({
      id: req.params.all().id
    }).set({
      status: req.params.all().status
    }).exec(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        // console.log(data);
        if (data[0].status == "block") {
          Productsapi.update({
            usersId: req.params.all().id
          }).set({
            status: "block"
          }).exec(function (err, data) {
            if (err) {
              console.log(err)
            } else {
              console.log(data);
              // return res.json(data)
            }
          })
        } else {
          Productsapi.update({
            usersId: req.params.all().id
          }).set({
            status: "active"
          }).exec(function (err, data) {
            if (err) {
              console.log(err)
            } else {
              console.log(data);
              // return res.json(data)
            }
          })
        }
        return res.json(data)
      }
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
  search: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Usersapi.find(req.params.all(), function (err, data) {
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
  accessOldPassword: function (req, res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Usersapi.findOne({
      id: req.params.all().id
    }, function (err, user) {
      if (err) return next(err);
      if (!user) {
        return res.json({
          data: "err"
        })
      } else if (user) {
        if (bcrypt.compareSync(req.params.all().oldPassword, user.password)) {
          // Passwords match
          // console.log("dung roi");
          return res.json("verifyAside");
        } else {
          // console.log("sai mat khau roi");
          return res.json("err")
        }

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
  find: function (req,res) {
    
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Usersapi.find(req.params.all()).then(data => {
          return res.json(data)
        }).catch(err => console.log(err))
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
  getUserId:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Usersapi.findOne({id:req.param('id')}).then(data => {
          return res.json(data)
        }).catch(err => console.log(err))
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
  getOneUserById:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Usersapi.findOne({phone_number:req.params.all().phone_number}).then(data => {
          if(data){
            return res.json(data)
          }else if(!data){
            return res.json("empty")
          }
          
        }).catch(err => res.json("err"))
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
