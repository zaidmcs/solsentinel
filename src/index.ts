import { runAgentLoop } from "./loop";

async function main() {
  console.log("🤖 Colosseum Ecosystem Agent starting...");

  try {
    await runAgentLoop();
  } catch (error) {
    console.error("❌ Agent crashed:", error);
    process.exit(1);
  }

  console.log("🛑 Agent stopped cleanly");
}

main();
