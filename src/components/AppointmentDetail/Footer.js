import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledButton } from '../Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Footer = ({ setEditModalVisiblity }) => {
  return (
    <Wrapper>
      <StyledButton onClick={setEditModalVisiblity}>EDITAR</StyledButton>
      <StyledButton>CANCLEAR</StyledButton>
    </Wrapper>
  );
};

Footer.propTypes = {
  setEditModalVisiblity: PropTypes.func.isRequired
};

export default Footer;
