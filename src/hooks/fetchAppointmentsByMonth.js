import { useState, useEffect, useReducer } from 'react';

import axios from 'axios';
import moment from 'moment';

const getTimeFormatForBigCalendar = (date, time) => {
  const twentyFour = moment(time, 'h:mm:ss A').format('HH:mm:ss');
  return `${moment(date).format('MMMM')} ${moment(date).date()}, ${moment(
    date
  ).year()} ${twentyFour}`;
};

// more of a convenience method for filtering only one day appointments
const getDayAppointments = ({ schedules, professionals, date }) => {
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
      const professional = [...professionals].find(prof => prof.id === id);
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
      bgColor: 'red'
    }));
    return horarios;
  }
  return [];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isFetchByMonthLoading: true,
        isFetchByMonthError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: false,
        oneMonthAppointments: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isFetchByMonthLoading: false,
        isFetchByMonthError: true
      };
    default:
      throw new Error();
  }
};

const useFetchAppointmentsByMonth = (initialData = {}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isFetchByMonthLoading: false,
    isFetchByMonthError: false,
    oneMonthAppointments: initialData
  });

  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

  const [professionalIds, setProfessionalIds] = useState(['295']);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
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

        const monthDates = getMonthDates(selectedMonth);
        // alert(monthDates);
        const requests = [];
        monthDates.forEach(date => {
          professionalIds.forEach(professionalId => {
            // const url = `${'https://cors-anywhere.herokuapp.com/'}http://test1.saludvitale.com/getDisponibleIdinst?id=${professionalId}&fecha=${date}&inst=187&_=1555334482919`;
            const url = `http://localhost:3000/api/v1/appointment/${date}${professionalId}`;
            requests.push(axios(url));
          });
        });
        const responses = await Promise.all(requests);
        const results = responses.map(resp => resp.data);
        const professionals = [];
        let schedules = [];
        results.forEach(result => {
          const { success, profesionales, horarios } = result;
          if (success) {
            const match = professionals.find(
              prof => prof.id === profesionales.id
            );
            const isAdded = match !== undefined;
            if (!isAdded) {
              professionals.push(profesionales);
            }
            schedules = schedules.concat([...horarios]);
          }
        });
        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: { professionals, schedules }
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [selectedMonth, professionalIds]);

  return {
    ...state,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    getDayAppointments
  };
};
export default useFetchAppointmentsByMonth;
