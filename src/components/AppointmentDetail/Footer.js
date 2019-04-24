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

const Footer = ({ setEditModalVisiblity }) => {
  const { cancel, setCancel } = useCancelAppointment();
  const cancelAppointment = () => {
    setCancel(!cancel);
    // eslint-disable-next-line no-alert
    alert(
      'You have successfully cancelled the appointment, waiting for a working API'
    );
    setEditModalVisiblity(false);
  };
  return (
    <Wrapper>
      <StyledButton onClick={setEditModalVisiblity}>EDITAR</StyledButton>
      <StyledButton onClick={cancelAppointment}>CANCLEAR</StyledButton>
    </Wrapper>
  );
};

Footer.propTypes = {
  setEditModalVisiblity: PropTypes.func.isRequired
};

export default Footer;
