import moment from 'moment';

const getMonthDates = dateInMonthStr => {
  const dateInMonth = moment(dateInMonthStr, 'YYYY-MM-DD');
  const monthDates = [];
  const daysAhead = dateInMonth.daysInMonth();
  let thisDate;
  for (let i = 1; i <= daysAhead; i += 1) {
    thisDate = dateInMonth.set('date', i);
    monthDates.push(moment(thisDate).format('YYYY-MM-DD'));
  }
  return monthDates;
};

export default getMonthDates;
