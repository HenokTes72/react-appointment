import { MONTHLY_APPOINTMENTS_ADD } from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddMonthlyAppointments = (state, action) =>
  action.monthlyAppointments;

function monthlyAppointmentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MONTHLY_APPOINTMENTS_ADD: {
      return applyAddMonthlyAppointments(state, action);
    }
    default:
      return state;
  }
}

export default monthlyAppointmentsReducer;
