/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const ConsumeChargeConfirm = ({ closeConfirm, chargeForLootBox }) => {
  let [processing, setProcessing] = useState(false);
  const consumeCharge = async () => {
    // Logic to consume charge
    setProcessing(true);
    await chargeForLootBox();
    // Must call this function to open the game after consuming charge
    closeConfirm();
  };

  return (
    <div className="z-[60] fixed inset-0 w-full h-[100vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 w-[32rem] h-[18rem] flex flex-col justify-between">
        <img
          src="/media/consume_popup/ui_consumecharge_frame.png"
          alt="warning back"
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative p-12 text-center">
          Would you like to include a Premium NFT in your loot if you beat the
          last level?
        </div>
        <div className="flex justify-center pb-8 gap-8">
          <button
            className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
            onClick={consumeCharge}
            disabled={processing}
          >
            YES
          </button>
          <button
            className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
            onClick={closeConfirm}
            disabled={processing}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumeChargeConfirm;
