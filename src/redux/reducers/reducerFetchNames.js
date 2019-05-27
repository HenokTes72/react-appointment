import {
  FETCH_NAMES_INIT,
  FETCH_NAMES_SUCCESS,
  FETCH_NAMES_FAILURE,
  SET_NAME
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isNamedUserLoading: false,
  isNamedUserError: false,
  namedUsersData: [],
  name: ''
};

const reducerFetchNames = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NAMES_INIT:
      return {
        ...state,
        isNamedUserLoading: true,
        isNamedUserError: false
      };
    case FETCH_NAMES_SUCCESS: {
      return {
        ...state,
        isNamedUserLoading: false,
        isNamedUserError: false,
        namedUsersData: action.payload
      };
    }
    case FETCH_NAMES_FAILURE:
      return {
        ...state,
        isNamedUserLoading: false,
        isNamedUserError: true
      };
    case SET_NAME: {
      return {
        ...state,
        name: action.payload
      };
    }
    default:
      return { ...state };
  }
};

export default reducerFetchNames;
