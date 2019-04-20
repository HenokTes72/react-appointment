import { useEffect, useReducer } from 'react';

import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isBasicsLoading: true,
        isBasicsError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isBasicsLoading: false,
        isBasicsError: false,
        institutionData: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isBasicsLoading: false,
        isBasicsError: true
      };
    default:
      throw new Error();
  }
};

const useFetchPlaceAndProfessional = ({
  initialData = [],
  setProfessionalIds
}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isBasicsLoading: false,
    isBasicsError: false,
    institutionData: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const url = `http://localhost:3000/api/v1/appointment/basics`;
      try {
        const result = await axios(url);
        const { doctores } = result.data;
        const professionalIds = doctores.map(doc => doc.user_id);
        // eslint-disable-next-line no-console
        // console.log('PROF IDS', JSON.stringify(professionalIds));
        setProfessionalIds(professionalIds);
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

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return { ...state };
};
export default useFetchPlaceAndProfessional;
