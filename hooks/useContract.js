import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import * as ContractInfo from "../constants/contractInfo";

const useContract = () => {
  const { ethereum } = useWallet();
  const refEth = useRef(ethereum);
  const [web3, setWeb3] = useState(new Web3(ethereum));
  const [contract, setContract] = useState();

  useEffect(() => {
    if (ethereum !== refEth.current) {
      const _web3 = new Web3(ethereum);
      setWeb3(_web3);

      if (_web3) {
        const _contract = new _web3.eth.Contract(
          ContractInfo.ABI,
          ContractInfo.ADDRESS
        );
        setContract(_contract);
      }
      refEth.current = ethereum;
    }
  }, [ethereum]);

  return [web3, contract];
};

export default useContract;
