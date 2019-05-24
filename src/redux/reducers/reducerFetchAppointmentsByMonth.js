import moment from 'moment';
import {
  FETCH_MONTH_APPOINTMENTS_INIT,
  FETCH_MONTH_APPOINTMENTS_SUCCESS,
  FETCH_MONTH_APPOINTMENTS_FAILURE,
  SET_SELECTED_MONTH,
  SET_PROFESSIONAL_IDS,
  FILTER_SCHEDULES,
  ADD_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE
} from '../constants/actionTypes';

const schedulesSelector = (state, action) => {
  const { schedulesCache } = state;
  const { payload: selectedDoctorIds } = action;
  const filteredSchedules = schedulesCache.filter(
    schedule => selectedDoctorIds.indexOf(schedule.doctor_id) !== -1
  );
  return filteredSchedules;
};

const getUpdatedList = (arr, item) => {
  const filteredArray = arr.filter(element => element.id !== item.id);
  return [...filteredArray, item];
};

const INITIAL_STATE = {
  selectedMonth: moment(new Date()).format('YYYY-MM-DD'),
  professionalIds: ['295'],
  isFetchByMonthLoading: false,
  isFetchByMonthError: false,
  schedules: [],
  schedulesCache: [],
  activeSchedulesCache: []
};

const reducerFetchAppointmentsByMonth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_MONTH:
      return {
        ...state,
        selectedMonth: payload
      };
    case SET_PROFESSIONAL_IDS:
      return {
        ...state,
        professionalIds: [...payload]
      };
    case FETCH_MONTH_APPOINTMENTS_INIT:
      return {
        ...state,
        isFetchByMonthLoading: true,
        isFetchByMonthError: false
      };
    case FETCH_MONTH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: false,
        schedules: [...payload],
        schedulesCache: [...payload]
      };
    case FETCH_MONTH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: true
      };
    case FILTER_SCHEDULES:
      return {
        ...state,
        schedules: schedulesSelector(state, action)
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
        schedulesCache: [...state.schedulesCache, action.payload],
        activeSchedulesCache: [...state.activeSchedulesCache, action.payload]
      };
    case UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: getUpdatedList(state.schedules, action.payload),
        schedulesCache: getUpdatedList(state.schedulesCache, action.payload),
        activeSchedulesCache: getUpdatedList(
          state.activeSchedulesCache,
          action.payload
        )
      };
    case DELETE_SCHEDULE: {
      const stringNotEqual = (a, b) => `${a}` !== `${b}`;
      return {
        ...state,
        schedules: state.schedules.filter(schedule =>
          stringNotEqual(schedule.id, action.payload)
        ),
        schedulesCache: state.schedulesCache.filter(schedule =>
          stringNotEqual(schedule.id, action.payload)
        ),
        activeSchedulesCache: state.activeSchedulesCache.filter(schedule =>
          stringNotEqual(schedule.id, action.payload)
        )
      };
    }
    default:
      return { ...state };
  }
};

export default reducerFetchAppointmentsByMonth;
