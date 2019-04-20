import { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isPostResponseLoading: true,
        isPostResponseError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isPostResponseLoading: false,
        isPostResponseError: false,
        postData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isPostResponseLoading: false,
        isPostResponseError: true
      };
    default:
      throw new Error();
  }
};

const usePostAppointment = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isPostResponseLoading: false,
    isPostResponseError: false,
    postData: initialData
  });

  const [newAppointmentData, setNewAppointmentData] = useState({});

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const url = `${'https://cors-anywhere.herokuapp.com/'}https://test1.saludvitale.com/crearcitainst`;
      try {
        if (newAppointmentData) {
          console.log('DATA TO GO', JSON.stringify(newAppointmentData));
          const bodyFormData = new FormData();
          newAppointmentData.forEach(field => {
            bodyFormData.set(field.name, field.value);
          });
          const result = await axios({
            method: 'post',
            url,
            postData: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });
          console.log('AXIOS RESULT', result);
          if (!didCancel) {
            dispatch({
              type: 'FETCH_SUCCESS',
              payload: result
            });
          }
        }
      } catch (error) {
        console.log('ERROR', JSON.stringify(error));
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

  return { ...state, setNewAppointmentData };
};
export default usePostAppointment;
