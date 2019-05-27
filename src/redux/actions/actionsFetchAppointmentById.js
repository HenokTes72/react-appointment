import {
  FETCH_APPOINTMENT_INIT,
  FETCH_APPOINTMENT_SUCCESS,
  FETCH_APPOINTMENT_FAILURE,
  FETCH_APPOINTMENT_BY_ID,
  UPDATE_FETCHED_APPOINTMENT,
  ADD_APPOINTMENT_TO_CACHE,
  SET_PROFESSIONAL_ID_AND_NAME
} from '../constants/actionTypes';

const actionFetchAppointmentInit = () => ({
  type: FETCH_APPOINTMENT_INIT
});

const actionFetchAppointmentFailure = () => ({
  type: FETCH_APPOINTMENT_FAILURE
});

const actionFetchAppointmentSuccess = institutionData => ({
  type: FETCH_APPOINTMENT_SUCCESS,
  payload: institutionData
});

const actionFetchAppointmentById = ({ secret }) => ({
  type: FETCH_APPOINTMENT_BY_ID,
  payload: { secret }
});

const actionUpdateAppointment = updatedAppointment => ({
  type: UPDATE_FETCHED_APPOINTMENT,
  payload: updatedAppointment
});

const actionAddAppointmentToCache = appointment => ({
  type: ADD_APPOINTMENT_TO_CACHE,
  payload: appointment
});

const actionSetProfessionalIdAndName = idAndName => ({
  type: SET_PROFESSIONAL_ID_AND_NAME,
  payload: idAndName
});

export {
  actionFetchAppointmentInit,
  actionFetchAppointmentFailure,
  actionFetchAppointmentSuccess,
  actionUpdateAppointment,
  actionAddAppointmentToCache,
  actionSetProfessionalIdAndName,
  actionFetchAppointmentById
};
