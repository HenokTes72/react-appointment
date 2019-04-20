import React from 'react';
import PropTypes from 'prop-types';

import withMobile from '../../utils/withMobile';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = ({ isMobileScreen, width }) => {
  return isMobileScreen ? <MobileHeader width={width} /> : <DesktopHeader />;
};

Header.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired
};

export default withMobile(Header);
