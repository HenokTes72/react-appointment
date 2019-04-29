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
    case 'SET_SUBMITTER_AND_DATA': {
      const { submitter, data } = action.payload;
      return {
        ...state,
        setSubmitting: submitter,
        newUpdatedData: data
      };
    }
    default:
      throw new Error();
  }
};

const useUpdateAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isUpdateResponseLoading: false,
    isUpdateResponseError: false,
    updateResponse: initialData,
    newUpdatedData: {},
    setSubmitting: null
  });

  useEffect(() => {
    let didCancel = false;

    const updateData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const { newUpdatedData: data, setSubmitting } = state;

        if (data) {
          const bodyFormData = new FormData();
          Object.keys(data).forEach(key => {
            bodyFormData.set(key, data[key]);
          });
          const result = await doAppointmentUpdate({
            method: 'put',
            updateResponse: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });
          if (setSubmitting !== null && result.success) {
            // eslint-disable-next-line no-console
            console.log(
              'SET SUBMITTING CALLED IN UPDATE: ',
              typeof setSubmitting
            );
            setSubmitting(true, 'hello');
          }
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

  const setUpdatedAppointmentData = dataAndSubmitter => {
    dispatch({ type: 'SET_SUBMITTER_AND_DATA', payload: dataAndSubmitter });
  };
  return { ...state, setUpdatedAppointmentData };
};
export default useUpdateAppointment;
