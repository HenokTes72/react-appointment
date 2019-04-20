import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

import H2 from '../H2';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = () => {
  return (
    <Wrapper>
      <H2>DETALLE CITA</H2>
      <Avatar size={64} icon="user" />
    </Wrapper>
  );
};

export default Profile;
