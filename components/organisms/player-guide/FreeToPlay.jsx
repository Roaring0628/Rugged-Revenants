/* eslint-disable @next/next/no-img-element */
export default function FreeToPlay() {
  return (
    <>
      <section id="player-guide-attributes" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                FREE TO PLAY!
              </h1>
            </div>

            <div className="w-full pt-6 pb-12 px-6">
              <p className="text-black text-sm sm:text-base">
                Anyone can play! Whether you own an NFT from a partner project
                or are brand new, all players have a chance to play the game for
                free and earn $RUG Token. We want to onboard people to Solana
                via fun gameplay and rewarding NFTs from communities that have
                proven that they are building for long-term holders.
              </p>
            </div>

            <div className="flex items-start justify-between px-6 md:px-20 pb-12">
              <img
                src="/media/whitepaper/image30.png"
                alt="rugged revenants"
                className="w-1/5"
              />
              <img
                src="/media/player-guide/image7-1.png"
                alt="rugged revenants"
                className="w-1/2"
              />
              <img
                src="/media/whitepaper/image30.png"
                alt="rugged revenants"
                className="w-1/5"
              />
            </div>

            <div className="relative flex items-center justify-center overflow-hidden p-4">
              <img
                src="/media/player-guide/image5.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <p className="relative z-10 text-center text-base sm:text-lg md:text-xl text-white py-2 px-4">
                RUGGED REVENANTS IS AVAILABLE ON DESKTOP <br></br>(PC AND MAC)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
