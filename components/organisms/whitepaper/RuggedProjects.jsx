/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function RuggedProjects() {
  return (
    <>
      <section id="whitepaper-ruggedprojects" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                RUGGED PROJECTS
              </h1>
            </div>

            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Remember, the core to the value of Rugged Revenants is the ability
              for players to acquire valuable NFTs from Loot Coffins after
              burning rugged NFTs AND completing the final level of the game.
            </p>
            <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-8">
              Keeping with the theme of getting revenge of getting revenge on
              your rugged NFTs, all of the enemies in Rugged Revenants are
              actual NFTs from rugged projects, allowing Rugged Revenants
              players to exact their revenge again and again.
            </p>

            <img
              src="/media/whitepaper/img7.jpg"
              alt="basic monkey"
              className="w-4/5 mx-auto mb-4"
            />
          </div>
        </div>
      </section>
    </>
  );
}
