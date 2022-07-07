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

import { uploadMetadataToIpfs, mint, mintGenesis, mintPotion, mintLootBox, updateMeta, payToBackendTx, createPotionMeta } from "../components/organisms/utils/mint";
import {burn, burnTx} from '../components/organisms/utils/nftburn'
import api from "../components/organisms/api"
import * as Const from '../components/organisms/utils/constants'
const { SystemProgram } = anchor.web3;

const stubTokens = [
  {
    key: 4,
    updateAuthority: "ApJzcJzoz9ggMWqimXgjnrXaEsmtkUUqbaGyiNPQPpLr",
    mint: "2Gm1mssWAUdpvw3fFpjbMrf6NS3ijXvBca9xYTqBuc4f",
    data: {
      name: "Tina",
      symbol: "NIPS",
      uri: "https://arweave.net/h71USlnhM87-tg8hBMdzVU2TGf8e-cY9zhMUUaEOPv8",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "ApJzcJzoz9ggMWqimXgjnrXaEsmtkUUqbaGyiNPQPpLr",
          verified: 1,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 0,
    isMutable: 1,
    editionNonce: 254,
    tokenStandard: 0,
  },
  {
    key: 4,
    updateAuthority: "UK2gDfghVSqUjds6CMv7LB6KFroiAE4x7ipHBTMngCJ",
    mint: "FYvi4MS2991j61DSxVSbxmrsZPQJ3m5JxaH4sBdR6N3v",
    data: {
      name: "Big Shot Foxes #2291",
      symbol: "BSF",
      uri: "https://arweave.net/RXocyflVh2TDO4K5S0wjcHRwFk1Di9Ql4xlZygIqx1M",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "5aSiBFsYGxgFSEUC7S7MmGqHPWVgaN8rjucps1EZZstT",
          verified: 1,
          share: 0,
        },
        {
          address: "GT2Ud8dfL5aqjBpCwE19e7QAx4e979jDR2otrxLza2T5",
          verified: 0,
          share: 70,
        },
        {
          address: "2iquoCgWCzbMQfYWQs8KiY4yQczHP5wu2JooqbLehVnf",
          verified: 0,
          share: 30,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 254,
    tokenStandard: 0,
  },
  {
    key: 4,
    updateAuthority: "CzvfXtzBrMdgm16e1bZC32T8qtQjpn2e5aiJXzjKWzTe",
    mint: "EAZ3C42w7337ehuDT3SFuY7sGsuffUMZJwrhPihnM1pw",
    data: {
      name: " Chill Elephant  #2930",
      symbol: "CEC",
      uri: "https://arweave.net/hwwY3Eh24zz-QW2nGB2GAkyZtivGo6eFM2lJqb3tcp4",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "7JEyyweqHhTgwRwVT86SRv3SwaFVbVcVypFT7byYVNYG",
          verified: 1,
          share: 0,
        },
        {
          address: "74idAAp8dMBijDRmcxe27Eu8tgnXLqLQwHqUZxteHX71",
          verified: 1,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 254,
  },
  {
    key: 4,
    updateAuthority: "FopzaU1t8r6AMgDY2Lxi452gyZmQXKG78uaAs76M7AUp",
    mint: "Hr92y1mhm4hADAwjD8GJ2KMfjcZsdmyyBcFq56AJANiW",
    data: {
      name: "Unicorn #12897",
      symbol: "SU",
      uri: "https://res.cloudinary.com/radcollab/raw/upload/Unicorns/Platform/SU-Tokens-3/12897_kjhgxc.json",
      sellerFeeBasisPoints: 750,
      creators: [
        {
          address: "9sH8AvmsbmR6zJKB4GaXQhETqAJBbBwz7zTFDgBiGBkX",
          verified: 1,
          share: 0,
        },
        {
          address: "76tYGiLCdK3WLSj7u8dGEfTz6bxqWhPzSJZ5LDTsnxMM",
          verified: 0,
          share: 77,
        },
        {
          address: "EGaUoxUBGMp7TB1BtKuFMnxwJDG4KhnURd2r9najmaou",
          verified: 0,
          share: 13,
        },
        {
          address: "BUqGF6CqToFHrbyCh76hwF62JgS1CEhbUN4kNi8X5qyt",
          verified: 0,
          share: 10,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
  },
  {
    key: 4,
    updateAuthority: "QRYjukfx3tkDm4N9ax6wSZKKtBZuzygrFLPFQd8ob7T",
    mint: "AKMgCtjJ6MNzfWGayoGUf8QCGEHP5gAkxhQu9PbxzUfF",
    data: {
      name: "Chikara Chimps #203",
      symbol: "CC",
      uri: "https://arweave.net/JJ2tp3DqvldwBatbtiRTbRvYcTF_DEkz6wLYzQh_9Tw",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "9g5qd6PVVLMC7yXevPUFkVur4z6ExeVa43ZiWjZfF9yH",
          verified: 1,
          share: 0,
        },
        {
          address: "GdEjLQ6WUVtYAwbVfQhrqgk3Ge8XYUa53htjF4xxHfB1",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
  },
  {
    key: 4,
    updateAuthority: "CUBMULPw78bn9GT2okcfeQRwJJpA9GaPXdbEnBKtdrMg",
    mint: "GcBz3NHEvpAqWkn1866xvmkwwjYFfEavQVe42sN41RM8",
    data: {
      name: "The Stoned Frogs #1474",
      symbol: "TSF",
      uri: "https://bafybeia46hhjfrus5xkuf4itmruh4hxbsuwb2muufbromtcj4if7mmbjxi.ipfs.nftstorage.link/1474.json",
      sellerFeeBasisPoints: 800,
      creators: [
        {
          address: "8bxYw3iimsLKnxVUHPKHXAUjkTWRfCA3i76FTV1qSmi",
          verified: 1,
          share: 0,
        },
        {
          address: "EgFY9PKziUJeKBwsQAH9zuvKyZLvx37gqtxmj5QtN1CX",
          verified: 0,
          share: 66,
        },
        {
          address: "3VzP3K6Zkz7So9LBUfZ3ePJfkcbQi7v2F51ZfvRtHN3F",
          verified: 0,
          share: 12,
        },
        {
          address: "13PdymuZs8Pw1WjnGn8K3kqVizxPhCrkvwUPWtvzxMKh",
          verified: 0,
          share: 12,
        },
        {
          address: "RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA",
          verified: 0,
          share: 10,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    collection: {
      verified: 1,
      key: "92N4okBv4oqnNk3ULmPLrss74HiS6TgXfNTX7ZRxiNUw",
    },
  },
  {
    key: 4,
    updateAuthority: "26wnm56SEP1bT2JVmcDZduXyJxpws2dFVUtwuMTVjyVn",
    mint: "7kwhsptpVusRpLaLsaGbuwFp6GJsAhRLaC5sfjVJgGb6",
    data: {
      name: "Reels of Change #3160",
      symbol: "RoC",
      uri: "https://bafybeibxoqqe4gth4vflmk5gpqknelzoxe4usjvodjyyktmpqxjkpj26zm.ipfs.nftstorage.link/3159.json",
      sellerFeeBasisPoints: 850,
      creators: [
        {
          address: "2ZuCVQvPC79aujK6sjHQs5MJ1EgqdAFq8X78skfTzSBd",
          verified: 1,
          share: 0,
        },
        {
          address: "RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA",
          verified: 0,
          share: 10,
        },
        {
          address: "9D1YA2RMDET9SmMFLuBHHLM35upKVLHnn4g382RsFW3A",
          verified: 0,
          share: 6,
        },
        {
          address: "26wnm56SEP1bT2JVmcDZduXyJxpws2dFVUtwuMTVjyVn",
          verified: 0,
          share: 45,
        },
        {
          address: "5WZgmCLu49abdJ3tEKEiiX6KDN34XpK9GqYNzRLGrcVZ",
          verified: 0,
          share: 39,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
  },
  {
    key: 4,
    updateAuthority: "BFPrtTwTpXyXyphCSQBNpXKddR2sm2qnrT2w21TRnht2",
    mint: "F8HQNth38QjSUePKqWfF8g6KqN8rqNtLEShxV2KnYXjK",
    data: {
      name: "GOONEY #2304",
      symbol: "GOONEY",
      uri: "https://bafybeictkowqlzfin6titfv7qv5ws55pijhoa6p6f25w3gqvjib4u6nire.ipfs.dweb.link/2303.json",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: "EHe8EvTzHCAixLDcyuNRhxXsYvTkjVeowPvp5PRpgckb",
          verified: 1,
          share: 0,
        },
        {
          address: "RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA",
          verified: 0,
          share: 10,
        },
        {
          address: "4eRYAuHB1m5gtz9yPCQQ6vgNm3pmy7Kd82vujPw4wfAK",
          verified: 0,
          share: 47,
        },
        {
          address: "HctKfm5Q3R1J33ukk9HnoQe27mYLrLJ52kNUTFaxQHBW",
          verified: 0,
          share: 37,
        },
        {
          address: "BFPrtTwTpXyXyphCSQBNpXKddR2sm2qnrT2w21TRnht2",
          verified: 1,
          share: 6,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 253,
  },
  {
    key: 4,
    updateAuthority: "95AhJgwSLGc1YBMSSrUJVRabqXjuuFTn6gLNSvT9ji63",
    mint: "D5KDzHgrmzUR9gvpRjJKWJnU5m9nFQCmfctb7rBF43hV",
    data: {
      name: "Ernest In Disguise #4014",
      symbol: "EID",
      uri: "https://www.arweave.net/99RKvy6DzgRuPC20aD_3kU_gnzdMqwHb8M4sIwcCQ3M",
      sellerFeeBasisPoints: 800,
      creators: [
        {
          address: "95AhJgwSLGc1YBMSSrUJVRabqXjuuFTn6gLNSvT9ji63",
          verified: 1,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 0,
    isMutable: 0,
    editionNonce: 251,
  },
  {
    key: 4,
    updateAuthority: "WjtsYNMpMHE6fhp2XYbL4UMF4PAPpEumrgZfuEbYftq",
    mint: "Fn2K1KMvnjFTTub8bYyDkmbkgvCjGqwQDfeRkZSeGtXT",
    data: {
      name: "Dope Pirates #2595",
      symbol: "DP",
      uri: "https://arweave.net/8AC-J2Yz0OPXBg2gdKxtHJ2YMrto2LdJf8J_kbVpqIQ",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "Pkc7e6BkzpWJXQmYowv8fuPn4wfebNHT8huXqkHtNNA",
          verified: 1,
          share: 0,
        },
        {
          address: "8hH8XpN3n7b3T7MjfetaeGHVmQCFDwGQW1quGCBTYgiA",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 248,
  },
  {
    key: 4,
    updateAuthority: "2Pi1TvYf8Nku8ppq3Pn4ZEHDNo8fFhZjcLaRHi17Au4C",
    mint: "5sCNkdzHoGxgjMsKkhmHS1vQ3zE9K5g65Yb52BGgkn4i",
    data: {
      name: "Llama Agent #999",
      symbol: "SLA",
      uri: "https://arweave.net/K75-8NMcvO4SL2S-FQKLixDG2M9PHmDnUUuMs6btOlg",
      sellerFeeBasisPoints: 9000,
      creators: [
        {
          address: "8yTHQkZdESpd9FSnmqWthEAtp4JBQF7ewwdC1sbmLNEr",
          verified: 1,
          share: 0,
        },
        {
          address: "5JTEZn8o81DgXbPMPJmNuMBYASsE1e8HHBqnCVnZqgnR",
          verified: 0,
          share: 30,
        },
        {
          address: "GVidbhwCjV4AFsuuQTwDGTm7gVE7BeBsK6V2jYHZR54n",
          verified: 0,
          share: 70,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "GqxAoZaqww9zp6y5RddRhExrwTVySfAjLnheaJVjSvag",
    },
  },
  {
    key: 4,
    updateAuthority: "7nHxhSkaGCePXN4KEZ4CUh4HwLAuCZ3yvXM6a91jGeyg",
    mint: "7Za77TZ7VBdk4AkCTaAygucH3trrA6QUJayXfksxsbHj",
    data: {
      name: "Crypto Quest #2479",
      symbol: "CQ",
      uri: "https://cryptoquest.mypinata.cloud/ipfs/QmU17QPsqgA7b6fjbTqqDS6SuL2zYTpYuH5ifYqFf41GNC",
      sellerFeeBasisPoints: 750,
      creators: [
        {
          address: "5DFBQKb8Z4u9ng9v7CCYSjK4jEbsNVpHzvyDARsAybmi",
          verified: 1,
          share: 0,
        },
        {
          address: "GzsWL7vkY7djuXfhadSTwUiXshdQxYt3R3Bc2wQGMfQ",
          verified: 0,
          share: 7,
        },
        {
          address: "7nHxhSkaGCePXN4KEZ4CUh4HwLAuCZ3yvXM6a91jGeyg",
          verified: 0,
          share: 93,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 250,
  },
  {
    key: 4,
    updateAuthority: "79SQqm8SUyLR21cXk5TEGCtkjWnN7NwBjUUY2aYUci8B",
    mint: "7UpShQ1L5wnRNnuiPWsd1dnGMrwGeY7sKCGrJtJwCL86",
    data: {
      name: "Orcanauts #8689",
      symbol: "ORCANAUT",
      uri: "https://arweave.net/BAQK0LvmIzggo218MpgUacl1AnhxxYSIWdf34DRWrLo",
      sellerFeeBasisPoints: 300,
      creators: [
        {
          address: "9aALgDk1Ryx4PQLeeaFRVHpRmR3xUoyFTvR7RVXky23S",
          verified: 1,
          share: 0,
        },
        {
          address: "BPbS1AC4KW5SBiz8M2AgPtWXTzR1ekBwMLLQLcwdvZnE",
          verified: 0,
          share: 0,
        },
        {
          address: "5dNGzQh9sonyFUcTHrH6wiCczokUMSc79miMEysyVYjK",
          verified: 0,
          share: 0,
        },
        {
          address: "E3G6ujBGbusExBAPL5hg62xu5ncWeVh9CLjU9qbusVvs",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
  },
];

export default function BurnRuggedNFTs() {
  const [keyword, setKeyword] = useState("");
  const [tokens, setTokens] = useState([]);
  const [tokensWithImage, setTokensWithImage] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [tab, setTab] = useState("genesis"); // player, lootbox, genesis

  const [allTokens, setAllTokens] = useState([]);

  const [whitelist, setWhitelist] = useState({})
  const [ruggedTokenAddresses, setRuggedTokenAddresses] = useState([])
  const [charged, setCharged] = useState(false)
  const [staked, setStaked] = useState(false)
  const [ruggedAccount, setRuggedAccount] = useState()
  const [mainProgram, setMainProgram] = useState()

  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, connected } = useWallet();
  const provider = new anchor.AnchorProvider(connection, wallet);
  const hasGenesis = allTokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME && o.updateAuthority == Const.NFT_ACCOUNT_PUBKEY).length > 0
  const router = useRouter();

  useEffect(() => {
    if(publicKey) {
      init()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const init = async () => {
    let whitelist = await api.getRuggedWhitelist()
    console.log('whitelist', whitelist)
    if(whitelist.length > 0) {
      setWhitelist(whitelist[0])
    }

    fetchData(whitelist[0])
    initMainProgram()
  }

  const fetchData = async (whitelist) => {
    let walletInfo = await connection.getAccountInfo(provider.wallet.publicKey)
    console.log("walletInfo", walletInfo)

    // const tokenMetadata = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
    // console.log('tokenMetadata', JSON.stringify(tokenMetadata));
    
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
          
        } else {
          tokenAddresses.push(pubKey)
        }
      }
    })

    for(let address of tokenAddresses) {
      try {
        let tokenmetaPubkey = await metadata.Metadata.getPDA(address);
        
        const tokenmeta = await metadata.Metadata.load(connection, tokenmetaPubkey);
        if(tokenmeta.data.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && (tokenmeta.data.data.name == Const.GENESIS_NFT_NAME || tokenmeta.data.data.name == Const.LOOTBOX_NFT_NAME)) {
          const meta = await axios.get(tokenmeta.data.data.uri)
          tokens.push({...tokenmeta.data, meta:meta.data})
        } else {
          tokens.push(tokenmeta.data)
        }
      } catch(e) {
        console.log('e', e)
      }
    }
    console.log('tokens', tokens)
    setAllTokens(tokens)
    selectTab('genesis', tokens)

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

  const selectTab = (tab, tokens) => {
    setTab(tab);
    setSelectedNFT(null);

    let filteredTokens = []
    if (tab === "genesis") {
      // TODO - This is test data, need to set tokens when changing tab
      filteredTokens = tokens.filter(o=>o.data.name == Const.GENESIS_NFT_NAME)
    } else if (tab === "player") {
    } else {
      filteredTokens = tokens.filter(o=>o.data.name == Const.LOOTBOX_NFT_NAME)
    }

    console.log('filteredTokens', filteredTokens)

    setTokens(filteredTokens)
  };

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

  const getImageFromMetadata = async (uri) => {
    try {
      const meta = await axios.get(uri);
      return meta.data.image || "";
    } catch (e) {
      return "";
    }
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

  const upgradeNFT = (token) => {
    // TODO - Logic to upgrade selected NFT, navigate to upgrade page
    console.log(token);
  };

  const getRugToken = (level, hasGene) => {
    return level * 2
  }

  const getPotion = (level, charged) => {
    if(!charged) return 0

    const percent = Math.min(level * 6.6, 100)
    return getRandomInt(0, 100) <= percent? 1 : 0;
  }

  const openLootbox = async (token) => {
    // TODO - Logic to open lootbox NFT
    console.log(token);
    anchor.setProvider(provider);

    //get token meta
    const meta = await axios.get(token.data.uri)
    console.log(meta)
    if(!meta || !meta.data) {
      return
    }

    let beatLevel = meta.data.attributes.find(o=>o.trait_type == 'level').value
    let isWon = meta.data.attributes.find(o=>o.trait_type == 'nft').value != 'No'

    console.log('burn', token)
    let burnInstruction = await burnTx(token.mint, provider.wallet.publicKey, wallet, connection, 1)
    const create_tx = new anchor.web3.Transaction().add(burnInstruction)

    let rugTokenAmount = getRugToken(beatLevel, hasGenesis)
    let potionAmount = getPotion(beatLevel, charged)

    console.log('open lootbox', rugTokenAmount, potionAmount, isWon)

    let tx = mainProgram.transaction.charge({
      accounts: {
        ruggedAccount: ruggedAccount,
        authority: provider.wallet.publicKey,
      },
    });

    let transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.BACKEND_ACCOUNT_PUBKEY), Const.MINT_FEE);
    create_tx.add(tx, transferInstruction)

    if(potionAmount > 0) 
    {
      transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.NFT_ACCOUNT_PUBKEY), Const.MINT_FEE);
      create_tx.add(transferInstruction)
    }
    if(isWon) 
    {
      transferInstruction = payToBackendTx(wallet.publicKey, new PublicKey(Const.PREMIUM_ACCOUNT_PUBKEY), Const.MINT_FEE);
      create_tx.add(transferInstruction)
    }

    // let txSignature = window.crypto.randomUUID()
    // let signatureTx = setProgramTransaction(mainProgram, ruggedAccount, txSignature, wallet)
    // create_tx.add(signatureTx)

    let blockhashObj = await connection.getLatestBlockhash();
    console.log("blockhashObj", blockhashObj);
    create_tx.recentBlockhash = blockhashObj.blockhash;

    const signature = await wallet.sendTransaction(create_tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    let potionMeta = ""
    if(potionAmount > 0) {
      potionMeta = await createPotionMeta()
    }
    await api.openLootBox({
      key:wallet.publicKey.toBase58(),
      rugTokenAmount,
      potionAmount,
      potionMeta,
      isWon,
      // txId: txSignature
    })

    await fetchData()
  };

  const chargeGenesisNFT = (token) => {
    // TODO - Logic to charge Genesis NFT
    console.log(token);
    localStorage.setItem("selectedGenesisNft", token.mint)
    router.push('/burn-rugged-nfts')
  };

  const filteredNFTs = tokens.filter((token) =>
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
                {!tokens.length && tab === "player" && (
                  <p className="text-center">
                    There is currently no Playable Characters in the wallet
                  </p>
                )}
                {!tokens.length && tab === "lootbox" && (
                  <p className="text-center">
                    There is currently no Lootboxes available in the wallet
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
                        <img
                          src={token.meta.image}
                          alt="NFT Image"
                          className="w-full h-full object-cover"
                        />
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
                    src={selectedNFT.meta.image}
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
                          0
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          0
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          0
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
                          0
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          0
                        </div>
                        <div className="flex justify-start items-center h-6 mb-4 whitespace-nowrap pl-3">
                          0
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
                  <div className="w-full h-44 border-4 border-white p-2 text-[0.7rem] leading-[1rem]">
                    {selectedNFT?selectedNFT.meta.description:"<DESCRIPTION>"}
                  </div>
                  <img
                    src="/media/NewInventory/Elements/ui_inventory_button_openlootbox.png"
                    alt="flame"
                    className={classNames("h-12 cursor-pointer", {
                      "opacity-70": !selectedNFT,
                    })}
                    onClick={() => {
                      if (selectedNFT) {
                        openLootbox(selectedNFT);
                      }
                    }}
                  />
                </>
              )}
              {/* Genesis Tab */}
              {tab === "genesis" && (
                <>
                  <div className="w-full h-44 border-4 border-white p-2 text-[0.7rem] leading-[1rem]">
                    {selectedNFT?selectedNFT.meta.description:"<DESCRIPTION>"}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
