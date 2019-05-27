import {
  FETCH_NAMES_INIT,
  FETCH_NAMES_SUCCESS,
  FETCH_NAMES_FAILURE,
  FETCH_NAMES,
  SET_NAME
} from '../constants/actionTypes';

const actionFetchNamesInit = () => ({
  type: FETCH_NAMES_INIT
});

const actionFetchNamesFailure = () => ({
  type: FETCH_NAMES_FAILURE
});

const actionFetchNamesSuccess = names => ({
  type: FETCH_NAMES_SUCCESS,
  payload: names
});

const actionFetchNames = () => ({
  type: FETCH_NAMES
});

const actionSetName = name => ({
  type: SET_NAME,
  payload: name
});

export {
  actionFetchNamesInit,
  actionFetchNamesFailure,
  actionFetchNamesSuccess,
  actionSetName,
  actionFetchNames
};
