/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function JustSayNo() {
  return (
    <>
      <section id="whitepaper-justsayno" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="sm:flex">
              <div className="w-full sm:w-[55%] bg-[url(/media/whitepaper/image3.png)] bg-cover px-12 py-40">
                <p className="text-lg sm:text-xl md:text-2xl mb-12">
                  Players will use their Genesis NFTs as part of our unique
                  staking platform.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-12">
                  Players will stake their Genesis NFTs + Dope Revenants and
                  burn $RUG in order to increase player statistics and power up
                  characters in-game with ugrades like more health, health
                  regeneration, flaming weapons, and more.
                </p>
                <div className="flex flex-col items-center pt-20">
                  <p className="text-3xl sm:text-3xl md:text-5xl mb-3">
                    JUST SAY
                  </p>
                  <p className="text-[8rem] leading-[8rem] sm:text-[8rem] md:text-[12rem] md:leading-[12rem] mb-3">
                    NO
                  </p>
                  <p className="text-3xl sm:text-3xl md:text-5xl">TO RUGS</p>
                </div>
              </div>
              <div className="w-full sm:w-[45%] flex items-center">
                <img
                  className="w-4/5 sm:w-full md:w-4/5 mx-auto py-8"
                  src="/media/whitepaper/img19.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
