/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function DigitalSpillage() {
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
                DIGITAL SPILLAGE
              </h1>
            </div>

            <img
              src="/media/whitepaper/image213.png"
              alt="play your way"
              className="mb-8"
            />

            <p className="text-sm sm:text-lg md:text-xl text-black px-6 mb-8">
              Digital spillage is covered with all of the toxic residue stored
              in your Revenant’s veins. Ruggers manufacture ooze and goo in the
              abandoned factory. Using it to slip up Revenants and cover them in
              toxicity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
