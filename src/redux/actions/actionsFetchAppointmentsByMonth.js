import {
  FETCH_MONTH_APPOINTMENTS_INIT,
  FETCH_MONTH_APPOINTMENTS_SUCCESS,
  FETCH_MONTH_APPOINTMENTS_FAILURE,
  SET_SELECTED_MONTH,
  SET_PROFESSIONAL_IDS,
  FILTER_SCHEDULES,
  ADD_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
  FETCH_CURRENT_MONTH_APPOINTMENTS
} from '../constants/actionTypes';

const actionSetSelectedMonth = selectedMonth => ({
  type: SET_SELECTED_MONTH,
  payload: selectedMonth
});

const actionSetProfessionalIds = professionalIds => ({
  type: SET_PROFESSIONAL_IDS,
  payload: professionalIds
});

const actionFetchMonthAppointmentsInit = () => ({
  type: FETCH_MONTH_APPOINTMENTS_INIT
});

const actionFetchMonthAppointmentsFailure = () => ({
  type: FETCH_MONTH_APPOINTMENTS_FAILURE
});

const actionFetchMonthAppointmentsSuccess = finalSchedules => ({
  type: FETCH_MONTH_APPOINTMENTS_SUCCESS,
  payload: finalSchedules
});

const actionFilterSchedules = doctorIds => ({
  type: FILTER_SCHEDULES,
  payload: doctorIds
});

const actionAddSchedule = schedule => ({
  type: ADD_SCHEDULE,
  payload: schedule
});

const actionUpdateSchedule = schedule => ({
  type: UPDATE_SCHEDULE,
  payload: schedule
});

const actionDeleteSchedule = slotId => ({
  type: DELETE_SCHEDULE,
  payload: slotId
});

const actionFetchCurrentMonthAppointments = ({ token, institutionId }) => ({
  type: FETCH_CURRENT_MONTH_APPOINTMENTS,
  payload: {
    token,
    institutionId
  }
});

export {
  actionSetSelectedMonth,
  actionSetProfessionalIds,
  actionFetchMonthAppointmentsInit,
  actionFetchMonthAppointmentsFailure,
  actionFetchMonthAppointmentsSuccess,
  actionFilterSchedules,
  actionAddSchedule,
  actionUpdateSchedule,
  actionDeleteSchedule,
  actionFetchCurrentMonthAppointments
};
