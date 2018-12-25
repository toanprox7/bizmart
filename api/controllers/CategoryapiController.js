/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create:function(req,res,next){
    Categoryapi.findOrCreate({ name: req.params.all().name }, req.params.all())
.exec(async(err, user, wasCreated)=> {
  if (err) { return res.serverError(err); }

  if(wasCreated) {
console.log(wasCreated);
    return res.json(wasCreated);
  }
  else {
console.log(user);
    return res.json(user);
  }
});
  },
update:function (req,res,next) {
  Categoryapi.update({ id:req.params.all().id })
  .set(req.params.all()).exec((err,data) => {
    if(err) return next(err);
    return res.json(data);
  })


},
destroy:function (req,res,next) {
  Categoryapi.destroy(req.params.all(), function (err,data) {
    if(err) return err
return res.json(data);
  })
},
search:function (req,res,next) {
  Categoryapi.find(req.params.all(), function (err,data) {
    if(err) return res.serverError(err);
    return res.json(data)
  })
}
};

