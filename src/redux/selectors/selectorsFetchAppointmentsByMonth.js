const selectActiveSchedules = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.activeSchedulesCache;

const selectSelectedMonth = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.selectedMonth;

const selectProfessionalIds = ({ stateFetchAppointmentsByMonth }) =>
  stateFetchAppointmentsByMonth.professionalIds;

export { selectActiveSchedules, selectSelectedMonth, selectProfessionalIds };
