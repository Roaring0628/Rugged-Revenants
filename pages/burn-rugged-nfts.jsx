/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import axios from "axios";
import classNames from "classnames";

import CustomScroll from "components/molecules/CustomScroll";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { useRouter } from 'next/router';
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  AccountLayout,
  createTransferInstruction,
} from "@solana/spl-token";
import {PublicKey, sendAndConfirmTransaction} from "@solana/web3.js";

import RugGameIdl from "../components/organisms/idl/rug_game.json";

import { uploadMetadataToIpfs, mint, mintGenesis, mintPotion, mintLootBox, updateMeta, payToBackendTx, setProgramTransaction } from "../components/organisms/utils/mint";
import {burn, burnTx} from '../components/organisms/utils/nftburn'
import api from "../components/organisms/api"
import * as Const from '../components/organisms/utils/constants'
import {
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";

const { SystemProgram } = anchor.web3;

export default function BurnRuggedNFTs() {
  const [keyword, setKeyword] = useState("");
  const [tokens, setTokens] = useState([]);
  const [allTokens, setAllTokens] = useState([]);
  const [tokensWithImage, setTokensWithImage] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);


  const [whitelist, setWhitelist] = useState({})
  const [ruggedTokenAddresses, setRuggedTokenAddresses] = useState([])
  const [charged, setCharged] = useState(false)
  const [staked, setStaked] = useState(false)
  const [ruggedAccount, setRuggedAccount] = useState()
  const [mainProgram, setMainProgram] = useState()
  const [selectedGenesisNft, setSelectedGenesisNft] = useState()

  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, connected } = useWallet();
  const provider = new anchor.AnchorProvider(connection, wallet);
  const hasGenesis = allTokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY).length > 0
  const router = useRouter();

  useEffect(()=>{
    const selectedGenesisNft= localStorage.getItem("selectedGenesisNft")
    setSelectedGenesisNft(selectedGenesisNft)
    if(selectedGenesisNft) {
      localStorage.removeItem("selectedGenesisNft")
    }
  }, [])

  useEffect(() => {
    if(publicKey) {
      init()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const init = async () => {
    let whitelist = await api.getRuggedWhitelistAuthorities()
    console.log('whitelist', whitelist)
    whitelist = whitelist.map(o=>o.authority)
    setWhitelist(whitelist)

    initMainProgram()
    fetchData(whitelist)
  }

  const fetchData = async (whitelist) => {
    let walletInfo = await connection.getAccountInfo(provider.wallet.publicKey)
    console.log("walletInfo", walletInfo)

    // const tokenMetadata = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
    // console.log('tokenMetadata', JSON.stringify(tokenMetadata));
    
    let tokens = []
    
    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress: provider.wallet.publicKey.toBase58(),
      connection: connection,
    }); 

    let ruggedTokenAddresses = [] //tokenAddresses.filter(o=>whitelist.indexOf(o) != -1)
    let ruggedNftCandidates = []
    for(let tokenmeta of nftArray) {
      try {
        if(tokenmeta.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && tokenmeta.data.name == Const.GENESIS_NFT_NAME) {
          const meta = await axios.get(api.get1KinUrl(tokenmeta.data.uri))
          tokens.push({...tokenmeta, meta:meta.data})
        } else if(whitelist.indexOf(tokenmeta.updateAuthority) != -1) {
          ruggedNftCandidates.push({
            authority: tokenmeta.updateAuthority,
            address: address
          })
          tokens.push(tokenmeta)
        } 
      } catch(e) {
        console.log('e', e)
      }
    }
    
    if(ruggedNftCandidates.length > 0) {
      ruggedTokenAddresses = await api.filterRuggedWhitelist(ruggedNftCandidates)
      setRuggedTokenAddresses(ruggedTokenAddresses)
      setTokens(tokens.filter(o=>ruggedTokenAddresses.indexOf(o.mint) != -1))
      if(ruggedTokenAddresses.length > 0) {
        for(var address of ruggedTokenAddresses) {
          let tokenIndex = tokens.findIndex(o=>o.mint == address)
          if(tokenIndex >= 0) {
            let tokenmeta = tokens[tokenIndex]
            const meta = await axios.get(api.get1KinUrl(tokenmeta.data.uri))
            tokens[tokenIndex] = {...tokenmeta, mata: meta.data}
          }
        }
      }
    }

    console.log('tokens', tokens)
    setAllTokens(tokens)
    setTokens(tokens.filter(o=>ruggedTokenAddresses.indexOf(o.mint) != -1))

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

  useEffect(() => {
    setTokensWithImage([]);
    const promises = tokens.map(async (token) => {
      const imageURL = await getImageFromMetadata(token.data.uri);
      return { ...token, image: imageURL };
    });
    Promise.all(promises).then((results) => {
      setTokensWithImage(results);
    });
  }, [tokens]);

  useEffect(() => {
    searchNFT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensWithImage]);

  const searchNFT = () => {
    const filteredNFTs = tokensWithImage.filter((token) =>
      String(token.data.name || "")
        .toLowerCase()
        .includes(String(keyword || "").toLowerCase())
    );
    setFilteredNFTs(filteredNFTs);
  };

  const getImageFromMetadata = async (uri) => {
    try {
      const meta = await axios.get(api.get1KinUrl(uri));
      return meta.data.image || "";
    } catch (e) {
      return "";
    }
  };

  const selectNFT = (token) => {
    setSelectedNFT(token);
  };

  const burnSelectedNFT = async (token) => {
    // TODO - Logic to burn selected NFT
    console.log(token);
    anchor.setProvider(provider);
    let burnTransaction = await burnTx(token.mint, provider.wallet.publicKey, wallet, connection, 1)

    try {
      if(hasGenesis) {
        let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.UPDATE_META_FEE);
  
        const create_tx = new anchor.web3.Transaction().add(transferInstruction, burnTransaction)
        const signature = await wallet.sendTransaction(create_tx, connection);
        await connection.confirmTransaction(signature, "confirmed");
  
        //update meta
        let oldToken = allTokens.find(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && o.meta.attributes[0].value < Const.MAX_CHARGE_COUNT)
        if(!oldToken) return
        let oldMeta = oldToken.meta
        oldMeta.attributes[0].value = oldMeta.attributes[0].value + 3
        await updateMeta(oldToken, oldMeta)
  
        localStorage.setItem("old-charges", oldMeta.attributes[0].value - 3)
        localStorage.setItem("new-charges", oldMeta.attributes[0].value)
        router.push('/charge-success')
      } else {
        let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.MINT_FEE);
  
        const create_tx = new anchor.web3.Transaction().add(transferInstruction, burnTransaction)
        let txSignature = api.randomString(20) //window.crypto.randomUUID()
        let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
        create_tx.add(signatureTx)
        
        const signature = await wallet.sendTransaction(create_tx, connection);
        await connection.confirmTransaction(signature, "confirmed");
        
        //mint genesis
        await mintGenesis(wallet, txSignature)
      }
      await fetchData(whitelist)
    } catch(e) {
      console.log('error', e)
    }
  };

  let genesisToken = selectedGenesisNft?allTokens.find(o=>o.mint == selectedGenesisNft):
    allTokens.find(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && o.meta.attributes[0].value < Const.MAX_CHARGE_COUNT)

  return (
    <main className="w-full relative">
      <div className="h-[100vh] w-full relative flex">
        <div className="w-3/5 h-full flex justify-center items-center pt-[8vh]">
          <div className="w-4/5">
            <div className="py-6 px-12 bg-[#812991] flex justify-between gap-12">
              <input
                className="bg-white text-black text-xl tracking-tight p-2 flex-grow"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <button onClick={searchNFT}>
                <img
                  src="/media/inventory/Inventory_Page/searchicon.png"
                  alt="search icon"
                  className="h-12"
                />
              </button>
            </div>
            <div className="h-[65vh]">
              <CustomScroll>
                <div className="grid grid-cols-3 gap-10">
                  {filteredNFTs.map((token, index) => (
                    <div key={index} className="mb-3">
                      <div
                        className="border-4 border-[#812991] aspect-square mb-2 cursor-pointer relative"
                        onClick={() => selectNFT(token)}
                      >
                        <img
                          src={token.image}
                          alt="NFT Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">{token.data.name}</div>
                    </div>
                  ))}
                </div>
              </CustomScroll>
            </div>
          </div>
        </div>
        <div className="w-2/5 border-l-8 border-[#812991] relative">
          <div className="relative z-10 flex flex-col items-center justify-center h-[100vh] pt-16">
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="w-56 h-56 relative p-1">
                {selectedNFT && (
                  <img
                    src={selectedNFT.image}
                    alt="flame"
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                )}
                <img
                  src="/media/inventory/Inventory_Page/ui_inventory_selectednft_frame.png"
                  alt="flame"
                  className="w-full h-full absolute top-0 left-0"
                />
              </div>
              <img
                src="/media/inventory/Inventory_Page/ui_inventory_arrow.png"
                alt="flame"
                className="w-16"
              />
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-20 mb-2 flex items-center justify-center">
                  <img
                    src="/media/inventory/Inventory_Page/ui_inventory_chargedisplay_frame.png"
                    alt="flame"
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  <span className="text-lg">3 Charges</span>
                </div>
                {genesisToken && <span className="text-[0.7rem] tracking-tighter">
                  Total Charges : {genesisToken.meta.attributes[0].value}
                </span>}
              </div>
              <img
                src="/media/inventory/Inventory_Page/ui_inventory_burnbutton.png"
                alt="flame"
                className={classNames("w-56 cursor-pointer", {
                  "opacity-60": !selectedNFT,
                })}
                onClick={() => {
                  if (selectedNFT) {
                    burnSelectedNFT(selectedNFT);
                  }
                }}
              />
            </div>
          </div>

          <img
            src="/media/inventory/Inventory_Page/ui_inventory_flame.png"
            alt="flame"
            className="absolute bottom-0 w-full"
          />
        </div>
      </div>
    </main>
  );
}
