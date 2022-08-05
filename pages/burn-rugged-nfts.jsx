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

import { uploadMetadataToIpfs, mint, mintGenesis, mintPotion, mintLootBox, updateMeta, payToBackendTx } from "../components/organisms/utils/mint";
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
    updateAuthority: "28qc21quYZbNSNbmfMyBd94VGsFnbnCujUVynHmL3HF5",
    mint: "FY1QshCvMFcwAzAUGUf1AQPfVLP9YD65okUykYHqD4oz",
    data: {
      name: "Battle Crate NFT #10",
      symbol: "BP",
      uri: "https://arweave.net/mgHaUmifi2ELewbPQDlkStvXRu9lfvk7W_ey9XPKOQg",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: "CERt3KubSKYcpMQayj7F3k1Nc9qeJ7Kk74xis1Z6kgbA",
          verified: 1,
          share: 0,
        },
        {
          address: "43d5CqoGXGmKmZACFWG6VJ6TMjjEzR7FxA8ufkdr1EyD",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 253,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "AXTWjdEZRPQszD3PF7Xu79YZ93jL4HWMzqBLzj5D1at",
    },
  },
  {
    key: 4,
    updateAuthority: "2pcZjwErHMWuUzWpFjx6LSaFZSVLZFbBNwsrnmLVXKX4",
    mint: "HcabBFtfWpcCepVW2P6R7nMxKX2VA41oSpRvje86JzXd",
    data: {
      name: "HELLCATS #628",
      symbol: "HELLCATS",
      uri: "https://arweave.net/qOP6_BTUl7hdzt0RGXFpkrxC2b_QIIvXcD6kGZburA4",
      sellerFeeBasisPoints: 999,
      creators: [
        {
          address: "4dKwabGLiSqPa2STtfaTVz6LDzTFDVy8eDF447v9NrRh",
          verified: 1,
          share: 0,
        },
        {
          address: "4ECurpxLuMYXS4FmPHXwsM8XQgdzMJ6CKXiZ3xNggvwa",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
  },
  {
    key: 4,
    updateAuthority: "Fu86YxJijBcPSHfZmd62aiin4oatUmnHJFkSvWWFpsu9",
    mint: "By9QHLcxjLKCoZGVPhqVuCkKRFgRKSZLmW5nWdmNoCi7",
    data: {
      name: "OrnaMint #874",
      symbol: "ORMNT",
      uri: "https://arweave.net/OOdT9dlDeIXnTXWYVPkvg8iaf9Wywaxk6I3a4XSsi5A",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: "EBvo5YLPjAsvzEsXCJu9dvP87PsB8NzbH4u2Rkyu1scb",
          verified: 1,
          share: 0,
        },
        {
          address: "Fu86YxJijBcPSHfZmd62aiin4oatUmnHJFkSvWWFpsu9",
          verified: 0,
          share: 20,
        },
        {
          address: "99QeoXPAHRUbfmqRcji5jzEpRiyv5MAPFunpsqdn2oD9",
          verified: 0,
          share: 40,
        },
        {
          address: "2AcEH6dgpo5qhWebDMNQyREjxUrvj8qvFFv8Xkgp2bVz",
          verified: 0,
          share: 35,
        },
        {
          address: "HfgepuWSwk5jgmVJVyEU3osoojWG6DV8gLwS2F4wvxdT",
          verified: 0,
          share: 5,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 254,
  },
  {
    key: 4,
    updateAuthority: "CzFuahYZf5rsakiNiLSUXTwuXHQFCdx7hwRMWBem3hNN",
    mint: "6mbJjHYwmxei9nbcKuo9gFNEULQgWPqYAQgXxFpabNAX",
    data: {
      name: "MutantFrog 707",
      symbol: "MUT",
      uri: "https://arweave.net/MFBy1f8OszuFf8KX2O-plziYtROhWrOo6njJQ8YvuEA",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: "EcaiBM6hsjK4noWeMUzMKoXN3gNnLm7mVsCy3v1H6fX8",
          verified: 1,
          share: 0,
        },
        {
          address: "G1mb9mjcoEP9ceNms9rvF2pMjd1pVssSowtXpvdMEGUa",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "8qNLvswA9tz7zhgFuEaQV71sjaVFToBoZ9rWEyy9RdiS",
    },
  },
  {
    key: 4,
    updateAuthority: "AayBiF4TYJFtBUCqLNdwcUPVsTHQC67KwsP3U4WYnXzp",
    mint: "5sQS5d5nccd7HHtLWQYYjoakq987s6X78an3X9Rosdxk",
    data: {
      name: "Creature #294",
      symbol: "SC",
      uri: "https://bafybeid4dyqsnll3vpdwpyp42o6ibsv6tadi4fnr2omtgkmfonap43ethu.ipfs.nftstorage.link/293.json",
      sellerFeeBasisPoints: 800,
      creators: [
        {
          address: "BttCfkEGL8PkN4mv7MTM4sv269nLbEWDBPUhJAvBtd1E",
          verified: 1,
          share: 0,
        },
        {
          address: "RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA",
          verified: 0,
          share: 10,
        },
        {
          address: "3oLkjHUNRLGtgz9yN1neHG4Yz7S3kwSiW7UqQ1uLB9i7",
          verified: 0,
          share: 25,
        },
        {
          address: "4XD8Wu87Y8DZSFhed9KKkXz4eCCP2zKYm8c94mRUXoN9",
          verified: 0,
          share: 32,
        },
        {
          address: "8jw2auNedqMs5BRPQZfZqVwof3mdTnWCPo1GB9AusfGw",
          verified: 0,
          share: 33,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
  },
  {
    key: 4,
    updateAuthority: "vk4PaYDJnMptueJsrya9eehE8Lh6GWiYohbjH9QAow4",
    mint: "EsivfCHfWxWR7E5wKmnY7sNzsQjESb4ZkDbVvT4eT4uw",
    data: {
      name: "CrazyHuskies #783",
      symbol: "CH",
      uri: "https://arweave.net/oeUeL4W55ndZZqMOFBEk_SWy_Q_y6TqUWqMvPfXIekE",
      sellerFeeBasisPoints: 1000,
      creators: [
        {
          address: "J2mkK93nzq1qd4Fe42A3r3KZFBhP2w9NGXyYzwkhn4y1",
          verified: 1,
          share: 0,
        },
        {
          address: "4R1kaYuAswbu69LSxYF7qUfE5ph2DbsZr8YCno32f4Db",
          verified: 0,
          share: 90,
        },
        {
          address: "Grf2FbYCSxAmoAEgwFW7Rz7hLciUHWYVeQ1jC9Hr4D8E",
          verified: 0,
          share: 10,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 254,
  },
  {
    key: 4,
    updateAuthority: "LoVExNPPxkeNnyLL8CT4Tuoc69JjTkfpsqcPsragvR4",
    mint: "CUJhcTB7kMwGGnsfGgxurKgxCkxNj7oKw5mEGnttXUPh",
    data: {
      name: "Burrito Boyz #2912",
      symbol: "BB",
      uri: "https://arweave.net/qsAFb50vvMolteVwJMd9sn9-fbZh1PHmmZqGwHNzlXk",
      sellerFeeBasisPoints: 690,
      creators: [
        {
          address: "2UCkKjTHvz7qFjPZMjhWZiPmyTc6ZwZ44iYPbSpe3aVo",
          verified: 1,
          share: 0,
        },
        {
          address: "8ZJ2tBTbv5hTifunz4a7DRYFm4Ksh9jqUXMC9ARt23WM",
          verified: 0,
          share: 69,
        },
        {
          address: "6LwxsaxVda3PRddBgefat2k4V8J3Wi78ng9ZE5p7t3ZD",
          verified: 0,
          share: 31,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 254,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "67TNHe2bKRw6kxD62q8Tq9MYXpbT6uLxr9K7UU4EK3R4",
    },
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
  {
    key: 4,
    updateAuthority: "padV3qepKBjVmSKKXi3a23ALmSxd82kST51j9gB5rnx",
    mint: "AYyJK3jUtKBnnp1XnwTQGNtp7k1bC25QcdtKENPRQcUu",
    data: {
      name: "GEMMY #3613",
      symbol: "GEMMY",
      uri: "https://arweave.net/gIQXbeF6M0gxZ3MGTygxQSqjVwnrMXmupD41EN0JDVU",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: "6djMxAWQJPkRHdC9Lyj3ZEE5V9aB4hFCk1Ek9LmHmtvj",
          verified: 1,
          share: 0,
        },
        {
          address: "fUGpUhKnJY3H5Wn7acC3bh6BofWkQiguSHogLfjgdp5",
          verified: 0,
          share: 100,
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
    updateAuthority: "CSG2sFTEhP5Y1etPy5ASxpPE9sdoiUd8TDYLRvXYfb7F",
    mint: "ERaSycptRPssKo9Hi2hoAH7VMRAH3QqPePgVfmAqTwqr",
    data: {
      name: "Cyber Samurai #4783",
      symbol: "CS",
      uri: "https://arweave.net/jxobdLZQnv1po6jTlPnCRFKPGv_aGMuOg_MeMYGEIog",
      sellerFeeBasisPoints: 700,
      creators: [
        {
          address: "4xm5QknAtr3dnpobnqgm3epJ7C3Qxo5BTTkNAkW8qvXK",
          verified: 1,
          share: 0,
        },
        {
          address: "82UrZrAYbRdHbGXSutsWrBSL6sNSXVS3DtgHfnTGs1bu",
          verified: 0,
          share: 90,
        },
        {
          address: "75PgmVjR7srzMjQ4s9PY6CihMFJRkwH51KQs8W7LEqzw",
          verified: 0,
          share: 5,
        },
        {
          address: "SPyr4CZzEtcDb8zUvaYbpAhFiT8emXbYDqWtVCRThgL",
          verified: 0,
          share: 5,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "H3sX9GvYR9W3MfvfsYT8LTEhB9WktxgY3Pu9XmwB9uhW",
    },
  },
  {
    key: 4,
    updateAuthority: "HsYWF3w3ufVEnJs3aKzdTWBxGgxgJk3MJisudSuvKPDL",
    mint: "C47RhrBboTkRQSLUtj8a8c1K9tQt66Y9nPBzib7zL3ur",
    data: {
      name: "PixelPal #0020",
      symbol: "PIXELPAL",
      uri: "https://arweave.net/n67Kb830KUPII92TRIptv4WtVjYHrAviwtUTAmC3Nck",
      sellerFeeBasisPoints: 800,
      creators: [
        {
          address: "9tiMbaSYDyceSh3zuENif5LA3bXmcAAKAPF5JMt2hrRp",
          verified: 1,
          share: 0,
        },
        {
          address: "EjdxTDP8WsPo1toHNZYce7faRLLVkt9UyQgZz7T6TrVA",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 253,
    tokenStandard: 0,
    collection: {
      verified: 1,
      key: "CxMPBqJ2v7tLNfvnQhucVa1L47f1dht9QNBN9Rv8M3gL",
    },
  },
  {
    key: 4,
    updateAuthority: "FopzaU1t8r6AMgDY2Lxi452gyZmQXKG78uaAs76M7AUp",
    mint: "J3RncQN3LgBC3LdVLEm39SwwRn5J2EPEizyQPnJBRTUq",
    data: {
      name: "Unicorn #11661",
      symbol: "SU",
      uri: "https://res.cloudinary.com/radcollab/raw/upload/Unicorns/Platform/SU-Tokens-3/11661_i6onkg.json",
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
    updateAuthority: "7efi2bLnUbK6u299NsUjPDGWdzekAsvxqRiXNt1Hru4F",
    mint: "AUpFSGq431Q9uzUPPo7S11GEuxEq5GVTUgXY8QAksgth",
    data: {
      name: "Turtle #658",
      symbol: "",
      uri: "https://arweave.net/7BepBQA1tvVivuil5rPEkQHI_ruUW2e2QJMRhFAAxhc",
      sellerFeeBasisPoints: 777,
      creators: [
        {
          address: "JDcC5abxcRjHPZLYMgeAEiwPiSQhg5yNera3JCYyAvs2",
          verified: 1,
          share: 0,
        },
        {
          address: "3TGUjcB4gcWrkyZLE7AGaTiVGwRHrDtQTNqyoGDme4ca",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 252,
  },
  {
    key: 4,
    updateAuthority: "GBwAAou24vCFiBayvpqkurXiUYKUbBUJY7yGbRMqwNZX",
    mint: "2J41F2a4UWzXDxPdLHpUoHbc7D1xpThcAj3TwbvBHXGC",
    data: {
      name: "Dropout Bears #133",
      symbol: "DB",
      uri: "https://arweave.net/eXyksuLy4Q2uRA1qa5F9VeaZxz7zlD-zF15oB9Gy3ko\r",
      sellerFeeBasisPoints: 700,
      creators: [
        {
          address: "5xHbZucRHweCAffrnFGBAC6o6TKyVgMNB11pC5CzxvrJ",
          verified: 1,
          share: 0,
        },
        {
          address: "23eVXyuA9hV2vqgGEc3Yez9mvhF5d6M4fenMnpPvNEBR",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
  },
  {
    key: 4,
    updateAuthority: "CyViifurEgAPMr55H1v3jsmxxhkQJ1jaiogjBNnBkKZb",
    mint: "CkeqhzjvC9HvixchKTNzzzrJSUH6Cc2mbVdVyAjdMHT8",
    data: {
      name: "CyberVillainz #678",
      symbol: "CV",
      uri: "https://www.arweave.net/S-ah79DT27UMy-PWNCheWLUyIGrEGTyIXBVpSTy1H64",
      sellerFeeBasisPoints: 800,
      creators: [
        {
          address: "HgfHnezvjo78HEPUzPk8qbPKjQtrHzvW6dYWZFiTWg4c",
          verified: 1,
          share: 0,
        },
        {
          address: "6hPVparRfELVDsAVccGd1PUzChdAK5dTBjEKVnEtWByv",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 252,
  },
  {
    key: 4,
    updateAuthority: "CKingvicTB6KmpyG2UBQbQbXe69DhnmgKXxksrpjpa8u",
    mint: "9UHAQcjZ6Hg7bE4PsrqCvYrfn6kKnMe2vy564ecm4BMf",
    data: {
      name: "CatchKing Explorer #3717",
      symbol: "CK",
      uri: "https://bafybeidfx7qsfmac2mq42pp3e55rdhrschj7cj542uglemackk2vnds7qe.ipfs.dweb.link/3717.json",
      sellerFeeBasisPoints: 600,
      creators: [
        {
          address: "VT18YtZLiXAnfNH4A2zbvWtUEBjmDsnzEa45xBZ8TNx",
          verified: 1,
          share: 0,
        },
        {
          address: "RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA",
          verified: 0,
          share: 10,
        },
        {
          address: "4VF1vjj7215hjKn4iokE5HAqPjCC1TzSNWJSDwjAvE4q",
          verified: 0,
          share: 90,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    collection: {
      verified: 1,
      key: "CsVtujPfjmw7fuDkG6oCJo9tzMhuoC9KTWtdeJYkkt3w",
    },
  },
  {
    key: 4,
    updateAuthority: "HaXP6SeWMP88Bpag3fJahM1afZZAYQjVAJ7pkwkzUdf6",
    mint: "9xbn4dBgouSo7ib68WgRZyGpD3VFPvWWCPYm3siaioRM",
    data: {
      name: "SAM #3462",
      symbol: "AOS",
      uri: "https://assets.creatormachine.com/age-of-sam/3461.json",
      sellerFeeBasisPoints: 700,
      creators: [
        {
          address: "HmaKeNjmWEn6rf3uxBLpGjPAfXg7bfebT6JMyUfjkPWt",
          verified: 1,
          share: 0,
        },
        {
          address: "7m26AYuk7JSBvgkvW94TicpnJxiFgyQRi8F1vtMvDNKs",
          verified: 0,
          share: 90,
        },
        {
          address: "AwHeE9NdmqY9Q8sQG86JHkW1hWHfZNt8vWBYR49HGG9h",
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
      key: "3ckFCFfYqXkhcmwHAEUw1TBjL5K1ULCcpyG73sUhqpuu",
    },
  },
  {
    key: 4,
    updateAuthority: "storm9aw7D6eDEdTo65187oGSzqnWCmJcvhf17FHW7H",
    mint: "8p4TKXdovtHgGkrEmWrJ97d5o2L8xhj3PgthTcBR1wj7",
    data: {
      name: "Solana Storm Thor #1908",
      symbol: "SST",
      uri: "https://arweave.net/Kj2Nyc3-UdSFSuFD3uxdp414AEQAmhau2svh83BBGzo",
      sellerFeeBasisPoints: 550,
      creators: [
        {
          address: "2QAVHSYKkSKireLzd37FPeD68VhhkNZEJbQENPse5JFS",
          verified: 1,
          share: 0,
        },
        {
          address: "Roya54EuyzAGWrThaY8NMhR18wZMYBF7eZPWubj7KGk",
          verified: 0,
          share: 100,
        },
      ],
    },
    primarySaleHappened: 1,
    isMutable: 1,
    editionNonce: 255,
    tokenStandard: 0,
  },
];

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
    
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      provider.wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
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

    console.log('tokenAddresses', tokenAddresses)
    let ruggedTokenAddresses = [] //tokenAddresses.filter(o=>whitelist.indexOf(o) != -1)
    let ruggedNftCandidates = []
    for(let address of tokenAddresses) {
      try {
        let tokenmetaPubkey = await metadata.Metadata.getPDA(address);
        
        const tokenmeta = await metadata.Metadata.load(connection, tokenmetaPubkey);
        if(tokenmeta.data.updateAuthority == Const.NFT_ACCOUNT_PUBKEY && tokenmeta.data.data.name == Const.GENESIS_NFT_NAME) {
          const meta = await axios.get(tokenmeta.data.data.uri)
          tokens.push({...tokenmeta.data, meta:meta.data})
        } else if(whitelist.indexOf(tokenmeta.data.updateAuthority) != -1) {
          ruggedNftCandidates.push({
            authority: tokenmeta.data.updateAuthority,
            address: address
          })
          tokens.push(tokenmeta.data)
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
            const meta = await axios.get(tokenmeta.data.uri)
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
      const meta = await axios.get(uri);
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
        const signature = await wallet.sendTransaction(create_tx, connection);
        await connection.confirmTransaction(signature, "confirmed");
        
        //mint genesis
        await mintGenesis(wallet)
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
