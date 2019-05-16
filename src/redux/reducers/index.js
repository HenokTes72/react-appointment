import { combineReducers } from 'redux';
import appointmentReducer from './appointment';
import monthlyAppointmentsReducer from './monthlyAppointments';

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  monthlyAppointments: monthlyAppointmentsReducer
});

export default rootReducer;
