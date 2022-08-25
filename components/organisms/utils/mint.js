import * as anchor from "@project-serum/anchor";

import api from "../api";

export const updateMeta = async (token, playerAccount, txId)=>{
  let ret = await api.updateNftMetaData({token, playerAccount, txId})
  console.log('ret', ret)
  return ret
}

export const mintGenesis = async (wallet, txId) => {
  let ret = await api.mintGenesisNft({playerKey: wallet.publicKey, txId})
  console.log('mint result from api', ret)
}

export const mintLootBox = async (wallet, level, hasPremium, gameMode, txId) => {
  let ret = await api.mintLootboxNft({playerKey: wallet.publicKey, level, hasPremium, gameMode, txId})
  console.log('mint result from api', ret)
}

export const payToBackendTx = (from, receiver, amount)=>{
  return anchor.web3.SystemProgram.transfer({
    fromPubkey: from,
    toPubkey: receiver,
    lamports: amount,
  })
}

export const setProgramTransaction = (program, ruggedAccount, txId, wallet)=>{
  return program.transaction.setTransaction(txId, {
    accounts: {
      ruggedAccount: ruggedAccount,
      authority: wallet.publicKey,
    },
  })
}