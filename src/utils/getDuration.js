import moment from 'moment';

const getDuration = (start, end) => {
  if (!end || end === '') {
    return '1 hour';
  }
  const duration =
    moment(end, 'hh:mm A').minutes() - moment(start, 'hh:mm A').minutes();
  if (duration < 11) {
    return '10 minutos';
  }
  if (duration < 16) {
    return '15 minutos';
  }
  if (duration < 21) {
    return '20 minutos';
  }
  if (duration < 31) {
    return '30 minutos';
  }
  if (duration < 120) {
    return '1 hora';
  }
  if (duration < 601) {
    return `${duration / 60} horas`;
  }
  return '10 horas';
};

export default getDuration;
