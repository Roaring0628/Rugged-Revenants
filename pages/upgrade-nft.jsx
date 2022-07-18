/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import CustomScroll from "components/molecules/CustomScroll";

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

const stubPotions = [
  {
    image: "/media/upgrade/Potion.png",
    name: "Potion 1",
    description: "Potion Description 1",
  },
  {
    image: "/media/upgrade/Potion.png",
    name: "Potion 2",
    description: "Potion Description 2",
  },
  {
    image: "/media/upgrade/Potion.png",
    name: "Potion 3",
    description: "Potion Description 3",
  },
  {
    image: "/media/upgrade/Potion.png",
    name: "Potion 4",
    description: "Potion Description 4",
  },
  {
    image: "/media/upgrade/Potion.png",
    name: "Potion 5",
    description: "Potion Description 5",
  },
];

const rugOptions = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

const MINIMUN_SOL_BALANCE = 100000000; // 0.1 SOL

const UpgradeNFT = () => {
  const [swiper, setSwiper] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [tokens, setTokens] = useState([]);
  const [tokensWithImage, setTokensWithImage] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [selectedRugOption, setSelectedRugOption] = useState(50);
  const [selectedRugOptionIndex, setSelectedRugOptionIndex] = useState(0);

  useEffect(() => {
    // TODO - Get tokens from wallet and set state
    setTokens(stubTokens);
  }, []);

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

  const upgrade = () => {
    // TODO - Logic to upgrade selected NFT
    console.log(
      "upgrade",
      selectedNFT,
      selectedPotion,
      selectedRugOption,
      selectedRugOptionIndex + 1
    );
  };

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
                  <button onClick={searchNFT} className="flex-shrink-0">
                    <img
                      src="/media/inventory/Inventory_Page/searchicon.png"
                      alt="search icon"
                      className="h-12"
                    />
                  </button>
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
                              src={token.image}
                              alt="NFT Image"
                              className="w-full h-full object-cover"
                            />
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
                  <div className="text-sm text-center mb-8 relative w-4/5">
                    {selectedNFT.data.name}
                  </div>
                  <div className="aspect-square mb-2 cursor-pointer relative w-3/5">
                    <img
                      src={selectedNFT.image}
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
                  loop
                >
                  {stubPotions.map((potion, index) => (
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
                          src={potion.image}
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
                    {selectedPotion ? selectedPotion.name : "Not Selected"}
                  </span>
                  <div className="border border-white w-24 h-24 p-2">
                    {selectedPotion ? (
                      <img
                        className="w-full h-full object-contain"
                        src={selectedPotion.image}
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>
                <div className="w-full h-44 p-4 border-2 border-white text-[0.7rem] leading-[0.9rem]">
                  {selectedPotion ? selectedPotion.description : ""}
                </div>
                <div className="w-full flex justify-between items-center">
                  <button onClick={decreaseRuggedTokens}>
                    <img
                      src="/media/upgrade/ui_upgrade_button_decrease.png"
                      alt=""
                      className="w-10 h-10"
                    />
                  </button>
                  <div className="flex items-center">
                    <img
                      className="w-7 h-7 mr-3"
                      src="/media/upgrade/ui_upgrade_rugcoin_icon.png"
                      alt=""
                    />
                    <span className="text-lg">$RUG {selectedRugOption}</span>
                  </div>
                  <button onClick={increaseRuggedTokens}>
                    <img
                      src="/media/upgrade/ui_upgrade_button_increase.png"
                      alt=""
                      className="w-10 h-10"
                    />
                  </button>
                </div>
                <div className="w-full cursor-pointer" onClick={upgrade}>
                  <img
                    src="/media/upgrade/ui_upgrade_button.png"
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeNFT;
