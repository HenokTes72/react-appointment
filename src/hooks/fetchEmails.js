import { useState, useEffect, useReducer } from 'react';

import { parse } from 'node-html-parser';
import { getEmails } from '../config';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isEmailsListLoading: true,
        isEmailsListError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isEmailsListLoading: false,
        isEmailsListError: false,
        emails: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isEmailsListLoading: false,
        isEmailsListError: true
      };
    default:
      throw new Error();
  }
};

const useFetchEmails = (initialData = []) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isEmailsListLoading: false,
    isEmailsListError: false,
    emails: initialData
  });

  const [query, setQuery] = useState('a');

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await getEmails({ query });
        const root = parse(result.data);
        const emailsList = root
          .querySelectorAll('a')
          .map(anchorData => anchorData.childNodes[0].rawText);
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: emailsList
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
  }, [query]);

  return { ...state, setQuery };
};
export default useFetchEmails;
