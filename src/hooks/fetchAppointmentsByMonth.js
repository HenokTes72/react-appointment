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
    case 'ADD_SCHEDULE': {
      // eslint-disable-next-line no-console
      console.log('PAYLOAD: ', JSON.stringify(action.payload));
      const { schedules } = state;
      // eslint-disable-next-line no-console
      console.log('LENGTH BEFORE ADD: ', schedules.length);
      const newSchedules = [...schedules, action.payload];
      // eslint-disable-next-line no-console
      console.log('LENGTH after ADD: ', newSchedules.length);

      return {
        ...state,
        schedules: newSchedules
      };
    }

    default:
      throw new Error();
  }
};

const useFetchAppointmentsByMonth = (
  initialData = [],
  institutionId = 187,
  token = 1555334482919
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isFetchByMonthLoading: false,
    isFetchByMonthError: false,
    schedules: initialData,
    schedulesCache: initialData
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
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: schedules
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
    // eslint-disable-next-line no-console
    console.log('ADD TO SCHEDULES CALLED');
    dispatch({ type: 'ADD_SCHEDULE', payload: schedule });
  };
  return {
    ...state,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    filterSchedules,
    addToSchedules
  };
};
export default useFetchAppointmentsByMonth;
