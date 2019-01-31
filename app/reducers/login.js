import {EDIT_DATA_PAGINATION} from '../actions';
 const loginInitialState = {
  products:[
      {
        id:"09121212"

      }
  ],
  isAuthenticate:{},
  isProcessBar:{}
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

        case "CHECK_PROCESS_BAR":
        return {
            ...state,
            isProcessBar:action.process
         }
         
        default:
            return state
    }
}
export default loginReducer;
