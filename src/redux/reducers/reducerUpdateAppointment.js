import {
  UPDATE_APPOINTMENT_INIT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
  SET_UPDATE_SUBMITTER_AND_DATA
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isUpdateResponseLoading: false,
  isUpdateResponseError: false,
  updateResponse: {},
  newUpdatedData: {},
  setSubmitting: null
};

const reducerUpdateAppointment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_APPOINTMENT_INIT:
      return {
        ...state,
        isUpdateResponseLoading: true,
        isUpdateResponseError: false
      };
    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isUpdateResponseLoading: false,
        isUpdateResponseError: false,
        updateResponse: action.payload
      };
    case UPDATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isUpdateResponseLoading: false,
        isUpdateResponseError: true
      };
    case SET_UPDATE_SUBMITTER_AND_DATA: {
      const { submitter, data } = action.payload;
      return {
        ...state,
        setSubmitting: submitter,
        newUpdatedData: data
      };
    }
    default:
      return { ...state };
  }
};

export default reducerUpdateAppointment;
