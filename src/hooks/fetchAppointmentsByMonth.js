import { useState, useEffect, useReducer } from 'react';

import moment from 'moment';

import getMonthDates from '../utils/getMonthDates';

import { getAppointmentByDate } from '../config';

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

const dataFetchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetchByMonthLoading: true,
        isFetchByMonthError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: false,
        schedules: [...payload],
        schedulesCache: [...payload]
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: true
      };
    case 'FILTER_SCHEDULES':
      return {
        ...state,
        schedules: schedulesSelector(state, action)
      };
    case 'ADD_SCHEDULE':
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
        schedulesCache: [...state.schedulesCache, action.payload],
        activeSchedulesCache: [...state.activeSchedulesCache, action.payload]
      };
    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        schedules: getUpdatedList(state.schedules, action.payload),
        schedulesCache: getUpdatedList(state.schedulesCache, action.payload),
        activeSchedulesCache: getUpdatedList(
          state.activeSchedulesCache,
          action.payload
        )
      };
    case 'DELETE_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.filter(
          schedule => schedule.slot_id !== action.payload
        ),
        schedulesCache: state.schedulesCache.filter(
          schedule => schedule.slot_id !== action.payload
        ),
        activeSchedulesCache: state.activeSchedulesCache.filter(
          schedule => schedule.slot_id !== action.payload
        )
      };
    default:
      throw new Error();
  }
};

const useFetchAppointmentsByMonth = (
  initialData = [],
  institutionId = 187,
  token = 1555334482919
) => {
  // The difference between schedules, schedulesCache, and activeSchedulesCache
  // schedules: this holds monthly schedules that might be fitlred by professional ids
  // schedulesCache: this holds monthly schedules that are unfiltered by professional ids
  // activeSchedulesCache: holds only schedules created in during the current frontend session
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isFetchByMonthLoading: false,
    isFetchByMonthError: false,
    schedules: initialData,
    schedulesCache: initialData,
    activeSchedulesCache: []
  });

  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

  const [professionalIds, setProfessionalIds] = useState(['295']);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const monthDates = getMonthDates(selectedMonth);
        const requests = [];
        monthDates.forEach(date => {
          professionalIds.forEach(professionalId => {
            const request = getAppointmentByDate({
              professionalId,
              selectedDate: date,
              token,
              institutionId
            });
            requests.push(request);
          });
        });

        const responses = await Promise.all(requests);
        const results = responses.map(resp => resp.data);

        let schedules = [];
        results.forEach(result => {
          const { success, horarios } = result;
          if (success) {
            schedules = schedules.concat([...horarios]);
          }
        });
        // update with active schedules if not fetched along
        const { activeSchedulesCache } = state;
        const schedulesToAppend = [];
        activeSchedulesCache.forEach(activeSchedule => {
          const found = schedules.find(
            schedule => schedule.id === activeSchedule.id
          );
          if (!found) {
            schedulesToAppend.push(activeSchedule);
          }
        });
        if (schedulesToAppend.length > 0) {
          schedules = [...schedules, ...schedulesToAppend];
        }
        const finalSchedules = [];
        schedules.forEach(async schedule => {
          // const patientResult = await getUserById({ id: schedule.user_id });
          // const { nombre, apellido } = patientResult.data;
          // const patient = `${nombre} ${apellido}`;
          finalSchedules.push({ ...schedule, patient: 'Enrique Eglasias' });
        });
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: finalSchedules
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [selectedMonth, professionalIds]);

  const filterSchedules = doctorIds => {
    dispatch({ type: 'FILTER_SCHEDULES', payload: doctorIds });
  };

  const addToSchedules = schedule => {
    dispatch({ type: 'ADD_SCHEDULE', payload: schedule });
  };

  const updateSchedule = schedule => {
    dispatch({ type: 'UPDATE_SCHEDULE', payload: schedule });
  };

  const deleteSchedule = slotId => {
    // eslint-disable-next-line no-console
    console.log('DELETE SCHEDULE CALLED');
    dispatch({ type: 'DELETE_SCHEDULE', payload: slotId });
  };

  return {
    ...state,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    filterSchedules,
    addToSchedules,
    updateSchedule,
    deleteSchedule
  };
};
export default useFetchAppointmentsByMonth;
