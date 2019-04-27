import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModalVisibilityContext = React.createContext();
export default ModalVisibilityContext;

export const ModalVisibilityProvider = ({ children }) => {
  const [showEditModal, setEditModalVisibility] = useState(false);
  const [showCreateModal, setCreateModalVisibility] = useState(false);
  const [showEventModal, setEventModalVisibility] = useState(false);

  return (
    <ModalVisibilityContext.Provider
      value={{
        showEditModal,
        showCreateModal,
        showEventModal,
        setEditModalVisibility,
        setCreateModalVisibility,
        setEventModalVisibility
      }}
    >
      {children}
    </ModalVisibilityContext.Provider>
  );
};

ModalVisibilityProvider.propTypes = {
  children: PropTypes.element.isRequired
};
