/* eslint-disable @next/next/no-img-element */
export default function Attributes3() {
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
              <h1 className="relative z-10 text-lg sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                ATTRIBUTES & WHAT THEY DO
              </h1>
            </div>
            <img src="/media/player-guide/attr3.png" alt="" />
            <p className="py-2 px-2 text-center text-[0.7rem] leading-[1rem] block sm:hidden text-black">
              (Please use tablet or desktop to see this guide.)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
