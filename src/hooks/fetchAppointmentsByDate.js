import { useState, useEffect, useReducer } from 'react';

import { getAppointmentByDate } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetchByDateLoading: true,
        isFetchByDateError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetchByDateLoading: false,
        isFetchByDateError: false,
        oneDayAppointments: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetchByDateLoading: false,
        isFetchByDateError: true
      };
    default:
      throw new Error();
  }
};

const useFetchAppointmentsByDate = (
  initialData = {},
  professionalIds = ['295'],
  institutionId = 187,
  token = 1555334482919
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isFetchByDateLoading: false,
    isFetchByDateError: false,
    oneDayAppointments: initialData
  });

  const [selectedDate, setSelectedDate] = useState('2019-04-12');

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const requests = [];
        professionalIds.forEach(professionalId => {
          const request = getAppointmentByDate({
            professionalId,
            selectedDate,
            token,
            institutionId
          });
          requests.push(request);
        });
        const responses = await Promise.all(requests);
        const results = responses.map(resp => resp.data);
        const professionals = [];
        let schedules = [];
        results.forEach(result => {
          const { success, profesionales, horarios } = result;
          if (success) {
            const match = professionals.find(
              prof => prof.id === profesionales.id
            );
            const isAdded = match !== undefined;
            if (!isAdded) {
              professionals.push(profesionales);
            }
            schedules = schedules.concat([...horarios]);
          }
        });
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: { professionals, schedules }
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
  }, [selectedDate]);

  return { ...state, setSelectedDate };
};
export default useFetchAppointmentsByDate;
