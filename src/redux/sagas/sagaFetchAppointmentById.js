import { call, put, select } from 'redux-saga/effects';
import {
  actionFetchAppointmentInit,
  actionFetchAppointmentFailure,
  actionFetchAppointmentSuccess
} from '../actions/actionsFetchAppointmentById';
import {
  selectIdAndName,
  selectCachedAppointments
} from '../selectors/selectorsFetchAppointmentById';
import { getAppointmentById } from '../../config';
import getDuration from '../../utils/getDuration';

const getAttr = (object1, object2, attr) => {
  return (object1 && object1[attr]) || (object2 && object2[attr]);
};

function* fetchAppointmentById(action) {
  yield put(actionFetchAppointmentInit());

  try {
    const idAndName = yield select(selectIdAndName);
    const { id, name: specialistName } = idAndName;
    const cache = yield select(selectCachedAppointments);
    const cachedAppointment = cache.find(
      appointment => parseInt(id, 10) === parseInt(appointment.id, 10)
    );
    let data;
    if (cachedAppointment) {
      data = cachedAppointment;
    } else {
      const { secret = 1555334482919 } = action.payload;
      const result = yield call(getAppointmentById, { ...idAndName, secret });
      const { user: usersList, paciente: patientsList } = result.data;
      const [user] = usersList;
      const [paciente] = patientsList;
      const startTime = getAttr(user, paciente, 'inicio');
      const endTime = getAttr(user, paciente, 'fin');
      data = {
        id: user.id,
        specialist: {
          id: getAttr(user, paciente, 'doctorId'),
          name: specialistName
        },
        patient: {
          id: getAttr(user, paciente, 'paciente_id'),
          email: getAttr(paciente, user, 'email'),
          firstName: getAttr(paciente, user, 'nombre'),
          lastName: getAttr(paciente, user, 'apellido'),
          phone: getAttr(paciente, user, 'telefono')
        },
        appointment: {
          place: {
            id: getAttr(user, paciente, 'clinicaId'),
            name: getAttr(user, paciente, 'clinica')
          },
          date: getAttr(user, paciente, 'slot_date'),
          startTime,
          endTime,
          duration: getDuration(startTime, endTime),
          detail: getAttr(user, paciente, 'detalle'),
          consulta: getAttr(user, paciente, 'tipoConsulta')
        },
        emailCheck: false
      };
    }
    yield put(actionFetchAppointmentSuccess(data));
  } catch (error) {
    yield put(actionFetchAppointmentFailure());
  }
}

export default fetchAppointmentById;
