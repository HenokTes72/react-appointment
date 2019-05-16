import { APPOINTMENTS_FETCH_ERROR } from '../constants/actionTypes';

const DEFAULT_MESSAGE =
  'Some SPOOKY error has occured while FETCHING appointments!';

const applyHandleError = (state, action) => action.message;

function errorReducer(state = DEFAULT_MESSAGE, action) {
  switch (action.type) {
    case APPOINTMENTS_FETCH_ERROR: {
      return applyHandleError(state, action);
    }
    default:
      return state;
  }
}

export default errorReducer;
