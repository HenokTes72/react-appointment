import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ className, src, alt }) => {
  return <img className={className} src={src} alt={alt} />;
};

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Img;
