// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import ColorContext from '../../contexts/colorContext';
import StyledBigCalendar from '../StyledBigCalendar';

import addDuration from '../../utils/addDuration';
import type { ICompactAppointment } from '../../types/appointmentCompact';
import getDuration from '../../utils/getDuration';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = StyledBigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Wrapper = styled.div`
  min-width: 300px;
`;

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

type IEvent = {|
  allDay: boolean,
  start: Date,
  id: number | string,
  end: Date,
  title: string,
  doctor_id: number | string,
  specialist: string,
  isThin: boolean
|};

// more of a convenience method for filtering only one day appointments
const getEvents = ({
  schedules,
  doctores
}: {
  schedules: Array<ICompactAppointment>,
  doctores: Array<Object>
}) => {
  if (schedules) {
    const getProfessionalName = id => {
      const professional: Object = [...doctores].find(
        prof => prof.user_id === id
      );
      return `${professional.first_name} ${professional.last_name}`;
    };
    const horarios: Array<IEvent> = schedules.map(appointment => ({
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
      title: `${getProfessionalName(appointment.doctor_id)}, Patiente ${
        appointment.patient
      }`,
      specialist: getProfessionalName(appointment.doctor_id),
      doctor_id: appointment.doctor_id,
      isThin:
        getDuration(appointment.inicio, appointment.fin).indexOf('minut') !== -1
    }));
    return horarios;
  }
  return [];
};

const DayView = ({
  setEventModalVisiblity,
  dailySchedules,
  doctores,
  setIdAndName
}: {
  setEventModalVisiblity: boolean => void,
  dailySchedules: Array<ICompactAppointment>,
  doctores: Array<any>,
  setIdAndName: ({ id: string | number, name: string }) => void
}) => {
  const { getColor } = useContext(ColorContext);
  const onEventSelect = event => {
    setEventModalVisiblity(true);
    setIdAndName({ id: event.id, name: event.specialist });
  };
  const eventStyleGetter = event => {
    return {
      style: {
        backgroundColor: getColor(event.doctor_id),
        borderRadius: '0px',
        border: 'white',
        color: 'white',
        opacity: 0.8,
        display: event.isThin ? 'flex' : 'block'
      }
    };
  };

  return (
    <Wrapper>
      <StyledBigCalendar
        events={getEvents({ schedules: dailySchedules, doctores })}
        defaultView={StyledBigCalendar.Views.DAY}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={event => onEventSelect(event)}
        formats={{
          timeGutterFormat: (date, culture, localizzzer) =>
            localizzzer.format(date, 'hh:mm A', culture)
        }}
      />
    </Wrapper>
  );
};

DayView.propTypes = {
  setEventModalVisiblity: PropTypes.func.isRequired,
  dailySchedules: PropTypes.array.isRequired,
  doctores: PropTypes.array,
  setIdAndName: PropTypes.func.isRequired
};

export default DayView;
