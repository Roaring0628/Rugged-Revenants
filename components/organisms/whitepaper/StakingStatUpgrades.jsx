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
                STAKING - STAT UPGRADES
              </h1>
            </div>

            <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#ED1C24] mb-6">
              <div className="md:w-1/5 text-[#ED1C24] flex flex-col items-center p-4">
                <span className="text-center">Health</span>
                <img
                  src="/media/whitepaper/img8.jpg"
                  alt=""
                  className="w-3/5"
                />
              </div>
              <div className="md:w-4/5 text-sm md:text-lg flex items-center p-4 bg-[#ED1C24] border-4 border-[#ED1C24] text-white">
                Every number value increase adds 0.1 tick of damage to the
                player’s health bar.
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#00A650] mb-6">
              <div className="md:w-1/5 text-[#00A650] flex flex-col items-center p-4">
                <span className="text-center">HEALTH REGEN</span>
                <img
                  src="/media/whitepaper/img9.jpg"
                  alt=""
                  className="w-3/5"
                />
              </div>
              <div className="md:w-4/5 text-sm md:text-lg flex items-center p-4 bg-[#00A650] border-4 border-[#00A650] text-white">
                Every additional number increases this regeneration rate by 0.05
                ticks of damage per second for a maximum of .25 ticks of damage
                recovered per second.
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#006FBA] mb-6">
              <div className="md:w-1/5 text-[#006FBA] flex flex-col items-center p-4">
                <span className="text-center">PROJECTILE COUNT</span>
                <img
                  src="/media/whitepaper/img10.jpg"
                  alt=""
                  className="w-3/5"
                />
              </div>
              <div className="md:w-4/5 text-sm md:text-lg flex items-center p-4 bg-[#006FBA] border-4 border-[#006FBA] text-white">
                Every number value increases the projectile count by 0.1,
                maximum 10 projectiles
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#00BBF2] mb-6">
              <div className="md:w-1/5 text-[#00BBF2] flex flex-col items-center p-4">
                <span className="text-center">PROJECTILE REGEN</span>
                <img
                  src="/media/whitepaper/img11.jpg"
                  alt=""
                  className="w-3/5"
                />
              </div>
              <div className="md:w-4/5 text-sm md:text-lg flex items-center p-4 bg-[#00BBF2] border-4 border-[#00BBF2] text-white">
                Every number value increase increases projectile regeneration by
                0.01 seconds, maximum 0.5 second reduction.
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden md:flex mx-12 border-4 border-[#F58883] mb-6">
              <div className="md:w-1/5 text-[#F58883] flex flex-col items-center p-4">
                <span className="text-center">LUCK</span>
                <img
                  src="/media/whitepaper/img12.jpg"
                  alt=""
                  className="w-3/5"
                />
              </div>
              <div className="md:w-4/5 text-sm md:text-lg flex items-center p-4 bg-[#F58883] border-4 border-[#F58883] text-white">
                Every 1 value increase increases the likelihood that the user
                will find an item after a battle by 0.1%, maximum 10%.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
