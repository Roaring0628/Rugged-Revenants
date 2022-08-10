/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import classNames from "classnames";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useRouter } from 'next/router';

// import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  AccountLayout,
  createTransferInstruction,
} from "@solana/spl-token";
import {PublicKey, sendAndConfirmTransaction} from "@solana/web3.js";
import axios from 'axios'

import RugGameIdl from "../idl/rug_game.json";

import { uploadMetadataToIpfs, mint, mintGenesis, mintPotion, mintLootBox, updateMeta, payToBackendTx, setProgramTransaction } from "../utils/mint";
import {burn, burnTx} from '../utils/nftburn'
import api from "../api"
import * as Const from '../utils/constants'

import Demo from "./Demo.jsx";
import ChargeSuccess from "./ChargeSuccess";
import ConsumeChargeConfirm from "./ConsumeChargeConfirm";

const { SystemProgram } = anchor.web3;

const RUG_TOKEN_MINTKEY="Dt7gQrFFWzToJAEUqyMZWb1fRi4M2pLM4o6MDtS57R7e"

export default function Hero({ play, setPlay }) {
  const [isDesktop, setDesktop] = useState(false);
  const { connection } = useConnection();
  const [tokens, setTokens] = useState([])
  const [gotTokens, setGotTokens] = useState(false);
  const [gameLevel, setGameLevel] = useState(0)
  const [charged, setCharged] = useState(false)
  const [staked, setStaked] = useState(false)
  const [ruggedAccount, setRuggedAccount] = useState()
  const [rugToken, setRugToken] = useState(0)
  const [mainProgram, setMainProgram] = useState()
  const [solBalance, setSolBalance] = useState(0)

  const [showChargeSuccess, setShowChargeSuccess] = useState(false);
  const [showConsumeConfirm, setShowConsumeConfirm] = useState(false);

  const wallet = useWallet();
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  
  const provider = new anchor.AnchorProvider(connection, wallet);
  const hasDopeCat = tokens.filter(o=>o.data.symbol == 'DOPECATS').length > 0
  const hasGenesis = tokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY).length > 0
  const hasPixelBand = tokens.filter(o=>o.data.symbol == 'PXLB'||o.data.symbol == 'PXBP'||o.data.symbol == 'PXBD').length > 0
  const hasHippo = tokens.filter(o=>o.data.name.startsWith("HRHC #")||o.data.name.startsWith("HRHC Gen 2 #")).length > 0
  const hasSovanaEgg = tokens.filter(o=>o.data.symbol == 'Sovana Egg').length > 0
  const hasCyberSamurai = tokens.filter(o=>o.data.symbol == 'CSAMURAI'||o.data.symbol == 'CSCOMIC'||o.data.name.startsWith("Cyber Samurai")).length > 0
  const burnAvailable = !hasGenesis || tokens.filter(o=>o.meta && o.meta.attributes[0].value < 3).length > 0

  console.log('hasGenesis', hasGenesis)
  console.log('solBalance', solBalance)
  const tokenOwnershipData = { hasDopeCat, hasPixelBand, hasHippo, hasCyberSamurai, hasSovanaEgg };
  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  useEffect(() => {
    if(publicKey) {
      fetchData()
      initMainProgram()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const fetchData = async () => {
    let walletInfo = await connection.getAccountInfo(provider.wallet.publicKey)
    console.log("walletInfo", walletInfo)
    if(walletInfo) {
      setSolBalance(walletInfo.lamports)
    }

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      provider.wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    console.log('tokenAccounts', tokenAccounts)
    let tokens = []
    let tokenAddresses = []
    tokenAccounts.value.forEach((e) => {
      const accountInfo = AccountLayout.decode(e.account.data);
      // console.log('accountInfo', accountInfo)
      if(accountInfo.amount > 0) {
        let pubKey = `${new PublicKey(accountInfo.mint)}`
        if(pubKey === RUG_TOKEN_MINTKEY) {
          setRugToken(Math.floor(Number(accountInfo.amount)/1000000))
        } else {
          tokenAddresses.push(pubKey)
        }
      }
    })

    console.log('tokenAddresses', tokenAddresses)
    for(let address of tokenAddresses) {
      try {
        let tokenmetaPubkey = await metadata.Metadata.getPDA(address);
  
        const tokenmeta = await metadata.Metadata.load(connection, tokenmetaPubkey);
        if(tokenmeta.data.data.name == Const.GENESIS_NFT_NAME && tokenmeta.data.updateAuthority == Const.NFT_ACCOUNT_PUBKEY) {
          const meta = await axios.get(api.get1KinUrl(tokenmeta.data.data.uri))
          tokens.push({...tokenmeta.data, meta:meta.data})
        } else 
          tokens.push(tokenmeta.data)
      } catch(e) {
        console.log('e', e)
      }
    }
    console.log('tokens', tokens)
    setTokens(tokens)
    setGotTokens(true);

    if(ruggedAccount && mainProgram) {
      let programAccount = await mainProgram.account.ruggedAccount.fetch(ruggedAccount);
      console.log('ruggedAccount', programAccount)
      setCharged(programAccount.charged)
      setStaked(programAccount.staked)
    }
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

        let fetchData = await program.account.ruggedAccount.fetch(ruggedAccount.publicKey);
        console.log('ruggedAccount', fetchData)

        api.addRuggedAccount({
          player_account: wallet.publicKey,
          rugged_account: ruggedAccount.publicKey,
        }, (err, ret)=>{
          console.log('addRuggedAccount', err, ret)
        })
        setRuggedAccount(ruggedAccount.publicKey)
      } else {
        console.log('check account')
        let ruggedAccount = await program.account.ruggedAccount.fetch(ret[0].rugged_account);
        console.log('ruggedAccount', ruggedAccount)
        setCharged(ruggedAccount.charged)
        setRuggedAccount(ret[0].rugged_account)
      }
    })
  }

  const beatFirstLevel = async()=>{
    console.log('called beatFirstLevel', hasGenesis)
    if(!hasGenesis) {
      let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.MINT_FEE);
      const create_tx = new anchor.web3.Transaction().add(transferInstruction)
      const signature = await wallet.sendTransaction(create_tx, connection);

      try {
        await connection.confirmTransaction(signature, "confirmed");
  
        await mintGenesis(wallet)
        await fetchData()        
      } catch(e) {
        console.log('error', e)
      }
    } else {
      const token = tokens.find((t)=>{
        return t.data.name == Const.GENESIS_NFT_NAME && t.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && t.meta.attributes[0].value < Const.MAX_CHARGE_COUNT
      })

      if(token) {
        let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.UPDATE_META_FEE);
        const create_tx = new anchor.web3.Transaction().add(transferInstruction)
        const signature = await wallet.sendTransaction(create_tx, connection);

        try {
          await connection.confirmTransaction(signature, "confirmed");
    
          console.log('selected genesis to charge', token)
          //upgrade meta of token
          let newMeta = token.meta
          localStorage.setItem("old-charges", newMeta.attributes[0].value)
          newMeta.attributes[0].value = newMeta.attributes[0].value + 1
          localStorage.setItem("new-charges", newMeta.attributes[0].value)
          await updateMeta(token, newMeta)
          
          await fetchData()
        } catch(e) {
          console.log("error", e)
        }
        
        //go to success screen
        // router.push('/charge-success')
        openChargeSuccess();
      }
    }
  }

  const endGame = async (level, hasWon) => {
    //generate lootbox
    try {
      if(level > 1) {
        let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.MINT_FEE);
        const create_tx = new anchor.web3.Transaction().add(transferInstruction)
        const signature = await wallet.sendTransaction(create_tx, connection);
        await connection.confirmTransaction(signature, "confirmed");
        setPlay(false);
  
        await mintLootBox(wallet, level, hasWon)
      }
      // await fetchData()
    } catch(e) {
      console.log("endGame error", e)
    }
    setTimeout(()=>{
      handlePlay()
    }, 10)
  }

  // conditionally render demo for desktop only
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1023);
  };

  const handlePlay = () => {
    if (!play) {
      document.body.style.overflow = "hidden";
      // if(hasGenesis && !charged) {
      if(hasGenesis) {
        if(tokens.find(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && o.meta.attributes[0].value > 0)) {
          openConsumeConfirm();
        } else {
          setPlay(true);
        }
      } else {
        setPlay(true);
      }
    } else {
      document.body.style.overflow = "unset";
      setPlay(false);
    }
    
    // if (play) document.body.style.overflow = "unset";
    // else document.body.style.overflow = "hidden";
    // setPlay(!play);
  };

  const chargeForLootBox = async () => {
    let token = tokens.find((t)=>{
      return t.data.name == Const.GENESIS_NFT_NAME && t.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && t.meta.attributes[0].value > 0
    })

    console.log('chargeForLootBox', token)
    let oldMeta = token.meta
    oldMeta.attributes[0].value = oldMeta.attributes[0].value - 1

    let tx = mainProgram.transaction.charge({
      accounts: {
        ruggedAccount: ruggedAccount,
        authority: provider.wallet.publicKey,
      },
    });

    let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.UPDATE_META_FEE);

    // let txSignature = window.crypto.randomUUID()
    // let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
    const create_tx = new anchor.web3.Transaction().add(
      transferInstruction, 
      tx, 
      // signatureTx
    )
    const signature = await wallet.sendTransaction(create_tx, connection);

    try {
      await connection.confirmTransaction(signature, "confirmed");
  
      console.log('signature', signature)
      await updateMeta(
        token, 
        oldMeta, 
        wallet.publicKey, 
        //txSignature
      )
      
      await fetchData()
    } catch(e) {
      console.log("Exception", e)
    }
  }

  const openConsumeConfirm = () => {
    setShowConsumeConfirm(true);
  }

  const closeConsumeConfirm = () => {
    setShowConsumeConfirm(false);
    setPlay(true);
  }

  const openChargeSuccess = () => {
    setShowChargeSuccess(true);
  };

  const closeChargeSuccess = () => {
    setShowChargeSuccess(false);
  };

  return (
    <>
      <section id="hero" className="mt-28 scroll-mt-28">
        <div className="container relative">
          <img
            className="w-full h-full max-h-[77vh] object-contain"
            src="/media/hero.png"
            alt="Hero Image"
          ></img>
          <div className="absolute top-0 left-0 w-full h-full">
            {!play && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                  className="w-1/3 mb-6"
                  src="/media/rrLogo.png"
                  alt="play button"
                ></img>
                {isDesktop && (
                  <div
                    onClick={() => {
                      if (connected && !gotTokens) return; 
                      handlePlay();
                    }}
                    className="w-64 h-24 relative flex justify-center items-center cursor-pointer hover:text-brand-purple"
                  >
                    <img
                      className="absolute top-0 left-0 w-full h-full"
                      src="/media/button.png"
                      alt="button"
                    ></img>
                    <span 
                      className={classNames("text-lg mb-2 z-10", {
                        "opacity-40": connected && !gotTokens,
                      })}
                    >
                      PLAY
                    </span>
                    {connected && !gotTokens && (
                      <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <svg role="status" className="inline w-8 h-8 animate-spin text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-center mt-4">
                  <a
                    href="https://discord.gg/ruggedrevenants"
                    rel="noreferrer"
                    className="mr-6"
                    target="_blank"
                  >
                    <div className="relative w-12 h-12">
                      <NextImage src="/media/discord2.svg" layout="fill" />
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/RuggedRevenants/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="relative w-12 h-12">
                      <NextImage src="/media/twitter2.svg" layout="fill" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        {play && (
          <div className="fixed z-50 inset-0 w-full h-full overflow-y-auto bg-black">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
            <Demo
              handlePlay={handlePlay}
              beatFirstLevel={beatFirstLevel}
              endGame={endGame}
              hasGenesis={hasGenesis}
              tokenOwnershipData={tokenOwnershipData}
              solBalance={solBalance}
            />
          </div>
        )}
        {showConsumeConfirm && (
          <ConsumeChargeConfirm closeConfirm={closeConsumeConfirm} chargeForLootBox={chargeForLootBox} />
        )}
        {showChargeSuccess && <ChargeSuccess closeChargeSuccess={closeChargeSuccess} />}
      </section>
    </>
  );
}
