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

        <div className="relative inline-block align-bottom bg-primaryBack rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="rounded-md text-primary focus:outline-none"
              onClick={close}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="pt-8 text-left">
              <div className="text-primary">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
