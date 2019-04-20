import React from 'react';
import PropTypes from 'prop-types';

const ConditionalRender = props => (
  <>
    {props.isError && <div>Something went wrong ...</div>}
    {props.isLoading ? <div>Loading ...</div> : props.data && props.children}
  </>
);

ConditionalRender.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default ConditionalRender;
