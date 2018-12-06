import Axios from "axios"
import {FETCH_RATINGS_SUCCESS,CREATE_RATING_SUCCESS,FETCH_ALL_RATINGS_BY_ID_PRODUCT_SUCCESS} from "./actionTypes";
const apiUrl = '/ratingapi';
// Sync Action
export const fetchRatingsSuccess = (ratings) => {
  return {
    type: FETCH_RATINGS_SUCCESS,
    ratings
  }
};
//Async Action
export const fetchRatings = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get("/ratingapi?sort=createdAt+desc")
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchRatingsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createRatingSuccess = (rating) => {
  return {
    type:CREATE_RATING_SUCCESS,
    rating
  }
};

export const createRating = (rating) => {
  return (dispatch) => {
    return Axios.post(apiUrl+"/create", rating)
      .then(response => {
        // Dispatch a synchronous action
        // to handle data
        dispatch(createRatingSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const fetchAllRatingsByIdProductSuccess = (ratingsProduct) => {
  return {
    type: FETCH_ALL_RATINGS_BY_ID_PRODUCT_SUCCESS,
    ratingsProduct
  }
};
// Async Action
export const fetchAllRatingsByProductId = (ProductId) => {
  return (dispatch) => {
    return Axios.post(apiUrl+'/getAllRatingsById',ProductId)
      .then(response => {
        // Handle data with sync action
        dispatch(fetchAllRatingsByIdProductSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
