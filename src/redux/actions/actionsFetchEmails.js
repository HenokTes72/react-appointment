import {
  FETCH_EMAILS_INIT,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_FAILURE,
  FETCH_EMAILS,
  SET_QUERY
} from '../constants/actionTypes';

const actionFetchEmailsInit = () => ({
  type: FETCH_EMAILS_INIT
});

const actionFetchEmailsFailure = () => ({
  type: FETCH_EMAILS_FAILURE
});

const actionFetchEmailsSuccess = emails => ({
  type: FETCH_EMAILS_SUCCESS,
  payload: emails
});

const actionFetchEmails = () => ({
  type: FETCH_EMAILS
});

const actionSetEmailQuery = query => ({
  type: SET_QUERY,
  payload: query
});

export {
  actionFetchEmailsInit,
  actionFetchEmailsFailure,
  actionFetchEmailsSuccess,
  actionSetEmailQuery,
  actionFetchEmails
};
