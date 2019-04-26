import { useEffect, useReducer } from 'react';

import { getUserByName } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isNamedUserLoading: true,
        isNamedUserError: false
      };
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        isNamedUserLoading: false,
        isNamedUserError: false,
        namedUsersData: action.payload
      };
    }

    case 'FETCH_FAILURE':
      return {
        ...state,
        isNamedUserLoading: false,
        isNamedUserError: true
      };
    case 'SET_NAME': {
      return {
        ...state,
        name: action.payload
      };
    }

    default:
      throw new Error();
  }
};

const useFetchNames = (initialData = []) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isNamedUserLoading: false,
    isNamedUserError: false,
    namedUsersData: initialData,
    name: ''
  });

  useEffect(() => {
    let didCancel = false;

    const fetchUser = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const { name } = state;
        const result = await getUserByName({ name });
        const data = result.data.success ? result.data.paciente : [];
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

    fetchUser();

    return () => {
      didCancel = true;
    };
  }, [state.name]);

  const setName = value => {
    dispatch({ type: 'SET_NAME', payload: value });
  };
  return { ...state, setName };
};
export default useFetchNames;
