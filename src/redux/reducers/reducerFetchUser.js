import {
  FETCH_USER_INIT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_EMAIL_AND_CALLBACK
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isUserLoading: false,
  isUserError: false,
  userData: {},
  emailAndCallBack: {}
};

const reducerFetchUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_INIT:
      return {
        ...state,
        isUserLoading: true,
        isUserError: false
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        isUserError: false,
        userData: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isUserLoading: false,
        isUserError: true
      };
    case SET_EMAIL_AND_CALLBACK:
      return {
        ...state,
        emailAndCallBack: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducerFetchUser;
