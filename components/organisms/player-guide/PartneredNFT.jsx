/* eslint-disable @next/next/no-img-element */
export default function PartneredNFT() {
  return (
    <>
      <section id="player-guide-partnerednft" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-sm sm:text-lg md:text-xl text-white py-2 px-4 border-l-4 border-white">
                PLAYERS WILL HAVE THE OPTION TO PLAY WITH PARTNERED NFTS
              </h1>
            </div>

            <div className="w-full">
              <img
                src="/media/player-guide/partnerednft-1.png"
                alt=""
                className="w-full h-full"
              />
              <img
                src="/media/player-guide/partnerednft-2.png"
                alt=""
                className="w-full h-full"
              />
            </div>

            <div className="relative flex items-center justify-center overflow-hidden p-4">
              <img
                src="/media/player-guide/image5.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <p className="relative z-10 text-center text-sm sm:text-base md:text-lg text-white py-2 px-4">
                DOPE CAT AND RUGGED REVENANT OWNERS HAVE ACCESS TO IN-GAME
                UNLOCKS AND EASTER EGGS WHILE PLAYING AS THEIR NFT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
