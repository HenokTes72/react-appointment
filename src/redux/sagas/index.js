import { takeEvery, all } from 'redux-saga/effects';
import {
  APPOINTMENTS_FETCH,
  MONTHLY_APPOINTMENTS_FETCH
} from '../constants/actionTypes';
import handleFetchAppointments from './appointment';
import handleFetchMonthlyAppointments from './monthlyAppointments';

function* watchAll() {
  yield all([
    takeEvery(APPOINTMENTS_FETCH, handleFetchAppointments),
    takeEvery(MONTHLY_APPOINTMENTS_FETCH, handleFetchMonthlyAppointments)
  ]);
}

export default watchAll;
