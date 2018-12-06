/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create:function(req,res,next){
    Categoryapi.create({
      name:"quan ao nu",
      parentId:"0"
    }).then(function (data) {
      console.log(data);
    })
    return res.ok();
  }
};

