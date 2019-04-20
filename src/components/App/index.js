import React from 'react';
import styled from 'styled-components';

import 'antd/dist/antd.css';
import GlobalStyle from '../../global-styles';
import Header from '../Header';
import HomePage from '../HomePage';
import ContentWrapper from './ContentWrapper';
import Footer from '../Footer';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <ContentWrapper>
        <HomePage />
        <Footer />
      </ContentWrapper>
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
