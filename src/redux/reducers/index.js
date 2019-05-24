import { combineReducers } from 'redux';
import reducerFetchAppointmentsByMonth from './reducerFetchAppointmentsByMonth';

const rootReducer = combineReducers({
  stateFetchAppointmentsByMonth: reducerFetchAppointmentsByMonth
});

export default rootReducer;
