/* eslint-disable @next/next/no-img-element */
export default function PlayYourWay() {
  return (
    <>
      <section id="player-guide-playyourway" className="pt-20">
        <div className="container">
          <div className="bg-white pb-6">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                PLAY YOUR WAY
              </h1>
            </div>

            <div className="w-full pt-6 pb-12 px-6">
              <p className="text-black text-sm sm:text-base text-center">
                Rugged Revenants players can access the game from our website (
                <span className="text-[#d405d7] font-bold">
                  ruggedrevenants.io
                </span>
                ),
                <span className="text-[#d405d7] font-bold">Portals</span>,{" "}
                <span className="text-[#d405d7] font-bold">Eden Games</span>,{" "}
                <span className="text-[#d405d7] font-bold">Fractal</span> or
                from inside the{" "}
                <span className="text-[#d405d7] font-bold">
                  Revenants Arcade within the Sovana metaverse
                </span>
                .
              </p>
            </div>

            <div className="px-6 md:px-12 pb-12">
              <img
                src="/media/player-guide/playyourway.png"
                alt="rugged revenants"
                className="w-full"
              />
            </div>

            <div className="relative py-6 mx-6 px-6 mb-8 rounded-lg bg-[url(/media/player-guide/image5.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base text-center">
                To access Sovana, visit{" "}
                <span className="font-bold">https://www.sovana.world</span> and
                click <span className="font-bold">“Play Demo In Browser”</span>.
                Once you’re in Sovana look for the Revenants Arcade, head
                inside, load into the game and start playing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
