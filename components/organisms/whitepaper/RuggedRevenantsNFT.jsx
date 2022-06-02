/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function RuggedRevenantsNFT() {
  return (
    <>
      <section id="whitepaper-ruggedrevenantsnft" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                RUGGED REVENANTS NFT COLLECTION
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              The Dope Cats are the first Rugged Revenants partner, and we will
              launch a 4,000-piece 2D NFT collection, The Dope Revenants. All
              4,000 Dope Revenants are modeled after the Dope Cats NFT
              collection.
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Each of these NFTs contains attributes like wings, armor, and
              laser visors. These attributes will give players upgrades related
              to those attributes in game. NFTs with wings will fly, NFTs with
              armor will be able to take more damage, NFTs will halos will
              receive an extra life, etc.
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Players can mint these NFTs in July 2022, or buy them from the
              secondary market after mint.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
              <img
                className="w-full"
                src="/media/whitepaper/image139.jpeg"
                alt=""
              />
              <img
                className="w-full"
                src="/media/whitepaper/image140.jpeg"
                alt=""
              />
              <img
                className="w-full"
                src="/media/whitepaper/image141.jpeg"
                alt=""
              />
              <img
                className="w-full"
                src="/media/whitepaper/image142.jpeg"
                alt=""
              />
            </div>

            <div className="md:flex items-center pt-4">
              <img
                className="w-full md:w-3/5"
                src="/media/whitepaper/img20.jpg"
                alt=""
              />
              <img
                className="w-full md:w-2/5"
                src="/media/whitepaper/img21.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
