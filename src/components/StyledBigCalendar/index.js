import styled from 'styled-components';
import BigCalendar from 'react-big-calendar';

export default styled(BigCalendar)`
  .rbc-toolbar {
    display: none;
  }

  .rbc-time-view {
    border-left-width: 0px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-color: black;
  }

  .rbc-time-header {
    display: none;
  }

  .rbc-time-content {
    border-top-width: 1px;
    border-color: black;
  }

  .rbc-timeslot-group {
    border-color: black;
    min-height: 60px;
  }

  .rbc-time-content > * + * > * {
    border-color: black;
  }

  .rbc-today {
    background-color: white;
  }

  .rbc-event {
    border-radius: 0px;
    border: 1px solid white;
  }

  .rbc-events-container {
    margin-right: 0px !important;
  }
`;
