/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import moment from 'moment';

const Wrapper = styled.div`
  margin-bottom: 25px;
`;

const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre'
];
const WEEKDAYS_LONG = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato'
];
const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];

const modifiers = {
  alldays: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] }
};

const allDayStyle = `.DayPicker-Day--alldays {
  width: 25px !important;
  height: 25px !important;
  margin-top: 3px !important;
}`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.state = { appointmentDates: props.appointmentDates };
  }

  handleDayClick(day) {
    // const { appointmentDates } = this.state;
    // if (selected) {
    //   const selectedIndex = appointmentDates.findIndex(selectedDay =>
    //     DateUtils.isSameDay(selectedDay, day)
    //   );
    //   appointmentDates.splice(selectedIndex, 1);
    // } else {
    //   appointmentDates.push(day);
    // }
    console.log('HANDLE DAY CLICK CALLED');
    this.props.daySelected(moment(day).format('YYYY-MM-DD'));
    // this.setState({ appointmentDates });
  }

  isSelected(day) {
    const { appointmentDates } = this.state;
    if (!appointmentDates) {
      return false;
    }
    const match = appointmentDates.find(date => {
      return date === moment(day).format('YYYY-MM-DD');
    });
    return match !== undefined;
  }

  isDisabled(day) {
    const { appointmentDates } = this.state;
    if (!appointmentDates) {
      return false;
    }
    const match = appointmentDates.find(date => {
      return date === moment(day).format('YYYY-MM-DD');
    });
    return match === undefined;
  }

  render() {
    return (
      <Wrapper>
        <div>
          <style>{allDayStyle}</style>
          <DayPicker
            locale="it"
            modifiers={modifiers}
            months={MONTHS}
            initialMonth={moment(
              this.props.initialMonth,
              'YYYY-MM-DD'
            ).toDate()}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            selectedDays={this.isSelected}
            disabledDays={this.isDisabled}
            onMonthChange={date => {
              this.props.setSelectedMonth(date);
            }}
            onDayClick={this.handleDayClick}
          />
        </div>
      </Wrapper>
    );
  }
}

Calendar.propTypes = {
  appointmentDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  initialMonth: PropTypes.string.isRequired,
  daySelected: PropTypes.func.isRequired
};

export default Calendar;
