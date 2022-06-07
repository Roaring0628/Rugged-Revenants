/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const Demo = ({ handlePlay }) => {
  const [myGameInstance, setMyGameInstance] = useState(null);

  useEffect(() => {
    let loaderUrl =
      "https://v6p9d9t4.ssl.hwcdn.net/html/5932410/RuggedWebGL_TESTING/Build/RuggedWebGL_TESTING.loader.js";
    let script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      window
        .createUnityInstance(document.querySelector("#unity-canvas"), {
          dataUrl: "/Build/RuggedWebGL_TESTING.data.unityweb",
          frameworkUrl: "/Build/RuggedWebGL_TESTING.framework.js.unityweb",
          codeUrl: "/Build/RuggedWebGL_TESTING.wasm.unityweb",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "DefaultCompany",
          productName: "Dope Cats",
          productVersion: "1.0",
          matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
          // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        })
        .then((unityInstance) => {
          window.myGameInstance = unityInstance;
          setMyGameInstance(unityInstance);
        });
    };
    document.body.appendChild(script);
  }, []);

  const sendMessageToGameInstance = () => {
    let testObject = { hasDopeCat: true, hasPixelBand: false };
    let jsonString = JSON.stringify(testObject);
    myGameInstance.SendMessage(
      "JavascriptHook",
      "RecieveWalletJson",
      jsonString
    );
  };

  useEffect(() => {
    if (myGameInstance) sendMessageToGameInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGameInstance]);

  return (
    <div className="game-wrapper">
      <div className="demo-wrapper">
        <img
          className="tv-screen"
          src="/media/tvScreenTransparent.png"
          alt="tv screen"
          style={{ pointerEvents: "none" }}
        ></img>
        <canvas
          id="unity-canvas"
          width="960"
          height="600"
          style={{ width: 960, height: 600, background: "#231f20" }}
        ></canvas>
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
