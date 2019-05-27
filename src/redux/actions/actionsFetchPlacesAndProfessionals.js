import {
  FETCH_PLACES_PROFESSIONALS_INIT,
  FETCH_PLACES_PROFESSIONALS_SUCCESS,
  FETCH_PLACES_PROFESSIONALS_FAILURE,
  FETCH_PLACES_AND_PROFESSIONALS
} from '../constants/actionTypes';

const actionFetchPlacesProfessionalsInit = () => ({
  type: FETCH_PLACES_PROFESSIONALS_INIT
});

const actionFetchPlacesProfessionalsFailure = () => ({
  type: FETCH_PLACES_PROFESSIONALS_FAILURE
});

const actionFetchPlacesProfessionalsSuccess = institutionData => ({
  type: FETCH_PLACES_PROFESSIONALS_SUCCESS,
  payload: institutionData
});

const actionFetchPlacesAndProfessionals = () => ({
  type: FETCH_PLACES_AND_PROFESSIONALS
});

export {
  actionFetchPlacesProfessionalsInit,
  actionFetchPlacesProfessionalsFailure,
  actionFetchPlacesProfessionalsSuccess,
  actionFetchPlacesAndProfessionals
};
