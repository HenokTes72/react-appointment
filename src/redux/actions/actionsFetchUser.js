import {
  FETCH_USER_INIT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER,
  SET_EMAIL_AND_CALLBACK
} from '../constants/actionTypes';

const actionFetchUserInit = () => ({
  type: FETCH_USER_INIT
});

const actionFetchUserFailure = () => ({
  type: FETCH_USER_FAILURE
});

const actionFetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user
});

const actionFetchUser = () => ({
  type: FETCH_USER
});

const actionSetEmailAndCallback = emailAndCallback => ({
  type: SET_EMAIL_AND_CALLBACK,
  payload: emailAndCallback
});

export {
  actionFetchUserInit,
  actionFetchUserFailure,
  actionFetchUserSuccess,
  actionSetEmailAndCallback,
  actionFetchUser
};
