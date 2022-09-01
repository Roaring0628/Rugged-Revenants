/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import * as Const from '../utils/constants'


const OpenLootboxConfirm = ({ closeConfirm, openLootbox, selectedNFT, rrdcNFTCounts }) => {
  let [processing, setProcessing] = useState(false);
  const consumeCharge = async () => {
    // Logic to consume charge
    setProcessing(true);
    await openLootbox(selectedNFT);
    // Must call this function to open the game after consuming charge
    closeConfirm();
  };

  const meta = selectedNFT?.meta
  let nftType = meta?meta.attributes.find(o=>o.trait_type == 'nft').value:'No'
  let beatLevel = meta?meta.attributes.find(o=>o.trait_type == 'level').value:1
  const requiredCharges = nftType == 'No'?beatLevel:Math.max(Const.MAX_REQUIRED_CHARGES_COUNT - rrdcNFTCounts, 10)

  return (
    <div className="z-[60] fixed inset-0 w-full h-[100vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 w-[36rem] h-[18rem] flex flex-col justify-between">
        <img
          src="/media/NewInventory/Elements/ui_inventory_popup_frame1.png"
          alt="warning back"
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative px-12 pt-24 pb-4 text-center">
          OPENING THIS LOOT WILL CONSUME{" "}
          <span className="underline">{requiredCharges} {requiredCharges>1?'CHARGES':'CHARGE'}</span>   FROM ONE OF YOUR GENESIS NFTS.
          <br />
          <br />
          <span className="text-sm ">
            {"<"}Will you proceed?{">"}
          </span>
        </div>
        <div className="flex justify-center pb-8 gap-8">
          <button
            className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#ED1C24]"
            onClick={consumeCharge}
            disabled={processing}
          >
            YES
          </button>
          <button
            className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#ED1C24]"
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

export default OpenLootboxConfirm;
