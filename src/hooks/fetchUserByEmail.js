import { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isUserLoading: true,
        isUserError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isUserLoading: false,
        isUserError: false,
        userData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isUserLoading: false,
        isUserError: true
      };
    default:
      throw new Error();
  }
};

const useFetchUserByEmail = (initialData = []) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isUserLoading: false,
    isUserError: false,
    userData: initialData
  });

  const [email, setEmail] = useState('');

  let fieldNames = {};
  let fieldValueFunc = null;

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const url = `${'https://cors-anywhere.herokuapp.com/'}http://test1.saludvitale.com/buscaruser?email=${email}`;
      try {
        const result = await axios(url);
        const data = result.data.success ? result.data : {};
        if (fieldValueFunc !== null) {
          const { first_name: firstName, last_name: lastName, telefono } =
            data.user || data.paciente;
          fieldValueFunc(fieldNames.firstName, firstName);
          fieldValueFunc(fieldNames.lastName, lastName);
          fieldValueFunc(fieldNames.phone, telefono);
        }
        console.log('USER', JSON.stringify(data));
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
  }, [email]);

  const setFieldNameAndFunc = (names, func) => {
    fieldNames = names;
    fieldValueFunc = func;
  };

  return { ...state, setEmail, setFieldNameAndFunc };
};
export default useFetchUserByEmail;
