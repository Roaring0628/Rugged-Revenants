import * as ipfsClient from "ipfs-http-client";

import * as anchor from "@project-serum/anchor";
import { programs } from "@metaplex/js"
import {PublicKey, sendAndConfirmTransaction} from "@solana/web3.js";

import {uploadMetadataToIpfs} from './mint'

const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const updateMeta = async (connection, wallet, token, newMeta, txs)=>{
  const provider = new anchor.AnchorProvider(connection, wallet);
  anchor.setProvider(provider);
  let { metadata : {Metadata, UpdateMetadata, MetadataDataData, Creator} } = programs;
  let signer = provider.wallet;
  let nftMintAccount = new PublicKey(token.mint);
  let metadataAccount = await Metadata.getPDA(nftMintAccount);

  let newUri = await uploadMetadataToIpfs(newMeta)
  console.log('newUri', newUri)
  if (token.data.creators != null) {
    const creators = token.data.creators.map(
      (el) =>
          new Creator({
              ...el,
          }),
    );
    let newMetadataData = new MetadataDataData({
      name: token.data.name,
      symbol: token.data.symbol,
      uri: newUri,
      creators: [...creators],
      sellerFeeBasisPoints: token.data.sellerFeeBasisPoints,
    })
    const updateTx = new UpdateMetadata(
      { feePayer: signer.publicKey },
      {
        metadata: metadataAccount,
        updateAuthority: signer.publicKey,
        metadataData: newMetadataData,
        newUpdateAuthority: signer.publicKey,
        primarySaleHappened: token.primarySaleHappened,
      },
    );

    if(txs && txs.length > 0) {
      for(let tx of txs) {
        updateTx.add(tx)
      }
    }
    const signature = await wallet.sendTransaction(updateTx, connection);
    const result = await connection.confirmTransaction(signature, "confirmed");
    return result
  }
}