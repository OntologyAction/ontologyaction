---
description: "The AI Execution Boundary: as AI systems become capable of taking actions, a governance boundary that was previously implicit is becoming explicit. A method within the OntologyAction methodology — design-time definition, runtime enforcement, and measurable decidability."
head:
  - - link
    - rel: canonical
      href: https://ontologyaction.com/en/methods/ai-execution-boundaries
---

# AI Execution Boundaries

*Method · Part of the OntologyAction methodology* — English · 中文版即将上线 (Chinese version coming soon)

> **As AI systems become capable of taking actions, a governance boundary that was previously implicit is becoming explicit. We call this boundary the AI Execution Boundary.**

AI systems are moving from generating answers to taking actions: issue a refund, approve a transaction, update a customer record, change a configuration, trigger a business workflow.

A wrong answer can be regenerated. A wrong action changes the real state of a business system — a refund sent in error, a customer record overwritten, a configuration changed incorrectly. A better answer next time will not undo any of them.

Every enterprise already has rules about who may change business state, and under what conditions. Those rules used to be carried by people — held in place by process, approvals, and permission systems. When the actor becomes an AI, the boundary can no longer stay implicit.

## Five Questions

Governing the AI Execution Boundary means being able to answer five questions clearly:

1. What actions can the AI execute?
2. Under what conditions?
3. What must be reviewed by a human?
4. What must be blocked?
5. What happens when the rules cannot decide?

The fifth question is the most often overlooked — and the most dangerous.

## Design Time: Three Things Every Executable Action Needs

Making the execution boundary explicit takes three things at design time:

- **Ontology — what exists.** The business world the AI operates in: the objects, the relationships, the business concepts. Without it, "order," "completed," and "refund" are just strings to the system.
- **Policy — what is allowed.** The conditions under which an action may proceed, must go to a human, or is forbidden: amount thresholds, state constraints, risk conditions.
- **Action — what can be done.** The business operations the AI can execute, and the state changes they cause.

Together, these answer one question: **under what business semantics and rules can the AI do what?** Before an action goes live, this makes it possible to assess — at design time — whether each critical action has an explicitly defined boundary, and whether that boundary can actually be evaluated and enforced at runtime.

## Runtime: Three Canonical Evaluation States

Each time the AI initiates an action, **Policy Evaluation** evaluates it against the current business facts and produces one of three canonical evaluation states:

- **PROOF** — the action is provably allowed by the policies in force;
- **VIOLATION** — the action provably violates a policy in force;
- **UNDEFINED** — the system can prove neither. The policy cannot decide.

Turning that evaluation into reality takes two architectural roles: a **Policy Decision Point (PDP)** makes the decision, and a **Policy Enforcement Point (PEP)** makes sure the decision actually happens — allowing the action, blocking it, or carrying out whatever the decision requires. Suppose policy says refunds above $5,000 require human approval. That is an explicit allow carrying an obligation: the PEP pauses the action, waits for a human to approve, and then releases it. Human review is not a fourth evaluation state. It is an execution requirement attached to the decision.

Two caveats are worth stating plainly. A decision is not an execution result: an allowed action can still fail to write. And every decision should leave reviewable evidence — which policy version applied, based on what facts, and why it was decided that way.

## Why UNDEFINED Matters

**UNDEFINED is not a decision. It is a lack of decidability.** Making it explicit is the single most important move in this methodology, because it reveals something that used to be invisible:

> **Policy coverage gaps are governance gaps.**

What to do with an UNDEFINED cannot be decided by the very policy being evaluated — if that policy does not cover the case, it has nothing to say about handling it. Handling belongs to a separate default, or fallback, policy: route to a human, deny, or allow under conditions, configured to the risk level of the action.

The danger is not that UNDEFINED exists. The danger is a system that silently allows — or silently denies — whenever it hits UNDEFINED, and no one ever knows.

## Measuring Policy Decidability

Once the boundary is explicit, governance maturity becomes measurable:

> **Policy Decidability Rate = (PROOF + VIOLATION) ÷ action requests that reach Policy Evaluation**

The remainder is the undecidable rate. The two always add up to 100%. One detail in the denominator is non-negotiable: it counts only requests that actually reach Policy Evaluation. Requests stopped at the door — by permissions or by parameter checks — never reached a business decision.

## The Methodology Loop

Put together, these elements form a closed loop:

```text
Design time:  Ontology + Policy + Action
                      ↓
        Execution Boundary Assessment
                      ↓
Runtime:      Policy Evaluation
                      ↓
      PROOF / VIOLATION / UNDEFINED
                      ↓
           PDP → Decision → PEP
                      ↓
                   Action
        (+ Evidence and decidability measurement)
```

This does not reinvent permission systems or policy engines. It addresses the question that sits upstream of both: **before an AI gains the power to execute, has the organization clearly defined what the AI can do, under what conditions it can do it, what must be blocked — and what happens when the rules cannot decide?**

---

## Further Reading

- **[Read the full article on Medium →](https://medium.com/@zhengys/ai-execution-boundaries-a-governance-methodology-for-the-age-of-agentic-ai-4150e2188ecb)** *AI Execution Boundaries: A Governance Methodology for the Age of Agentic AI* (*From AI Responses to Governed Actions*)
- Framework: [Ontology-First Architecture](/architecture/ontology-first) (currently in Chinese)

*This methodology is being developed as part of an ongoing effort to define practical governance patterns for agentic AI systems.*
