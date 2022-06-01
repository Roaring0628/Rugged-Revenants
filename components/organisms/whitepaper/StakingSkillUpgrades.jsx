/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function StakingSkillUpgrades() {
  return (
    <>
      <section id="whitepaper-stakingskillupgrades" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                STAKING - SKILL UPGRADES
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black">
              Players will be able to power up their Rugged Revenants Playable
              NFTs by doing the following:
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black">
              1. Stake their Rugged Revenants GENESIS NFTs and their Rugged
              Revenant Playable NFTs.
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black">
              2. Burn 100 $RUG Token
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              3. Burn “Upgrade Potion” OR an in-Game Item NFT
            </p>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              After burning an item, the player statistic (Health, Health Regen,
              Damage, etc.) will be upgraded by a random value between 1-3.
              Increased values for each statistic will provide in-game benefits.
            </p>

            <div className="relative py-8 mx-6 px-6 mb-6 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                Players will be able to stake their Rugged Revenants Genesis
                NFTs, plus their Dope Revenant NFTs.
              </p>
            </div>
            <div className="relative py-8 mx-6 px-6 mb-6 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                Players will then spend $RUG token and burn item NFTs they have
                won from Loot Coffins for multiple ingame upgrades related to
                three attributes.
              </p>
            </div>
            <div className="relative py-8 mx-6 px-6 mb-6 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                After burning the associated item, Health, Health Regeneration,
                or Player Damage will be upgraded by a random value between 1-3.
                Increased values for each attribute (Health, Health Regen, and
                Player Damage) will provide in-game benefits.
              </p>
            </div>
            <div className="relative py-8 mx-6 px-6 mb-8 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                These benefits will all improve the players’ chance to complete
                every level of the game, and thus win both more $RUG and a Loot
                Coffin filled with a valuable NFT.
              </p>
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl text-center text-black pt-6 pb-2 px-6">
              PROJECTILE SKILL TYPES
            </h1>
            <div className="mb-12">
              <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-3">
                All NFTs start with a value of 0. Every time this number
                increases by 1 the NFT unlocks new damage types, toggleable by
                the player:
              </p>
              <div className="px-6 text-sm sm:text-lg md:text-xl flex items-center gap-2 text-black mb-3">
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
              <div className="px-6 text-sm sm:text-lg md:text-xl flex items-center gap-2 text-black mb-3">
                2.
                <img
                  src="/media/whitepaper/img14.jpg"
                  width={40}
                  alt=""
                  className="inline-block"
                />{" "}
                <div className="text-black">
                  <span className="text-[#5ABA47]">Acid Damage </span> - Damage
                  over time to enemies with more than one tick of damage. 0.1
                  ticks of damage every second for 5 seconds
                </div>
              </div>
              <div className="px-6 text-sm sm:text-lg md:text-xl flex items-center gap-2 text-black mb-3">
                3.
                <img
                  src="/media/whitepaper/img15.jpg"
                  width={40}
                  alt=""
                  className="inline-block"
                />{" "}
                <div className="text-black">
                  <span className="text-[#D2CC28]">Lightning Damage</span> -
                  Stuns enemies for 0.5 seconds and does 1.25 ticks of damage
                </div>
              </div>
              <div className="px-6 text-sm sm:text-lg md:text-xl flex items-center gap-2 text-black mb-8">
                4.
                <img
                  src="/media/whitepaper/img16.jpg"
                  width={40}
                  alt=""
                  className="inline-block"
                />{" "}
                <div className="text-black">
                  <span className="text-[#2DABE2]">Ice Damage </span> - Slows
                  enemy movement and attack and does 1.25 ticks of damage
                </div>
              </div>
              <p className="px-6 text-sm sm:text-lg md:text-xl text-center text-black mb-8">
                A “tick” refers to the amount of damage done to a player when
                they are struck by a basic enemy attack once
              </p>
            </div>

            <div className="relative py-12 mx-6 px-6 mb-8 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-base md:text-lg text-center">
                MANY MORE NEW PROJECTILE SKILL TYPES TO COME!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
