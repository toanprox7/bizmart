/**
 * SMSController
 *
 * @description :: Server-side logic for managing SMS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const puretext = require('puretext');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');




module.exports = {
  send: function(req, res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
  //sasa
  let codeCheck = Math.floor(Math.random() * 89999) + 10000;
  let stringPhone=req.params.all().phone_number;
  let cutString = stringPhone.slice(1, stringPhone.length)
  let text = {
    // To Number is the number you will be sending the text to.
    toNumber: `+84${cutString}`,
    // From number is the number you will buy from your admin dashboard
    fromNumber: '+18639009389',
    // Text Content
    smsBody: `mã xác nhận của bạn là ${codeCheck}`,
    //Sign up for an account to get an API Token
    apiToken: '1psd09'
};
puretext.send(text, function (err, response) {
  if(err) res.json("err");
  else{
    return res.json(codeCheck);
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
};

