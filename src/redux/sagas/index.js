import { takeEvery, all } from 'redux-saga/effects';
import {
  FETCH_CURRENT_MONTH_APPOINTMENTS,
  FETCH_PLACES_AND_PROFESSIONALS,
  FETCH_APPOINTMENT_BY_ID,
  FETCH_EMAILS,
  FETCH_NAMES,
  FETCH_USER,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT
} from '../constants/actionTypes';
import fetchAppointmentsByMonth from './sagaFetchAppointmentsByMonth';
import fetchPlacesAndProfessionals from './sagaFetchPlacesAndProfessionals';
import fetchAppointmentById from './sagaFetchAppointmentById';
import fetchEmails from './sagaFetchEmails';
import fetchNames from './sagaFetchNames';
import fetchUser from './sagaFetchUser';
import createAppointment from './sagaCreateAppointment';
import updateAppointment from './sagaUpdateAppointment';

function* watchAll() {
  yield all([
    takeEvery(FETCH_CURRENT_MONTH_APPOINTMENTS, fetchAppointmentsByMonth),
    takeEvery(FETCH_PLACES_AND_PROFESSIONALS, fetchPlacesAndProfessionals),
    takeEvery(FETCH_APPOINTMENT_BY_ID, fetchAppointmentById),
    takeEvery(FETCH_EMAILS, fetchEmails),
    takeEvery(FETCH_NAMES, fetchNames),
    takeEvery(FETCH_USER, fetchUser),
    takeEvery(CREATE_APPOINTMENT, createAppointment),
    takeEvery(UPDATE_APPOINTMENT, updateAppointment)
  ]);
}

export default watchAll;
