/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function UpgradePotions() {
  return (
    <>
      <section id="whitepaper-upgradepotions" className="pt-20">
        <div className="container">
          <div className="bg-white pb-12">
            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                UPGRADE POTIONS
              </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center">
              <img
                src="/media/whitepaper/img5.jpg"
                alt="potion"
                width={100}
                height={180}
                className="mx-6 mb-6"
              />
              <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-6">
                Players can burn “Upgrade Potion” NFTs in order to upgrade their
                playable character NFTs. Players can earn these NFTs through
                gameplay, or buy them on the secondary market.
              </p>
            </div>

            <div className="relative flex items-center h-24 sm:h-28 overflow-hidden mb-6">
              <img
                src="/media/whitepaper/image4.png"
                alt="header back"
                className="absolute top-0 left-0 w-full h-full"
              />
              <h1 className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white py-2 px-6">
                LOOT COFFINS
              </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="">
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-6">
                  Players earn a Loot Coffin at the end of their play session if
                  they complete a level. This Loot Coffin will contain different
                  content based on:
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-0">
                  1. How far the player progresses
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-6">
                  2. Whether or not the player used a “charge” from their
                  GENESIS collection, or Solana, to activate Premium loot.
                </p>
                <p className="px-6 text-sm sm:text-lg md:text-xl text-black mb-6">
                  NOTE: Until the game has 10 levels, the player should earn an
                  Premium NFT if they beat the final level available in the
                  game.
                </p>
              </div>
              <img
                src="/media/whitepaper/img6.jpg"
                alt="potion"
                className="w-3/5 md:w-1/5 mx-6 mb-6"
              />
            </div>

            <div className="px-6 overflow-x-auto">
              <table className="w-full border border-black text-black text-center text-[0.6rem] md:text-base">
                <tbody>
                  <tr className="bg-[url(/media/whitepaper/image32.png)] bg-cover text-white">
                    <td className="p-3">LAST LEVEL PLAYER REACHED</td>
                    <td className="border-l border-white p-3">
                      PREMIUM NFT EARNED?
                    </td>
                    <td className="border-l border-white p-3">
                      “UPGRADE POTION” EARNED
                    </td>
                    <td className="border-l border-white p-3">
                      $RUG TOKEN EARNED
                    </td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">1</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">1-3</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">2</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">3-5</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">3</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">5-8</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">4</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">8-10</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">5</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">10-12</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">6</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">12-14</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">7</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">14-16</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">8</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">16-18</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">9</td>
                    <td className="border-l border-black p-3">No</td>
                    <td className="border-l border-black p-3">+0.5%</td>
                    <td className="border-l border-black p-3">18-20</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-3">“Final Level” 10</td>
                    <td className="border-l border-black p-3">Yes</td>
                    <td className="border-l border-black p-3">+1.5%</td>
                    <td className="border-l border-black p-3">25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
