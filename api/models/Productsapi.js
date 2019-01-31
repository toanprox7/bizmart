/**
 * Products.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{
      type:"string",
      required:true
    },
    price:{
      type:"string",
      required:true
    },
    content:{
      type:"string",
      required:true
    },
    image:{
      type:"string",
      required:true
    },
    level:{
      type:"string",
      required:true
    },
    total_star:{
      type:"string",
      required:false
    },
    status:{
      type:"string",
      required:true
    },
    ratingId:{
      collection:'ratingapi',
      via: 'productsId'
    },
    usersId:{
     model:"usersapi"
    },
    categoryId:{
      model:"categoryapi"
    }

  }
};

