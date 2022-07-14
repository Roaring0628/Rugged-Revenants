/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import classNames from "classnames";

const ShortAboutOne = ({ play, setPlay }) => {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  // conditionally render demo for desktop only
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1023);
  };

  const handlePlay = () => {
    if (play) document.body.style.overflow = "unset";
    else document.body.style.overflow = "hidden";
    setPlay(!play);
  };

  return (
    <section id="about" className="w-full pt-32">
      <div className="container">
        <div className="flex flex-col-reverse md:flex-row pt-8">
          <div className="md:w-1/2 pt-20 flex flex-col items-center md:block">
            <div className="flex gap-4 mb-6">
              <img src="/media/line.png" alt="line" loading="lazy" />
              <img src="/media/lineDark.png" alt="line" loading="lazy" />
              <img src="/media/lineDark.png" alt="line" loading="lazy" />
              <img src="/media/lineDark.png" alt="line" loading="lazy" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl mb-6">Rugs to riches</h1>
              <p className="text-sm1 mb-6">
                Use charges to win NFTs from our game. Earn more charges by
                winning.
              </p>
              <div
                className={classNames("flex -ml-12 pt-12", {
                  "justify-center ml-0": !isDesktop,
                })}
              >
                <a
                  href="https://discord.gg/ruggedrevenants"
                  rel="noreferrer"
                  target="_blank"
                  className="button-container"
                >
                  <div
                    onClick={handlePlay}
                    className="w-80 h-32 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple"
                  >
                    <img
                      className="absolute top-0 left-0 w-full h-full"
                      src="/media/button.png"
                      alt="button"
                    ></img>
                    <span className="text-lg mb-2 z-10">DISCORD</span>
                  </div>
                </a>
                {isDesktop && (
                  <div
                    onClick={handlePlay}
                    className="w-80 h-32 relative flex justify-center items-center cursor-pointer flex-shrink-0 hover:text-brand-purple"
                  >
                    <img
                      className="absolute top-0 left-0 w-full h-full"
                      src="/media/button.png"
                      alt="button"
                    ></img>
                    <span className="text-lg mb-2 z-10">PLAY</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src="/media/pixelArcade2-2.gif"
                className="max-h-[400px]"
                alt="arcade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortAboutOne;
