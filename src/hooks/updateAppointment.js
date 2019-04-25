import { useEffect, useReducer } from 'react';

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
        updateResponse: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isUpdateResponseLoading: false,
        isUpdateResponseError: true
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        newUpdatedData: action.payload
      };
    default:
      throw new Error();
  }
};

const useUpdateAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isUpdateResponseLoading: false,
    isUpdateResponseError: false,
    updateResponse: initialData,
    newUpdatedData: {}
  });

  useEffect(() => {
    let didCancel = false;

    const updateData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        if (state.newUpdatedData) {
          const bodyFormData = new FormData();
          const { newUpdatedData: data } = state;
          Object.keys(data).forEach(key => {
            bodyFormData.set(key, data[key]);
          });
          const result = await doAppointmentUpdate({
            method: 'put',
            updateResponse: bodyFormData,
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

    updateData();

    return () => {
      didCancel = true;
    };
  }, [state.newUpdatedData]);

  const setNewUpdatedData = data => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  };

  return { ...state, setNewUpdatedData };
};
export default useUpdateAppointment;
