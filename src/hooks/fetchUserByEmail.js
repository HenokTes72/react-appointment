import { useEffect, useReducer } from 'react';

import { getUserByEmail } from '../config';

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
    case 'SET_EMAIL_AND_CALLBACK':
      return {
        ...state,
        emailAndCallBack: action.payload
      };
    default:
      throw new Error();
  }
};

const useFetchUserByEmail = (initialData = []) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isUserLoading: false,
    isUserError: false,
    userData: initialData,
    emailAndCallBack: {}
  });

  useEffect(() => {
    let didCancel = false;

    const fetchEmails = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const {
          emailAndCallBack: { callback, email }
        } = state;
        const result = await getUserByEmail({ query: email });
        const data = result.data.success ? result.data : {};
        if (!didCancel) {
          if (callback) {
            const { user, paciente } = data;
            const getAttr = attr =>
              (user && user[attr]) || (paciente && paciente[attr]);
            callback({
              id: getAttr('id'),
              nombre: getAttr('first_name'),
              apellido: getAttr('last_name'),
              telefono: getAttr('telefono'),
              email
            });
          }
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

    fetchEmails();

    return () => {
      didCancel = true;
    };
  }, [state.emailAndCallBack]);

  const setEmailAndCallback = emailAndCallBack => {
    dispatch({ type: 'SET_EMAIL_AND_CALLBACK', payload: emailAndCallBack });
  };
  return { ...state, setEmailAndCallback };
};
export default useFetchUserByEmail;
