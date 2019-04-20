import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Bar = styled.div`
  width: 30px;
  height: 3px;
  background-color: blue;
`;

const HeaderIcon = () => {
  return (
    <HeaderWrapper>
      <Bar />
      <Bar />
      <Bar />
    </HeaderWrapper>
  );
};

export default HeaderIcon;
