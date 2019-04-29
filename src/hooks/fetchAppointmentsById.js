import { useState, useEffect, useReducer } from 'react';

import { getAppointmentById } from '../config';

import getDuration from '../utils/getDuration';

const getAttr = (object1, object2, attr) => {
  return (object1 && object1[attr]) || (object2 && object2[attr]);
};

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
    case 'UPDATE_APPOINTMENT': {
      const { cachedAppointments } = state;
      const { payload: updatedAppointment } = action;
      const filteredAppointments = cachedAppointments.filter(
        appointment => appointment.id !== updatedAppointment.id
      );
      // eslint-disable-next-line no-console
      console.log(
        'UPDATE APPOINTMENT CALLED: FILTERED LENG:',
        filteredAppointments.length
      );
      return {
        ...state,
        appointmentData: action.payload,
        cachedAppointments: [...filteredAppointments, updatedAppointment]
      };
    }
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
        const { id, name: specialist } = idAndName;
        const { cachedAppointments: cache } = state;
        const cachedAppointment = cache.find(
          appointment => parseInt(id, 10) === parseInt(appointment.id, 10)
        );
        let data;
        if (cachedAppointment) {
          // eslint-disable-next-line no-console
          console.log('CACHED DATA SET AS DETAIL APPOINTMENT');
          data = cachedAppointment;
        } else {
          // eslint-disable-next-line no-console
          console.log('NEW DATA SET AS DETAIL APPOINTMENT');
          const result = await getAppointmentById({ ...idAndName, secret });
          const { user: usersList, paciente: patientsList } = result.data;
          const [user] = usersList;
          const [paciente] = patientsList;
          const startTime = getAttr(user, paciente, 'inicio');
          const endTime = getAttr(user, paciente, 'fin');
          data = {
            id: user.id,
            specialist,
            patient: {
              email: getAttr(paciente, user, 'email'),
              firstName: getAttr(paciente, user, 'nombre'),
              lastName: getAttr(paciente, user, 'apellido'),
              phone: getAttr(paciente, user, 'telefono')
            },
            appointment: {
              place: getAttr(user, paciente, 'clinica'),
              date: getAttr(user, paciente, 'slot_date'),
              startTime,
              endTime,
              duration: getDuration(startTime, endTime),
              detail: getAttr(user, paciente, 'detalle'),
              consulta: getAttr(user, paciente, 'tipoConsulta')
            },
            emailCheck: false
          };
        }
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

  const updateAppointmentData = appointment => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointment });
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
