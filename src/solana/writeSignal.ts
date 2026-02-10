import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import crypto from "crypto";

const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

export async function writeSignalToSolana(signal: unknown) {
  // 1. Hash the signal (deterministic proof)
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(signal))
    .digest("hex")
    .slice(0, 32); // keep memo short

  // 2. Create ephemeral key (NO funds needed for memo on devnet)
  const payer = Keypair.generate();

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // 3. Airdrop tiny amount for tx fee
  //   const sig = await connection.requestAirdrop(payer.publicKey, 0.01 * 1e9);
  //   await connection.confirmTransaction(sig);

  // 4. Create memo instruction
  const memoInstruction = new TransactionInstruction({
    programId: { toBase58: () => MEMO_PROGRAM_ID } as any,
    keys: [],
    data: Buffer.from(`SolSentinel:${hash}`),
  });

  const tx = new Transaction().add(memoInstruction);

  const txSig = await sendAndConfirmTransaction(connection, tx, [payer]);

  return {
    txSig,
    hash,
  };
}
