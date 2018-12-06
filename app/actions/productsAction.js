import Axios from 'axios';
import {FETCH_PRODUCT_BY_ID_SUCCESS,FETCH_ALL_PRODUCTS_BY_ID_CATEGORY_SUCCESS} from "./actionTypes";
const apiUrl = '/productsapi';
export const fetchProductByIdSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_BY_ID_SUCCESS,
    product
  }
};
// Async Action
export const fetchProductById = (productId) => {
  return (dispatch) => {
    return Axios.get(apiUrl + '/' +productId)
      .then(response => {
        // Handle data with sync action
        dispatch(fetchProductByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchAllProductsByIdCategorySuccess = (productsCategory) => {
  return {
    type: FETCH_ALL_PRODUCTS_BY_ID_CATEGORY_SUCCESS,
    productsCategory
  }
};
// Async Action
export const fetchAllProductsByCategoryId = (categoryId) => {
  return (dispatch) => {
    return Axios.post(apiUrl + '/getAllProductsById',categoryId)
      .then(response => {
        // Handle data with sync action
        dispatch(fetchAllProductsByIdCategorySuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchAllPriceProducts = (priceProducts) => {
  return {
    type: "FETCH_PRICE_PRODUCTS",
    priceProducts
  }
};
export const activePageChange = (activePage) => {
  return {
    type: "CHANGE_ACTIVE_PAGE",
    activePage
  }
};

export const fetchAllPriceProducts2 = (priceProducts2) => {
  return {
    type: "FETCH_PRICE_PRODUCTS2",
    priceProducts2
  }
};


export const fetchAllProductsByCategoryIdSuccess = (ProductsByCategoryId) => {
  return {
    type: "FETCH_ALL_PRODUCTS_BY_CATEGORY_ID",
    ProductsByCategoryId
  }
};

export const fetchAllProductsCategoryId=(idCategory) => {
  return (dispatch) => {
    // Returns a promise
    return Axios.get(`/productsapi/getAllProductsById?categoryId=${idCategory}&sort=createdAt+desc`)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchAllProductsByCategoryIdSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}
