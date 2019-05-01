import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ColorContext = React.createContext();
export default ColorContext;

export const ColorProvider = ({ children }) => {
  const [colorAssignment, setColorAssignment] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [colors] = useState([
    'brown',
    'green',
    'pink',
    'red',
    'yellow',
    'blue',
    'cyan',
    'orange'
  ]);

  const getColor = id => {
    const doctorColorAssignment = colorAssignment.find(
      assignment => assignment.id === id
    );
    if (doctorColorAssignment === undefined) {
      const colorToBeAssigned = colors[colorIndex];
      setColorAssignment([
        ...colorAssignment,
        { id, color: colorToBeAssigned }
      ]);
      setColorIndex((colorIndex + 1) % colors.length);
      return colorToBeAssigned;
    }
    return doctorColorAssignment.color;
  };

  return (
    <ColorContext.Provider
      value={{
        getColor
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

ColorProvider.propTypes = {
  children: PropTypes.element.isRequired
};
