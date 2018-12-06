/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {
    username:{
      type:"string",
      required:true
    },
    password:{
      type:"string",
      required:false,
      // encrypt:true
    },
  phone_number:{
    type:"string",
    required:false
  },
  email:{
    type:"string",
    email:false
  },
  role:{
    type:"string",
    required:true
  },
  status:{
    type:"string",
    required:true
  },
  image:{
    type:"string",
    required:false
  }
  }
};

