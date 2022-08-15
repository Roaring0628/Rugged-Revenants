import React, { useState } from "react";

const LoadingContext = React.createContext({
  showModal: false,
});

const LoadingContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const openLoadingModal = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const closeLoadingModal = () => {
    document.body.style.overflow = "unset";
    setShowModal(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showModal,
        openLoadingModal,
        closeLoadingModal,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingContextProvider };
