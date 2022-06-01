import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import Hero from "components/organisms/whitepaper/Hero";
import Introduction from "components/organisms/whitepaper/Introduction";
import WhatIs from "components/organisms/whitepaper/WhatIs";
import GamePlay from "components/organisms/whitepaper/GamePlay";
import FreeToPlay from "components/organisms/whitepaper/FreeToPlay";
import PlayYourWay from "components/organisms/whitepaper/PlayYourWay";
// import RugsToRiches from "components/organisms/whitepaper/RugsToRiches";
import StakingStatUpgrades from "components/organisms/whitepaper/StakingStatUpgrades";
import StakingSkillUpgrades from "components/organisms/whitepaper/StakingSkillUpgrades";
import RuggedProjects from "components/organisms/whitepaper/RuggedProjects";
import Monkeys from "components/organisms/whitepaper/Monkeys";
import UpgradePotions from "components/organisms/whitepaper/UpgradePotions";
import HandcraftedLevels from "components/organisms/whitepaper/HandcraftedLevels";
import TheJungle from "components/organisms/whitepaper/TheJungle";
import DigitalSpillage from "components/organisms/whitepaper/DigitalSpillage";

export default function Home() {
  return (
    <main className="w-full relative">
      <Hero />
      <Introduction />
      <WhatIs />
      <GamePlay />
      <FreeToPlay />
      <PlayYourWay />
      {/* <RugsToRiches /> */}
      <StakingSkillUpgrades />
      <StakingStatUpgrades />
      <RuggedProjects />
      <Monkeys />
      <UpgradePotions />
      <HandcraftedLevels />
      <TheJungle />
      <DigitalSpillage />
    </main>
  );
}
