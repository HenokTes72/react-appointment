import styled from 'styled-components';

export default styled.div`
  padding-left: ${props => (props.isMobileScreen ? '5px' : '25px')};
  padding-right: ${props => (props.isMobileScreen ? '5px' : '25px')};
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;
