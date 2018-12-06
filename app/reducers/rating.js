import {FETCH_RATINGS_SUCCESS,CREATE_RATING_SUCCESS,FETCH_ALL_RATINGS_BY_ID_PRODUCT_SUCCESS} from "../actions/actionTypes";
export const ratingsReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_RATING_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.rating)
    ];
    // Handle fetch by Id
    case FETCH_RATINGS_SUCCESS:
      return action.ratings;
    default:
      return state;
  }
};

export const ratingsProductReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case FETCH_ALL_RATINGS_BY_ID_PRODUCT_SUCCESS:
      return action.ratingsProduct;
    default:
      return state;
  }
};
