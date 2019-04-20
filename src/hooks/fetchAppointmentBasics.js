import { useEffect, useReducer } from 'react';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isAppointmentBasicLoading: true,
        isAppointmentBasicError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isAppointmentBasicLoading: false,
        isAppointmentBasicError: false,
        appointmentBasics: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isAppointmentBasicLoading: false,
        isAppointmentBasicError: true
      };
    default:
      throw new Error();
  }
};

const useFetchAppointmentBasics = (url, initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isAppointmentBasicLoading: false,
    isAppointmentBasicError: false,
    appointmentBasics: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const axiosResult = await axios(url);
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: axiosResult.data
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
  }, [state.appointmentBasics]);

  return { ...state };
};
export default useFetchAppointmentBasics;
