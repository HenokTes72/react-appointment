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
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointmentData: action.payload
      };
    case 'ADD_TO_CACHE': {
      const { cachedAppointments } = state;
      const { payload: appointment } = action;
      return {
        ...state,
        cachedAppointments: [...cachedAppointments, appointment]
      };
    }
    default:
      throw new Error();
  }
};

const useFetchAppointmentById = (initialData = {}, secret = 1555334482919) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isAppointmentLoading: false,
    isAppointmentError: false,
    appointmentData: initialData,
    cachedAppointments: []
  });

  const [idAndName, setIdAndName] = useState({});

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        // eslint-disable-next-line no-console
        console.log('ID AND NAME:', JSON.stringify(idAndName));
        const { id, name } = idAndName;
        const { cachedAppointments } = state;
        // eslint-disable-next-line no-console
        console.log('CACHE LENGTH:', cachedAppointments.length);
        const cachedAppointment = [...cachedAppointments].find(
          appointment => parseInt(id, 10) === parseInt(appointment.id, 10)
        );
        // eslint-disable-next-line no-console
        console.log('CACHED HORARIOS:', JSON.stringify(cachedAppointment));
        let data;
        if (cachedAppointment) {
          data = cachedAppointment;
        } else {
          const result = await getAppointmentById({ ...idAndName, secret });
          const { user } = result.data;
          const userData = user[0];
          data = {
            patient: userData.name,
            consulta: userData.tipoConsulta,
            place: userData.clinica,
            phone: userData.telefono,
            professional: name,
            detail: userData.detalle,
            date: userData.slot_date,
            start: userData.inicio,
            end: userData.fin || ''
          };
        }
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: data
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('SOME ERROR CACHING:', JSON.stringify(error));
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

  const updateAppointmentData = newData => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: newData });
  };

  const addToAppointmentCache = appointment => {
    dispatch({ type: 'ADD_TO_CACHE', payload: appointment });
  };

  return {
    ...state,
    setIdAndName,
    updateAppointmentData,
    addToAppointmentCache
  };
};
export default useFetchAppointmentById;
