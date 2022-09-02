/* eslint-disable @next/next/no-img-element */
export default function PlayableNFT() {
  return (
    <>
      <section id="player-guide-playablenft" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                PLAYABLE NFT
              </h1>
            </div>

            <div className="w-full pt-6 pb-6 px-6">
              <p className="text-black text-sm sm:text-base">
                Rugged Revenants Premium NFT a purchasable nft that features a
                1:1 in game character based on your traits! Upgrade this NFT for
                in game upgraded stats.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2">
              <img
                src="/media/player-guide/playablenft-1.png"
                alt=""
                className="w-full h-full"
              />
              <img
                src="/media/player-guide/playablenft-2.png"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
