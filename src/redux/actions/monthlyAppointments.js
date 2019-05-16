import {
  MONTHLY_APPOINTMENTS_ADD,
  MONTHLY_APPOINTMENTS_FETCH,
  MONTHLY_APPOINTMENTS_FETCH_ERROR
} from '../constants/actionTypes';

const doAddMonthlyAppointments = monthlyAppointments => ({
  type: MONTHLY_APPOINTMENTS_ADD,
  monthlyAppointments
});

const doFetchMonthlyAppointments = query => ({
  type: MONTHLY_APPOINTMENTS_FETCH,
  query
});

const doHandleMonthlyFetchError = message => ({
  type: MONTHLY_APPOINTMENTS_FETCH_ERROR,
  message
});

export {
  doAddMonthlyAppointments,
  doFetchMonthlyAppointments,
  doHandleMonthlyFetchError
};
