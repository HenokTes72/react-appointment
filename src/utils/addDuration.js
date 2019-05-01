import moment from 'moment';

const addDuration = (start, duration) => {
  // eslint-disable-next-line no-restricted-globals
  const durationString = isNaN(parseInt(duration, 10))
    ? '60 minutos'
    : duration;
  const addHours =
    durationString.indexOf('hora') !== -1 ||
    durationString.indexOf('hour') !== -1;
  return moment(start, 'hh:mm A')
    .add(parseInt(durationString, 10), addHours ? 'hours' : 'minutes')
    .format('hh:mm A');
};

export default addDuration;
