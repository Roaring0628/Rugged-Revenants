/* eslint-disable @next/next/no-img-element */
export default function UpgradeSystem() {
  return (
    <>
      <section id="player-guide-upgradesystem" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                UPGRADE SYSTEM
              </h1>
            </div>

            <div className="w-full pt-6">
              <img
                src="/media/player-guide/upgradesystem-1.png"
                alt=""
                className="w-[95%] h-full mx-auto"
              />
            </div>

            <div className="w-full py-10">
              <div className="w-[95%] sm:w-[80%] mx-auto flex justify-start items-center mb-6">
                <img
                  src="/media/player-guide/image37.png"
                  alt=""
                  className="w-16 h-16 flex-shrink-0 mr-5"
                />
                <div className="">
                  <p className="text-[#ffaf02] text-sm sm:text-lg mb-2">
                    Advanced Alchemical Agent = Upgrade Potion:
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    Rugged Revenants Premium NFT a purchasable nft that features
                    a 1:1 in game character based on your traits! Upgrade this
                    NFT for in game upgraded stats.
                  </p>
                </div>
              </div>
              <div className="w-[95%] sm:w-[80%] mx-auto flex justify-start items-center">
                <img
                  src="/media/player-guide/image37-1.png"
                  alt=""
                  className="w-16 h-20 flex-shrink-0 mr-5"
                />
                <div className="">
                  <p className="text-[#ffaf02] text-sm sm:text-lg mb-2">
                    $RUG Token:
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    $RUG token will be used to speed up the staking upgrade
                    process and bring your Revenant home from training faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
