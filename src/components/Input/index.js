import styled from 'styled-components';
import './index.css';

export default styled.input`
  outline: none;
  border-width: 0px;
  border-bottom: 1px solid #798da0;
  opacity: 0.4;
  font-size: 16px;
  color: black;

  &:focus {
    border-bottom: 2px solid purple;
    opacity: 1;
  }
`;
