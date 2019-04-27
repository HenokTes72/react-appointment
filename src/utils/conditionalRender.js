import React from 'react';
import PropTypes from 'prop-types';

const ConditionalRender = ({ isError, isLoading, data, children, loader }) => (
  <>
    {isError && <div>Something went wrong ...</div>}
    {isLoading
      ? (loader && loader()) || <div>Loading ...</div>
      : data && children}
  </>
);

ConditionalRender.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loader: PropTypes.func.isRequired,
  data: PropTypes.any,
  children: PropTypes.element.isRequired
};

export default ConditionalRender;
