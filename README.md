# SolSentinel

**A Decision-Confidence Oracle for Autonomous Agents**

---

## What Is SolSentinel?

Most autonomous agents are built to _do things_:

- trade
- monitor
- alert
- execute

**SolSentinel is built to answer a different question:**

> **Should any agent act at all right now?**

SolSentinel operates one layer above execution.  
Instead of reacting to prices or wallets, it reacts to **agent ecosystem dynamics**.

It is a read-only oracle that helps agents avoid acting at the _wrong time_.

---

## Why This Matters

Autonomous agents don’t fail only because of bad logic.

They fail because they act at the **wrong time**:

- during coordination spikes
- amid ecosystem uncertainty
- when collective behavior amplifies risk

As agent ecosystems scale, **timing and coordination risk become first-class problems**.

SolSentinel explores this problem by providing a shared, read-only signal that agents can consult _before_ acting.

---

## What SolSentinel Does

SolSentinel continuously analyzes:

### 1. Hackathon / Ecosystem State

- Current hackathon phase
- Time pressure
- Announcements
- Active polls (coordination moments)

### 2. Forum Dynamics

- Engagement spikes
- Security-related discussion density
- Cross-agent activity patterns

### 3. Temporal Context

- Remaining execution windows
- Urgency vs caution tradeoffs

These inputs are combined into a single **decision-confidence signal**.

---

## Output: A Decision-Confidence Signal

SolSentinel emits a structured, explainable signal:

```json
{
  "version": "1.0",
  "mode": "ACT",
  "risk": "RISK_ON",
  "execution": "SAFE_TO_EXECUTE",
  "confidence": 0.55,
  "reasons": [
    "Active poll indicates coordination moment",
    "Unusually high engagement across forum"
  ]
}
```

### Signal Semantics

- **mode**
  - `ACT` — ecosystem conditions allow action
  - `READ_ONLY` — observe, do not execute

- **risk**
  - `RISK_ON` — normal risk-taking acceptable
  - `RISK_OFF` — elevated systemic risk

- **execution**
  - `SAFE_TO_EXECUTE` — no coordination red flags
  - `WAIT` — delay execution

- **confidence**
  - Scalar confidence score (0.0 – 1.0)

- **reasons**
  - Human-readable explanations for transparency and debugging

---

## How Other Agents Use SolSentinel (Judge-Optimized)

SolSentinel is designed to be used as a **decision gate**, not an executor.

It does **not**:

- trade
- sign transactions
- manage funds
- control other agents

Instead, other agents _consult_ SolSentinel **before acting**.

### Integration Model

```
Agent Strategy Logic
        ↓
SolSentinel Signal
        ↓
Execution Gate (ACT / WAIT)
```

### Minimal Integration Example (TypeScript)

```ts
import { getSolSentinelSignal } from "./runtime/getSolSentinelSignal";

const signal = getSolSentinelSignal(hackathonInput, forumInput, timeInput);

// Simple execution gate
if (signal.mode !== "ACT") {
  console.log("SolSentinel advises READ_ONLY — skipping execution");
  return;
}

if (signal.execution !== "SAFE_TO_EXECUTE") {
  console.log("Execution delayed due to ecosystem-level risk");
  return;
}

// Safe to proceed
executeStrategy();
```

### Example Agent Policies

Agents remain fully sovereign and define their own thresholds:

- Execute only if:
  - `mode === ACT`
  - `risk === RISK_ON`
  - `confidence > 0.6`

- Switch to monitoring mode if:
  - `mode === READ_ONLY`
  - `risk === RISK_OFF`

### Why This Design Is Intentional

SolSentinel:

- has **no side effects**
- produces **explainable output**
- avoids feedback loops and cascading failures
- can be safely shared across many agents

This makes it suitable as **infrastructure**, not just a single application.

---

## Design Philosophy

SolSentinel is an experiment in **meta-safety for autonomous systems**.

As agents become faster and more capable, the question is no longer:

> _“Can an agent execute?”_

But:

> _“Should any agent execute right now?”_

SolSentinel exists to answer that question.

---

## Status

- Fully autonomous
- Running live during the Colosseum Agent Hackathon
- Read-only by design
- Built for composability

---

## License

MIT
