import { getAssociatedTokenAddress, createBurnInstruction, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import BN from 'bn.js';
import * as BufferLayout from 'buffer-layout';

const uint64 = (property = 'uint64') => {
    return BufferLayout.blob(8, property);
  };
  class u64 extends BN {
    /**
     * Convert to Buffer representation
     */
    toBuffer() {
      const a = super.toArray().reverse();
      const b = Buffer.from(a);
 
      if (b.length === 8) {
        return b;
      }
 
      const zeroPad = Buffer.alloc(8);
      b.copy(zeroPad);
      return zeroPad;
    }
    /**
     * Construct a u64 from Buffer representation
     */
 
    static fromBuffer(buffer) {
      return new u64(
        [...buffer]
          .reverse()
          .map((i) => `00${i.toString(16)}`.slice(-2))
          .join(''),
        16
      );
    }
  }

export async function burn(tokenMintAddress, owner, wallet, connection, amount) {
    try {
        const mintPublickey = new PublicKey(tokenMintAddress);
        console.log('here-1', mintPublickey)
        const associatedAddress = await getAssociatedTokenAddress(
            mintPublickey,
            owner,
        );
        console.log('here-2', associatedAddress)

        const burnInstruction = await createBurnInstruction(
            associatedAddress,
            mintPublickey,
            owner,
            amount,
            [],
            TOKEN_PROGRAM_ID,
        );

        console.log('here-3', burnInstruction)
        // const closeInstruction = await Token.createCloseAccountInstruction(
        //     TOKEN_PROGRAM_ID,
        //     associatedAddress,
        //     owner,
        //     owner,
        //     []
        // );

        const BurnTransaction = new Transaction().add(burnInstruction);

        const BurnandCloseSignature = await wallet.sendTransaction(BurnTransaction, connection);

        return await connection.confirmTransaction(BurnandCloseSignature, 'processed');
    } catch (error) {
        console.log(error)
    }
}

export async function burnTx(tokenMintAddress, owner, wallet, connection, amount) {
    try {
        const mintPublickey = new PublicKey(tokenMintAddress);
        console.log('here-1', mintPublickey)
        const associatedAddress = await getAssociatedTokenAddress(
            mintPublickey,
            owner,
        );
        console.log('here-2', associatedAddress)

        const burnInstruction = await createBurnInstruction(
            associatedAddress,
            mintPublickey,
            owner,
            amount,
            [],
            TOKEN_PROGRAM_ID,
        );

        return burnInstruction
    } catch (error) {
        console.log(error)
    }
}