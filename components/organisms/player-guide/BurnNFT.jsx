/* eslint-disable @next/next/no-img-element */
export default function BurnNFT() {
  return (
    <>
      <section id="player-guide-burnnft" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                BURN YOUR RUGGED NFTS
              </h1>
            </div>

            <div className="w-[90%] mx-auto pt-6 pb-6 px-6">
              <p className="text-black text-center text-sm sm:text-base">
                Burn your Rugged NFTs for Charges{" "}
                <span className="text-[#ffaf02] font-bold">{"->"}</span> Charges
                go into the Revenant Recovery Repository{" "}
                <span className="text-[#ffaf02] font-bold">{"->"}</span> Use
                Charges to start the process and beat levels to win NFTs!
              </p>
            </div>

            <div className="w-full px-4 pb-4">
              <img
                src="/media/player-guide/image43.jpeg"
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
