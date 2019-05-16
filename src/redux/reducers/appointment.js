import { APPOINTMENTS_ADD } from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddAppointments = (state, action) => action.appointments;

function appointmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case APPOINTMENTS_ADD: {
      return applyAddAppointments(state, action);
    }
    default:
      return state;
  }
}

export default appointmentReducer;
