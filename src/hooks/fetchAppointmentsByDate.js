// @flow
import { useState, useEffect, useReducer } from 'react';

import { getAppointmentByDate } from '../config';
import type { ICompactAppointment } from '../types/appointmentCompact';

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
  // $FlowFixMe
  initialData: ICompactAppointment = {},
  professionalIds: Array<string | number> = ['295'],
  institutionId: string | number = 187,
  token: string | number = 1555334482919
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isFetchByDateLoading: false,
    isFetchByDateError: false,
    oneDayAppointments: initialData
  });

  // $FlowFixMe
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
        // const professionals = [];
        let schedules: Array<ICompactAppointment> = [];
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
  }, [selectedDate]);

  return { ...state, setSelectedDate };
};
export default useFetchAppointmentsByDate;
