import React from 'react';
import styled from 'styled-components';

import Tab from './TabWrapper';
import Img from '../Img';
import Facebook from './facebook.png';
import Google from './googlepluss.png';
import Instagram from './instagram.png';
import P from '../P';

const SocialIcons = styled.div`
  display: flex;
`;

const Icon = styled(Img)`
  margin-right: 10px;
`;

const Tab3 = () => {
  return (
    <Tab>
      <P>
        <b>Got on sockial</b>
      </P>
      <SocialIcons>
        <Icon src={Facebook} alt="facebook" />
        <Icon src={Google} alt="google" />
        <Icon src={Instagram} alt="instagram" />
      </SocialIcons>
    </Tab>
  );
};

export default Tab3;
