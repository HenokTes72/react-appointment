import styled from 'styled-components';
import './HeaderButton.css';

const StyledButton = styled.button`
  color: ${props => props.color || '#037fbb'};
  background-color: ${props => props.bgcolor || 'white'};
  font-size: ${props => props.size || '15px'};
  padding-left: ${props => props.padding};
  padding-right: ${props => props.padding};
  height: 100%;
  outline: none;
  border-width: 0px;
  border-radius: 0px;
  min-width: 100px;
  &:hover {
    background-color: ${props => (props.bgcolor ? '#044e8a' : '#edeef0')};
  }
`;

export default StyledButton;
