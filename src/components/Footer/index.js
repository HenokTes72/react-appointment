import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import HightLight from './HighLight';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import withMobile from '../../utils/withMobile';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 800px;
  padding-bottom: 20px;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
`;

const MainWrapper = styled.div`
  background-color: #444242;
  display: flex;
  justify-content: center;
`;

const Footer = ({ isMobileScreen }) => {
  return (
    <>
      <HightLight isMobileScreen={isMobileScreen} />
      <MainWrapper>
        <FooterWrapper>
          <Tab1 />
          <Tab2 />
          <Tab3 />
        </FooterWrapper>
      </MainWrapper>
    </>
  );
};

Footer.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired
};

export default withMobile(Footer);
