import { call, put, all } from 'redux-saga/effects';
import { doAddMonthlyAppointments } from '../actions/monthlyAppointments';
import fetchAppointments from '../api/appointment';

function* handleFetchMontlyAppointments(action) {
  const { query } = action;

  const sagaCalls = [];
  [1, 2, 3, 4].forEach(q => {
    sagaCalls.push(call(fetchAppointments, query + q));
  });
  const result = yield all(sagaCalls);
  let monthlyAppointments = [];
  result.forEach(dayResult => {
    const { success, horarios } = dayResult;
    if (success) {
      monthlyAppointments = monthlyAppointments.concat([...horarios]);
    }
  });
  monthlyAppointments = monthlyAppointments.map(appointment => ({
    ...appointment,
    patient: 'Sick Person'
  }));
  yield put(doAddMonthlyAppointments(monthlyAppointments));
}

export default handleFetchMontlyAppointments;
