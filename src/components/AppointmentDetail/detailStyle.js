import styled from 'styled-components';
import P from '../P';

export const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  padding-left: ${props => (props.isMobileScreen ? '0px' : '50px')};
  padding-right: ${props => (props.isMobileScreen ? '0px' : '50px')};
  justify-content: ${props =>
    props.isMobileScreen ? 'flex-start' : 'space-between'};
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
`;

export const EndDetailWrapper = styled(DetailWrapper)`
  margin-left: ${props => (props.isMobileScreen ? '10px' : '100px')};
`;

export const PB = styled(P)`
  margin: 0px;
  font-weight: bold;
  font-family: sans-serif;
  color: black;
`;

export const DetailItems = styled.div`
  margin-bottom: 15px;
`;

export const PP = styled(P)`
  margin: 0px;
  font-size: 15px;
  font-weight: 400;
  color: #1f1f1f;
  font-family: inherit;
`;
