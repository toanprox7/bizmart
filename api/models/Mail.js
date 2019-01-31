/**
 * Mail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    phone:{
      type:"string",
      required:true,    }
    },
    name:{
      type:"string",
      required:true
    },
    address:{
      type:"string"
    },
    email:{
      type:"string",
      required:true
    },
    content:{
      type:"string",
      required:true
    }

};

