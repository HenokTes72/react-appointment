import { call, put, select } from 'redux-saga/effects';

import {
  actionCreateAppointmentInit,
  actionCreateAppointmentFailure,
  actionCreateAppointmentSuccess
} from '../actions/actionsCreateAppointment';
import {
  selectSetSubmitting,
  selectNewAppointmentData
} from '../selectors/selectorsCreateAppointment';

import { getAvailabilityById, doAppointmentCreate } from '../../config';

function* createAppointment() {
  yield put(actionCreateAppointmentInit());

  try {
    const setSubmitting = yield select(selectSetSubmitting);
    const newAppointmentData = yield select(selectNewAppointmentData);
    const {
      specialist: { id: doctorId },
      appointment: { startTime, endTime, date }
    } = newAppointmentData;
    const availabilityQuery = yield call(getAvailabilityById, {
      doctorId,
      startTime,
      endTime,
      date
    });
    const { success } = availabilityQuery.data;
    if (success) {
      const bodyFormData = new FormData();
      // write to bodyFormData, be sure to mind the nested
      // nature of the appointment data
      // Object.keys(newAppointmentData).forEach(name => {
      //   bodyFormData.set(name, newAppointmentData[name])
      // });
      const result = yield call(doAppointmentCreate, {
        method: 'post',
        postData: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });

      if (setSubmitting !== null && result.success) {
        setSubmitting(true);
      }
      yield put(actionCreateAppointmentSuccess(result));
    } else {
      setSubmitting(false, ', Slot is already booked.');
    }
  } catch (error) {
    yield put(actionCreateAppointmentFailure());
  }
}

export default createAppointment;
