/* eslint-disable @next/next/no-img-element */
export default function RugsToRiches() {
  return (
    <>
      <section id="player-guide-rugstoriches" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                RUGS TO RICHES
              </h1>
            </div>

            <div className="w-full pt-6 pb-12 px-6">
              <p className="text-black text-sm sm:text-base">
                Core to the gameplay of Rugged Revenants is the ability to
                acquire valuable NFTs from Revenant Recovery Repositories after
                completing the final level of the game. Players can only acquire
                if they Rugged Repository if they use a “charge” from a Genesis
                NFT before playing.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between px-6 pb-8">
              <div className="w-[80%] sm:w-[70%] mx-auto md:w-1/5 flex md:flex-col justify-center items-center mb-4">
                <img
                  src="/media/whitepaper/image75.png"
                  className="w-[40%] md:w-[75%] mx-auto mb-4"
                  alt=""
                />
                <img
                  src="/media/whitepaper/image108.png"
                  className="w-[50%] md:w-full mx-auto mb-4"
                  alt=""
                />
              </div>
              <div className="w-full md:w-[75%] flex flex-col items-center justify-center">
                <div className="w-full mb-4">
                  <p className="text-[#ffaf02] font-bold text-sm sm:text-base mb-1">
                    HOW DO I WIN VALUABLE NFTS?
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    Use a charge to unlock Premium Rewards (NFT)
                  </p>
                </div>
                <div className="w-full mb-4">
                  <p className="text-[#ffaf02] font-bold text-sm sm:text-base mb-1">
                    HOW DO I GET A GENESIS NFT?
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    Burn a Rugged NFT without a Genesis NFT in your wallet, or
                    connect your wallet to the rugged revenants website and beat
                    level 1
                  </p>
                </div>
                <div className="w-full mb-4">
                  <p className="text-[#ffaf02] font-bold text-sm sm:text-base mb-1">
                    HOW DO I USE A CHARGE FROM A GENESIS NFT?
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    You will be prompted to use a charge to activate the
                    Revenant Recovery Repository before a game starts
                  </p>
                </div>
                <div className="w-full mb-4">
                  <p className="text-[#ffaf02] font-bold text-sm sm:text-base mb-1">
                    HOW DO I GET MORE CHARGES?
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    Beat levels, Burn Rugged NFTs, or fully charge your Revenant
                    Recovery Repository from the inventory
                  </p>
                </div>
                <div className="w-full mb-4">
                  <p className="text-[#ffaf02] font-bold text-sm sm:text-base mb-1">
                    HOW MANY CHARGES CAN A REVENANT RECOVERY REPOSITORY HOLD?
                  </p>
                  <p className="text-black text-sm sm:text-base">
                    Each genesis NFT can hold 99 charges
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
