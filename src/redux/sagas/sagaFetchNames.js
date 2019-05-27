import { call, put, select } from 'redux-saga/effects';

import {
  actionFetchNamesInit,
  actionFetchNamesFailure,
  actionFetchNamesSuccess
} from '../actions/actionsFetchNames';
import { selectName } from '../selectors/selectorsFetchNames';
import { getUserByName } from '../../config';

function* fetchNames() {
  yield put(actionFetchNamesInit());

  try {
    const name = yield select(selectName);
    const result = yield call(getUserByName, { name });
    const data = result.data.success ? result.data.paciente : [];

    yield put(actionFetchNamesSuccess(data));
  } catch (error) {
    yield put(actionFetchNamesFailure());
  }
}

export default fetchNames;
