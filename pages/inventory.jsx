/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import axios from "axios";
import classNames from "classnames";
import * as Sentry from "@sentry/nextjs";

import CustomScroll from "components/molecules/CustomScroll";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext } from 'react';
import { NotificationContext } from "contexts/NotificationContext";
import { LoadingContext } from "contexts/LoadingContext";

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useRouter } from 'next/router';
import {PublicKey, sendAndConfirmTransaction} from "@solana/web3.js";

import RugGameIdl from "../components/organisms/idl/rug_game.json";

import { payToBackendTx, setProgramTransaction } from "../components/organisms/utils/mint";
import {burn, burnTx} from '../components/organisms/utils/nftburn'
import api from "../components/organisms/api"
import * as Const from '../components/organisms/utils/constants'

import OpenLootboxConfirm from "components/organisms/home/OpenLootboxConfirm";
import LootboxNotification from "components/organisms/inventory/LootboxNotification";
import {
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";

const { SystemProgram } = anchor.web3;

export default function BurnRuggedNFTs() {
  const [keyword, setKeyword] = useState("");
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [tab, setTab] = useState("genesis"); // player, lootbox, genesis

  const [allTokens, setAllTokens] = useState([]);

  const [showLootboxConfirm, setShowLootboxConfirm] = useState(false);
  const [showLootboxNotification, setShowLootboxNotification] = useState(false);
  const [lootboxNotificationData, setLootboxNotificationData] = useState(null);
  const { openLoadingModal, closeLoadingModal } = useContext(LoadingContext);

  const [ruggedAccount, setRuggedAccount] = useState()
  const [mainProgram, setMainProgram] = useState()
  const [rugToken, setRugToken] = useState(0)
  const [rrdcNFTCounts, setRrdcNFTCounts] = useState(0)

  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, connected } = useWallet();
  const provider = new anchor.AnchorProvider(connection, wallet);
  const hasGenesis = allTokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY).length > 0
  const router = useRouter();
  const { openNotificationModal } = useContext(NotificationContext);

  console.log('hasGenesis', hasGenesis)
  useEffect(() => {
    if(publicKey) {
      init()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const init = async () => {
    fetchData()
    initMainProgram()
  }

  const updateTokenMetas = async (tokens) => {
    tokens = await Promise.all(tokens.map(async (token)=>{
      const meta = await axios.get(api.get1KinUrl(token.data.uri))
      return {...token, meta: meta.data}
    }))

    console.log('updateTokenMetas', tokens)
    setAllTokens(tokens)
  }

  const refreshGenesisTokenMetas = async (tokens) => {
    tokens = tokens.filter(token => token.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && token.data.name == Const.GENESIS_NFT_NAME)
    tokens = await Promise.all(tokens.map(async (token)=>{
      const meta = await axios.get(api.get1KinUrl(token.data.uri))
        return {...token, meta: meta.data}
    }))

    return tokens
  }

  const fetchData = async () => {
    let walletInfo = await connection.getAccountInfo(provider.wallet.publicKey)
    console.log("walletInfo", walletInfo)

    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress: provider.wallet.publicKey.toBase58(),
      connection: connection,
    }); 

    let filteredNfts = nftArray.filter(tokenmeta=>(tokenmeta.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && (tokenmeta.data.name == Const.GENESIS_NFT_NAME || tokenmeta.data.name == Const.LOOTBOX_NFT_NAME || tokenmeta.data.symbol == Const.PLAYABLE_NFT_SYMBOL)))
    
    let rrdcNFTCounts = nftArray.filter(o=>o.data.symbol == 'RRDC').length
    setRrdcNFTCounts(rrdcNFTCounts)
    // for(let address of tokenAddresses) {
    //   try {
    //     let tokenmetaPubkey = await metadata.Metadata.getPDA(address);
        
    //     const tokenmeta = await metadata.Metadata.load(connection, tokenmetaPubkey);
    //     if(tokenmeta.data.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && (tokenmeta.data.data.name == Const.GENESIS_NFT_NAME || tokenmeta.data.data.name == Const.LOOTBOX_NFT_NAME || tokenmeta.data.data.symbol == Const.PLAYABLE_NFT_SYMBOL)) {
    //       console.log('tokenmeta.data.data.uri', api.get1KinUrl(tokenmeta.data.data.uri))
    //       const meta = await axios.get(api.get1KinUrl(tokenmeta.data.data.uri))
    //       tokens.push({...tokenmeta.data, meta:meta.data})
    //     } else {
    //       tokens.push(tokenmeta.data)
    //     }
    //   } catch(e) {
    //     console.log('e', e)
    //   }
    // }
    console.log('tokens', filteredNfts)
    setAllTokens(filteredNfts)
    updateTokenMetas(filteredNfts)
    selectTab('genesis', filteredNfts)
  }

  const initMainProgram = async () => {
    anchor.setProvider(provider)
    const program = new Program(RugGameIdl, new anchor.web3.PublicKey(
      Const.RUG_GAME_PROGRAM_ID
    ), provider);
    console.log("Main Program Id: ", program, program.account,  program.programId.toBase58());
    setMainProgram(program)
    api.getRuggedAccount(wallet.publicKey.toBase58(), async (err, ret)=>{
      console.log('getRuggedAccount', wallet.publicKey.toBase58(), err, ret)
      if(err) {
        return
      }
      if(ret.length == 0) {
        console.log('create account')
        //initialize account
        let ruggedAccount = anchor.web3.Keypair.generate();
        let tx = program.transaction.create(provider.wallet.publicKey, {
          accounts: {
            ruggedAccount: ruggedAccount.publicKey,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [ruggedAccount],
        });

        const create_tx = new anchor.web3.Transaction().add(tx)
        let blockhashObj = await connection.getLatestBlockhash();
        console.log("blockhashObj", blockhashObj);
        create_tx.recentBlockhash = blockhashObj.blockhash;

        const signature = await wallet.sendTransaction(create_tx, connection, {
          signers: [ruggedAccount],
        });

        await connection.confirmTransaction(signature, "confirmed");

        while(true) {
          try {
            let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            await sleep(3000);
    
            let fetchData = await program.account.ruggedAccount.fetch(ruggedAccount.publicKey);
            console.log('ruggedAccount', fetchData)
            break
          } catch(e) {
            console.log("error", e)
          }
        }

        api.addRuggedAccount({
          player_account: wallet.publicKey,
          rugged_account: ruggedAccount.publicKey,
        }, (err, ret)=>{
          console.log('addRuggedAccount', err, ret)
        })
        setRuggedAccount(ruggedAccount.publicKey)
      } else {
        console.log('check account')
        setRuggedAccount(ret[0].rugged_account)
      }
    })
  }

  const selectTab = (tab) => {
    setTab(tab);
    setSelectedNFT(null);
  };

  const selectNFT = (token) => {
    setSelectedNFT(token);
  };

  const isSameToken = (nft, token) => {
    if (
      nft &&
      nft.data &&
      nft.data.name === token.data.name &&
      nft.data.symbol === token.data.symbol &&
      nft.updateAuthority === token.updateAuthority &&
      nft.mint === token.mint &&
      nft.image === token.image
    )
      return true;
    else return false;
  };

  const upgradeNFT = async (token) => {
    // TODO - Logic to upgrade selected NFT, navigate to upgrade page
    console.log(token);
    router.push('/upgrade-nft?id=' + token.mint)

    return
  };

  const openLootboxConfirm = () => {
    setShowLootboxConfirm(true);
  }

  const openLootboxBefore = async () => {
    if(await openLootbox(selectedNFT)) {
      return
    }
    openNotificationModal("Transaction has been failed because of network status is bad. Are you going to try again to get reward?", okOpenLootboxCallback, noOpenLootboxCallback, true)
  }

  const okOpenLootboxCallback = () => {
    openLootboxBefore()
  }

  const noOpenLootboxCallback = async () => {
    
  }

  const closeLootboxConfirm = () => {
    setShowLootboxConfirm(false);
  }

  const openLootboxNotification = (rugTokenAmount, potionAmount, hasPremium) => {
    setLootboxNotificationData({
      rugTokenAmount,
      potionAmount,
      hasPremium,
    })
    setShowLootboxNotification(true);
  }

  const closeLootboxNotification = () => {
    setShowLootboxNotification(false);
    setLootboxNotificationData(null)
  }

  const openLootbox = async (token) => {
    //get token meta
    const meta = token.meta
        
    let beatLevel = meta.attributes.find(o=>o.trait_type == 'level').value
    let nftType = meta.attributes.find(o=>o.trait_type == 'nft').value
    const requiredCharges = nftType == 'No'?Math.max(beatLevel - rrdcNFTCounts, 0):Math.max(Const.MAX_REQUIRED_CHARGES_COUNT - rrdcNFTCounts, 10)
    //if user don't have genesis which has charges, he cannot open lootbox
    let genesisToken = null
    let genesisTokens = await refreshGenesisTokenMetas(allTokens)
    if(genesisTokens && genesisTokens.length > 0) {
      genesisToken = genesisTokens.find(o=>o.meta.attributes[0].value >= requiredCharges)
      if(!genesisToken) {
        openNotificationModal("You don't have enough charges to open lootbox", ()=>{}, ()=>{}, false)
        return true
      }
    } else {
      return true
    }

    console.log(token);
    anchor.setProvider(provider);

    openLoadingModal()

    console.log('burn', token)
    let burnInstruction = await burnTx(token.mint, provider.wallet.publicKey, wallet, connection, 1)
    const create_tx = new anchor.web3.Transaction().add(burnInstruction)

    let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.BACKEND_ACCOUNT_PUBKEY), Const.MINT_FEE + Const.UPDATE_META_FEE);
    create_tx.add(transferInstruction)

    if(nftType != 'No') 
    {
      transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.PREMIUM_ACCOUNT_PUBKEY), Const.MINT_FEE);
      create_tx.add(transferInstruction)
    } else {
      transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.MINT_FEE);
      create_tx.add(transferInstruction)
    }

    let txSignature = api.randomString(20) //window.crypto.randomUUID()
    let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
    create_tx.add(signatureTx)

    let blockhashObj = await connection.getLatestBlockhash();
    console.log("blockhashObj", blockhashObj);
    create_tx.recentBlockhash = blockhashObj.blockhash;

    try {
      const signature = await wallet.sendTransaction(create_tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      genesisToken.meta.attributes[0].value = genesisToken.meta.attributes[0].value - requiredCharges

      let openResult = await api.openLootBox({
        key:wallet.publicKey.toBase58(),
        beatLevel,
        nftType,
        txId: signature,
        genesisToken: genesisToken.mint,
        requiredCharges,
      })

      let {rugTokenAmount, potionAmount, hasPremium} = openResult.result
      console.log("openbox result", rugTokenAmount, potionAmount, hasPremium)
      //TODO : show openbox notification
      if (rugTokenAmount || potionAmount || hasPremium) {
        openLootboxNotification(rugTokenAmount, potionAmount, hasPremium);
      }

      await fetchData()
      closeLoadingModal()
      return true
    } catch(e) {
      console.log('openLootbox error', e)
      // Sentry Log: Error happened when opening lootbox on inventory page
      Sentry.captureMessage("Error happened when opening lootbox on inventory page", "critical");
      closeLoadingModal()
      return false
    }
  };

  const consumeSolForCharges = async (token) => {
    console.log('consumeSolForCharges', token);
    anchor.setProvider(provider);

    try {
      let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.SOL_ACCOUNT_PUBKEY), Const.SOL_AMOUNT_FOR_CHARGES);

      const create_tx = new anchor.web3.Transaction().add(transferInstruction)
      let txSignature = api.randomString(20) //window.crypto.randomUUID()
      let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
      create_tx.add(signatureTx)
      const signature = await wallet.sendTransaction(create_tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      //update meta
      token.attributes[0].value = Const.MAX_CHARGE_COUNT
      await updateMeta(token, wallet.publicKey, signature)

      await fetchData()
      return true
    } catch(e) {
      console.log('error', e)
      return false
    }
  };

  const chargeGenesisNFT = (token) => {
    // TODO - Logic to charge Genesis NFT
    console.log(token);
    localStorage.setItem("selectedGenesisNft", token.mint)
    router.push('/burn-rugged-nfts')
  };

  let filteredTokens = []
  if (tab === "genesis") {
    // TODO - This is test data, need to set tokens when changing tab
    filteredTokens = allTokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY)
  } else if (tab === "player") {
    filteredTokens = allTokens.filter(o=>o.data.symbol == Const.PLAYABLE_NFT_SYMBOL && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY)
  } else {
    filteredTokens = allTokens.filter(o=>o.data.name == Const.LOOTBOX_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY)
  }

  const filteredNFTs = filteredTokens.filter((token) =>
      String(token.data.name || "")
        .toLowerCase()
        .includes(String(keyword || "").toLowerCase())
  );

  console.log('filteredNFTs', filteredNFTs)

  return (
    <main className="w-full relative">
      <div className="h-[100vh] w-full relative flex">
        <div className="w-[55%] h-full flex justify-center items-center pt-[8vh]">
          <div className="w-4/5">
            {/* Tab */}
            <div className="h-20 flex items-end justify-start">
              {tab === "player" ? (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_player_selected.png"
                  alt="search icon"
                  className="h-20 cursor-pointer"
                />
              ) : (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_player.png"
                  alt="search icon"
                  className="h-14 cursor-pointer"
                  onClick={() => selectTab("player", allTokens)}
                />
              )}
              {tab === "lootbox" ? (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_lootbox_selected.png"
                  alt="search icon"
                  className="h-20 cursor-pointer"
                />
              ) : (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_lootbox.png"
                  alt="search icon"
                  className="h-14 cursor-pointer"
                  onClick={() => selectTab("lootbox", allTokens)}
                />
              )}
              {tab === "genesis" ? (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_genesis_selected.png"
                  alt="search icon"
                  className="h-20 cursor-pointer"
                />
              ) : (
                <img
                  src="/media/NewInventory/Elements/ui_inventory_group_genesis.png"
                  alt="search icon"
                  className="h-14 cursor-pointer"
                  onClick={() => selectTab("genesis", allTokens)}
                />
              )}
            </div>
            {/* Search Bar */}
            <div className="py-4 px-8 bg-[#812991] flex justify-between gap-12">
              <input
                className="bg-white text-black text-xl tracking-tight p-2 w-3/5"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <button>
                <img
                  src="/media/inventory/Inventory_Page/searchicon.png"
                  alt="search icon"
                  className="h-12 w-12"
                />
              </button>
            </div>
            {/* NFT Table */}
            <div className="h-[55vh]">
              <CustomScroll>
                {!filteredTokens.length && tab === "player" && (
                  <p className="text-center">
                    There is currently no Playable Characters in the wallet
                  </p>
                )}
                {!filteredTokens.length && tab === "lootbox" && (
                  <p className="text-center">
                    There is currently no loot available in the wallet
                  </p>
                )}
                <div className="grid grid-cols-3 gap-10">
                  {filteredNFTs.map((token, index) => (
                    <div key={index} className="mb-3">
                      <div
                        className={classNames(
                          "border-4 border-[#812991] aspect-square mb-2 cursor-pointer relative",
                          {
                            "border-white": isSameToken(selectedNFT, token),
                          }
                        )}
                        onClick={() => selectNFT(token)}
                      >
                        {token.meta && <img
                          src={api.get1KinUrl(token.meta.image)}
                          alt="NFT Image"
                          className="w-full h-full object-cover"
                        />}
                      </div>
                      <div className="text-[0.6rem] leading-[0.8rem]">
                        {token.data.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CustomScroll>
            </div>
          </div>
        </div>
        {/* Right Panel */}
        <div className="w-[45%] relative">
          <div className="relative z-10 flex flex-col items-start justify-center h-[100vh] pt-16">
            <div className="w-[90%] flex flex-col items-center justify-center gap-8">
              {/* Selected NFT */}
              <div className="w-48 h-48 relative p-1">
                {selectedNFT && (
                  <img
                    src={api.get1KinUrl(selectedNFT.meta.image)}
                    alt="NFT Image"
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                )}
                <img
                  src="/media/NewInventory/Elements/ui_inventory_selecteditem_frame.png"
                  alt="flame"
                  className="w-full h-full absolute top-0 left-0"
                />
              </div>
              <div className="text-center text-sm">
                {selectedNFT ? selectedNFT.data.name : "<Not Selected>"}
              </div>
              {/* Panels for different Tabs */}
              {/* Player Tab */}
              {tab === "player" && (
                <>
                  <div className="w-full h-44 p-2 text-[0.6rem] leading-[0.9rem] grid grid-cols-2">
                    <div className="flex">
                      <div className="w-3/5">
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          HEALTH
                          {/* TODO - Hover Display, example */}
                          <div className="hidden group-hover:block absolute w-72 h-40 bottom-0 right-2 border-4 border-[#812991] shadow-white shadow-sm bg-black whitespace-normal p-2">
                            HEALTH <br />
                            <br />
                            Every number value increase adds 0.1 tick of damage
                            to the player's health bar.
                          </div>
                        </div>
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          HEALTH REGEN
                        </div>
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          LUCK
                        </div>
                      </div>
                      <div className="w-2/5">
                        {/* <div
                          className={classNames(
                            "flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3",
                            {
                              "text-cyan-400": true, // TODO - Set condition here, example
                            }
                          )}
                        >
                          110(+10)
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          100
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          100
                        </div> */}
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[0].value : 0}
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[1].value : 0}
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[5].value : 0}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-3/5">
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          PROJT COUNT
                        </div>
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          PROJT REGEN
                        </div>
                        <div className="flex justify-end items-center h-6 border-r-2 border-white mb-4 whitespace-nowrap pr-3 relative group">
                          PROJT TYPE
                        </div>
                      </div>
                      <div className="w-2/5">
                        {/* <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          100
                        </div>
                        <div
                          className={classNames(
                            "flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3",
                            {
                              "text-red-500": true, // TODO - Set condition here, example
                            }
                          )}
                        >
                          90(-10)
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          100
                        </div> */}
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[2].value : 0}
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[3].value : 0}
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                        {selectedNFT ? selectedNFT.meta.attributes[4].value : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    src="/media/NewInventory/Elements/ui_inventory_button_upgrade.png"
                    alt="flame"
                    className={classNames("h-12 cursor-pointer", {
                      "opacity-70": !selectedNFT,
                    })}
                    onClick={() => {
                      if (selectedNFT) {
                        upgradeNFT(selectedNFT);
                      }
                    }}
                  />
                </>
              )}
              {/* Lootbox Tab */}
              {tab === "lootbox" && (
                <>
                  <div className={classNames("w-full h-44 border-4 border-white p-2 text-[0.7rem] leading-[1rem]", {
                    'flex justify-center items-center': !selectedNFT
                  })}>
                    {selectedNFT?selectedNFT.meta.description:"No NFT Selected"}
                  </div>
                  <img
                    src="/media/NewInventory/Elements/ui_inventory_button_openlootbox.png"
                    alt="flame"
                    className={classNames("h-12 cursor-pointer", {
                      "opacity-70": !selectedNFT,
                    })}
                    onClick={() => {
                      if (selectedNFT) {
                        openLootboxConfirm();
                      }
                    }}
                  />
                </>
              )}
              {/* Genesis Tab */}
              {tab === "genesis" && (
                <>
                  <div className={classNames("w-full h-44 border-4 border-white p-2 text-[0.7rem] leading-[1rem]", {
                    'flex justify-center items-center': !selectedNFT
                  })}>
                    {selectedNFT?selectedNFT.meta.description:"No NFT Selected"}
                  </div>
                  <img
                    src="/media/NewInventory/Elements/ui_inventory_button_charge.png"
                    alt="flame"
                    className={classNames("h-12 cursor-pointer", {
                      "opacity-70": !selectedNFT,
                    })}
                    onClick={() => {
                      if (selectedNFT) {
                        chargeGenesisNFT(selectedNFT);
                      }
                    }}
                  />
                </>
              )}
              {showLootboxConfirm && 
                <OpenLootboxConfirm
                  closeConfirm={closeLootboxConfirm}
                  openLootbox={openLootbox}
                  selectedNFT={selectedNFT}
                  rrdcNFTCounts={rrdcNFTCounts}
                />
              }
              {showLootboxNotification && 
                <LootboxNotification
                  closeNotification={closeLootboxNotification}
                  lootboxNotificationData={lootboxNotificationData}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
