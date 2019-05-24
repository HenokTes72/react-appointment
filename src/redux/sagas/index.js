import { takeEvery, all } from 'redux-saga/effects';
import { FETCH_CURRENT_MONTH_APPOINTMENTS } from '../constants/actionTypes';
import fetchAppointmentsByMonth from './sagaFetchAppointmentsByMonth';

function* watchAll() {
  yield all([
    takeEvery(FETCH_CURRENT_MONTH_APPOINTMENTS, fetchAppointmentsByMonth)
  ]);
}

export default watchAll;
