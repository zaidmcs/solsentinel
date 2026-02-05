import { SentinelSignal } from "../signals/sentinelSignal";

export function emitSentinelSignal(signal: SentinelSignal): void {
  console.log("🛡️ SolSentinel Signal");
  console.log("SolSentinel Decision Summary");
  console.log("----------------------------");

  console.log(`Mode: ${signal.mode}`);
  console.log(`Risk Level: ${signal.risk}`);
  console.log(`Execution State: ${signal.execution}`);
  console.log(`Confidence: ${(signal.confidence * 100).toFixed(1)}%`);

  console.log("\nReasons:");
  for (const reason of signal.reasons) {
    console.log(`- ${reason}`);
  }

  console.log("📦 Raw Signal Object:");
  console.log(JSON.stringify(signal, null, 2));
}
