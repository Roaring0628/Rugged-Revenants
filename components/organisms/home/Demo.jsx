/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import GameWinner from "./GameWinner";
import GameWinnerLootbox from "./GameWinnerLootbox";
import { useContext } from 'react';
import { NotificationContext } from "contexts/NotificationContext";

const Demo = ({
  handlePlay,
  beatFirstLevel,
  hasGenesis,
  tokenOwnershipData,
  solBalance,
  endGame,
}) => {
  const [myGameInstance, setMyGameInstance] = useState(null);
  const myGameInstanceRef = useRef();
  const [showChest, setShowChest] = useState(false);
  const [showLootboxChest, setShowLootboxChest] = useState(false);
  const [currentLevel, setCurrentLevel] = useState();
  const [isWin, setIsWin] = useState(false);
  const { openNotificationModal } = useContext(NotificationContext);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== window.location.origin) return;

        if (
          event.data &&
          typeof event.data === "object" &&
          event.data.key === "htc4mc3piwgxupacohjtjjhseuaubqu9"
        ) {
          // console.log("========= UNITY MESSAGE =========");
          // console.log(event.data);

          if (
            event.data.type === "win" &&
            event.data.hasWon &&
            event.data.level &&
            event.data.level == 1
          ) {
            // Handle 5% of the time the users beat level 1
            closeFullScreen();
            openChest();
          }

          // if (
          //   event.data.type === "win" &&
          //   event.data.hasWon &&
          //   event.data.level &&
          //   event.data.level == 2
          // ) {
          //   // TODO - Need to update this, open lootbox chest when the user beat level 2 for demo
          //   openLootboxChest();
          // }

          handleGameResult(
            event.data.type === "win" && event.data.hasWon,
            event.data.type === "die",
            event.data.level,
            event.data.levelsComplete,
            event.data.isLastLevel
          );
        }
      },
      false
    );

    // For new build of game: Need to update loaderUrl, and download build files and replace them
    // Live loaderUrl
    let loaderUrl =
      "https://v6p9d9t4.ssl.hwcdn.net/html/6342433/RuggedWebGL/Build/RuggedWebGL.loader.js";
    // Test purpose loaderUrl
    // let loaderUrl =
    //   "https://v6p9d9t4.ssl.hwcdn.net/html/6329858/RuggedWebGLTesting/Build/RuggedWebGLTesting.loader.js";

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
          // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
          // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        })
        .then((unityInstance) => {
          window.unityInstance = unityInstance;
          window.myGameInstance = unityInstance;
          setMyGameInstance(unityInstance);
          myGameInstanceRef.current = unityInstance;
        });
    };
    document.body.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageToGameInstance = () => {
    // let testObject = { hasDopeCat: true, hasPixelBand: false };
    // console.log("TOKEN OWNERSHIP DATA: ", tokenOwnershipData);
    let { rrGen1MetaArray, ...tokenOwnershipData1 } = tokenOwnershipData;
    let jsonString = JSON.stringify(tokenOwnershipData1);
    myGameInstance.SendMessage(
      "JavascriptHook",
      "RecieveWalletJson",
      jsonString
    );
    (rrGen1MetaArray || []).forEach((token) => {
      if (!token.meta) return;
      let metaString = JSON.stringify(token.meta);
      myGameInstance.SendMessage("JavascriptHook", "ReceiveAttributeJson", metaString);
    })
  };

  const handleGameResult = (
    isWin,
    isDie,
    currentLevel,
    completedLevelsCount,
    isFinalLevel
  ) => {
    console.log('handleGameResult')
    console.log("win", isWin);
    console.log("die", isDie);
    console.log("currentLevel", currentLevel);
    // we have this completedLevelsCount value when only the user die
    console.log("completedLevelsCount", completedLevelsCount);
    console.log("isFinalLevel", isFinalLevel);

    closeFullScreen();

    if(isDie || isFinalLevel) {
      if(currentLevel > 1) {
        setCurrentLevel(currentLevel)
        setIsWin(isWin)
        openLootboxChest();
      } 
    } 
  };

  const endGameBefore = async () => {
      if(await endGame(currentLevel, isWin)) {
        quitGame()
        return
      }
      
      openNotificationModal("Transaction has been failed because of network status is bad. Are you going to try again to get reward?", okEndGameCallback, noEndGameCallback, true)
  }

  const okEndGameCallback = async () => {
    endGameBefore()
  }
  const noEndGameCallback = async () => {
    quitGame()
  }

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

  const openFullScreen = () => {
    if (myGameInstance) myGameInstance.SetFullscreen(1);
  }

  const closeFullScreen = () => {
    if (myGameInstance) myGameInstance.SetFullscreen(0);
    else if (myGameInstanceRef.current) myGameInstanceRef.current.SetFullscreen(0);
  }

  const openChest = () => {
    setShowChest(true);
  };

  const closeChest = () => {
    setShowChest(false);
  };

  const openLootboxChest = () => {
    setShowLootboxChest(true);
  };

  const closeLootboxChest = () => {
    setShowLootboxChest(false);
  };

  return (
    <div className="game-wrapper">
      <Script id="firebase-script">
        {`
          var firebaseConfig = {
            apiKey: "AIzaSyBvgWGvvytGS4U8MwPAlwcdZwpgOv9erws",
            authDomain: "rugged-revenants.firebaseapp.com",
            databaseURL: "https://rugged-revenants-default-rtdb.firebaseio.com",
            projectId: "rugged-revenants",
            storageBucket: "rugged-revenants.appspot.com",
            messagingSenderId: "424403245267",
            appId: "1:424403245267:web:cdb2820c1060c915161c26",
            measurementId: "G-PS6WZT7XML"
          };
          if (firebase) firebase.initializeApp(firebaseConfig);
        `}
      </Script>
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
        <div
          onClick={openFullScreen}
          className="absolute right-0 w-24 h-24 flex justify-center items-center text-white cursor-pointer hover:text-brand-purple"
        >
          <span className="text-5xl font-bold mb-2 z-10">⛶</span>
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
      {showLootboxChest && (
        <GameWinnerLootbox
          closeChest={closeLootboxChest}
          hasGenesis={hasGenesis}
          solBalance={solBalance}
          endGame={endGameBefore}
        />
      )}
    </div>
  );
};

export default Demo;
