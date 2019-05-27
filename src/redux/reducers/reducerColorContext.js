import {
  SET_COLORS,
  SET_COLOR_INDEX,
  SET_COLOR_ASSIGNMENT
} from '../constants/actionTypes';

const INITIAL_STATE = {
  colors: ['brown', 'green', 'pink', 'red', 'yellow', 'blue', 'cyan', 'orange'],
  colorIndex: 0,
  colorAssignment: []
};

const reducerColorContext = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_COLORS:
      return {
        ...state,
        colors: action.payload
      };
    case SET_COLOR_INDEX:
      return {
        ...state,
        colorIndex: action.payload
      };
    case SET_COLOR_ASSIGNMENT:
      return {
        ...state,
        colorAssignment: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducerColorContext;
