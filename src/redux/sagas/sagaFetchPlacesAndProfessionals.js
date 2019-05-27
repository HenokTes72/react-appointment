import { call, put } from 'redux-saga/effects';
import {
  actionFetchPlacesProfessionalsInit,
  actionFetchPlacesProfessionalsFailure,
  actionFetchPlacesProfessionalsSuccess
} from '../actions/actionsFetchPlacesAndProfessionals';
import { actionSetProfessionalIds } from '../actions/actionsFetchAppointmentsByMonth';
import { getBasicInfo } from '../../config';

function* fetchPlacesAndProfessionals() {
  yield put(actionFetchPlacesProfessionalsInit());

  try {
    const result = yield call(getBasicInfo);
    const { doctores } = result.data;
    const professionalIds = doctores.map(doc => doc.user_id);
    yield put(actionSetProfessionalIds(professionalIds));

    yield put(actionFetchPlacesProfessionalsSuccess(result.data));
  } catch (error) {
    yield put(actionFetchPlacesProfessionalsFailure());
  }
}

export default fetchPlacesAndProfessionals;
