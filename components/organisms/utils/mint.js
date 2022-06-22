import * as ipfsClient from "ipfs-http-client";

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const uploadMetadataToIpfs = async (metadata) => {
  const uploadedMetadata = await ipfs.add(JSON.stringify(metadata));

  if (uploadedMetadata == null) {
    return null;
  } else {
    return `https://ipfs.infura.io/ipfs/${uploadedMetadata.path}`;
  }
};

export const mint = async (
  connection,
  wallet,
  name,
  symbol,
  metadataUrl,
  programId,
  programIdl,
  burnInstruction,
) => {
  const provider = new anchor.AnchorProvider(connection, wallet);
  anchor.setProvider(provider);

  const program = new Program(programIdl, programId, provider);
  console.log("Program Id: ", program.programId.toBase58());
  console.log("Mint Size: ", MINT_SIZE);
  const lamports =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );
  console.log("Mint Account Lamports: ", lamports);

  const getMetadata = async (mint) => {
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };

  const mintKey = anchor.web3.Keypair.generate();

  const nftTokenAccount = await getAssociatedTokenAddress(
    mintKey.publicKey,
    provider.wallet.publicKey
  );
  console.log("NFT Account: ", nftTokenAccount.toBase58());

  console.log("Mint key: ", mintKey.publicKey.toString());
  console.log("User: ", provider.wallet.publicKey.toString());

  const metadataAddress = await getMetadata(mintKey.publicKey);
  console.log("Metadata address: ", metadataAddress.toBase58());

  try {
    const tx = program.transaction.mintNft(
      //mintKey.publicKey,
      new PublicKey("3btZpdde7HwsXZL7jxesk4D8M9XGsztKxSzfGfZjRPjX"),
      name,
      symbol,
      metadataUrl,
      {
        accounts: {
          mintAuthority: provider.wallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: nftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
    console.log('tx', tx)
    const mint_tx = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      createInitializeMintInstruction(
        mintKey.publicKey,
        0,
        provider.wallet.publicKey,
        provider.wallet.publicKey
      ),
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey,
        nftTokenAccount,
        provider.wallet.publicKey,
        mintKey.publicKey
      ),
      tx
    );

    if(burnInstruction) {
      mint_tx.add(burnInstruction)
    }
    console.log('mint_tx', mint_tx)
    let blockhashObj = await connection.getLatestBlockhash();
    console.log("blockhashObj", blockhashObj);
    mint_tx.recentBlockhash = blockhashObj.blockhash;

    const signature = await wallet.sendTransaction(mint_tx, connection, {
      signers: [mintKey],
    });
    await connection.confirmTransaction(signature, "confirmed");
    console.log("Mint Success!");
    return true;
  } catch {
    return false;
  }


  // try {
    

  //   const signature = await wallet.sendTransaction(tx, connection);
  //   await connection.confirmTransaction(signature, "confirmed");
  //   console.log("Mint Success!");
  //   return true;
  // } catch {
  //   return false;
  // }
};

export const mintWithTx = async (
  provider,
  name,
  symbol,
  metadataUrl,
  programId,
  programIdl,
  transactions,
) => {
  const program = new Program(programIdl, programId, provider);
  console.log("Program Id: ", program.programId.toBase58());
  console.log("Mint Size: ", MINT_SIZE);
  const lamports =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );
  console.log("Mint Account Lamports: ", lamports);

  const getMetadata = async (mint) => {
    return (
      await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };

  const mintKey = anchor.web3.Keypair.generate();

  const nftTokenAccount = await getAssociatedTokenAddress(
    mintKey.publicKey,
    provider.wallet.publicKey
  );
  console.log("NFT Account: ", nftTokenAccount.toBase58());

  console.log("Mint key: ", mintKey.publicKey.toString());
  console.log("User: ", provider.wallet.publicKey.toString());

  const metadataAddress = await getMetadata(mintKey.publicKey);
  console.log("Metadata address: ", metadataAddress.toBase58());

  try {
    const tx = program.transaction.mintNft(
      mintKey.publicKey,
      name,
      symbol,
      metadataUrl,
      {
        accounts: {
          mintAuthority: provider.wallet.publicKey,
          mint: mintKey.publicKey,
          tokenAccount: nftTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          metadata: metadataAddress,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          payer: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
    console.log('tx', tx)
    transactions.add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      createInitializeMintInstruction(
        mintKey.publicKey,
        0,
        provider.wallet.publicKey,
        provider.wallet.publicKey
      ),
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey,
        nftTokenAccount,
        provider.wallet.publicKey,
        mintKey.publicKey
      ),
      tx
    );
    return transactions;
  } catch(e) {
    console.log("error", e)
  }
};
