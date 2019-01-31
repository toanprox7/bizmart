import {ADD_DATA_USER_LOCAL} from "../actions";
import {FETCH_USER_BY_ID_SUCCESS,FETCH_ALL_USERS} from "../actions/actionTypes";
 const usersInitialState = {
  dataUserLocal:[

  ],
  dataUserLimit:[]
}
const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {

        case ADD_DATA_USER_LOCAL:
        return  {dataUserLocal: [ ...state.dataUserLocal, action.getDataUserLocal]}

        case FETCH_ALL_USERS:
        return  { ...state,dataUserLimit:action.getUserLimit}

        default:
            return state
    }
}
export default usersReducer;
export const userReducer = (state = [], action) => {
  switch (action.type) {
    // Handle fetch by Id
    case FETCH_USER_BY_ID_SUCCESS:
      return action.user;
    default:
      return state;
  }
};
