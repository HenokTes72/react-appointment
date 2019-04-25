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
  filterOneMonthAppointments,
  filterOneDayAppointments
}) => {
  const colors = ['brown', 'purple', 'pink', 'red', 'yellow'];
  const [doctorsCheckBook, setDoctorsCheckBook] = useState(() => {
    const checkBook = {};
    professionals.forEach(professional => {
      checkBook[professional.user_id] = true;
    });
    return checkBook;
  });
  return (
    <Wrapper>
      <P>Profesionales</P>
      {professionals.map((professional, index) => (
        <CustomCheckbox
          key={index}
          value={professional.user_id}
          checked={doctorsCheckBook[professional.user_id]}
          backgroundColor={colors[index % colors.length]}
          onChange={e => {
            const { value, checked } = e.target;
            const checkBook = { ...doctorsCheckBook };
            checkBook[value] = checked;
            let selectedDoctorIds = Object.keys(checkBook).filter(
              id => checkBook[id]
            );
            selectedDoctorIds = selectedDoctorIds.map(id => parseInt(id, 10));
            filterOneDayAppointments(selectedDoctorIds);
            filterOneMonthAppointments(selectedDoctorIds);
            setDoctorsCheckBook(checkBook);
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
