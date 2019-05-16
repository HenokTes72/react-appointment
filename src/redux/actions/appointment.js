import {
  APPOINTMENTS_ADD,
  APPOINTMENTS_FETCH,
  APPOINTMENTS_FETCH_ERROR
} from '../constants/actionTypes';

const doAddAppointments = appointments => ({
  type: APPOINTMENTS_ADD,
  appointments
});

const doFetchAppointments = query => ({
  type: APPOINTMENTS_FETCH,
  query
});

const doHandleError = message => ({
  type: APPOINTMENTS_FETCH_ERROR,
  message
});

export { doAddAppointments, doFetchAppointments, doHandleError };
