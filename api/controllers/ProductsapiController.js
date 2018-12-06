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
  }

};

