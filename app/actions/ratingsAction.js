import Axios from "axios"
import {FETCH_RATINGS_SUCCESS,CREATE_RATING_SUCCESS,FETCH_ALL_RATINGS_BY_ID_PRODUCT_SUCCESS} from "./actionTypes";
import {tokenAuthorization} from "app/utils"
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
    return Axios.post("/ratingapi?sort=createdAt+desc",{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
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
    return Axios.post(apiUrl+"/create", rating,{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(response => {
        // Dispatch a synchronous action
        // to handle data
        console.log(response.data,"res data ratings")
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
    return Axios.post(apiUrl+'/getAllRatingsById',ProductId,{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(response => {
        // Handle data with sync action
        dispatch(fetchAllRatingsByIdProductSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
