import { useState, useEffect, useReducer } from 'react';

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
    default:
      throw new Error();
  }
};

const useCreateAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isCreateResponseLoading: false,
    isCreateResponseError: false,
    createResponse: initialData
  });

  const [newAppointmentData, setCreateData] = useState({});

  const [setSubmitting, setSetSubmitting] = useState(null);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const bodyFormData = new FormData();
        // newAppointmentData.forEach(field => {
        //   bodyFormData.set(field.name, field.value);
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
  }, [newAppointmentData]);

  const setNewAppointmentData = (data, setSubmit) => {
    setSetSubmitting(setSubmit);
    setCreateData(data);
  };
  return { ...state, setNewAppointmentData };
};
export default useCreateAppointment;
