import React from 'react';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import PropTypes from 'prop-types';

import StyledBigCalendar from '../BigCalendar';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = StyledBigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Wrapper = styled.div`
  min-width: 300px;
`;

const MyCalendar = ({ setEventModalVisiblity, schedules, setIdAndName }) => {
  const today = `${moment().format(
    'MMMM'
  )} ${moment().date()}, ${moment().year()}`;

  // eslint-disable-next-line no-unused-vars
  const dummyEvents = [
    {
      allDay: false,
      start: new Date(`${today} 8:10:00`),
      end: new Date(`${today} 9:10:00`),
      title: 'Dr Bura, dentist',
      bgColor: 'black'
    },
    {
      allDay: false,
      start: new Date(`${today} 2:10:00`),
      end: new Date(`${today} 2:45:00`),
      title: 'Dr Dave, dentist',
      bgColor: 'lemon'
    },
    {
      allDay: false,
      start: new Date(`${today} 11:13:00`),
      end: new Date(`${today} 13:00:00`),
      title: 'Dr Henok, football',
      bgColor: 'purple'
    },
    {
      allDay: false,
      start: new Date(`${today} 1:30:00`),
      end: new Date(`${today} 2:30:00`),
      title: 'Dr Mezi, tennsi',
      bgColor: 'green'
    }
  ];

  const eventStyleGetter = event => {
    const backgroundColor = event.bgColor;
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };

    return {
      style
    };
  };

  const onEventSelect = event => {
    setEventModalVisiblity();
    setIdAndName({ id: event.id, name: event.title });
  };

  return (
    <Wrapper>
      <StyledBigCalendar
        events={schedules}
        defaultView={StyledBigCalendar.Views.DAY}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={event => onEventSelect(event)}
      />
    </Wrapper>
  );
};

MyCalendar.propTypes = {
  setEventModalVisiblity: PropTypes.func.isRequired,
  schedules: PropTypes.array.isRequired,
  setIdAndName: PropTypes.func.isRequired
};

export default MyCalendar;
