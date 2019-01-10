import {EDIT_DATA_PAGINATION} from '../actions';
 const loginInitialState = {
  products:[
      {
        id:"09121212"

      }
  ],
  isAuthenticate:{}
}
const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case EDIT_DATA_PAGINATION:
        return {
            ...state,
            dataPagination:[...action.getInfoPagination]
         }
        case "CHECK_AUTHENTICATE":
        return {
            ...state,
            isAuthenticate:action.authen
         }
        default:
            return state
    }
}
export default loginReducer;
