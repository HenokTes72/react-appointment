import { useEffect, useReducer } from 'react';

import { doAppointmentCancel } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'CANCEL_INIT':
      return {
        ...state,
        isCancelResponseLoading: true,
        isCancelResponseError: false
      };
    case 'CANCEL_SUCCESS':
      return {
        ...state,
        isCancelResponseLoading: false,
        isCancelResponseError: false,
        cancelResponse: action.payload
      };
    case 'CANCEL_FAILURE':
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
      dispatch({ type: 'CANCEL_INIT' });
      try {
        const result = await doAppointmentCancel();
        if (!didCancel) {
          dispatch({
            type: 'CANCEL_SUCCESS',
            payload: result.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'CANCEL_FAILURE' });
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
