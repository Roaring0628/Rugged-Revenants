/* eslint-disable @next/next/no-img-element */

export default function Introduction() {
  return (
    <>
      <section id="player-guide-introduction" className="pt-20">
        <div className="container">
          <div className="relative">
            <img
              className="absolute top-0 left-0 w-full h-full"
              src="/media/player-guide/image3.png"
              alt="hero back"
            />
            <div className="relative z-10 py-16 sm:py-36 w-full md:w-4/5 px-4 mx-auto">
              <h1 className="text-center text-2xl md:text-3xl uppercase mb-8">
                INTRODUCTION
              </h1>
              <p className="text-center text-sm sm:text-lg lg:text-xl mb-8">
                The year is 3022, and Planet Solana is a wasteland. 1001 years
                ago, in the year 2021, a giant phenomena appeared in the
                Solahari desert in South Solmerica. This strange portal was over
                300 yards in circumference and resembled a giant, jagged, tear
                in the fabric of space and time.
              </p>
              <p className="text-center text-sm sm:text-lg lg:text-xl">
                Scientists employed by the planetary government, The Solunion,
                immediately began sending thousands of probes and hundreds of
                brave volunteers through these portals in an attempt to
                understand their origins. None of these investigators, live or
                inorganic, ever returned. After six months, the Solunion decided
                that they needed to contain this portal and began construction
                on a giant tower, including subterranean levels in order to
                completely encapsulate the phenomena.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
