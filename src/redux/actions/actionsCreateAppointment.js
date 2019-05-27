import {
  CREATE_APPOINTMENT_INIT,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  CREATE_APPOINTMENT,
  SET_SUBMITTER_AND_DATA
} from '../constants/actionTypes';

const actionCreateAppointmentInit = () => ({
  type: CREATE_APPOINTMENT_INIT
});

const actionCreateAppointmentFailure = () => ({
  type: CREATE_APPOINTMENT_FAILURE
});

const actionCreateAppointmentSuccess = appointment => ({
  type: CREATE_APPOINTMENT_SUCCESS,
  payload: appointment
});

const actionCreateAppointment = () => ({
  type: CREATE_APPOINTMENT
});

const actionSetSubmitterAndData = ({ submitter, data }) => ({
  type: SET_SUBMITTER_AND_DATA,
  payload: { submitter, data }
});

export {
  actionCreateAppointmentInit,
  actionCreateAppointmentFailure,
  actionCreateAppointmentSuccess,
  actionSetSubmitterAndData,
  actionCreateAppointment
};
