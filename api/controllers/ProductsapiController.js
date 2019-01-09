/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create:function (req,res,next) {
    Productsapi.create(req.params.all(), function (err,data) {
      if(err) return res.serverError(err);
      return res.json({
        message:'successfully!',
        data: data
      })
    })
  },
  getAllProductsById: function (req,res,next) {
    Productsapi.find({
      where: req.params.all()
    }, function (err,data) {
      if(err) return res.serverError(err);
      return res.json(data)
    })
  },
  updateRatingProducts: function (req,res,next) {
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
  },
  findProducts:function (req,res,next) {
    Productsapi.find(req.params.all(), function (err,data) {
      if(err) return res.serverError(err);
      return res.json({
        message:'successfully!',
        data: data
      })
    })
  },
  search:function (req,res,next) {
    Productsapi.find(req.params.all()).populate('usersId').populate('categoryId').exec(function (err,data) {
      if(err) return res.serverError(err);
      return res.json(data)
    })
  },
  destroy:function (req,res,next) {
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


  },
  updateData:function (req,res) {
    Productsapi.update({id:req.params.all().id}).set(req.params.all()).exec(function (err,data) {
        if(err){
          console.log(err)
        }else{
          console.log(data);
          return res.json(data)
        }
      })
  }
};

