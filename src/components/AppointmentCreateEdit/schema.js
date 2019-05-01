import * as Yup from 'yup';

const AppointmentSchema = Yup.object().shape({
  specialist: Yup.object().shape({
    id: Yup.string().required('Required'),
    name: Yup.string().required('Required')
  }),
  patient: Yup.object().shape({
    id: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phone: Yup.string().required('Required')
  }),
  appointment: Yup.object().shape({
    place: Yup.object().shape({
      id: Yup.string().required('Required'),
      name: Yup.string().required('Required')
    }),
    date: Yup.date().required('Required'),
    startTime: Yup.string().required('Required'),
    duration: Yup.string().required('Required'),
    detail: Yup.string().required('Required')
  }),
  emailCheck: Yup.bool().notRequired()
});

export default AppointmentSchema;
