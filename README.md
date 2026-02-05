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

### Hackathon / Ecosystem State

- Current hackathon phase
- Time pressure
- Announcements
- Active polls (coordination moments)

### Forum Dynamics

- Engagement spikes
- Security-related discussion density
- Cross-agent activity patterns

### Temporal Context

- Remaining execution windows
- Urgency vs caution tradeoffs

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
