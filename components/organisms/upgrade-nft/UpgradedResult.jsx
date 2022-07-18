/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import classNames from "classnames";

const UpgradedResult = ({ closeResult }) => {
  const imageURL =
    "https://www.arweave.net/dDhk5dvQibjIzt2ieWn_PeUqZU7cP_5g9Sjs6veRFlg?ext=png";

  const attributeTitles = [
    "HEALTH",
    "HEALTH REGEN",
    "PROJT COUNT",
    "PROJT REGEN",
    "LUCK",
    "",
    "",
  ];
  const oldAttributes = [100, 100, 100, 100, 100];
  const newAttributes = [110, 100, 120, 90, 100];

  return (
    <div className="z-[60] fixed inset-0 w-full h-[100vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 w-[75rem] h-[45rem] flex flex-col justify-between">
        <img
          src="/media/upgrade/ui_upgraded_frame.png"
          alt=""
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative px-8 pt-20 pb-4 text-center flex flex-col items-center">
          <div className="flex justify-center items-center text-3xl uppercase w-2/3 h-16 relative">
            <img
              src="/media/upgrade/upgraded/ui_upgraded_titlebox.png"
              className="w-full h-full absolute top-0 left-0"
              alt=""
            />
            <span className="relative z-10">Upgraded!</span>
          </div>
          <div className="w-full pl-20 pr-32 mt-4 flex justify-between h-[24rem]">
            <div className="w-[25%] h-full relative">
              <img
                src={imageURL}
                alt=""
                className="w-full h-full object-bottom object-contain"
              />
              <img
                src="/media/upgrade/upgraded-mask.png"
                alt=""
                className="w-full h-full object-bottom object-contain absolute top-0 left-0"
              />
            </div>
            <div className="w-[70%] h-full flex items-center gap-4">
              <div className="w-[50%] h-full flex flex-col justify-center gap-4">
                {oldAttributes.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm w-full p-2 border-2 border-[#812991]"
                  >
                    <span>{attributeTitles[index]}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <img
                src="/media/upgrade/upgraded/ui_upgraded_arrow.png"
                alt=""
                className="w-24"
              />
              <div className="w-[50%] h-full flex flex-col justify-center gap-4">
                {newAttributes.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm w-full p-2 border-2 border-[#812991] relative"
                  >
                    <span>{attributeTitles[index]}</span>
                    <span
                      className={classNames({
                        "text-green-400": item > oldAttributes[index],
                        "text-red-500": item < oldAttributes[index],
                      })}
                    >
                      {item}
                    </span>
                    {item !== oldAttributes[index] && (
                      <span
                        className={classNames(
                          "absolute left-[100%] top-[50%] translate-y-[-50%] pl-2",
                          {
                            "text-green-400": item > oldAttributes[index],
                            "text-red-500": item < oldAttributes[index],
                          }
                        )}
                      >
                        {"("}
                        {item > oldAttributes[index] ? "+" : ""}
                        {item - oldAttributes[index]}
                        {")"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-20 gap-8">
          <button
            className="w-32 h-12 relative flex justify-center items-center cursor-pointer border-2 text-xl border-[#812991]"
            onClick={closeResult}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradedResult;
