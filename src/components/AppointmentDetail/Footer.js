import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Modal } from 'antd';
import { StyledButton } from '../Button';
import useCancelAppointment from '../../hooks/cancelAppointment';
// import DeleteAppointmentContext from '../../contexts/deleteContext';
// import ModalVisibilityContext from '../../contexts/visibilityContext';

import {
  actionShowEventModal,
  actionShowEditModal
} from '../../redux/actions/actionsModalVisibility';
import { actionDeleteSchedule } from '../../redux/actions/actionsFetchAppointmentsByMonth';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Footer = ({
  setEventModalVisibility,
  setEditModalVisibility,
  deleteSchedule,
  slotId
}) => {
  const { cancel, setCancel } = useCancelAppointment();
  // const deleteAppointmentFromState = useContext(DeleteAppointmentContext);
  // const { setEventModalVisibility, setEditModalVisibility } = useContext(
  //   ModalVisibilityContext
  // );

  const cancelAppointment = () => {
    setCancel(!cancel);
    Modal.success({
      title: 'Successfully Deleted',
      content:
        'You have successfully deleted the appointment, waiting for a working API'
    });
    // deleteAppointmentFromState();
    deleteSchedule(slotId);
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

Footer.propTypes = {
  deleteSchedule: PropTypes.func.isRequired,
  setEditModalVisibility: PropTypes.func.isRequired,
  setEventModalVisibility: PropTypes.func.isRequired,
  slotId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteSchedule: slotId => dispatch(actionDeleteSchedule(slotId)),
  setEditModalVisibility: show => dispatch(actionShowEditModal(show)),
  setEventModalVisibility: show => dispatch(actionShowEventModal(show))
});

export default connect(
  null,
  mapDispatchToProps
)(Footer);
