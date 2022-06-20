/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Modal from "components/molecules/Modal";

const Roadmap = () => {
  const [isDesktop, setDesktop] = useState(false);
  const [showPhase1Modal, setShowPhase1Modal] = useState(false);
  const [showPhase2Modal, setShowPhase2Modal] = useState(false);
  const [showPhase3Modal, setShowPhase3Modal] = useState(false);

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  //Conditionally render demo for desktop only
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1023);
  };

  const openPhase1Modal = () => {
    document.body.style.overflow = "hidden";
    setShowPhase1Modal(true);
  };
  const closePhase1Modal = () => {
    document.body.style.overflow = "unset";
    setShowPhase1Modal(false);
  };
  const openPhase2Modal = () => {
    document.body.style.overflow = "hidden";
    setShowPhase2Modal(true);
  };
  const closePhase2Modal = () => {
    document.body.style.overflow = "unset";
    setShowPhase2Modal(false);
  };
  const openPhase3Modal = () => {
    document.body.style.overflow = "hidden";
    setShowPhase3Modal(true);
  };
  const closePhase3Modal = () => {
    document.body.style.overflow = "unset";
    setShowPhase3Modal(false);
  };

  return (
    <section id="roadmap" className="w-full pt-48">
      <div className="container">
        <div className="mb-4">
          <h1 className="text-4xl text-center mb-8">Roadmap</h1>
          <p className="text-lg text-center mb-16">
            {isDesktop ? (
              <>(Click phases to see details)</>
            ) : (
              <>(Tap phases to see details)</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
          <div className="flex flex-col items-center">
            <div
              className="w-[27rem] h-[12rem] mb-4 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple"
              onClick={openPhase1Modal}
            >
              <img
                className="absolute top-0 left-0 w-full h-full"
                data-toggle="modal"
                data-target="#phase1"
                loading="lazy"
                src="/media/button.png"
                alt="button"
              ></img>
              <div className="text-xl mb-3 z-10">Phase 1</div>
            </div>
            <div className="px-12 md:px-4 roadmap-text">
              <h1 className="text-2xl mb-4">Training Begins</h1>
              <ul className="text-sm">
                <li>Discord, Twitter, and Website Launch</li>
                <li>Beta Levels 1-4</li>
                <li className="elipsis">...</li>
              </ul>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="center-image">
              <img
                src="/media/downSlope.gif"
                alt="loot"
                loading="lazy"
                className=""
              />
            </div>
          </div>

          <div className="hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
          <div className="hidden md:block"></div>

          <div className="hidden md:block">
            <div className="center-image">
              <img
                src="/media/downSlope.gif"
                alt="loot"
                loading="lazy"
                className=" rotate-90"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="w-[27rem] h-[12rem] mb-4 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple"
              onClick={openPhase2Modal}
            >
              <img
                className="absolute top-0 left-0 w-full h-full"
                data-toggle="modal"
                data-target="#phase2"
                loading="lazy"
                src="/media/button.png"
                alt="button"
              ></img>
              <div className="text-xl mb-3 z-10">Phase 2</div>
            </div>
            <div className="px-12 md:px-4 roadmap-text">
              <h1 className="text-2xl mb-4">Rugs 2 Riches</h1>
              <ul className="text-sm">
                <li>Full Game Release</li>
                <li>Levels 5-10</li>
                <li className="elipsis">...</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
          <div className="flex flex-col items-center">
            <div
              className="w-[27rem] h-[12rem] mb-4 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple"
              onClick={openPhase3Modal}
            >
              <img
                className="absolute top-0 left-0 w-full h-full"
                data-toggle="modal"
                data-target="#phase3"
                loading="lazy"
                src="/media/button.png"
                alt="button"
              ></img>
              <div className="text-xl mb-3 z-10">Phase 3</div>
            </div>
            <div className="px-12 md:px-4 roadmap-text">
              <h1 className="text-2xl mb-4">To the Moon!</h1>
              <ul className="text-sm">
                <li>More levels</li>
                <li>More bosses</li>
                <li className="elipsis">...</li>
              </ul>
            </div>
          </div>

          <div className="hidden md:block"></div>
          <div className="hidden md:block"></div>
        </div>

        <Modal show={showPhase1Modal} close={closePhase1Modal}>
          <ul className="roadmap-content">
            <li>Discord, Twitter, and Website Launch</li>
            <li>
              Beta Levels 1-4
              <ul>
                <li>Custom Pixel Bands Level - The Beach</li>
                <li>Custom Dope Cats Levels - The Jungle & Digital Spillage</li>
              </ul>
            </li>
            <li>Playable Dope Cat Characters</li>
            <li>Playable Pixelbands Characters</li>
            <li>Revenant Arcade Launches in Sovana</li>
            <li>White Paper v1 Release</li>
            <li>Comic Book Teasers</li>
            <li>Custom High Roller Hippo Clique Level</li>
            <li>Custom High Roller Hippo Clique Playable Characters</li>
          </ul>
        </Modal>
        <Modal show={showPhase2Modal} close={closePhase2Modal}>
          <ul className="roadmap-content">
            <li>Full Game Release</li>
            <li>Levels 5-10</li>
            <li>
              Dope Cat, High Roller Hippo Clique, and Pixel Bands Playable,
              Upgradeable Character Mint
            </li>
            <li>$RUG Utility Token Launch for Player Upgrades</li>
            <li>Multiplayer</li>
            <li>Staking for Player Upgrades</li>
          </ul>
        </Modal>
        <Modal show={showPhase3Modal} close={closePhase3Modal}>
          <ul className="roadmap-content">
            <li>More levels</li>
            <li>More bosses</li>
            <li>More prizes</li>
            <li>More partners</li>
            <li>More metaverses</li>
            <li>MORE, MORE, MORE</li>
          </ul>
        </Modal>
      </div>
    </section>
  );
};

export default Roadmap;
