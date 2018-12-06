/**
 * Cart.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:"number",
      required:true,
      allowNull:false,
      autoIncrement:true
    },
    name:{
      type:"string",
      required:false
    },
    price:{
      type:"string",
      require:false
    },
    name_shop:{
      type:"string",
      required:false
    },
    diem_uy_tin:{
      type:"string",
      required:false
    },
    so_san_pham:{
      type:"string",
      required:false
    },
    ngay_tham_gia:{
      type:"string",
      required:false
    },
    trang_thai:{
      type:"string",
      required:false
    },
    ten_danh_muc:{
      type:"string",
      required:false
    }
  }
};

