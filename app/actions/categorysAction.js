import Axios from "axios"
import {FETCH_CATEGORYS_SUCCESS} from "./actionTypes";
const apiUrl = '/categoryapi';
// Sync Action
export const fetchCategorysSuccess = (categorys) => {
  return {
    type: FETCH_CATEGORYS_SUCCESS,
    categorys
  }
};
//Async Action
export const fetchCategorys = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchCategorysSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
