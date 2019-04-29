// @flow
import moment from 'moment';
import addDuration from './addDuration';
import type { ISchedule } from '../types/schedule';

const getTimeFormatForBigCalendar = (date, time) => {
  const twentyFour = moment(time, 'h:mm:ss A')
    .locale('en')
    .format('HH:mm:ss');
  return `${moment(date)
    .locale('en')
    .format('MMMM')} ${moment(date).date()}, ${moment(
    date
  ).year()} ${twentyFour}`;
};

const getEndTime = (endTime, startTime) => {
  if (!endTime || endTime === '') {
    return addDuration(startTime, '1 hora');
  }
  return endTime;
};

type TitleArgs = {|
  duration: string,
  specialist: string,
  patient: string
|};

type IHorarios = {|
  allDay: boolean,
  start: Date,
  id: number | string,
  end: Date,
  title: string,
  bgColor: string,
  doctor_id: number | string,
  specialist: string
|};

const getTitle = ({ duration, specialist, patient }: TitleArgs) => {
  let durationInMinutes;
  const durationString = duration === undefined ? '1 hora' : duration;
  if (durationString.indexOf('hora') !== -1) {
    durationInMinutes = parseInt(durationString, 10) * 60;
  } else {
    durationInMinutes = parseInt(durationString, 10);
  }
  // eslint-disable-next-line no-console
  console.log(`DURATION IN MINUTES: ${durationInMinutes}`);
  if (durationInMinutes < 60) {
    return '';
  }
  return `Dr. ${specialist}, Patiente ${patient}`;
};

// more of a convenience method for filtering only one day appointments
const getDayAppointments = ({
  schedules,
  doctores,
  date
}: {
  schedules: Array<ISchedule>,
  doctores: Array<Object>,
  date: string | Date
}) => {
  // eslint-disable-next-line no-console
  console.log('SCHEDULES LEN IN GET DAY APPS: ', schedules.length);
  if (schedules) {
    const dateMatches = schedules.filter(
      appointment => appointment.slot_date === date
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
    const getProfessionalName = id => {
      const professional: Object = [...doctores].find(
        prof => prof.user_id === id
      );
      return `${professional.first_name} ${professional.last_name}`;
    };
    const horarios: Array<IHorarios> = filteredMatches.map(appointment => ({
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
          getEndTime(appointment.fin, appointment.inicio)
        )
      ),
      title: getTitle({
        duration: appointment.duration,
        specialist: getProfessionalName(appointment.doctor_id),
        patient: appointment.patient
      }),
      specialist: getProfessionalName(appointment.doctor_id),
      bgColor: 'red',
      doctor_id: appointment.doctor_id
    }));
    return horarios;
  }
  return [];
};

export default getDayAppointments;
