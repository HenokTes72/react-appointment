import {
  FETCH_EMAILS_INIT,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_FAILURE,
  SET_QUERY
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isEmailsListLoading: false,
  isEmailsListError: false,
  emails: [],
  query: ''
};

const reducerFetchEmails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EMAILS_INIT:
      return {
        ...state,
        isEmailsListLoading: true,
        isEmailsListError: false
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        isEmailsListLoading: false,
        isEmailsListError: false,
        emails: action.payload
      };
    case FETCH_EMAILS_FAILURE:
      return {
        ...state,
        isEmailsListLoading: false,
        isEmailsListError: true
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducerFetchEmails;
