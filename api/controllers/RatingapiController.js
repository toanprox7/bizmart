/**
 * RatingController
 *
 * @description :: Server-side logic for managing ratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require("jsonwebtoken");
module.exports = {
  create: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Ratingapi.create(req.params.all()).then(data => {
      return Ratingapi.findOne({
        id: data.id
      }).populateAll();
    }).then(function (data) {
      return res.json(data)
    }).catch(err => {
      console.log(err);
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
  getAllRatingsById: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Ratingapi.find({
          where: req.params.all()
        }).populate('usersId').exec(function (err, data) {
          if (err) return res.serverError(err);
          return res.json(data)
        })
      } else {
        res.json({
          message: "error 404"
        })
      }
    } else {
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
       
    Ratingapi.find(req.params.all()).populate('usersId').populate('productsId').exec(function (err, data) {
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
  destroy: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Ratingapi.destroy(req.params.all(), function (err, data) {
      if (err) return err
      return res.json(data);
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
  find: function (req,res) {
    
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Ratingapi.find(req.params.all()).populate(["usersId","productsId"]).then(data => {
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
    
  }
};
