/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {
    // id:{
    //   type:"integer",
    //   size:64,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   unique: true,
    //   required:true
    // },
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
    required:false,
    unique:true
  },
  email:{
    type:"string",
    email:false,
    unique:true
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
  },
  facebookId:{
    model:"facebook"
  },
  googleId:{
    model:"google"
  }
  }
};

