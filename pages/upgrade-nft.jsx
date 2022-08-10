/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import CustomScroll from "components/molecules/CustomScroll";
import UpgradeConfirm from "components/organisms/upgrade-nft/UpgradeConfirm";
import UpgradedResult from "components/organisms/upgrade-nft/UpgradedResult";

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

import { uploadMetadataToIpfs, mint, mintGenesis, mintPotion, mintLootBox, updateMeta, payToBackendTx, createPotionMeta } from "../components/organisms/utils/mint";
import {burn, burnTx} from '../components/organisms/utils/nftburn'
import api from "../components/organisms/api"
import * as Const from '../components/organisms/utils/constants'

import OpenLootboxConfirm from "components/organisms/home/OpenLootboxConfirm";
import CountDown from "components/molecules/CountDown";

const { SystemProgram } = anchor.web3;

function getRandomInt(min, max) {       
  // Create byte array and fill with 1 random number
  var byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  var range = max - min + 1;
  var max_range = 256;
  if (byteArray[0] >= Math.floor(max_range / range) * range)
      return getRandomInt(min, max);
  return min + (byteArray[0] % range);
}

let RUG_TOKEN_STEP = 50

const MINIMUN_SOL_BALANCE = 10000000; // 0.01 SOL

const UpgradeNFT = () => {
  const [swiper, setSwiper] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [selectedNFTImage, setSelectedNFTImage] = useState(null);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [selectedRugOption, setSelectedRugOption] = useState(0);
  const [selectedRugOptionIndex, setSelectedRugOptionIndex] = useState(0);
  
  const [showConsumeConfirm, setShowConsumeConfirm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [allTokens, setAllTokens] = useState([]);
  const [playableNfts, setPlayableNfts] = useState([]);
  const [potionNfts, setPotionNfts] = useState([]);

  const [upgradeTasks, setUpgradeTasks] = useState([])

  const [ruggedAccount, setRuggedAccount] = useState()
  const [mainProgram, setMainProgram] = useState()
  const [rugToken, setRugToken] = useState(0)

  const [oldMeta, setOldMeta] = useState()
  const [newMeta, setNewMeta] = useState()
  const [globalSetting, setGlobalSetting] = useState()

  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, connected } = useWallet();
  const provider = new anchor.AnchorProvider(connection, wallet);

  const router = useRouter()
  const rugOptions = globalSetting?globalSetting.upgrade_rugged_tokens.map(o=>o.value).filter(o=>o<=rugToken):[50, 75, 125, 200, 300].filter(o=>o<=rugToken)


  useEffect(() => {
    if(publicKey) {
      init()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const init = async () => {
    fetchData()
    initMainProgram()

    let setting = await api.getGlobalSetting()
    setGlobalSetting(setting)

    if(setting.upgrade_rugged_tokens && setting.upgrade_rugged_tokens.length > 0) {
      RUG_TOKEN_STEP = setting.upgrade_rugged_tokens[0].value
    }
  }

  const getMetadata = async (
		mint
		  ) => {
		return (
		  await PublicKey.findProgramAddress(
			[
			  Buffer.from("metadata"),
			  TOKEN_METADATA_PROGRAM_ID.toBuffer(),
			  mint.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
		  )
		)[0];
	};

  const fetchData = async () => {
    let walletInfo = await connection.getAccountInfo(provider.wallet.publicKey)
    console.log("walletInfo", walletInfo)

    // const tokenMetadata = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
    // console.log('tokenMetadata', JSON.stringify(tokenMetadata));

    let gotUpgradeTasks = false
    let upgradeTasks = []
    api.getUpgradeTasks(async (err, ret) => {
      if(err) {
        return
      }
      if(ret.length > 0) {
        setUpgradeTasks(ret)
        upgradeTasks = ret
        gotUpgradeTasks = true
      }
    })

    while (!gotUpgradeTasks) {
      let sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(100);
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
      if(accountInfo.amount > 0) {
        let pubKey = `${new PublicKey(accountInfo.mint)}`
        if(pubKey === Const.RUG_TOKEN_MINTKEY) {
          let rugAmount = Math.floor(Number(accountInfo.amount)/1000000)
          setRugToken(rugAmount)
          if(rugAmount >= RUG_TOKEN_STEP) {
            setSelectedRugOption(RUG_TOKEN_STEP)
          } else {
            setSelectedRugOption(0)
          }
        } else {
          tokenAddresses.push(pubKey)
        }
      }
    })

    for(let address of tokenAddresses) {
      try {
        let tokenmetaPubkey = await metadata.Metadata.getPDA(address);
        
        const tokenmeta = await metadata.Metadata.load(connection, tokenmetaPubkey);
        if(tokenmeta.data.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && (tokenmeta.data.data.symbol == Const.PLAYABLE_NFT_SYMBOL || tokenmeta.data.data.symbol == Const.POTION_NFT_SYMBOL)) {
          const meta = await axios.get(tokenmeta.data.data.uri)
          
          tokens.push({...tokenmeta.data, meta:meta.data})
        } 
      } catch(e) {
        console.log('e', e)
      }
    }
    console.log('tokens', tokens)
    setAllTokens(tokens)
    setPlayableNfts(tokens.filter(o=>o.data.symbol === Const.PLAYABLE_NFT_SYMBOL))
    setPotionNfts(tokens.filter(o=>o.data.symbol === Const.POTION_NFT_SYMBOL))
    
    if(ruggedAccount && mainProgram) {
      let programAccount = await mainProgram.account.ruggedAccount.fetch(ruggedAccount);
      console.log('ruggedAccount', programAccount)
    }

    if(router.query && router.query.id) {
      const selectedToken = tokens.find(o=>o.mint == router.query.id)
      if(selectedToken) {
        const filteredTask = upgradeTasks.find(task => task.key === selectedToken.mint)
        selectNFT({
          ...selectedToken,
          isUpgrading: !!filteredTask,
          upgradeDueDate: filteredTask ? filteredTask.due_date : null,
        })
      }
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
        setRuggedAccount(ret[0].rugged_account)
      }
    })
  }

  const selectNFT = (token) => {
    setSelectedNFT(token);
  };

  const selectPotion = (potion) => {
    setSelectedPotion(potion);
  };

  const increaseRuggedTokens = () => {
    const newIndex = selectedRugOptionIndex + 1;
    if (newIndex < rugOptions.length) {
      setSelectedRugOptionIndex(newIndex);
      setSelectedRugOption(rugOptions[newIndex]);
    }
  };

  const decreaseRuggedTokens = () => {
    const newIndex = selectedRugOptionIndex - 1;
    if (newIndex > -1) {
      setSelectedRugOptionIndex(newIndex);
      setSelectedRugOption(rugOptions[newIndex]);
    }
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

  const isSamePotion = (nft, token) => {
    if (nft && nft.name === token.name && nft.image === token.image)
      return true;
    else return false;
  };

  const openConsumeConfirm = () => {
    setShowConsumeConfirm(true);
  };

  const closeConsumeConfirm = () => {
    setShowConsumeConfirm(false);
  };

  const openResult = () => {
    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  const checkUpgrading = (token) => {
    if (!token.isUpgrading) return false
    const diff = moment().diff(token.upgradeDueDate)
    if (diff > 0) return false
    return true
  }

  const upgrade = async () => {
    console.log(
      "upgrade",
      selectedNFT,
      selectedPotion,
      selectedRugOption
    ); 

    //consume $RUG
    const fromRugTokenAccount = await getOrCreateAssociatedTokenAccount(connection, wallet, new PublicKey(Const.RUG_TOKEN_MINTKEY), wallet.publicKey);
    const toRugTokenAccount = await api.getOrCreateAssociatedTokenAccount(Const.RUG_TOKEN_MINTKEY);

    console.log('fromTokenAccount, toTokenAccount', fromRugTokenAccount.address.toBase58(), toRugTokenAccount.result)
    let rugTokenTransferInstruction = createTransferInstruction(
      fromRugTokenAccount.address, // source
      new PublicKey(toRugTokenAccount.result),
      wallet.publicKey,
      selectedRugOption * 1000000,
      [],
      TOKEN_PROGRAM_ID
   )
    
    //burn Potion NFT
    let burnInstruction = await burnTx(selectedPotion.mint, provider.wallet.publicKey, wallet, connection, 1)

    //upgrade playableNFT meta
    let oldMeta = selectedNFT.meta
    setOldMeta([...JSON.parse(JSON.stringify(oldMeta.attributes))])

    let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.UPDATE_META_FEE);

    // let txSignature = window.crypto.randomUUID()
    // let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
    const create_tx = new anchor.web3.Transaction().add(
      transferInstruction, 
      rugTokenTransferInstruction,
      burnInstruction,
      // signatureTx
    )

    const signature = await wallet.sendTransaction(create_tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    console.log('signature', signature)
    let upgradeResult = await api.updatePlayableNftMeta(
      {
        key: selectedNFT.mint,
        tokenAmount: selectedRugOption,
        playerAccount: wallet.publicKey.toBase58(),
      }
      //txSignature
    )

    console.log('upgradeResult', upgradeResult)
    if(upgradeResult.stauts == 'pending') {
      //TODO: display update date
      console.log('Due Date', new Date(upgradeResult.dueDate))
    } else if(upgradeResult.stauts == 'success'){
      setNewMeta(upgradeResult.updatedMeta.attributes)
      setSelectedNFTImage(upgradeResult.updatedMeta.image)
      openResult();
    }
    setSelectedPotion(null)
    fetchData()
  };

  let filteredNFTs = playableNfts.filter((token) =>
      String(token.data.name || "")
        .toLowerCase()
        .includes(String(keyword || "").toLowerCase())
  );

  filteredNFTs = filteredNFTs.map(nft => {
    const filteredTask = upgradeTasks.find(task => task.key === nft.mint)
    return {
      ...nft,
      isUpgrading: !!filteredTask,
      upgradeDueDate: filteredTask ? filteredTask.due_date : null,
    }
  })

  console.log('filteredNFTs', filteredNFTs)
  console.log('potionNfts', potionNfts)
  return (
    <div className="w-full h-[100vh]">
      <div className="h-full w-full relative flex items-center justify-center pt-20">
        <div className="w-[90%] h-[40rem] xl:h-[44rem] relative">
          <img
            src="/media/upgrade/upgrade_back.png"
            alt="background"
            className="w-full h-full absolute top-0 left-0"
          />
          <div className="w-full h-full relative z-10 flex justify-between pt-32 pb-4">
            <div className="w-2/5 h-full flex justify-center items-center relative">
              <div className="w-[95%] h-full">
                <div className="p-4 bg-[#812991] flex justify-between">
                  <input
                    className="bg-white text-black text-xl tracking-tight p-1 w-3/5"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                  />
                </div>
                <div className="h-[80%]">
                  <CustomScroll>
                    <div className="grid grid-cols-3 gap-5">
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
                            <img
                              src={api.get1KinUrl(token.meta.image)}
                              alt="NFT Image"
                              className="w-full h-full object-cover"
                            />
                            {checkUpgrading(token) && (
                              <>
                                <img
                                  src="/media/upgrade/ui_upgrade_training_thumbnailicon.png"
                                  alt="NFT Image"
                                  className="absolute top-1 right-1 w-6 h-3 object-cover"
                                />
                                <div className="absolute bottom-0 w-full h-8 flex items-center justify-center">
                                  <img
                                    src="/media/upgrade/ui_upgrade_training_thumbnailbar.png"
                                    alt="NFT Image"
                                    className="absolute w-full h-full top-0 object-cover"
                                  />
                                  <div className="text-sm relative z-10">
                                    <CountDown dueDate={token.upgradeDueDate} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="text-[0.6rem] leading-[1rem]">
                            {token.data.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CustomScroll>
                </div>
              </div>
            </div>
            <div className="w-1/5 h-full flex flex-col justify-center items-center pb-8 relative">
              <img
                className="absolute top-0 left-0 h-full w-full"
                src="/media/upgrade/ui_upgrade_selectednft_bg.png"
                alt="select nft back"
              />
              {selectedNFT && (
                <>
                  {checkUpgrading(selectedNFT) && (
                    <div className="aspect-square mb-6 cursor-pointer relative w-2/5">
                      <img
                        src="/media/upgrade/ui_upgrade_training_icon.png"
                        alt="NFT Image"
                        className="w-full object-cover rounded-xl mb-3"
                      />
                      <div className="text-base">
                        <CountDown dueDate={selectedNFT.upgradeDueDate} />
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-center mb-8 relative w-4/5">
                    {selectedNFT.data.name}
                  </div>
                  <div className="aspect-square mb-2 cursor-pointer relative w-3/5">
                    <img
                      src={api.get1KinUrl(selectedNFT.meta.image)}
                      alt="NFT Image"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-2/5 h-full flex justify-center items-center pb-4 pl-4">
              <div className="w-1/3 h-full relative p-6">
                <button
                  onClick={() => swiper.slidePrev()}
                  className="absolute top-0 z-20 w-12 h-3 left-[50%] translate-x-[-50%]"
                >
                  <img
                    src="/media/upgrade/ui_upgrade_potion_arrow.png"
                    alt=""
                    className="w-full h-full"
                  />
                </button>
                <Swiper
                  spaceBetween={5}
                  slidesPerView={3}
                  direction="vertical"
                  onSwiper={(swiper) => setSwiper(swiper)}
                  
                >
                  {potionNfts.map((potion, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={classNames(
                          "p-4 border-4 border-[#812991] cursor-pointer",
                          {
                            "border-white": isSamePotion(
                              selectedPotion,
                              potion
                            ),
                          }
                        )}
                        onClick={() => selectPotion(potion)}
                      >
                        <img
                          src={api.get1KinUrl(potion.meta.image)}
                          alt=""
                          className="w-full aspect-square object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  onClick={() => swiper.slideNext()}
                  className="absolute bottom-0 z-20 w-12 h-3 left-[50%] translate-x-[-50%]"
                >
                  <img
                    src="/media/upgrade/ui_upgrade_potion_arrow.png"
                    alt=""
                    className="rotate-180 w-full h-full"
                  />
                </button>
                <img
                  src="/media/upgrade/ui_upgrade_potion_list_frame.png"
                  className="absolute top-0 left-0 w-full h-full z-10 select-none pointer-events-none"
                  alt=""
                />
              </div>
              <div className="w-2/3 h-full px-4 flex flex-col justify-between items-center">
                <div className="w-full flex justify-between items-end mb-4">
                  <span>
                    {selectedPotion ? selectedPotion.meta.name : "Not Selected"}
                  </span>
                  <div className="border border-white w-24 h-24 p-2">
                    {selectedPotion ? (
                      <img
                        className="w-full h-full object-contain"
                        src={api.get1KinUrl(selectedPotion.meta.image)}
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>
                <div className="w-full h-44 p-4 border-2 border-white text-[0.7rem] leading-[0.9rem]">
                  {selectedPotion ? selectedPotion.meta.description : ""}
                </div>
                <div className="w-full flex justify-between items-center">
                  {rugToken >= RUG_TOKEN_STEP && <button onClick={decreaseRuggedTokens}>
                    <img
                      src="/media/upgrade/ui_upgrade_button_decrease.png"
                      alt=""
                      className="w-10 h-10"
                    />
                  </button>}
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 mr-3"
                      src="/media/upgrade/ui_upgrade_rugcoin_icon.png"
                      alt=""
                    />
                    {rugToken >= RUG_TOKEN_STEP && <span className="text-lg">$RUG {selectedRugOption}</span>}
                    {rugToken < RUG_TOKEN_STEP && <span className="text-lg">$RUG is not enough</span>}
                  </div>
                  {rugToken >= RUG_TOKEN_STEP && <button onClick={increaseRuggedTokens}>
                    <img
                      src="/media/upgrade/ui_upgrade_button_increase.png"
                      alt=""
                      className="w-10 h-10"
                    />
                  </button>}
                </div>
                <button
                  className="w-full cursor-pointer disabled:opacity-70"
                  disabled={!selectedNFT || !selectedPotion || selectedRugOption < RUG_TOKEN_STEP}
                  onClick={openConsumeConfirm}
                >
                  <img
                    src="/media/upgrade/ui_upgrade_button.png"
                    alt=""
                    className="w-full"
                  />
                </button>
              </div>
            </div>

            {showConsumeConfirm && (
              <UpgradeConfirm
                closeConfirm={closeConsumeConfirm}
                upgrade={upgrade}
              />
            )}

            {showResult && <UpgradedResult closeResult={closeResult} oldMeta={oldMeta} newMeta={newMeta} selectedNFTImage={selectedNFTImage}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeNFT;
