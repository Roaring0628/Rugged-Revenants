/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function GamePlay() {
  return (
    <>
      <section id="whitepaper-gameplay" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                GAMEPLAY
              </h1>
            </div>

            <div className="w-full pb-12 px-6">
              <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                WELCOME REVENANTS!
              </h2>
              <p className="text-black text-base sm:text-lg">
                Hello new Revenants! 1Kin Labs (1KL) is excited to share our
                first feature game, Rugged Revenants! An exhilarating
                extravaganza of laughter, challenge, and fun.
              </p>
            </div>
            <div className="w-full pb-12 px-6">
              <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                EXCITING GAMEPLAY
              </h2>
              <p className="text-black text-base sm:text-lg">
                Rugged Revenants is a platformer at heart, which means that
                gameplay is fun, fast-paced, and skill optimized. Players take
                control of a 2D avatar and use this character to destroy enemies
                using a combination of melee and ranged attacks. Gameplay is
                focused on creating shareable moments filled with the highs of
                big wins combined with the lows of crushing defeats, and lots of
                trash talk!
              </p>
            </div>

            <img
              src="/media/whitepaper/image18.jpeg"
              alt="rugged revenants"
              className="w-full mb-12"
            />

            <div className="w-full pb-12 px-6">
              <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                HAND CRAFTED LEVELS
              </h2>
              <div className="md:flex">
                <p className="md:w-1/2 text-black text-base sm:text-lg pb-4">
                  Rugged Revenants will consist of a series of stylized levels.
                  These environments will contain custom crafted elements,
                  traps, easter eggs, and bosses that will create unique
                  battlegrounds for players to explore while they battle rugged
                  NFTs. New levels will be released regularly as new partners,
                  lore, and in-game events are introduced.
                </p>
                <img
                  src="/media/whitepaper/image19.jpeg"
                  alt="rugged revenants"
                  className="w-full md:w-1/2 object-cover"
                />
              </div>
            </div>

            <div className="w-full pb-12 px-6">
              <h2 className="text-xl md:text-2xl text-brand-orange mb-2">
                STYLIZED CHARACTERS
              </h2>
              <div className="md:flex justify-between">
                <p className="md:w-[60%] text-black text-base sm:text-lg pb-4">
                  1Kin is partnering with top projects on the Solana blockchain
                  to bring their PFP NFTs into our game as playable characters.{" "}
                  <br />
                  <br />
                  The Dope Cats are the first Rugged Revenants partner, and we
                  will launch a 4,000-piece 2D NFT collection, The Dope
                  Revenants. All 4,000 Dope Revenants are modeled after the Dope
                  Cats NFT collection. <br />
                  <br />
                  Owning a Dope Cat or Dope Revenant NFT will allow players
                  advanced in-game benefits.
                </p>
                <div className="w-full md:w-[30%] flex justify-between md:block">
                  <img
                    src="/media/sovana.png"
                    alt="rugged revenants"
                    className="w-[47%] md:w-full mb-8"
                  />
                  <img
                    src="/media/coolCats.png"
                    alt="rugged revenants"
                    className="w-[47%] md:w-full mb-8"
                  />
                </div>
              </div>
            </div>

            <p className="text-black text-base sm:text-lg md:text-xl text-center px-1">
              PLAYERS WILL HAVE THE OPTION TO PLAY WITH
            </p>
            <p className="text-brand-orange text-lg sm:text-2xl md:text-3xl text-center mb-8 px-1">
              ONE OF THREE CHARACTERS:
            </p>

            <div className="relative md:flex justify-between items-center py-6 px-6 mb-6 bg-[url(/media/whitepaper/image4.png)] bg-cover">
              <h1 className="text-base sm:text-xl md:text-2xl text-white">
                BASIC
              </h1>
              <p className="m-0 text-[0.5rem] sm:text-sm">
                DOES NOT HOLD AN NFT RELATED TO THE RUGGED REVENANT
              </p>
            </div>

            <img
              src="/media/whitepaper/image24.jpeg"
              alt="rugged revenants"
              className="w-4/5 mx-auto mb-8"
            />

            <div className="relative md:flex justify-between items-center py-6 px-6 mb-6 bg-[url(/media/whitepaper/image4.png)] bg-cover">
              <h1 className="text-base sm:text-xl md:text-2xl text-white">
                DOPE CATS
              </h1>
              <p className="m-0 text-[0.5rem] sm:text-sm">
                DOPE CAT NFT HOLDERS
              </p>
            </div>

            <img
              src="/media/whitepaper/image25.jpeg"
              alt="rugged revenants"
              className="w-4/5 mx-auto mb-8"
            />

            <div className="relative md:flex justify-between items-center py-6 px-6 mb-6 bg-[url(/media/whitepaper/image4.png)] bg-cover">
              <h1 className="text-base sm:text-xl md:text-2xl text-white">
                DOPE REVENANTS
              </h1>
              <p className="m-0 text-[0.5rem] sm:text-sm">
                DOPE REVENANT NFT HOLDERS
              </p>
            </div>

            <p className="text-black text-base sm:text-xl md:text-2xl text-center mb-8">
              COMING SOON
            </p>

            <div className="relative md:flex justify-between items-center rounded-lg py-6 px-6 mb-6 w-4/5 mx-auto bg-[url(/media/whitepaper/image4.png)] bg-cover">
              <p className="m-0 text-[0.5rem] sm:text-sm">
                DOPE CAT AND DOPE REVENANT OWNERS HAVE ACCESS TO IN-GAME UNLOCKS
                AND EASTER EGGS WHILE PLAYING AS THEIR NFT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
