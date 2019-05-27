const selectSetSubmitting = ({ stateCreateAppointment }) =>
  stateCreateAppointment.setSubmitting;
const selectNewAppointmentData = ({ stateCreateAppointment }) =>
  stateCreateAppointment.newAppointmentData;

export { selectSetSubmitting, selectNewAppointmentData };
