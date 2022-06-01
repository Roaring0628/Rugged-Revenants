/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function PlayYourWay() {
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
                PLAY YOUR WAY
              </h1>
            </div>

            <div className="w-full pb-12 px-6">
              <h2 className="text-xl md:text-2xl text-black mb-4 text-center">
                SOVANA METAVERSE OR WEB2
              </h2>
              <div className="md:flex">
                <div className="md:w-[55%]">
                  <img
                    src="/media/whitepaper/image33.png"
                    alt="play your way"
                    className="w-4/5 mx-auto"
                  />
                </div>
                <div className="md:w-[45%]">
                  <p className="text-sm sm:text-lg md:text-xl text-black py-8">
                    Rugged Revenants players can access the game from our
                    website, or from within the Revenants Arcade within the
                    Sovana metaverse.
                  </p>
                  <img
                    src="/media/whitepaper/image34.jpeg"
                    alt="play your way"
                    className="w-3/5 mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="relative md:flex justify-between items-center py-6 px-6 mb-6 bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-sm sm:text-lg md:text-xl text-center">
                To access Sovana, visit{" "}
                <a
                  href="https://www.sovana.world/"
                  rel="noreferrer"
                  target="_blank"
                  className="underline"
                >
                  https://www.sovana.world
                </a>{" "}
                and click “Play Demo In Browser”. Once you’re in Sovana look for
                the Revenants Arcade, head inside, load into the game and start
                playing.
              </p>
            </div>

            <img
              src="/media/whitepaper/img2.jpg"
              alt="play your way"
              className="w-4/5 mx-auto mb-4"
            />

            <p className="text-sm sm:text-lg md:text-xl text-black px-6 mb-8">
              Rugged Revenants is launching as a single-player experience,
              however, multiplayer will debut in Summer 2022. Players will team
              up with their fellow revenants as friends or foes to defeat levels
              of ruggers mobbing their way into wallets! We’ve developed a
              unique matchmaking service, powered by Discord.
            </p>

            <div className="relative py-8 px-6 bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-base sm:text-lg md:text-xl text-center">
                Here’s a quick user flow describing how it works:
              </p>
            </div>

            <img
              src="/media/whitepaper/img3.jpg"
              alt="play your way"
              className="w-full mb-4"
            />
            <img
              src="/media/whitepaper/img4.jpg"
              alt="play your way"
              className="w-full mb-4"
            />

            <div className="relative py-8 px-6 mb-6 bg-[url(/media/whitepaper/image32.png)] bg-cover">
              <p className="m-0 text-lg sm:text-3xl md:text-4xl text-center">
                ONGOING DEVELOPMENT
              </p>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-4">
              Every month our game development partners at the Dev House Agency
              in Dallas will add new content in the form of new levels, enemies,
              and playable NFTs from new Dope Revenant partner collections
              (NFTs).
            </p>

            <img
              src="/media/whitepaper/image71.png"
              alt="play your way"
              className="w-4/5 md:w-3/5 mb-4 mx-auto"
            />

            <div className="flex justify-center">
              <a
                href="https://www.thedevhouseagency.com/"
                rel="noreferrer"
                target="_blank"
                className="text-black"
              >
                www.thedevhouseagency.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
