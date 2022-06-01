/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function StakingStatUpgrades() {
  return (
    <>
      <section id="whitepaper-stakingstatupgrades" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                UPGRADE RUGGED REVENANT PLAYABLE NFT
              </h1>
            </div>

            <img
              src="/media/whitepaper/img17.jpg"
              alt="potion"
              className="w-full md:w-3/5 mx-auto mb-6"
            />
            <img
              src="/media/whitepaper/img18.jpg"
              alt="potion"
              className="w-full md:w-3/5 mx-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
