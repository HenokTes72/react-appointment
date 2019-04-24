import React, { useState } from 'react';
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

const Professionals = ({
  professionals,
  // filterOneMonthAppointments,
  filterOneDayAppointments
}) => {
  const colors = ['brown', 'purple', 'pink', 'red', 'yellow'];
  const [filteredIds, setFilteredIds] = useState([]);
  return (
    <Wrapper>
      <P>Professionals</P>
      {professionals.map((professional, index) => (
        <CustomCheckbox
          key={index}
          value={professional.user_id}
          backgroundColor={colors[index % colors.length]}
          onChange={e => {
            const { value, checked } = e.target;
            const updatedIds = [...filteredIds];
            if (checked) {
              updatedIds.push(value);
            } else {
              const i = updatedIds.indexOf(value);
              if (i !== -1) {
                updatedIds.splice(index, 1);
              }
            }
            setFilteredIds(updatedIds);
            filterOneDayAppointments(updatedIds);
            // filterOneMonthAppointments(updatedIds);
          }}
        >
          {`${professional.first_name} ${professional.last_name}`}
        </CustomCheckbox>
      ))}
    </Wrapper>
  );
};

Professionals.propTypes = {
  professionals: PropTypes.array.isRequired,
  filterOneMonthAppointments: PropTypes.func.isRequired,
  filterOneDayAppointments: PropTypes.func.isRequired
};

export default Professionals;
