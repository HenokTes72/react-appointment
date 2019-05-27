const selectUpdaterSetSubmitting = ({ stateUpdateAppointment }) =>
  stateUpdateAppointment.setSubmitting;
const selectUpdatedAppointmentData = ({ stateUpdateAppointment }) =>
  stateUpdateAppointment.newUpdatedData;

export { selectUpdaterSetSubmitting, selectUpdatedAppointmentData };
