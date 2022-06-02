/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function GenesisCollection() {
  return (
    <>
      <section id="whitepaper-genesiscollection" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                GENESIS COLLECTION
              </h1>
            </div>

            <div className="flex items-center justify-center flex-col md:flex-row">
              <div className="w-full mx-auto md:w-3/5">
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                  This is a genesis Rugged Revenants NFT Collection: A
                  collection of unrevealed NFTs will be distributed to winners
                  of the game as part of the reward system.
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                  This collection of 10,000 NFTs provides ongoing benefits in
                  all 1KL games making it more likely that the holders will win
                  our games and Loot Coffins.
                </p>
              </div>
              <img
                className="w-2/5 mx-auto md:w-1/5 flex-shrink-0"
                src="/media/whitepaper/image75.png"
                alt=""
              />
            </div>

            <p className="px-6 py-6 text-lg sm:text-xl md:text-2xl font-bold text-center text-black mb-4">
              These NFTs will provide value to Rugged Revenants players in the
              following ways:
            </p>

            <div className="bg-[url(/media/whitepaper/image3.png)] bg-cover rounded-2xl p-6 mx-6 text-white mb-12">
              <div className="md:flex items-center py-6 border-b-4 border-white">
                <div className="w-full md:w-2/5 px-4 flex justify-between items-center mb-3 md:mb-0">
                  <img
                    src="/media/whitepaper/img26.png"
                    className="w-2/5"
                    alt=""
                  />
                  <p className="px-6 font-bold text-sm sm:text-base md:text-lg text-white">
                    $RUG TOKEN <br /> MULTIPLIER
                  </p>
                </div>
                <div className="w-full md:w-3/5 px-4">
                  <p className="text-sm sm:text-base md:text-lg text-white text-center md:text-left">
                    Players will receive 50% more $RUG when completing levels.
                  </p>
                </div>
              </div>
              <div className="md:flex items-center py-6 border-b-4 border-white">
                <div className="w-full md:w-2/5 px-4 mb-3 md:mb-0">
                  <p className="font-bold text-sm sm:text-base md:text-lg text-white mb-4">
                    IN-GAME POWERUPS
                  </p>
                  <div className="flex">
                    <img
                      src="/media/whitepaper/img9.png"
                      className="w-1/3 mr-6"
                      alt=""
                    />
                    <img
                      src="/media/whitepaper/img10.png"
                      className="w-1/3"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 px-4">
                  <p className="text-sm sm:text-base md:text-lg text-white text-center md:text-left">
                    Players will receive an extra projectile, projectile
                    cooldown reduction, and access to easter eggs such as
                    shields and cameo support from partner NFTs.
                  </p>
                </div>
              </div>
              <div className="md:flex items-center py-6 border-b-4 border-white">
                <div className="w-full md:w-2/5 px-4 mb-3 md:mb-0">
                  <p className="font-bold text-sm sm:text-base md:text-lg text-white mb-4">
                    STAKING REQUIREMENT
                  </p>
                  <div className="flex">
                    <img
                      src="/media/whitepaper/img27.png"
                      className="w-3/4"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 px-4">
                  <p className="text-sm sm:text-base md:text-lg text-white text-center md:text-left">
                    Players must stake a Rugged Revenants Genesis NFT + a Rugged
                    Revenants Playable NFT + spend $RUG in order to upgrade
                    their playable character.
                  </p>
                </div>
              </div>
              <div className="md:flex items-center py-6">
                <div className="w-full md:w-2/5 px-4 mb-3 md:mb-0">
                  <div className="flex justify-center md:justify-start">
                    <img
                      src="/media/whitepaper/image75.png"
                      className="w-1/3 mr-6"
                      alt=""
                    />
                    <img
                      src="/media/whitepaper/image108.png"
                      className="w-1/3"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 px-4">
                  <p className="text-sm sm:text-base md:text-lg text-white text-center md:text-left">
                    Each Genesis NFT has 3 charges that can be used to activate
                    the loot table.
                  </p>
                </div>
              </div>
            </div>

            <p className="px-6 py-6 text-lg sm:text-2xl md:text-3xl text-center text-black mb-4">
              RR GAMEPlatform
            </p>

            <img
              className="w-full mx-auto md:w-3/5"
              src="/media/whitepaper/img24.jpg"
              alt=""
            />
            <img
              className="w-4/5 mx-auto md:w-2/5"
              src="/media/whitepaper/img25.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
