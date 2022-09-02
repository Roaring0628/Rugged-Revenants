import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import Hero from "components/organisms/whitepaper/Hero";
import Introduction from "components/organisms/whitepaper/Introduction";
import WhatIs from "components/organisms/whitepaper/WhatIs";
import GamePlay from "components/organisms/whitepaper/GamePlay";
import FreeToPlay from "components/organisms/whitepaper/FreeToPlay";
import PlayYourWay from "components/organisms/whitepaper/PlayYourWay";
import RugsToRiches from "components/organisms/whitepaper/RugsToRiches";
import GenesisNFTCharges from "components/organisms/whitepaper/GenesisNFTCharges";
import LootBox from "components/organisms/whitepaper/LootBox";
import GenesisCollection from "components/organisms/whitepaper/GenesisCollection";
import RuggedRevenants from "components/organisms/whitepaper/RuggedRevenants";
import PartnerRevenantsNFT from "components/organisms/whitepaper/PartnerRevenantsNFT";
import RuggedRevenantsNFT from "components/organisms/whitepaper/RuggedRevenantsNFT";
import Rug from "components/organisms/whitepaper/Rug";
import JustSayNo from "components/organisms/whitepaper/JustSayNo";
import UpgradeRuggedRevenant from "components/organisms/whitepaper/UpgradeRuggedRevenant";
import StakingSkillUpgrades from "components/organisms/whitepaper/StakingSkillUpgrades";
import StakingStatUpgrades from "components/organisms/whitepaper/StakingStatUpgrades";
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
      <RugsToRiches />
      <GenesisNFTCharges />
      <LootBox />
      <GenesisCollection />
      <RuggedRevenants />
      <PartnerRevenantsNFT />
      <RuggedRevenantsNFT />
      <Rug />
      <JustSayNo />
      <UpgradeRuggedRevenant />
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
