/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { NotificationContext } from "contexts/NotificationContext";

const NotificationModal = ({}) => {
  const { message, showModal, isConditional, closeNotificationModal } =
    useContext(NotificationContext);

  return (
    <>
      {showModal && (
        <div className="z-[999] fixed inset-0 w-full h-[100vh]">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 w-[32rem] h-[18rem] flex flex-col justify-between">
            <img
              src="/media/consume_popup/ui_consumecharge_frame.png"
              alt="warning back"
              className="absolute top-0 left-0 w-full h-full"
            />
            <div className="relative p-12 text-center">{message}</div>
            <div className="flex justify-center pb-8 gap-8">
              {isConditional && (
                <>
                  <button
                    className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
                    onClick={() => closeNotificationModal(true)}
                  >
                    YES
                  </button>
                  <button
                    className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
                    onClick={() => closeNotificationModal(false)}
                  >
                    NO
                  </button>
                </>
              )}
              {!isConditional && (
                <button
                  className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
                  onClick={() => closeNotificationModal(true)}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {!showModal && <></>}
    </>
  );
};

export default NotificationModal;
