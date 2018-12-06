import Axios from 'axios';
import {FETCH_USER_BY_ID_SUCCESS} from "./actionTypes";
const apiUrl = '/usersapi';
export const fetchUserByIdSuccess = (user) => {
  return {
    type: FETCH_USER_BY_ID_SUCCESS,
    user
  }
};
// Async Action
export const fetchUserById = (userId) => {
  return (dispatch) => {
    return Axios.get(apiUrl + '/' +userId)
      .then(response => {
        // Handle data with sync action
        dispatch(fetchUserByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
