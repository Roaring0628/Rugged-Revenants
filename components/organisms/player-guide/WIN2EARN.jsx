/* eslint-disable @next/next/no-img-element */
export default function WIN2EARN() {
  return (
    <>
      <section id="player-guide-win2earn" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                WIN-2-EARN EXPLAINED
              </h1>
            </div>

            <div className="w-full flex flex-wrap justify-center">
              <img
                src="/media/player-guide/win2earn-1.png"
                alt=""
                className="w-[50%] md:w-[34%] h-full"
              />
              <img
                src="/media/player-guide/win2earn-2.png"
                alt=""
                className="w-[90%] md:w-[64%] h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
