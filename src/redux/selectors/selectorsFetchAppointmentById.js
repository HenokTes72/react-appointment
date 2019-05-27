const selectIsAppointmentLoading = ({ stateFetchAppointmentById }) =>
  stateFetchAppointmentById.isAppointmentLoading;

const selectIsFetchAppointmentError = ({ stateFetchAppointmentById }) =>
  stateFetchAppointmentById.isAppointmentError;

const selectIdAndName = ({ stateFetchAppointmentById }) =>
  stateFetchAppointmentById.idAndName;

const selectAppointment = ({ stateFetchAppointmentById }) =>
  stateFetchAppointmentById.appointmentData;

const selectCachedAppointments = ({ stateFetchAppointmentById }) =>
  stateFetchAppointmentById.cachedAppointments;

export {
  selectIsAppointmentLoading,
  selectIsFetchAppointmentError,
  selectIdAndName,
  selectAppointment,
  selectCachedAppointments
};
