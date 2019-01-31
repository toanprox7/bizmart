import Axios from 'axios';
import {tokenAuthorization} from "app/utils"
import {FETCH_USER_BY_ID_SUCCESS,FETCH_ALL_USERS} from "./actionTypes";
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
    return Axios.get(apiUrl + '/' +userId,{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(response => {
        // Handle data with sync action
        dispatch(fetchUserByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchUserSuccess = (getUserLimit) => {
  return {
    type: FETCH_ALL_USERS,
    getUserLimit
  }
};
// Async Action
export const fetchAllUser = (infoData) => {
  return (dispatch) => {
    return Axios.post(`${apiUrl}/find`,infoData,{
      headers: {
        'authorization':tokenAuthorization,
      }
    })
      .then(response => {
        // Handle data with sync action
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};
