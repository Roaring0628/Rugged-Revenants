import React, { useState } from "react";

const NotificationContext = React.createContext({
  message: "",
  showModal: false,
  isConditional: false,
});

const NotificationContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isConditional, setIsConditional] = useState(false);
  const [message, setMessage] = useState("");
  const [callbacks, setCallbacks] = useState(null);

  const openNotificationModal = (
    message,
    yesCallback = null,
    noCallback = null,
    isConditional = false
  ) => {
    setMessage(message);
    setCallbacks({
      yesCallback,
      noCallback,
    });
    setIsConditional(isConditional);
    setShowModal(true);
  };

  const closeNotificationModal = (isYes) => {
    setMessage("");
    setShowModal(false);
    if (isYes && callbacks && callbacks.yesCallback) {
      callbacks.yesCallback();
    } else if (!isYes && callbacks && callbacks.noCallback) {
      callbacks.noCallback();
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        message,
        showModal,
        isConditional,
        openNotificationModal,
        closeNotificationModal,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
