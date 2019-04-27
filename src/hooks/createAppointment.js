import { useEffect, useReducer } from 'react';

import { doAppointmentCreate } from '../config';

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

const useCreateAppointment = (initialData = {}) => {
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
        const bodyFormData = new FormData();
        Object.keys(newAppointmentData).forEach(name => {
          bodyFormData.set(name, newAppointmentData[name]);
        });
        const result = await doAppointmentCreate({
          method: 'post',
          postData: bodyFormData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        if (setSubmitting !== null && result.success) {
          // eslint-disable-next-line no-console
          console.log('SET SUBMITTING CALLED');
          setSubmitting(true);
        }
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result
          });
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

  const setNewAppointmentData = dataAndSubmitter => {
    dispatch({ type: 'SET_SUBMITTER_AND_DATA', payload: dataAndSubmitter });
  };
  return { ...state, setNewAppointmentData };
};
export default useCreateAppointment;
