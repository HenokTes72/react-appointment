import {
  SET_COLORS,
  SET_COLOR_INDEX,
  SET_COLOR_ASSIGNMENT
} from '../constants/actionTypes';

const actionSetColors = colors => ({
  type: SET_COLORS,
  payload: colors
});

const actionSetColorIndex = colorIndex => ({
  type: SET_COLOR_INDEX,
  payload: colorIndex
});

const actionSetColorAssignment = colorAssignment => ({
  type: SET_COLOR_ASSIGNMENT,
  payload: colorAssignment
});

export { actionSetColors, actionSetColorIndex, actionSetColorAssignment };
