/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function Monkeys() {
  return (
    <>
      <section id="whitepaper-monkeys" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                SOLANA SITTING MONKEYS
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Our first-generation Ruggers are from the Solana Sitting Monkey’s
              collection. The notorious Monkeys are the perfect first generation
              of mob waves and non-stop rug pullers. We’ve selected 12 Sitting
              Monkeys with unique ways to snatch your bags. Each one might seem
              easy to defeat but with increasing waves and speed you might find
              you bit off more than you can chew.
            </p>

            <div className="relative h-3 bg-[url(/media/whitepaper/image32.png)] bg-cover"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-8 mb-8">
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image188.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  BASIC MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  These monkeys mindlessly walk and use attack jumps between
                  platforms. <br />
                  <br /> (basic...)
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image189.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  EXPLOSIVE MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Bombs Away! Explosive Monkeys rain exploding apples down on
                  players with their ranged attack, pumping the level full of
                  their apple grenades.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image190.jpeg"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  FROZEN MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Aggressive ice sliders always leave a trail behind Frozen
                  Monkeys freeze the air around them recharging their ice
                  shields and freezing your NFTs.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image191.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  DEAD MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Revenants that meet eyes with these ruggers will stiffen into
                  a trance. Dead Monkeys lunge wit their claws, slicing through
                  your rug. A dead corpse left behind can be infectious. Those
                  infected might become affected.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image192.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  MILITARY MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Fortified with helmets and strength, Military Monkeys bite off
                  the stem of their apple grenade and throw it near our
                  revenants.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image193.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  LAZY MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  This Lazy Monkey can’t be bothered to lunge their lasers will
                  cut you in half. Careful if you knock his glasses off with one
                  hit he’ll go nuts shooting deadly lasers in all directions.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image194.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  SHADY MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  When Shady Monkey sees a Revenant they teleport behind you
                  squeezing their poisonous flower that squirts noxious fumes.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image195.jpeg"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  NINJA MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  As the fastest of all monkeys, Ninja Monkeys’ ninja star
                  earrings will get you when you least expect it.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image196.jpeg"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  COMBUSTIBLE MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  With a taste for destruction and a flammable banana in hand,
                  Combustible Monkeys leave destructive rugs all over each
                  level.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image197.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  WINGED MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  This monkey takes to the skies to divebomb you from above.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image198.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  RADIOACTIVE MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Glowing green Radio Active Monkeys leave bombs that explode,
                  spraying steamy ooze and decay all around.
                </p>
              </div>
              <div className="px-8 flex flex-col items-center mb-3">
                <img
                  src="/media/whitepaper/image199.png"
                  alt="basic monkey"
                  className="w-full mb-4 border-4 border-brand-orange"
                />
                <p className="text-lg sm:text-xl md:text-3xl text-brand-orange text-center mb-3">
                  KING MONKEY
                </p>
                <p className="text-[0.8rem] leading-[1rem] sm:text-sm text-black text-center">
                  Kings use their 3 mini monkeys to rug our revenants. It takes
                  many attacks to take down this king of the jungle!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
