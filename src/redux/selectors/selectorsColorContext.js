const selectColors = ({ stateColorContext }) => stateColorContext.colors;

const selectColorIndex = ({ stateColorContext }) =>
  stateColorContext.colorIndex;

const selectColorAssignment = ({ stateColorContext }) =>
  stateColorContext.colorAssignment;

export { selectColors, selectColorIndex, selectColorAssignment };
