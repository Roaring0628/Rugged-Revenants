/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import GameWinner from "./GameWinner";

const Demo = ({
  handlePlay,
  beatFirstLevel,
  hasGenesis,
  tokenOwnershipData,
  solBalance,
}) => {
  const [myGameInstance, setMyGameInstance] = useState(null);
  const [showChest, setShowChest] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== window.location.origin) return;

        if (
          event.data &&
          typeof event.data === "object" &&
          event.data.key === "unity-message"
        ) {
          console.log("========= UNITY MESSAGE =========");
          console.log(event.data);

          if (
            event.data.type === "win" &&
            event.data.hasWon &&
            event.data.level &&
            event.data.level == 1
          ) {
            // Handle 5% of the time the users beat level 1
            openChest();
          }
        }
      },
      false
    );

    // For new build of game: Need to update loaderUrl, and download build files and replace them
    // Live loaderUrl
    let loaderUrl =
      "https://v6p9d9t4.ssl.hwcdn.net/html/6031302/RuggedWebGL/Build/RuggedWebGL.loader.js";
    // Test purpose loaderUrl
    // let loaderUrl =
    //   "https://v6p9d9t4.ssl.hwcdn.net/html/6018967/RuggedWebGLTesting/Build/RuggedWebGLTesting.loader.js";

    let script = document.createElement("script");
    script.src = loaderUrl;
    script.id = "demo-game-script";
    script.onload = () => {
      window
        .createUnityInstance(document.querySelector("#unity-canvas"), {
          // Live build files
          dataUrl: "/Build/RuggedWebGL.data.unityweb",
          frameworkUrl: "/Build/RuggedWebGL.framework.js.unityweb",
          codeUrl: "/Build/RuggedWebGL.wasm.unityweb",
          // Test purpose files
          // dataUrl: "/Build/RuggedWebGLTesting.data.unityweb",
          // frameworkUrl: "/Build/RuggedWebGLTesting.framework.js.unityweb",
          // codeUrl: "/Build/RuggedWebGLTesting.wasm.unityweb",

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
    // let testObject = { hasDopeCat: true, hasPixelBand: false };
    console.log("TOKEN OWNERSHIP DATA: ", tokenOwnershipData);
    let jsonString = JSON.stringify(tokenOwnershipData);
    myGameInstance.SendMessage(
      "JavascriptHook",
      "RecieveWalletJson",
      jsonString
    );
  };

  const quitGame = () => {
    if (myGameInstance) myGameInstance.Quit();
    const scriptEl = document.querySelector("#demo-game-script");
    if (scriptEl) scriptEl.remove();
    setMyGameInstance(null);
    window.myGameInstance = null;
    handlePlay();
  };

  useEffect(() => {
    if (myGameInstance) sendMessageToGameInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGameInstance]);

  const openChest = () => {
    setShowChest(true);
  };

  const closeChest = () => {
    setShowChest(false);
  };

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
          onClick={quitGame}
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
      {showChest && (
        <GameWinner
          closeChest={closeChest}
          beatFirstLevel={beatFirstLevel}
          hasGenesis={hasGenesis}
          solBalance={solBalance}
        />
      )}
    </div>
  );
};

export default Demo;
