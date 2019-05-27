import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  actionSetColorIndex,
  actionSetColorAssignment
} from '../redux/actions/actionsColorContext';

import {
  selectColors,
  selectColorIndex,
  selectColorAssignment
} from '../redux/selectors/selectorsColorContext';

const ColorContext = React.createContext();
export default ColorContext;

const Provider = ({
  children,
  colorIndex,
  colorAssignment,
  colors,
  setColorAssignment,
  setColorIndex
}) => {
  // const [colorAssignment, setColorAssignment] = useState([]);
  // const [colorIndex, setColorIndex] = useState(0);
  // const [colors] = useState([
  //   'brown',
  //   'green',
  //   'pink',
  //   'red',
  //   'yellow',
  //   'blue',
  //   'cyan',
  //   'orange'
  // ]);

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

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  colorIndex: PropTypes.number.isRequired,
  colorAssignment: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  setColorAssignment: PropTypes.func.isRequired,
  setColorIndex: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setColorAssignment: assignment =>
    dispatch(actionSetColorAssignment(assignment)),
  setColorIndex: index => dispatch(actionSetColorIndex(index))
});

const mapStateToProps = state => ({
  colorIndex: selectColorIndex(state),
  colorAssignment: selectColorAssignment(state),
  colors: selectColors(state)
});

export const ColorProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);
