import {EDIT_DATA_PAGINATION} from '../actions';
 const loginInitialState = {
  products:[
      {
        id:"09121212"

      }
  ],
  dataPagination:"test"
}
const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case EDIT_DATA_PAGINATION:
        return {
            ...state,
            dataPagination:[...action.getInfoPagination]
         }
        default:
            return state
    }
}
export default loginReducer;
