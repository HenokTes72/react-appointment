import React from 'react';
import styled, { css } from 'styled-components';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import Paragraph from '../P';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
`;

const P = styled(Paragraph)`
  font-size: 17px;
  color: black;
`;

const CustomCheckbox = styled(Checkbox)`
  margin-left: 0px !important;
  margin-bottom: 15px;
  ${props =>
    props.backgroundColor &&
    css`
      & .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${props.backgroundColor};
        border-color: ${props.backgroundColor};
      }
    `}
`;

const Professionals = ({ professionals }) => {
  const colors = ['brown', 'purple', 'pink', 'red', 'yellow'];
  return (
    <Wrapper>
      <P>Professionals</P>
      {professionals.map((professional, index) => (
        <CustomCheckbox key={index} backgroundColor={colors[index]}>
          {professional}
        </CustomCheckbox>
      ))}
    </Wrapper>
  );
};

Professionals.propTypes = {
  professionals: PropTypes.array.isRequired
};

export default Professionals;
