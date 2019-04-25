import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 20px;
  height: 600px;
  overflow-y: scroll;
`;

const CalendarWrapper = styled(Wrapper)`
  width: 300px;
  padding-top: 50px;
  margin: ${props => (props.isMobileScreen ? 'auto' : '')};
`;

const AppointmentWrapper = styled(Wrapper)`
  margin-left: 10px;
  margin-right: 5px;
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 20px;
`;

export { CalendarWrapper, AppointmentWrapper };
