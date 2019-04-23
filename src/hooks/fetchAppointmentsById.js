import { useState, useEffect, useReducer } from 'react';

import { getAppointmentById } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isAppointmentLoading: true,
        isAppointmentError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isAppointmentLoading: false,
        isAppointmentError: false,
        appointmentData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isAppointmentLoading: false,
        isAppointmentError: true
      };
    default:
      throw new Error();
  }
};

const useAppointmentFetchById = (initialData = {}, secret = 1555334482919) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isAppointmentLoading: false,
    isAppointmentError: false,
    appointmentData: initialData
  });

  const [idAndName, setIdAndName] = useState({});

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await getAppointmentById({ ...idAndName, secret });
        const { user } = result.data;
        const userData = user[0];
        const data = {
          patient: userData.name,
          consulta: userData.tipoConsulta,
          place: userData.clinica,
          phone: userData.telefono,
          professional: idAndName.name
        };
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: data
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
  }, [idAndName]);

  return { ...state, setIdAndName };
};
export default useAppointmentFetchById;
