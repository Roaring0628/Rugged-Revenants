/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function RugsToRiches() {
  return (
    <>
      <section id="whitepaper-rugstoriches" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                RUGS TO RICHES
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Core to the gameplay of Rugged Revenants is the ability to acquire
              valuable NFTs from Loot Coffins after completing the final level
              of the game. Players can only acquire Loot Coffins if they use a
              “charge” from a Genesis NFT before playing.
            </p>

            <div className="relative h-3 bg-[url(/media/whitepaper/image32.png)] bg-cover"></div>

            <div className="flex flex-col md:flex-row items-center justify-center pt-8">
              <img
                src="/media/whitepaper/img6.jpg"
                alt="potion"
                className="w-3/5 md:w-1/5 mx-6 mb-6"
              />
              <div className="">
                <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
                  HOW DO I GET LOOT COFFINS?
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                  Win Rugged Revenants after using 1/3 Charges from a Genesis
                  NFT
                </p>
                <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
                  HOW DO I GET A GENESIS NFT?
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                  Burn a Rugged NFT without a Genesis NFT in your wallet, or
                  beat level 1 of Rugged Revenants with no Genesis NFT in your
                  wallet
                </p>
                <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
                  HOW DO I USE A CHARGE FROM A GENESIS NFT?
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black">
                  You will be prompted to use a charge to activate the Loot
                  Coffin before a game starts
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
                HOW DO I GET MORE CHARGES?
              </p>
              <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                Beat levels or burn Rugged NFTs, both of which will apply 1
                charge to your Genesis NFT
              </p>
              <p className="px-6 text-base sm:text-xl md:text-2xl text-brand-orange mb-4">
                HOW MANY CHARGES CAN A GENESIS NFT HOLD?
              </p>
              <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
                Each genesis NFT can hold 3 charges
              </p>
            </div>

            <div className="flex justify-evenly pt-4">
              <img
                src="/media/whitepaper/image75.png"
                className="w-1/4"
                alt=""
              />
              <img
                src="/media/whitepaper/image108.png"
                className="w-1/4"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
