import {
  SHOW_EDIT_MODAL,
  SHOW_CREATE_MODAL,
  SHOW_EVENT_MODAL
} from '../constants/actionTypes';

const INITIAL_STATE = {
  showEditModal: false,
  showCreateModal: false,
  showEventModal: false
};

const reducerModalVisbility = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_EDIT_MODAL:
      return {
        ...state,
        showEditModal: action.payload
      };
    case SHOW_CREATE_MODAL:
      return {
        ...state,
        showCreateModal: action.payload
      };
    case SHOW_EVENT_MODAL:
      return {
        ...state,
        showEventModal: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducerModalVisbility;
