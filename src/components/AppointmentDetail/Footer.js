import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledButton } from '../Button';
import useCancelAppointment from '../../hooks/cancelAppointment';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Footer = ({
  setEditModalVisiblity,
  setEventModalVisibility,
  deleteAppointmentFromState
}) => {
  const { cancel, setCancel } = useCancelAppointment();
  const cancelAppointment = () => {
    setCancel(!cancel);
    // eslint-disable-next-line no-alert
    alert(
      'You have successfully cancelled the appointment, waiting for a working API'
    );
    deleteAppointmentFromState();
    setEventModalVisibility(false);
  };
  return (
    <Wrapper>
      <StyledButton onClick={() => setEditModalVisiblity(true)}>
        EDITAR
      </StyledButton>
      <StyledButton onClick={cancelAppointment}>CANCLEAR</StyledButton>
    </Wrapper>
  );
};

Footer.propTypes = {
  deleteAppointmentFromState: PropTypes.func.isRequired,
  setEditModalVisiblity: PropTypes.func.isRequired,
  setEventModalVisibility: PropTypes.func.isRequired
};

export default Footer;
