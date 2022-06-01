import React from "react";
import classNames from "classnames";

export default function Modal({
  show = false,
  close = () => {},
  children,
  ...rest
}) {
  return (
    <div
      className={classNames("fixed z-50 inset-0 overflow-y-auto", {
        hidden: !show,
      })}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <div className="relative inline-block align-bottom bg-black border-2 border-brand-purple rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:w-1/2 sm:p-6">
          <div className="text-left">
            <div className="text-primary">{children}</div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="rounded-md text-primary focus:outline-none border-2 border-brand-purple p-2"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
