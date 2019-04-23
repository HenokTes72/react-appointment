import { useEffect, useReducer } from 'react';

import moment from 'moment';
import { getAllAppointments } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isAppointmentsListLoading: true,
        isAppointmentsListError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isAppointmentsListLoading: false,
        isAppointmentsListError: false,
        appointmentsData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isAppointmentsListLoading: false,
        isAppointmentsListError: true
      };
    default:
      throw new Error();
  }
};

const useFetchAppointments = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isAppointmentsListLoading: false,
    isAppointmentsListError: false,
    appointmentsData: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await getAllAppointments();

        if (!didCancel) {
          const selectedDays = result.data['0'].horarios.map(horario =>
            moment(horario.slot_date).format('YYYY-MM-DD')
          );
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: { selectedDays }
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
  }, [state.selectedDays]);

  return { ...state };
};
export default useFetchAppointments;
