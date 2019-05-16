import { call, put } from 'redux-saga/effects';
import { doAddAppointments } from '../actions/appointment';
import fetchAppointments from '../api/appointment';

function* handleFetchAppointments(action) {
  const { query } = action;
  const result = yield call(fetchAppointments, query);
  yield put(doAddAppointments(result.horarios));
}

export default handleFetchAppointments;
