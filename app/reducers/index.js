import { combineReducers } from 'redux'
import loginReducer from "./login";
import usersReducer,{userReducer} from "./users";
import categoryReducer,{categorysReducer} from "./category";
import productsReducer,{productReducer,productsCategoryReducer,PriceProductsReducer} from "./products";
import {ratingsReducer,ratingsProductReducer} from "./rating";

export default combineReducers({
  loginReducer,
  usersReducer,
  categoryReducer,
  productsReducer,
  productReducer,
  ratingsReducer,
  userReducer,
  productsCategoryReducer,
  ratingsProductReducer,
  categorysReducer,
  PriceProductsReducer
})
