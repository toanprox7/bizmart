/**
 * Facebook.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:"integer",
      size:64,
      primaryKey: true,
      unique: true,
    },
    email:{
      type:"string",
      required:false,
      unique: true,
    },
    username:{
      type:"string",
      required:true,
    },
    image:{
      type:"string",
      required:true,   
    }
  },

};

