/**
 * RatingController
 *
 * @description :: Server-side logic for managing ratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create:function (req,res,next) {
    Ratingapi.create(req.params.all(),function (err,data) {
      if(err) return res.serverError(err);
      return res.json(data)
    })
  },
  getAllRatingsById: function (req,res,next) {
    Ratingapi.find({
      where: req.params.all()
    }).populate('usersId').exec(function (err,data) {
      if(err) return res.serverError(err);
      return res.json(data)
    })
  }
};

