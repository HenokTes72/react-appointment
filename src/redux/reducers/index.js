import { combineReducers } from 'redux';
import reducerFetchAppointmentsByMonth from './reducerFetchAppointmentsByMonth';
import reducerFetchPlacesAndProfessionals from './reducerFetchPlacesAndProfessionals';
import reducerFetchAppointmentById from './reducerFetchAppointmentById';
import reducerFetchEmails from './reducerFetchEmails';
import reducerFetchNames from './reducerFetchNames';
import reducerFetchUser from './reducerFetchUser';
import reducerCreateAppointment from './reducerCreateAppointment';
import reducerUpdateAppointment from './reducerUpdateAppointment';
import reducerModalVisibility from './reducerModalVisibility';
import reducerColorContext from './reducerColorContext';

const rootReducer = combineReducers({
  stateFetchAppointmentsByMonth: reducerFetchAppointmentsByMonth,
  stateFetchPlacesAndProfessionals: reducerFetchPlacesAndProfessionals,
  stateFetchAppointmentById: reducerFetchAppointmentById,
  stateFetchEmails: reducerFetchEmails,
  stateFetchNames: reducerFetchNames,
  stateFetchUser: reducerFetchUser,
  stateCreateAppointment: reducerCreateAppointment,
  stateUpdateAppointment: reducerUpdateAppointment,
  stateModalVisibility: reducerModalVisibility,
  stateColorContext: reducerColorContext
});

export default rootReducer;
