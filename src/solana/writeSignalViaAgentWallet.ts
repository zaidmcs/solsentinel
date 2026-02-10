import crypto from "crypto";
import fetch from "node-fetch";

const AGENTWALLET_API = "https://agentwallet.mcpay.tech/api";

export async function writeSignalToSolana(signal: unknown) {
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(signal))
    .digest("hex")
    .slice(0, 32);

  const res = await fetch(`${AGENTWALLET_API}/solana/memo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AGENTWALLET_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      memo: `SolSentinel:${hash}`,
      network: "devnet",
    }),
  });

  if (!res.ok) {
    console.warn("⚠️ AgentWallet memo unavailable");
    return {
      committed: false,
      reason: "agentwallet_unavailable",
      hash,
    };
  }

  type AgentWalletResponse = {
    signature?: string;
    txSig?: string;
  };

  let txSig: string | null = null;

  try {
    const json = (await res.json()) as AgentWalletResponse;

    txSig = json.signature ?? json.txSig ?? null;
  } catch {
    // AgentWallet may return empty body or HTML
  }

  return {
    committed: Boolean(txSig),
    txSig,
    hash,
  };
}
