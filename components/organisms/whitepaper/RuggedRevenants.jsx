/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function RuggedRevenants() {
  return (
    <>
      <section id="whitepaper-ruggedrevenants" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                RUGGED REVENANT NFTS
              </h1>
            </div>

            <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
              PARTNERS NFTs
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Holders of Partner NFTs like The Dope Cats and Sovana will get to
              play with a power up-character and receive bonus health in-game.
            </p>
            <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
              RUGGED REVENANTS PLAYABLE NFTs
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Holders of Rugged Revenants Playable NFTs will be able to play
              with a version of these NFTs in-game. These NFTs will provide the
              player with powerful upgrades such as flight, health regeneration,
              and extra lives.
            </p>

            <img
              className="w-3/5 mx-auto"
              src="/media/whitepaper/image118.jpeg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
