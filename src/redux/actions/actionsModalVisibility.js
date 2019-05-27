import {
  SHOW_EDIT_MODAL,
  SHOW_CREATE_MODAL,
  SHOW_EVENT_MODAL
} from '../constants/actionTypes';

const actionShowEditModal = show => ({
  type: SHOW_EDIT_MODAL,
  payload: show
});

const actionShowCreateModal = show => ({
  type: SHOW_CREATE_MODAL,
  payload: show
});

const actionShowEventModal = show => ({
  type: SHOW_EVENT_MODAL,
  payload: show
});

export { actionShowEditModal, actionShowCreateModal, actionShowEventModal };
