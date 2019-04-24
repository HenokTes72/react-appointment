import { useState, useEffect, useReducer } from 'react';

import moment from 'moment';

import getMonthDates from '../utils/getMonthDates';

import { getAppointmentByDate } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
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
        schedules: action.payload,
        schedulesCache: action.payload
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
        schedules: state.schedulesCache.filter(
          schedule => action.payload.indexOf(schedule.doctor_id) !== -1
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

  return {
    ...state,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    filterSchedules
  };
};
export default useFetchAppointmentsByMonth;
