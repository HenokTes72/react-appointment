import {
  CREATE_APPOINTMENT_INIT,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  SET_SUBMITTER_AND_DATA
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isCreateResponseLoading: false,
  isCreateResponseError: false,
  createResponse: {},
  newAppointmentData: {},
  setSubmitting: null
};

const reducerCreateAppointment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_APPOINTMENT_INIT:
      return {
        ...state,
        isCreateResponseLoading: true,
        isCreateResponseError: false
      };
    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isCreateResponseLoading: false,
        isCreateResponseError: false,
        createResponse: action.payload
      };
    case CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isCreateResponseLoading: false,
        isCreateResponseError: true
      };
    case SET_SUBMITTER_AND_DATA: {
      const { submitter, data } = action.payload;
      return {
        ...state,
        setSubmitting: submitter,
        newAppointmentData: data
      };
    }
    default:
      return { ...state };
  }
};

export default reducerCreateAppointment;
