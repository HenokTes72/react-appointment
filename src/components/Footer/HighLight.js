import styled from 'styled-components';

export default styled.div`
  height: ${props => (props.isMobileScreen ? '5px' : '10px')};
  background-color: #015ca4;
`;
