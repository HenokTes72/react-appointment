import React, { useContext } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
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
    Modal.success({
      title: 'Successfully Deleted',
      content:
        'You have successfully deleted the appointment, waiting for a working API'
    });
    deleteAppointmentFromState();
    setEventModalVisibility(false);
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this appointment?',
      onOk() {
        cancelAppointment();
      },
      onCancel() {}
    });
  };
  return (
    <Wrapper>
      <StyledButton onClick={() => setEditModalVisibility(true)}>
        EDITAR
      </StyledButton>
      <StyledButton onClick={showConfirm}>CANCLEAR</StyledButton>
    </Wrapper>
  );
};

export default Footer;
