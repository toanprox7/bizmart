/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require("jsonwebtoken");
module.exports = {
  create: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Categoryapi.findOrCreate({ name: req.params.all().name }, req.params.all())
    .exec(async (err, user, wasCreated) => {
      if (err) { return res.serverError(err); }

      if (wasCreated) {
        console.log(wasCreated);
        return res.json(wasCreated);
      }
      else {
        console.log(user);
        return res.json(user);
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
  update: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Categoryapi.update({ id: req.params.all().id })
    .set(req.params.all()).exec((err, data) => {
      if (err) return next(err);
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
  destroy: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Productsapi.find({ categoryId: req.params.all().id }, function (err, data) {
      if (err) {
        return err
      } else if (!data || data.length == 0) {
        Categoryapi.destroy(req.params.all(), function (err, categoryDestroy) {
          if (err) return err
          return res.json(categoryDestroy);
        })
      } else if (data && data.length != 0) {
        // console.log(data[0].id);
        Ratingapi.find({ productsId: data[0].id }).then((err, rating) => {
          if (err) {  Ratingapi.destroy({ productsId: data[0].id }, function (err, RatingDestroy) {
            if (err) { console.log(err,"err") } else {
              Productsapi.destroy({ categoryId: req.params.all().id }, function (err, ProductsDelete) {
                if (err) { return console.log(err,"errproducts") } else {
                  Categoryapi.destroy(req.params.all(), function (err, categoryDestroy2) {
                    if (err) return console.log(err,"err category");
                    return res.json(categoryDestroy2);
                  })
                }

              })
            }
          })
}
          else if (!rating || rating.length == 0) {
// console.log("ko co binh luan nao trong san pham nay");
            Productsapi.destroy({ id: data[0].id }, function (err, ProductsDestroy) {
              if (err) return err
              return res.json(ProductsDestroy);
            })
          } else if (rating && rating.length != 0) {
// console.log(rating);
            Ratingapi.destroy({ productsId: data[0].id }, function (err, RatingDestroy) {
              if (err) { console.log(err) } else {
                Productsapi.destroy({ categoryId: req.params.all().id }, function (err, ProductsDelete) {
                  if (err) { return err } else {
                    Categoryapi.destroy(req.params.all(), function (err, categoryDestroy2) {
                      if (err) return err
                      return res.json(categoryDestroy2);
                    })
                  }

                })
              }
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
    //   Categoryapi.destroy(req.params.all(), function (err,data) {
    //     if(err) return err
    // return res.json(data);
    //   })
  },
  search: function (req, res, next) {
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
       
    Categoryapi.find(req.params.all(), function (err, data) {
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
  getCategoryById:function (req,res) {
   
   let authenToken = req.headers['authorization'];
   if (authenToken) {
     var decoded = jwt.verify(authenToken, 'toanpro');
     if (decoded.admin === "bizmart") {
      let idCategory = req.param("id");
      Categoryapi.findOne({id:idCategory}).then(data => {
        res.json(data);
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
  ,
  find: function (req,res) {
    
    let authenToken = req.headers['authorization'];
    if (authenToken) {
      var decoded = jwt.verify(authenToken, 'toanpro');
      if (decoded.admin === "bizmart") {
        Categoryapi.find(req.params.all()).then(data => {
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

