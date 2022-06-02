/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function Hero() {
  return (
    <>
      <section id="whitepaper-hero" className="mt-28 scroll-mt-28">
        <div className="container">
          <div className="relative">
            <img
              className="w-full"
              src="/media/whitepaper/image1.jpeg"
              alt="hero back"
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] sm:w-[60%]">
              <img
                src="/media/rrLogo.png"
                alt="rugged revenants"
                className="w-full mb-6"
              />
              <h1 className="text-center text-3xl md:text-4xl uppercase mb-4">
                WHITEPAPER
              </h1>
              <p className="text-lg text-center">June 2, 2022</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
