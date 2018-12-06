import {GET_DATA_IMAGE_LOCAL,GET_DATA_PRODUCTS_LOCAL} from "../actions";
import {FETCH_PRODUCT_BY_ID_SUCCESS,FETCH_ALL_PRODUCTS_BY_ID_CATEGORY_SUCCESS} from "../actions/actionTypes";
const productsInitialState = {
  dataImageLocal:[
  ],
  dataProductsLocal:[

  ],
  fetchPriceProducts:[

  ],
  fetchAllProductsCategoryId:[

  ],
  activePage:[]

}
const productsReducer = (state = productsInitialState, action) => {
    switch (action.type) {
        case GET_DATA_IMAGE_LOCAL:
        return{
          ...state,
          dataImageLocal: state.dataImageLocal.concat(action.getDataImageLocal)
        }

        case GET_DATA_PRODUCTS_LOCAL:
        return {dataProductsLocal: [ ...state.dataProductsLocal, action.getDataProductsLocal]}
        case "FETCH_PRICE_PRODUCTS":
        return  {
          fetchPriceProducts: [
              ...state.fetchPriceProducts,
              action.priceProducts
          ]
         };
        case "CHANGE_ACTIVE_PAGE":
        return {
          ...state,
          activePage: action.activePage
      }

        case "FETCH_ALL_PRODUCTS_BY_CATEGORY_ID":
        return  {fetchAllProductsCategoryId: [ ...state.fetchAllProductsCategoryId, action.ProductsByCategoryId]};

        default:
            return state
    }
}
export default productsReducer;
export const productReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return action.product;
    default:
      return state;
  }
};
export const PriceProductsReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case "FETCH_PRICE_PRODUCTS2":
      return action.priceProducts2;
    default:
      return state;
  }
};

export const productsCategoryReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case FETCH_ALL_PRODUCTS_BY_ID_CATEGORY_SUCCESS:
      return action.productsCategory;
    default:
      return state;
  }
};
