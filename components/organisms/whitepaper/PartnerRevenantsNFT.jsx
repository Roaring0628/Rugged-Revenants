/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function PartnerRevenantsNFT() {
  return (
    <>
      <section id="whitepaper-partnerrevenantsnft" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                PARTNER REVENANT NFTS
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Holders of Partner NFTs like The Dope Cats and Sovana will get to
              play with a power up-character and receive bonus health in-game.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
              <img
                className="w-full"
                src="/media/whitepaper/image126.jpeg"
                alt=""
              />
              <img
                className="w-full"
                src="/media/whitepaper/image127.png"
                alt=""
              />
              <img
                className="w-full"
                src="/media/whitepaper/image128.jpeg"
                alt=""
              />
            </div>

            <div className="md:flex items-center pt-4">
              <img
                className="w-full md:w-3/5"
                src="/media/whitepaper/img22.jpg"
                alt=""
              />
              <img
                className="w-full md:w-2/5"
                src="/media/whitepaper/img23.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
