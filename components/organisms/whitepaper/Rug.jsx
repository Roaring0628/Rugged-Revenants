/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function Rug() {
  return (
    <>
      <section id="whitepaper-rug" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                $RUG
              </h1>
            </div>

            <p className="px-6 text-base sm:text-xl md:text-2xl text-black">
              What is $RUG?
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              $RUG is an SPL Token designed for the Rugged Revenants ecosystem.
            </p>
            <p className="px-6 text-base sm:text-xl md:text-2xl text-black">
              Where do I get $RUG?
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              $RUG can be acquired in two ways:
            </p>

            <p className="px-6 text-base sm:text-xl md:text-2xl text-[#40AD49]">
              WINNING RUGGED REVENANTS LEVELS
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              This is the only reward players can earn while playing without
              inserting $RUG. All players can win $RUG when completing levels.
            </p>

            <img
              src="/media/whitepaper/image16.jpeg"
              alt=""
              className="w-full md:w-3/5 mx-auto mb-6"
            />

            <p className="px-6 text-base sm:text-xl md:text-2xl text-[#25408F]">
              BUYING $RUG
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Purchase our token on exchanges like Famous Fox Federation.
            </p>

            <img
              src="/media/whitepaper/image144.jpeg"
              alt=""
              className="w-full md:w-1/2 mx-auto mb-6"
            />
            <div className="flex justify-center">
              <a
                href="https://famousfoxes.com/tokenmarket"
                rel="noreferrer"
                target="_blank"
                className="text-black"
              >
                famousfoxes.com/tokenmarket
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
