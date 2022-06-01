import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import Hero from "components/organisms/whitepaper/Hero";
import Introduction from "components/organisms/whitepaper/Introduction";
import WhatIs from "components/organisms/whitepaper/WhatIs";
import GamePlay from "components/organisms/whitepaper/GamePlay";
import FreeToPlay from "components/organisms/whitepaper/FreeToPlay";
import PlayYourWay from "components/organisms/whitepaper/PlayYourWay";

export default function Home() {
  return (
    <main className="w-full relative">
      <Hero />
      <Introduction />
      <WhatIs />
      <GamePlay />
      <FreeToPlay />
      <PlayYourWay />
    </main>
  );
}
