/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useContext } from 'react';
import { NotificationContext } from "contexts/NotificationContext";

const CHEST_COMMON_ANIMATION_DURATION = 3500; // 3.5s
const MINIMUN_SOL_BALANCE = 10000000; // 0.01 SOL

const GameWinner = ({ closeChest, beatFirstLevel, hasGenesis, solBalance }) => {
  const [inProgress, setInProgress] = useState(false);
  const [acceptingGenesisNFT, setAcceptingGenesisNFT] = useState(false);
  const [showWon, setShowWon] = useState(false);
  const [showChestAnimation, setShowChestAnimation] = useState(false);
  const [showBalanceWarning, setShowBalanceWarning] = useState(false);
  const { openNotificationModal } = useContext(NotificationContext);

  const openWon = async () => {
    if (!inProgress) {
      // Prevent double accepting
      setInProgress(true);

      setShowChestAnimation(true);
      if (!hasGenesis) {
        setTimeout(() => {
          setShowWon(true);
        }, CHEST_COMMON_ANIMATION_DURATION);
      } else {
        if (solBalance < MINIMUN_SOL_BALANCE) {
          // At least 0.01 SOL to mint (accept) genesis nft
          openBalanceWarning();
        } else {
          processBeatFirstLevel()
        }
      }
    }
  };

  const processBeatFirstLevel = async () => {
    if(await beatFirstLevel()) {
      closeChest();
      return 
    }
    openNotificationModal("Transaction has been failed because of network status is bad. Are you going to try again to get reward?", okBeatFirstLevelCallback, noBeatFirstLevelCallback, true)
  }

  const okBeatFirstLevelCallback = async () => {
    processBeatFirstLevel()
  }
  const noBeatFirstLevelCallback = async () => {
    closeChest();
  }

  const acceptGenesisNFT = async () => {
    // Logic to accept Genesis NFT
    if (!acceptingGenesisNFT) {
      // Prevent double accepting
      setAcceptingGenesisNFT(true);

      if (solBalance < MINIMUN_SOL_BALANCE) {
        // At least 0.01 SOL to mint (accept) genesis nft
        openBalanceWarning();
      } else {
        try {
          await beatFirstLevel();
          closeChest();
        } catch (e) {
          closeChest();
        }
      }
    }
  };

  const openBalanceWarning = () => {
    setShowBalanceWarning(true);
  };
  const closeBalanceWarning = () => {
    setShowBalanceWarning(false);
    closeChest();
  };

  return (
    <div className="z-10 fixed inset-0 w-full h-[100vh]">
      {/* Chest Window */}
      {!showWon && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[34rem] h-[36rem]">
          <img
            src="/media/game-winner/Open_Chest/Open_Chest/ui_treasurechest_back.png"
            alt="chest back"
            className="absolute top-0 left-0 w-full h-full object-contain object-center"
          />
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <div className="w-[20rem] h-[4rem] mb-6"></div>
            <div className="w-[16rem] h-[16rem] mb-6 relative">
              <img
                src="/media/game-winner/Open_Chest/Open_Chest/ui_treasurechest_icon_frame.png"
                alt="icon"
                className="absolute w-full h-full"
              />
              {!showChestAnimation && (
                <img
                  src="/media/game-winner/Open_Chest/Open_Chest/chest_common_animation.png"
                  alt="icon"
                  className="absolute w-full h-full"
                />
              )}
              {showChestAnimation && (
                <img
                  src="/media/game-winner/Open_Chest/Animations/chest_common_animation.gif"
                  alt="icon"
                  className="absolute w-full h-full"
                />
              )}
              <img
                src="/media/game-winner/Open_Chest/Open_Chest/ui_treasurechest_icon_frame1.png"
                alt="icon"
                className="absolute w-full h-full"
              />
            </div>
            <div
              className="w-[20rem] h-[4rem] cursor-pointer"
              onClick={openWon}
            >
              <img
                src="/media/game-winner/Open_Chest/Open_Chest/ui_treasurechest_open_button.png"
                alt="open chest button"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Accept Genesis NFT */}
      {showWon && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-[25rem] relative">
            <img
              src="/media/game-winner/PopUp_Window_V2/ui_popup_bg.png"
              alt="won popup bg"
              className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
            <div className="w-[72rem] h-full mx-auto flex justify-between items-center relative z-10">
              <div className="w-1/2">
                <p className="uppercase tracking-tighter text-[2rem] mb-8">
                  Congratulations!
                </p>
                <p className="tracking-tighter text-3xl mb-8">
                  You won <br /> Genesis NFT!
                </p>
                <img
                  src="/media/game-winner/PopUp_Window_V2/ui_popup_acceptbutton_v2.png"
                  alt="accept button"
                  className="w-52 h-auto cursor-pointer"
                  onClick={acceptGenesisNFT}
                />
              </div>
              <div className="w-1/2 relative">
                <img
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40rem] h-[44rem]"
                  alt="incubator"
                  src="/media/game-winner/PopUp_Window_V2/ui_popup_flare.png"
                />
                <img
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[20rem] h-auto"
                  alt="incubator"
                  src="/media/game-winner/PopUp_Window_V2/ui_popup_musicincubator_glow_v2.png"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance Warning Window */}
      {showBalanceWarning && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 w-[34rem] h-[20rem] flex flex-col justify-between">
          <img
            src="/media/warning/Warning/ui_warning_frame_edit.png"
            alt="warning back"
            className="absolute top-0 left-0 w-full h-full"
          />
          <div className="relative p-4 pt-20 text-center">
            You must have at least 0.01 SOL in your wallet to MINT your Genesis
            NFT. Please add SOL to your wallet and beat level 1 again to claim
            your Genesis NFT.
          </div>
          <div className="flex justify-center pb-8">
            <div
              className="w-32 h-10 relative flex justify-center items-center cursor-pointer"
              onClick={closeBalanceWarning}
            >
              <img
                src="/media/warning/Warning/ui_warning_closebutton.png"
                alt="warning back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <span className="relative text-center">CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameWinner;
