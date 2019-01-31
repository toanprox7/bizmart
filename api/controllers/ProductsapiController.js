/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require("jsonwebtoken");
module.exports = {
  create:function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.create(req.params.all(), function (err,data) {
      if(err) return res.serverError(err);
      return res.json({
        message:'successfully!',
        data: data
      })
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
  getAllProductsById: function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.find({
      where: req.params.all()
    }, function (err,data) {
      if(err) return res.serverError(err);
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
  updateRatingProducts: function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.update({id:req.params.all().id})
    .set({
      total_star:req.params.all().total_star
    }).exec(function (err,data) {
      if(err){
        console.log(err)
      }else{
        console.log(data);
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
  findProducts:function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.find(req.params.all(), function (err,data) {
      if(err) return res.serverError(err);
      return res.json({
        message:'successfully!',
        data: data
      })
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
  search:function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.find(req.params.all()).populate('usersId').populate('categoryId').exec(function (err,data) {
      if(err) return res.serverError(err);
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
  destroy:function (req,res,next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Ratingapi.find({productsId:req.params.all().id},function (err,hasRating) {
      if(err) {console.log(err,"Err 1");}
      else if(!hasRating || hasRating.length == 0){
        Productsapi.destroy(req.params.all(), function (err,data) {
          if(err) return err
      return res.json(data);
        })
      }else if(hasRating && hasRating.length !=0){
        Ratingapi.destroy({productsId:req.params.all().id}, function (err,data) {
          if(err){console.log(err)}else{
            Productsapi.destroy(req.params.all(), function (err,data) {
              if(err) return err
          return res.json(data);
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
  updateData:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.update({id:req.params.all().id}).set(req.params.all()).exec(function (err,data) {
      if(err){
        console.log(err)
      }else{
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
  find: function (req,res) {
    
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Productsapi.find(req.params.all()).populate(["usersId","categoryId","ratingId"]).then(data => {
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
  getProductId:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Productsapi.findOne({id:req.param('productId')}).populate(["usersId","categoryId","ratingId"]).then(data => {
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
  findOneProduct:function (req,res) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Productsapi.findOne(req.params.all()).populate(["usersId","categoryId","ratingId"]).then(data => {
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

