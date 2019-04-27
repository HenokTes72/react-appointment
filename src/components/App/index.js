import React from 'react';
import styled from 'styled-components';
import { ModalVisibilityProvider } from '../../contexts/visibilityContext';

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
        <ModalVisibilityProvider>
          <HomePage />
        </ModalVisibilityProvider>
        <Footer />
      </ContentWrapper>
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
