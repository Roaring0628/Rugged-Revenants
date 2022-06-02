/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function GenesisNFTCharges() {
  return (
    <>
      <section id="whitepaper-genesisnftcharges" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <div>
                <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                  GENESIS NFT CHARGES
                </h1>
                <p className="relative z-10 text-base sm:text-lg md:text-xl px-6">
                  CONSUMING & RECHARGE
                </p>
              </div>
            </div>

            <img
              src="/media/whitepaper/img30.jpg"
              alt=""
              className="w-full mx-auto mb-6"
            />
          </div>
        </div>
      </section>
    </>
  );
}
