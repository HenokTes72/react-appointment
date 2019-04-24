import { useEffect, useReducer } from 'react';

import { getBasicInfo } from '../config';

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
      try {
        const result = await getBasicInfo();
        const { doctores } = result.data;
        const professionalIds = doctores.map(doc => doc.user_id);
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
