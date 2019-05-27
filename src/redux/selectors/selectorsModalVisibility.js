const selectEditModalVisibility = ({ stateModalVisibility }) =>
  stateModalVisibility.showEditModal;

const selectCreateModalVisibility = ({ stateModalVisibility }) =>
  stateModalVisibility.showCreateModal;

const selectEventModalVisibility = ({ stateModalVisibility }) =>
  stateModalVisibility.showEventModal;

export {
  selectEditModalVisibility,
  selectCreateModalVisibility,
  selectEventModalVisibility
};
