import React from 'react';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import PropTypes from 'prop-types';

import StyledBigCalendar from '../StyledBigCalendar';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = StyledBigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Wrapper = styled.div`
  min-width: 300px;
`;

const DayView = ({ setEventModalVisiblity, schedules, setIdAndName }) => {
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
    setEventModalVisiblity(true);
    setIdAndName({ id: event.id, name: event.specialist });
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
  schedules: PropTypes.array.isRequired,
  setIdAndName: PropTypes.func.isRequired
};

export default DayView;
