/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function TheJungle() {
  return (
    <>
      <section id="whitepaper-digitalspillage" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                THE JUNGLE
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8">
                <p className="text-base sm:text-xl md:text-2xl text-black mb-8">
                  Our journey begins in the Jungle, Sgt. Kipps battles through
                  hordes of Ruggers in order to reach a chemical plant rumored
                  to be mutating Ruggers into monstrous versions of themselves.
                </p>
                <div className="text-base sm:text-xl md:text-2xl text-black mb-8">
                  <img
                    className="float-right mb-6"
                    src="/media/whitepaper/image30.png"
                    alt="coin"
                    width={100}
                    height={100}
                  ></img>
                  <span className="">
                    This first level of Rugged Revenants is designed to give the
                    players a tough, yet achievable introduction to the game.
                    Upon beating this level, players who insert $RUG before
                    starting the match will receive both $RUG and a Genesis
                    Coffin NFT, those who did not insert $RUG before starting
                    will receive $RUG token.
                  </span>
                </div>
                <p className="text-base sm:text-xl md:text-2xl text-black mb-8">
                  Welcome to the Jungle!
                  <br />
                  It’s all fun and games :)
                </p>

                <div className="relative py-8 px-6 mb-6 rounded-lg bg-[url(/media/whitepaper/image32.png)] bg-cover">
                  <p className="m-0 text-base sm:text-lg md:text-xl text-center">
                    IF YOU CAN DODGE A BOULDER, YOU CAN DODGE A MONKEY.
                  </p>
                </div>
              </div>
              <div className="px-8">
                <img
                  className="w-full mb-6"
                  src="/media/whitepaper/image19.jpeg"
                  alt="image 19"
                ></img>
                <img
                  className="w-full mb-6"
                  src="/media/whitepaper/image209.jpeg"
                  alt="image 19"
                ></img>
                <img
                  className="w-full"
                  src="/media/whitepaper/image210.jpeg"
                  alt="image 19"
                ></img>
                <img
                  className="w-full mb-6"
                  src="/media/whitepaper/image211.jpeg"
                  alt="image 19"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
