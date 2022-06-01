/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

import Demo from "./Demo.jsx";

export default function Hero({ play, setPlay }) {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  // conditionally render demo for desktop only
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1008);
  };

  const handlePlay = () => {
    if (play) document.body.style.overflow = "unset";
    else document.body.style.overflow = "hidden";
    setPlay(!play);
  };

  return (
    <>
      <section id="hero" className="mt-28 scroll-mt-28">
        <div className="container relative">
          <img
            className="w-full h-full max-h-[77vh] object-contain"
            src="/media/hero.png"
            alt="Hero Image"
          ></img>
          <div className="absolute top-0 left-0 w-full h-full">
            {!play && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                  className="w-1/3 mb-6"
                  src="/media/rrLogo.png"
                  alt="play button"
                ></img>
                {isDesktop && (
                  <div
                    onClick={handlePlay}
                    className="w-64 h-24 relative flex justify-center items-center cursor-pointer hover:text-brand-purple"
                  >
                    <img
                      className="absolute top-0 left-0 w-full h-full"
                      src="/media/button.png"
                      alt="button"
                    ></img>
                    <span className="text-lg mb-2 z-10">PLAY</span>
                  </div>
                )}
                <div className="flex items-center justify-center mt-4">
                  <a
                    href="https://discord.gg/ruggedrevenants"
                    rel="noreferrer"
                    className="mr-6"
                    target="_blank"
                  >
                    <div className="relative w-12 h-12">
                      <NextImage src="/media/discord2.svg" layout="fill" />
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/RuggedRevenants/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="relative w-12 h-12">
                      <NextImage src="/media/twitter2.svg" layout="fill" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        {play && (
          <div className="fixed z-50 inset-0 w-full h-full overflow-y-auto bg-black">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
            <Demo handlePlay={handlePlay} />
          </div>
        )}
      </section>
    </>
  );
}
