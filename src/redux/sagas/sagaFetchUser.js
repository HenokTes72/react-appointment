import { call, put, select } from 'redux-saga/effects';

import {
  actionFetchUserInit,
  actionFetchUserFailure,
  actionFetchUserSuccess
} from '../actions/actionsFetchUser';
import { selectEmailAndCallback } from '../selectors/selectorsFetchUser';
import { getUserByEmail } from '../../config';

function* fetchUser() {
  yield put(actionFetchUserInit());

  try {
    const { callback, email } = yield select(selectEmailAndCallback);
    const result = yield call(getUserByEmail, { email });
    const data = result.data.success ? result.data : {};
    if (callback) {
      const { user, paciente } = data;
      const getAttr = attr =>
        (user && user[attr]) || (paciente && paciente[attr]);
      callback({
        id: getAttr('id'),
        nombre: getAttr('first_name'),
        apellido: getAttr('last_name'),
        telefono: getAttr('telefono'),
        email
      });
    }
    yield put(actionFetchUserSuccess(data));
  } catch (error) {
    yield put(actionFetchUserFailure());
  }
}

export default fetchUser;
