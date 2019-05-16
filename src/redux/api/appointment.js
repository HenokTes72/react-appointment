const APPOINTMENT_BASE_URL = 'http://localhost:5001/api/v1/appointment/date/';

const fetchAppointments = query =>
  fetch(APPOINTMENT_BASE_URL + query).then(response => response.json());

export default fetchAppointments;
