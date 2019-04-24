import moment from 'moment';

const getTimeFormatForBigCalendar = (date, time) => {
  const twentyFour = moment(time, 'h:mm:ss A').format('HH:mm:ss');
  return `${moment(date).format('MMMM')} ${moment(date).date()}, ${moment(
    date
  ).year()} ${twentyFour}`;
};

// more of a convenience method for filtering only one day appointments
const getDayAppointments = ({ schedules, doctores, date }) => {
  if (schedules) {
    const dateMatches = schedules.filter(
      appointment => appointment.slot_date === date
    );
    // eslint-disable-next-line no-console
    console.log(
      'DATE',
      date,
      'DAY MATCHES: ',
      dateMatches.length,
      'SCHEDULES:',
      schedules.length,
      'DATES',
      JSON.stringify([...schedules].map(schedule => schedule.slot_date))
    );
    if (dateMatches === undefined) {
      return [];
    }
    const addedIds = [];
    const filteredMatches = [];
    dateMatches.forEach(match => {
      if (addedIds.indexOf(match.id) === -1) {
        addedIds.push(match.id);
        filteredMatches.push(match);
      }
    });
    // eslint-disable-next-line no-console
    console.log('FILTERED MATCHES: ', filteredMatches.length);
    const getProfessionalName = id => {
      const professional = [...doctores].find(prof => prof.user_id === id);
      return `${professional.first_name} ${professional.last_name}`;
    };
    const horarios = filteredMatches.map(appointment => ({
      allDay: false,
      start: new Date(
        getTimeFormatForBigCalendar(
          moment().format('YYYY-MM-DD'),
          appointment.inicio
        )
      ),
      id: appointment.id,
      end: new Date(
        getTimeFormatForBigCalendar(
          moment().format('YYYY-MM-DD'),
          appointment.fin ||
            `${parseInt(appointment.inicio[0], 10) +
              2}${appointment.inicio.slice(1, appointment.inicio.length - 1)}`
        )
      ),
      title: getProfessionalName(appointment.doctor_id),
      bgColor: 'red',
      doctor_id: appointment.doctor_id
    }));
    // eslint-disable-next-line no-console
    console.log('RETURNING HORARIOS: ', horarios.length);
    return horarios;
  }
  return [];
};

export default getDayAppointments;
