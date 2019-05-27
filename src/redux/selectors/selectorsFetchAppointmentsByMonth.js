const selectActiveSchedules = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.activeSchedulesCache;

const selectSelectedMonth = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.selectedMonth;

const selectProfessionalIds = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.professionalIds;

const selectIsFetchByMonthLoading = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.isFetchByMonthLoading;

const selectIsFetchByMonthError = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.isFetchByMonthError;

const selectSchedules = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.schedules;

export {
  selectActiveSchedules,
  selectSelectedMonth,
  selectProfessionalIds,
  selectIsFetchByMonthLoading,
  selectIsFetchByMonthError,
  selectSchedules
};
