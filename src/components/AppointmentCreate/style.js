import styled, { css } from 'styled-components';
import { Checkbox } from 'antd';
import H2 from '../H2';
import MyInput from '../Input';
import { StyledButton } from '../Button';

export const Wrapper = styled.div`
  margin-top: 10px;
  padding-left: ${props => (props.isMobileScreen ? '0px' : '25px')};
  padding-right: ${props => (props.isMobileScreen ? '0px' : '25px')};
  display: flex;
  flex-direction: column;
`;

export const StyledH2 = styled(H2)`
  text-align: center;
  font-weight: bold;
`;

export const SizeStyledH2 = styled(StyledH2)`
  font-size: 16px;
  text-align: start;
  margin-bottom: 15px;
`;

export const FormDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const FormGroup = styled.div`
  display: flex;
  flex: ${props => (props.isMobileScreen ? '1' : '0.5')};
  flex-direction: column;
  min-width: 150px;
`;

export const FormWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  ${props =>
    props.isMobileScreen &&
    css`
      width: 100%;
      flex-wrap: wrap;
    `}
`;

export const FormGroupLeft = styled(FormGroup)`
  margin-right: ${props => (props.isMobileScreen ? '5px' : '10px')};
`;

export const FormGroupRight = styled(FormGroup)`
  margin-left: ${props => (props.isMobileScreen ? '5px' : '10px')};
`;

export const StyledCheck = styled(Checkbox)`
  margin-left: ${props => (props.isMobileScreen ? '0px' : '10px')};
`;

export const StyledInput = styled(MyInput)`
  flex-grow: 1;
  margin-bottom: 5px;
`;

export const WidthStyledButton = styled(StyledButton)`
  width: 250px;
`;
