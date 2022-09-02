/* eslint-disable @next/next/no-img-element */
export default function SkillStatUpgrades() {
  return (
    <>
      <section id="player-guide-skillstatupgrades" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden border-b-4 border-white px-4">
              <img
                src="/media/player-guide/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-4 border-l-4 border-white">
                SKILL & STAT UPGRADES
              </h1>
            </div>

            <div className="w-full">
              <div className="pb-6">
                <h1 className="text-lg sm:text-2xl md:text-3xl text-center text-black pt-6 pb-2 px-6">
                  PROJECTILE SKILL TYPES
                </h1>
                <div className="mb-12">
                  <p className="px-6 text-sm sm:text-base text-black mb-3">
                    All NFTs start with a value of 0. Every time this number
                    increases by 1 the NFT unlocks new damage types, toggleable
                    by the player:
                  </p>
                  <div className="px-6 text-sm sm:text-base flex items-center gap-2 text-black mb-3">
                    1.
                    <img
                      src="/media/whitepaper/img13.jpg"
                      width={40}
                      alt=""
                      className="inline-block"
                    />{" "}
                    <div className="text-black">
                      <span className="text-[#DC7926]">Fire Damage</span> -
                      Increased damage to 2 ticks of damage
                    </div>
                  </div>
                  <div className="px-6 text-sm sm:text-base flex items-center gap-2 text-black mb-3">
                    2.
                    <img
                      src="/media/whitepaper/img14.jpg"
                      width={40}
                      alt=""
                      className="inline-block"
                    />{" "}
                    <div className="text-black">
                      <span className="text-[#5ABA47]">Acid Damage </span> -
                      Damage over time to enemies with more than one tick of
                      damage. 0.1 ticks of damage every second for 5 seconds
                    </div>
                  </div>
                  <div className="px-6 text-sm sm:text-base flex items-center gap-2 text-black mb-3">
                    3.
                    <img
                      src="/media/whitepaper/img15.jpg"
                      width={40}
                      alt=""
                      className="inline-block"
                    />{" "}
                    <div className="text-black">
                      <span className="text-[#D2CC28]">Lightning Damage</span> -
                      Stuns enemies for 0.5 seconds and does 1.25 ticks of
                      damage
                    </div>
                  </div>
                  <div className="px-6 text-sm sm:text-base flex items-center gap-2 text-black mb-8">
                    4.
                    <img
                      src="/media/whitepaper/img16.jpg"
                      width={40}
                      alt=""
                      className="inline-block"
                    />{" "}
                    <div className="text-black">
                      <span className="text-[#2DABE2]">Ice Damage </span> -
                      Slows enemy movement and attack and does 1.25 ticks of
                      damage
                    </div>
                  </div>
                  <p className="px-6 text-sm sm:text-base text-center text-black mb-8">
                    A “tick” refers to the amount of damage done to a player
                    when they are struck by a basic enemy attack once
                  </p>
                </div>

                <div className="relative py-6 mx-6 px-6 mb-8 rounded-lg bg-[url(/media/player-guide/image5.png)] bg-cover">
                  <p className="m-0 text-sm sm:text-base text-center">
                    MANY MORE NEW PROJECTILE SKILL TYPES TO COME!
                  </p>
                </div>
              </div>

              <div className="pb-6">
                <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#ee1d24] mb-6">
                  <div className="md:w-1/5 text-[#ee1d24] flex flex-col items-center p-4">
                    <span className="text-center">Health</span>
                    <img
                      src="/media/player-guide/skstup-1.png"
                      alt=""
                      className="w-3/5"
                    />
                  </div>
                  <div className="md:w-4/5 text-sm sm:text-base flex items-center p-4 bg-[#ee1d24] border-4 border-[#ee1d24] text-white">
                    Every number value increase adds 0.1 tick of damage to the
                    player’s health bar.
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#f7941c] mb-6">
                  <div className="md:w-1/5 text-[#f7941c] flex flex-col items-center p-4">
                    <span className="text-center">HEALTH REGEN</span>
                    <img
                      src="/media/player-guide/skstup-2.png"
                      alt=""
                      className="w-3/5"
                    />
                  </div>
                  <div className="md:w-4/5 text-sm sm:text-base flex items-center p-4 bg-[#f7941c] border-4 border-[#f7941c] text-white">
                    Every additional number increases this regeneration rate by
                    0.05 ticks of damage per second for a maximum of .25 ticks
                    of damage recovered per second.
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#f4cc00] mb-6">
                  <div className="md:w-1/5 text-[#f4cc00] flex flex-col items-center p-4">
                    <span className="text-center">PROJECTILE COUNT</span>
                    <img
                      src="/media/player-guide/skstup-3.png"
                      alt=""
                      className="w-3/5"
                    />
                  </div>
                  <div className="md:w-4/5 text-sm sm:text-base flex items-center p-4 bg-[#f4cc00] border-4 border-[#f4cc00] text-white">
                    Every number value increases the projectile count by 0.1,
                    maximum 10 projectiles
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#00bbf1] mb-6">
                  <div className="md:w-1/5 text-[#00bbf1] flex flex-col items-center p-4">
                    <span className="text-center">PROJECTILE REGEN</span>
                    <img
                      src="/media/player-guide/skstup-4.png"
                      alt=""
                      className="w-3/5"
                    />
                  </div>
                  <div className="md:w-4/5 text-sm sm:text-base flex items-center p-4 bg-[#00bbf1] border-4 border-[#00bbf1] text-white">
                    Every number value increase increases projectile
                    regeneration by 0.01 seconds, maximum 0.5 second reduction.
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#88d60a] mb-6">
                  <div className="md:w-1/5 text-[#88d60a] flex flex-col items-center p-4">
                    <span className="text-center">LUCK</span>
                    <img
                      src="/media/player-guide/skstup-5.png"
                      alt=""
                      className="w-3/5"
                    />
                  </div>
                  <div className="md:w-4/5 text-sm sm:text-base flex items-center p-4 bg-[#88d60a] border-4 border-[#88d60a] text-white">
                    Every 1 value increase increases the likelihood that the
                    user will find an item after a battle by 0.1%, maximum 10%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
