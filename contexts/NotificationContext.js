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
  const [imageURL, setImageURL] = useState(null);

  const openNotificationModal = (
    message,
    yesCallback = null,
    noCallback = null,
    isConditional = false,
    imageURL = null
  ) => {
    setMessage(message);
    setCallbacks({
      yesCallback,
      noCallback,
    });
    setIsConditional(isConditional);
    setImageURL(imageURL);
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const closeNotificationModal = (isYes) => {
    setMessage("");
    document.body.style.overflow = "unset";
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
        imageURL,
        openNotificationModal,
        closeNotificationModal,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
