import Hero from "components/organisms/player-guide/Hero";
import Introduction from "components/organisms/player-guide/Introduction";
import FreeToPlay from "components/organisms/player-guide/FreeToPlay";
import PartneredNFT from "components/organisms/player-guide/PartneredNFT";
import PlayableNFT from "components/organisms/player-guide/PlayableNFT";
import UpgradeSystem from "components/organisms/player-guide/UpgradeSystem";
import WIN2EARN from "components/organisms/player-guide/WIN2EARN";
import BurnNFT from "components/organisms/player-guide/BurnNFT";
import SkillStatUpgrades from "components/organisms/player-guide/SkillStatUpgrades";
import PlayYourWay from "components/organisms/player-guide/PlayYourWay";
import RugsToRiches from "components/organisms/player-guide/RugsToRiches";
import Partners from "components/organisms/player-guide/Partners";
import Attributes1 from "components/organisms/player-guide/Attributes1";
import Attributes2 from "components/organisms/player-guide/Attributes2";
import Attributes3 from "components/organisms/player-guide/Attributes3";
import Attributes4 from "components/organisms/player-guide/Attributes4";
import Attributes5 from "components/organisms/player-guide/Attributes5";
import Attributes6 from "components/organisms/player-guide/Attributes6";
import Attributes7 from "components/organisms/player-guide/Attributes7";

export default function PlayerGuide() {
  return (
    <main className="w-full relative">
      <Hero />
      <Introduction />
      <FreeToPlay />
      <PartneredNFT />
      <PlayableNFT />
      <UpgradeSystem />
      <WIN2EARN />
      <BurnNFT />
      <SkillStatUpgrades />
      <PlayYourWay />
      <RugsToRiches />
      <Partners />
      <Attributes1 />
      <Attributes2 />
      <Attributes3 />
      <Attributes4 />
      <Attributes5 />
      <Attributes6 />
      <Attributes7 />
    </main>
  );
}
