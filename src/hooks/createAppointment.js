// @flow
import { useEffect, useReducer } from 'react';

import { doAppointmentCreate, getAvailabilityById } from '../config';
import type { IAppointment } from '../types/appointmentDetailed';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isCreateResponseLoading: true,
        isCreateResponseError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isCreateResponseLoading: false,
        isCreateResponseError: false,
        createResponse: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isCreateResponseLoading: false,
        isCreateResponseError: true
      };
    case 'SET_SUBMITTER_AND_DATA': {
      const { submitter, data } = action.payload;
      return {
        ...state,
        setSubmitting: submitter,
        newAppointmentData: data
      };
    }
    default:
      throw new Error();
  }
};

const useCreateAppointment = (initialData: IAppointment = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isCreateResponseLoading: false,
    isCreateResponseError: false,
    createResponse: initialData,
    newAppointmentData: {},
    setSubmitting: null
  });

  useEffect(() => {
    let didCancel = false;

    const createAppointment = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const { newAppointmentData, setSubmitting } = state;
        const {
          specialist: { id: doctorId },
          appointment: { startTime, endTime, date }
        } = newAppointmentData;
        const availabilityQuery = await getAvailabilityById({
          doctorId,
          startTime,
          endTime,
          date
        });
        const { success } = availabilityQuery.data;
        if (success) {
          const bodyFormData = new FormData();
          // write to bodyFormData, be sure to mind the nested
          // nature of the appointment data
          // Object.keys(newAppointmentData).forEach(name => {
          //   bodyFormData.set(name, newAppointmentData[name])
          // });
          const result = await doAppointmentCreate({
            method: 'post',
            postData: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });
          if (setSubmitting !== null && result.success) {
            setSubmitting(true);
          }
          if (!didCancel) {
            dispatch({
              type: 'FETCH_SUCCESS',
              payload: result
            });
          }
        } else {
          // $FlowFixMe
          setSubmitting(false, ', Slot is already booked.');
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    createAppointment();

    return () => {
      didCancel = true;
    };
  }, [state.newAppointmentData]);

  const setNewAppointmentData = (dataAndSubmitter: {
    data: IAppointment,
    submitter: (boolean, ?string) => void
  }) => {
    dispatch({ type: 'SET_SUBMITTER_AND_DATA', payload: dataAndSubmitter });
  };
  return { ...state, setNewAppointmentData };
};
export default useCreateAppointment;
