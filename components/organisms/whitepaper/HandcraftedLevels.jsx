/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function HandcraftedLevels() {
  return (
    <>
      <section id="whitepaper-handcraftedlevels" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                HANDCRAFTED LEVELS
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Levels are thematic Stages of the game that allow a Revenant to
              score points, kill Ruggers, and progress towards winning dope
              NFTs! Each playable level is designed with its own unique
              platforms, interactive elements (swinging cauldrons, frozen
              effects, etc.), and thematic challenges that will inspire players
              to avoid rugs.
            </p>

            <div className="relative h-3 bg-[url(/media/whitepaper/image32.png)] bg-cover"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 pt-8 mb-8">
              <div className="px-6 mb-6">
                <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                  INCREASING SKILL
                </h2>
                <p className="text-black text-sm sm:text-lg md:text-xl">
                  Level challenges will increase in difficulty as players
                  progress on the path to defeat the Ruggers. New waves of
                  strange Ruggers will emerge at uncool times and in far out
                  numbers. The closer Revenants are to reaching loot the harder
                  the challenge they face in getting it.
                </p>
              </div>
              <div className="px-6 mb-6">
                <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                  MINI-BOSSES
                </h2>
                <p className="text-black text-sm sm:text-lg md:text-xl">
                  All levels include mini-bosses that will challenge and delight
                  in battle. Defeating the Ruggers will ensure you are one step
                  closer to that sweet sweet loot!
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl text-brand-orange mb-2 text-center">
                HIDDEN POWER-UPS
              </h2>
              <div className="relative py-8 mx-6 px-6 mb-6 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
                <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                  POWER-UP ACTIVATIONS ARE HIDDEN INSIDE LEVELS. REWARDS AND
                  ABILITIES DIFFER DEPENDING ON WHICH REVENANT YOU ARE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
