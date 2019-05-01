import React from 'react';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import moment from 'moment';

// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';

// Make sure moment.js has the required locale data
import 'moment/locale/es';

const Wrapper = styled.div`
  margin-bottom: 25px;
  width: 100%;
  .DayPicker-Month,
  .DayPicker {
    width: 100%;
  }
`;

const Calendar = ({
  schedules,
  daySelected,
  initialMonth,
  setSelectedMonth
}) => {
  const appointmentDates = schedules.map(schedule => schedule.slot_date);
  const handleDayClick = day => {
    daySelected(moment(day).format('YYYY-MM-DD'));
  };

  const isSelected = day => {
    const match = appointmentDates.find(date => {
      return date === moment(day).format('YYYY-MM-DD');
    });
    return match !== undefined;
  };

  const isDisabled = day => {
    if (!appointmentDates) {
      return false;
    }
    const match = appointmentDates.find(date => {
      return date === moment(day).format('YYYY-MM-DD');
    });
    return match === undefined;
  };
  return (
    <Wrapper>
      <div>
        <DayPicker
          localeUtils={MomentLocaleUtils}
          locale={'es'}
          initialMonth={moment(initialMonth, 'YYYY-MM-DD').toDate()}
          selectedDays={isSelected}
          disabledDays={isDisabled}
          onMonthChange={date => {
            setSelectedMonth(moment(date).format('YYYY-MM-DD'));
          }}
          onDayClick={handleDayClick}
        />
      </div>
    </Wrapper>
  );
};

Calendar.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object),
  setSelectedMonth: PropTypes.func.isRequired,
  initialMonth: PropTypes.string.isRequired,
  daySelected: PropTypes.func.isRequired
};

export default Calendar;
