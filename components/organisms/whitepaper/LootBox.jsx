/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function LootBox() {
  return (
    <>
      <section id="whitepaper-lootbox" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                LOOT BOX MODE (1)
              </h1>
            </div>

            <img
              src="/media/whitepaper/img28.jpg"
              alt=""
              className="w-4/5 md:w-3/5 mx-auto mb-6"
            />

            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                LOOT BOX MODE (2)
              </h1>
            </div>

            <img
              src="/media/whitepaper/img29.jpg"
              alt=""
              className="w-full md:w-4/5 mx-auto mb-6"
            />
          </div>
        </div>
      </section>
    </>
  );
}
