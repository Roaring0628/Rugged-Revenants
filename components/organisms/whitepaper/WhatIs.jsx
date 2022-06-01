/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function WhatIs() {
  return (
    <>
      <section id="whitepaper-whatis" className="pt-20">
        <div className="container">
          <div className="bg-white">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                WHAT IS RUGGED REVENANTS?
              </h1>
            </div>

            <img
              src="/media/whitepaper/image6.jpeg"
              alt="rugged revenants"
              className="w-full mb-16"
            />

            <div className="w-full md:flex items-center pb-16">
              <div className="md:w-[45%] bg-[url(/media/whitepaper/image3.png)] bg-cover mb-16 md:mb-0">
                <div className="flex flex-col items-center py-16">
                  <p className="text-2xl">RUGGED PROJECTS</p>
                  <p className="text-2xl">GOT YOU</p>
                  <p className="text-7xl mb-12">DOWN?</p>
                  <p className="text-2xl">ARE YOU SITTING</p>
                  <p className="text-2xl">ON SOME</p>
                  <p className="text-4xl">WORTHLESS?</p>
                  <p className="text-7xl">NFTs?</p>
                </div>
              </div>
              <div className="md:w-[55%] px-8">
                <h2 className="text-2xl text-brand-orange mb-2">
                  RUGGED REVENANTS
                </h2>
                <p className="text-black text-base sm:text-lg">
                  is an NFT game where you can exact your Rugged Revenge by
                  turning your Rugged NFTs into valuable NFTs within thriving
                  communities, building fun projects! When you win the Rugged
                  Revenants, not only do you destroy Rugged NFTs, you revive
                  their value, just like a Revenant.
                </p>
              </div>
            </div>

            <div className="w-full mb-12">
              <img
                src="/media/whitepaper/img1.jpg"
                alt="rugged revenants"
                className="w-full md:w-4/5 mx-auto"
              />
            </div>

            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-base sm:text-xl md:text-2xl text-white py-2 px-6">
                That’s where Rugged Revenants began...
              </h1>
            </div>

            <div className="w-full mb-12">
              <img
                src="/media/whitepaper/image16.jpeg"
                alt="rugged revenants"
                className="w-full"
              />
            </div>

            <div className="w-full md:flex text-black pb-12">
              <p className="md:w-1/2 px-4 mb-4 text-sm md:text-lg">
                1Kin Labs (1KL) created a game for players to get revenge on
                projects that rugged them. Letting heroes of the blockchain
                emerge to banish the villainous rug pull masters.
              </p>
              <p className="md:w-1/2 px-4 mb-4 text-sm md:text-lg">
                All of the enemies in Rugged Revenants are actual NFTs from
                rugged projects, allowing Rugged Revenants players to exact
                their revenge again and again.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
