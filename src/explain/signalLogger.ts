import { SentinelSignal } from "../signals/signalTypes";
import { explainSignal } from "./explainSignal";

export function logSentinelSignal(signal: SentinelSignal): void {
  console.log("🛡️ SolSentinel Signal");
  console.log(explainSignal(signal));
  console.log("📦 Raw Signal Object:", JSON.stringify(signal, null, 2));
}
