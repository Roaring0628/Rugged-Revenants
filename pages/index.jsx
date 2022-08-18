import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import Hero from "components/organisms/home/Hero";
import ShortAboutOne from "components/organisms/home/ShortAboutOne";
import ShortAboutTwo from "components/organisms/home/ShortAboutTwo";
import ShortAboutThree from "components/organisms/home/ShortAboutThree";
import ShortAboutFour from "components/organisms/home/ShortAboutFour";
import DemoVideo from "components/organisms/home/DemoVideo";
import WhyJoin from "components/organisms/home/WhyJoin";
import Partnerships from "components/organisms/home/Partnerships";
import Roadmap from "components/organisms/home/Roadmap";
import TeamMembers from "components/organisms/home/TeamMembers";
import FAQ from "components/organisms/home/FAQ";

export default function Home() {
  const [play, setPlay] = useState(false);

  return (
    <main className="w-full relative">
      <Hero play={play} setPlay={setPlay} />
      <ShortAboutOne play={play} setPlay={setPlay} />
      <ShortAboutTwo />
      <ShortAboutThree />
      <ShortAboutFour />
      <DemoVideo />
      <WhyJoin />
      <Partnerships />
      <Roadmap />
      <TeamMembers />
      {/* <FAQ /> */}
    </main>
  );
}
