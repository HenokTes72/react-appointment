import React, { useContext } from 'react';
import styled from 'styled-components';

import { StyledButton } from '../Button';
import useCancelAppointment from '../../hooks/cancelAppointment';
import DeleteAppointmentContext from '../../contexts/deleteContext';
import ModalVisibilityContext from '../../contexts/visibilityContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Footer = () => {
  const { cancel, setCancel } = useCancelAppointment();
  const deleteAppointmentFromState = useContext(DeleteAppointmentContext);
  const { setEventModalVisibility, setEditModalVisibility } = useContext(
    ModalVisibilityContext
  );
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
      <StyledButton onClick={() => setEditModalVisibility(true)}>
        EDITAR
      </StyledButton>
      <StyledButton onClick={cancelAppointment}>CANCLEAR</StyledButton>
    </Wrapper>
  );
};

export default Footer;
