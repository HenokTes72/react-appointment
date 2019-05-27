import {
  UPDATE_APPOINTMENT_INIT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT,
  SET_UPDATE_SUBMITTER_AND_DATA
} from '../constants/actionTypes';

const actionUpdateAppointmentInit = () => ({
  type: UPDATE_APPOINTMENT_INIT
});

const actionUpdateAppointmentFailure = () => ({
  type: UPDATE_APPOINTMENT_FAILURE
});

const actionUpdateAppointmentSuccess = appointment => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  payload: appointment
});

const actionUpdateAppointment = () => ({
  type: UPDATE_APPOINTMENT
});

const actionSetUpdaterSubmitterAndData = ({ submitter, data }) => ({
  type: SET_UPDATE_SUBMITTER_AND_DATA,
  payload: { submitter, data }
});

export {
  actionUpdateAppointmentInit,
  actionUpdateAppointmentFailure,
  actionUpdateAppointmentSuccess,
  actionSetUpdaterSubmitterAndData,
  actionUpdateAppointment
};
