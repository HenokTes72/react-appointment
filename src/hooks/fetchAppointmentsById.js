// @flow
import { useState, useEffect, useReducer } from 'react';

import { getAppointmentById } from '../config';

import getDuration from '../utils/getDuration';
import type { IAppointment } from '../types/appointmentDetailed';

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

const useFetchAppointmentById = (
  initialData: IAppointment = {},
  secret: number | string = 1555334482919
) => {
  const [
    state: {
      isAppointmentLoading: boolean,
      isAppointmentError: boolean,
      appointmentData: IAppointment,
      cachedAppointments: Array<IAppointment>
    },
    dispatch
  ] = useReducer(dataFetchReducer, {
    isAppointmentLoading: false,
    isAppointmentError: false,
    appointmentData: initialData,
    cachedAppointments: []
  });
  const [
    idAndName: {
      id: string | number,
      name: string
    },
    setIdAndName
    // $FlowFixMe
  ] = useState({});

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const { id, name: specialistName } = idAndName;
        const { cachedAppointments: cache } = state;
        const cachedAppointment = cache.find(
          appointment => parseInt(id, 10) === parseInt(appointment.id, 10)
        );
        let data: IAppointment;
        if (cachedAppointment) {
          data = cachedAppointment;
        } else {
          const result = await getAppointmentById({ ...idAndName, secret });
          const { user: usersList, paciente: patientsList } = result.data;
          const [user] = usersList;
          const [paciente] = patientsList;
          const startTime = getAttr(user, paciente, 'inicio');
          const endTime = getAttr(user, paciente, 'fin');
          data = {
            id: user.id,
            specialist: {
              id: getAttr(user, paciente, 'doctorId'),
              name: specialistName
            },
            patient: {
              id: getAttr(user, paciente, 'paciente_id'),
              email: getAttr(paciente, user, 'email'),
              firstName: getAttr(paciente, user, 'nombre'),
              lastName: getAttr(paciente, user, 'apellido'),
              phone: getAttr(paciente, user, 'telefono')
            },
            appointment: {
              place: {
                id: getAttr(user, paciente, 'clinicaId'),
                name: getAttr(user, paciente, 'clinica')
              },
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

  const updateAppointmentData = (appointment: IAppointment) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: appointment });
  };

  const addToAppointmentCache = (appointment: IAppointment) => {
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
