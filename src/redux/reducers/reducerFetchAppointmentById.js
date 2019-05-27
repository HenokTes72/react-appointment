import {
  FETCH_APPOINTMENT_INIT,
  FETCH_APPOINTMENT_SUCCESS,
  FETCH_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT,
  ADD_APPOINTMENT_TO_CACHE,
  SET_PROFESSIONAL_ID_AND_NAME
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isAppointmentLoading: false,
  isAppointmentError: false,
  appointmentData: {},
  cachedAppointments: [],
  idAndName: {}
};

const reducerFetchAppointmentById = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_APPOINTMENT_INIT:
      return {
        ...state,
        isAppointmentLoading: true,
        isAppointmentError: false
      };
    case FETCH_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isAppointmentLoading: false,
        isAppointmentError: false,
        appointmentData: action.payload
      };
    case FETCH_APPOINTMENT_FAILURE:
      return {
        ...state,
        isAppointmentLoading: false,
        isAppointmentError: true
      };
    case UPDATE_APPOINTMENT: {
      const { cachedAppointments } = state;
      const { payload: updatedAppointment } = action;
      const filteredAppointments = cachedAppointments.filter(
        appointment => appointment.id !== updatedAppointment.id
      );
      return {
        ...state,
        appointmentData: action.payload,
        cachedAppointments: [...filteredAppointments, updatedAppointment]
      };
    }
    case ADD_APPOINTMENT_TO_CACHE: {
      const { cachedAppointments } = state;
      const { payload: appointment } = action;
      return {
        ...state,
        cachedAppointments: [...cachedAppointments, appointment]
      };
    }
    case SET_PROFESSIONAL_ID_AND_NAME: {
      return {
        ...state,
        idAndName: action.payload
      };
    }
    default:
      return { ...state };
  }
};

export default reducerFetchAppointmentById;
