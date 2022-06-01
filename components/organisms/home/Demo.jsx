/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

const Demo = ({ handlePlay }) => {
  const demoIframeRef = useRef();

  const handleImageClick = () => {
    demoIframeRef.current.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      handleImageClick();
    }, 200);
  }, []);

  return (
    <div className="game-wrapper">
      <div className="demo-wrapper">
        <img
          className="tv-screen"
          src="/media/tvScreenTransparent.png"
          alt="tv screen"
          style={{ pointerEvents: "none" }}
        ></img>
        <iframe
          ref={demoIframeRef}
          title="demo"
          mozallowfullscreen="true"
          allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated"
          frameBorder="0"
          width="960px"
          height="600px"
          src="https://v6p9d9t4.ssl.hwcdn.net/html/5853607/RuggedWebGL/index.html"
          msallowfullscreen="true"
          scrolling="no"
          allowFullScreen={true}
          webkitallowfullscreen="true"
          allowtransparency="true"
        ></iframe>
      </div>
      <div className="quit-wrapper">
        <div
          onClick={handlePlay}
          className="w-64 h-24 relative flex justify-center items-center cursor-pointer hover:text-brand-purple"
        >
          <img
            className="absolute top-0 left-0 w-full h-full"
            src="/media/button.png"
            alt="button"
          ></img>
          <span className="text-lg mb-2 z-10">QUIT</span>
        </div>
      </div>
    </div>
  );
};

export default Demo;
