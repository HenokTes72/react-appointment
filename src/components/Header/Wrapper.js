import styled from 'styled-components';

export default styled.div`
  z-index: 1000;
  position: fixed;
  width: 100%;
  background-color: white;
  display: flex;
  padding-left: 10px;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.height};
  -moz-box-shadow: 1px 1px 5px 2px #ccc;
  -webkit-box-shadow: 1px 1px 5px 2px #ccc;
  box-shadow: 1px 1px 5px 2px #ccc;
`;
