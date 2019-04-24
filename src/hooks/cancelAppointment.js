import { useEffect, useReducer } from 'react';

import { doAppointmentCancel } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isCancelResponseLoading: true,
        isCancelResponseError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isCancelResponseLoading: false,
        isCancelResponseError: false,
        cancelResponse: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isCancelResponseLoading: false,
        isCancelResponseError: true
      };
    case 'SET_CANCEL':
      return {
        ...state,
        cancel: action.payload
      };
    default:
      throw new Error();
  }
};

const userCancelAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isCancelResponseLoading: false,
    isCancelResponseError: false,
    cancelResponse: initialData,
    cancel: false
  });

  useEffect(() => {
    let didCancel = false;

    const cancelAppointment = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await doAppointmentCancel();
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: result.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    cancelAppointment();

    return () => {
      didCancel = true;
    };
  }, [state.cancel]);

  const setCancel = cancel => dispatch({ type: 'SET_CANCEL', payload: cancel });

  return { ...state, setCancel };
};
export default userCancelAppointment;
