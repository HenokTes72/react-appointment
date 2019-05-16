import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { ModalVisibilityProvider } from '../../contexts/visibilityContext';

import 'antd/dist/antd.css';

import store from '../../redux/store';

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
