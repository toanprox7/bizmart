/**
 * Banner.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    category_banner:{
      type:"string",
      required:true
    },
    image:{
      type:"string",
      required:true
    },
    link:{
      type:"string",
      required:true
    },
    title:{
      type:"string",
      required:true
    }
  },

};

