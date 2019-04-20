import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-size: 25px;
  margin: 0px;
  color: ${props => props.color || 'black'};
`;

const Wrapper = styled.div`
  display: flex;
`;

const Title = () => {
  return (
    <Wrapper>
      <Title color="blue">Salud</Title>
      <Title color="purple">Vitale</Title>
    </Wrapper>
  );
};

export default Title;
