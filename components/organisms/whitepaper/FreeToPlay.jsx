/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function FreeToPlay() {
  return (
    <>
      <section id="whitepaper-freetoplay" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                FREE TO PLAY!
              </h1>
            </div>

            <div className="w-full pb-12 px-6">
              <p className="text-black text-base sm:text-lg">
                Anyone can play! Whether you own an NFT from a partner project
                or are brand new, all players have a chance to play the game for
                free and earn $RUG token.
              </p>
            </div>
            <div className="flex items-start justify-between px-6 md:px-20 pb-12">
              <img
                src="/media/whitepaper/image30.png"
                alt="rugged revenants"
                className="w-1/5"
              />
              <img
                src="/media/whitepaper/image29.png"
                alt="rugged revenants"
                className="w-1/2"
              />
              <img
                src="/media/whitepaper/image30.png"
                alt="rugged revenants"
                className="w-1/5"
              />
            </div>
            <div className="w-full pb-12 px-6">
              <p className="text-black text-base sm:text-lg">
                We want to onboard people to Solana via fun gameplay and
                rewarding NFTs from communities that have proven that they are
                building for long-term holders.
              </p>
            </div>

            <div className="relative md:flex justify-between items-center py-6 px-6 mb-6 bg-[url(/media/whitepaper/image4.png)] bg-cover">
              <div className="">
                <h1 className="text-base sm:text-xl md:text-2xl text-white">
                  RUGGED REVENANTS IS AVAILABLE ON DESKTOP
                </h1>
                <p className="text-sm sm:text-lg">(PC AND MAC)</p>
              </div>
              <div className="">{/* Computer Image */}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
