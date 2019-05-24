import { select, call, put, all } from 'redux-saga/effects';
import {
  actionFetchMonthAppointmentsInit,
  actionFetchMonthAppointmentsFailure,
  actionFetchMonthAppointmentsSuccess
} from '../actions/actionsFetchAppointmentsByMonth';
import {
  selectActiveSchedules,
  selectSelectedMonth,
  selectProfessionalIds
} from '../selectors/selectorsFetchAppointmentsByMonth';

import { getAppointmentByDate, getUserById } from '../../config';
import getMonthDates from '../../utils/getMonthDates';

function* fetchAppointmentsByMonth(action) {
  yield put(actionFetchMonthAppointmentsInit());

  try {
    const selectedMonth = yield select(selectSelectedMonth);
    const professionalIds = yield select(selectProfessionalIds);
    const activeSchedulesCache = yield select(selectActiveSchedules);

    const { token = 1555334482919, institutionId = 187 } = action.payload;

    const monthDates = getMonthDates(selectedMonth);
    const requests = [];

    monthDates.forEach(date => {
      professionalIds.forEach(professionalId => {
        requests.push(
          call(getAppointmentByDate, {
            professionalId,
            selectedDate: date,
            token,
            institutionId
          })
        );
      });
    });
    const responses = yield all(requests);
    const results = responses.map(resp => resp.data);
    let schedules = [];
    results.forEach(result => {
      const { success, horarios } = result;
      if (success) {
        schedules = schedules.concat([...horarios]);
      }
    });
    // update with active schedules if not fetched along
    const schedulesToAppend = [];
    activeSchedulesCache.forEach(activeSchedule => {
      const found = schedules.find(
        schedule => schedule.id === activeSchedule.id
      );
      if (!found) {
        schedulesToAppend.push(activeSchedule);
      }
    });
    if (schedulesToAppend.length > 0) {
      schedules = [...schedules, ...schedulesToAppend];
    }
    // Fetch patient name
    const userRequests = [];
    const requestedUsers = [];
    schedules.forEach(({ user_id: userId }) => {
      if (requestedUsers.indexOf(userId) === -1) {
        userRequests.push(call(getUserById, { id: userId }));
        requestedUsers.push(userId);
      }
    });
    const userResponses = yield all(userRequests);
    const userResults = userResponses.map(resp => resp.data);
    const patients = userResults.map(({ paciente }, index) => {
      const [patient] = paciente;
      return { ...patient, id: requestedUsers[index] };
    });
    // Incorporate patient name into the appointment data
    const finalSchedules = schedules.map(schedule => {
      const patient = patients.find(usr => usr.id === schedule.user_id);
      if (patient === undefined) {
        return schedule;
      }
      const { nombre, apellido } = patient;
      return { ...schedule, patient: `${nombre} ${apellido}` };
    });
    yield put(actionFetchMonthAppointmentsSuccess(finalSchedules));
  } catch (error) {
    yield put(actionFetchMonthAppointmentsFailure());
  }
}

export default fetchAppointmentsByMonth;
