import { call, put, select } from 'redux-saga/effects';

import {
  actionUpdateAppointmentInit,
  actionUpdateAppointmentFailure,
  actionUpdateAppointmentSuccess
} from '../actions/actionsUpdateAppointment';
import {
  selectUpdaterSetSubmitting,
  selectUpdatedAppointmentData
} from '../selectors/selectorsUpdateAppointment';

import { getAvailabilityById, doAppointmentUpdate } from '../../config';

function* updateAppointment() {
  yield put(actionUpdateAppointmentInit());

  try {
    const setSubmitting = yield select(selectUpdaterSetSubmitting);
    const data = yield select(selectUpdatedAppointmentData);

    const {
      specialist: { id: doctorId },
      appointment: { startTime, endTime, date }
    } = data;
    const availabilityQuery = yield call(getAvailabilityById, {
      doctorId,
      startTime,
      endTime,
      date
    });
    const { success } = availabilityQuery.data;
    if (success) {
      if (data) {
        const bodyFormData = new FormData();
        // write to bodyFormData, be sure to mind the nested
        // nature of the appointment data
        // Object.keys(data).forEach(key => {
        //   bodyFormData.set(key, data[key]);
        // });
        const result = yield call(doAppointmentUpdate, {
          method: 'put',
          updateResponse: bodyFormData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        if (setSubmitting !== null && result.success) {
          // eslint-disable-next-line no-console
          console.log(
            'SET SUBMITTING CALLED IN UPDATE: ',
            typeof setSubmitting
          );
          setSubmitting(true, 'hello');
        }
        yield put(actionUpdateAppointmentSuccess(result.data));
      }
    } else {
      setSubmitting(false, ', Slot is already booked.');
    }
  } catch (error) {
    yield put(actionUpdateAppointmentFailure());
  }
}

export default updateAppointment;
