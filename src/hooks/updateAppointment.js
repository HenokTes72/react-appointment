import { useState, useEffect, useReducer } from 'react';

import { doAppointmentUpdate } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isUpdateResponseLoading: true,
        isUpdateResponseError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isUpdateResponseLoading: false,
        isUpdateResponseError: false,
        updateData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isUpdateResponseLoading: false,
        isUpdateResponseError: true
      };
    default:
      throw new Error();
  }
};

const useUpdateAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isUpdateResponseLoading: false,
    isUpdateResponseError: false,
    updateData: initialData
  });

  const [newUpdatedData, setNewUpdatedData] = useState({});

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        if (newUpdatedData) {
          const bodyFormData = new FormData();
          newUpdatedData.forEach(field => {
            bodyFormData.set(field.name, field.value);
          });
          const result = await doAppointmentUpdate({
            method: 'put',
            updateData: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });
          if (!didCancel) {
            dispatch({
              type: 'FETCH_SUCCESS',
              payload: result.data
            });
          }
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
  }, [newUpdatedData]);

  return { ...state, setNewUpdatedData };
};
export default useUpdateAppointment;
