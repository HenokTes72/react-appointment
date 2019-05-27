import {
  FETCH_PLACES_PROFESSIONALS_INIT,
  FETCH_PLACES_PROFESSIONALS_SUCCESS,
  FETCH_PLACES_PROFESSIONALS_FAILURE
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isBasicsLoading: false,
  isBasicsError: false,
  institutionData: {}
};

const reducerFetchPlacesAndProfessionals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACES_PROFESSIONALS_INIT:
      return {
        ...state,
        isBasicsLoading: true,
        isBasicsError: false
      };
    case FETCH_PLACES_PROFESSIONALS_SUCCESS:
      return {
        ...state,
        isBasicsLoading: false,
        isBasicsError: false,
        institutionData: action.payload
      };
    case FETCH_PLACES_PROFESSIONALS_FAILURE:
      return {
        ...state,
        isBasicsLoading: false,
        isBasicsError: true
      };
    default:
      return { ...state };
  }
};

export default reducerFetchPlacesAndProfessionals;
