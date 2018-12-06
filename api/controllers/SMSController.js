/**
 * SMSController
 *
 * @description :: Server-side logic for managing SMS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const puretext = require('puretext');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: 'a3256225',
  apiSecret: 'i9oW3YjvDXg8jGXt'
})



module.exports = {
  send: function(req, res) {
    // console.log(req.params.all().phone,"param all day");
    let codeCheck = Math.floor(Math.random() * 89999) + 10000;
    var token = jwt.sign({ number_phone: req.params.all().phone, code_confirm:codeCheck }, 'shhhhh',{ expiresIn: 60 * 60 });

    // console.log(localStorage.getItem('phone_number'),"data from phone number");
    jwt.verify(token, 'shhhhh', function(err, decoded) {
      let stringPhone = decoded.number_phone;
      let cutString = stringPhone.slice(1, stringPhone.length)
      // console.log("giai nen foo",decoded.foo) // bar
    //   let text = {
    //     // To Number is the number you will be sending the text to.
    //     toNumber: `+84${cutString}`,
    //     // From number is the number you will buy from your admin dashboard
    //     fromNumber: '+16095545674',
    //     // Text Content
    //     smsBody: `mã xác nhận của bạn là ${decoded.code_confirm}`,
    //     //Sign up for an account to get an API Token
    //     apiToken: '1psd09'
    // };
    localStorage.setItem("token",token);
    // console.log(localStorage.getItem("token"));
    // puretext.send(text, function (err, response) {
    //   if(err) console.log(err);
    //   else console.log(response);
    // })
    const from = 'Nexmo';
    const to = `84${cutString}`;
    const text = `ma xac nhan cua ban la ${decoded.code_confirm}`;

    nexmo.message.sendSms(from, to, text);
    });
  },
  token:function (req,res) {
    // console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")){
      return res.send(localStorage.getItem("token"));
    }else{
      return res.send("404");
    }

  }
};

