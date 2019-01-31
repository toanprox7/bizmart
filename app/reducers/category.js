import {GET_DATA_CATEGORY_LOCAL} from "../actions";
import {FETCH_CATEGORYS_SUCCESS} from "../actions/actionTypes";
 const categoryInitialState = {
  dataCategoryLocal:[
  ]
}
const categoryReducer = (state = categoryInitialState, action) => {
    switch (action.type) {
        case GET_DATA_CATEGORY_LOCAL:
        return  {dataCategoryLocal: [ ...state.dataCategoryLocal, action.getDataCategoryLocal]}
        default:
            return state
    }
}
export default categoryReducer;
export const categorysReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case FETCH_CATEGORYS_SUCCESS:
      return action.categorys;
        default:
      return state;
  }
};
