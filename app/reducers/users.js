import {ADD_DATA_USER_LOCAL} from "../actions";
import {FETCH_USER_BY_ID_SUCCESS} from "../actions/actionTypes";
 const usersInitialState = {
  dataUserLocal:[

  ]
}
const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {

        case ADD_DATA_USER_LOCAL:
        return  {dataUserLocal: [ ...state.dataUserLocal, action.getDataUserLocal]}
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
