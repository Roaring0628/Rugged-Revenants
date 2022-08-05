/* eslint-disable @next/next/no-img-element */

const LootboxNotification = ({
  closeNotification,
  lootboxNotificationData,
}) => {
  const { rugTokenAmount, potionAmount, hasPremium } = lootboxNotificationData;

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
          {!!rugTokenAmount && (
            <p>You won {rugTokenAmount} Rugged Tokens</p>
          )}
          {!!potionAmount && <p>You won {potionAmount} potions</p>}
          {!!hasPremium && <p>You won a Premium NFT</p>}
        </div>
        <div className="flex justify-center pb-8 gap-8">
          <button
            className="w-32 h-10 relative flex justify-center items-center cursor-pointer border-2 border-[#812991]"
            onClick={closeNotification}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default LootboxNotification;
