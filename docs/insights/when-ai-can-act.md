---
description: "When AI Can Act: Why Actions Must Become First-Class Governance Objects — From Asking Data to Changing State. An Action that changes production state must be decidable, enforceable, and leave evidence."
head:
  - - link
    - rel: canonical
      href: https://ontologyaction.com/insights/when-ai-can-act
---

# When AI Can Act: Why Actions Must Become First-Class Governance Objects

*From Asking Data to Changing State*

*English · 本站阅读。方法定义见 [AI Execution Boundaries](/en/methods/ai-execution-boundaries)。*

## 1. Calling a Tool Is Not Changing State

Once an agent is wired into enterprise systems, the sentence you hear on site is often this: "The tools already work." It sounds as if production is connected. Usually it is not.

Being able to call a tool only means the model can issue a structured invocation. Production is truly connected when that call can change real state in a business system — and when someone can answer whether the change should happen, and on what grounds.

Those are not the same thing.

Asking a question, writing a summary, drafting an email, generating a ticket draft: if these go wrong, they can usually be done again, and the business world has not been changed by them. Issuing a refund, changing a customer status, posting a ledger entry, freezing an account: if these go wrong, the result is money, liability, and a state that will not undo itself because the next answer is better. The difference is not how strong the model is. It is the nature of the consequences.

So governance has to change the question. It is not "how smart is this agent," and it is not "how well is the prompt written." Once AI starts executing actions, the questions that matter are: **what does this action change, and should this change be allowed?**

The previous article named the boundary that is becoming visible the **AI Execution Boundary**. This article takes one step further: the object that must be governed at that boundary is the **Action**.

## 2. Why Actions Must Become First-Class Governance Objects

On the surface, both look like tool calls: "What is the status of this order?" and "Cancel this order." Their governance nature is completely different.

The first stops at Asking Data: it reads facts; the business world is not changed by it. The second enters Changing State: the order is cancelled, and inventory, receivables, and fulfillment obligations move with it. Creating an order, updating a payment status, adjusting inventory, publishing a contract — these belong to the second class.

AI can now do both. It can understand data, and it can initiate actions. Once an action changes state, the consequences are money, liability, and business facts that will not restore themselves because the next answer is better. The question that matters is not whether AI can reason. It is whether **this action is allowed to change the world**.

That cannot be governed as an ordinary tool call. A tool call is only an envelope: a function name, parameters, one structured invocation. If the envelope goes through, it only means the model sent it. It does not answer what the current business facts mean, whether the rules in force allow the change, whether the decision was actually enforced, or whether the write landed afterwards. Authorization governs who may call. Payload validation governs fields. Business rules govern conditions. Each covers a slice. Business rules can of course apply to an action. What is missing is not one more rule. What is missing is treating **this Action** as an object with explicit business meaning and context, and placing it inside the enterprise governance model.

That is why an Action must become a **first-class governance object**: it must be decidable, enforceable, and leave evidence. Adding another layer of permission, approval, and audit on the agent is not enough. The point is to let "cancel this order" itself be defined, evaluated, enforced, and proven.

One distinction has to be stated separately. Enterprises already have more and more semantic capability for understanding data, aligning metric definitions, and making retrieval deterministic. When an agent moves from asking about data to changing state and executing business Actions, what is still needed is an execution-decision layer that connects the semantic model to policy decision.

That is not a claim that the enterprise lacks semantics. The execution-decision layer is not a new governance dimension, and it is not a product to buy. It is a placement: take the business facts already understood, and attach them to a decision about whether this Action may proceed. In implementation, that is still a **Policy Decision Point (PDP)** acting on the current facts. The next section splits this object into three questions that can actually be asked.

## 3. Three Things an Action Must Answer

Do not start from an entire agent platform. Start from **one** Action that will change production state.

That Action has to be able to answer at least three things.

**First: what are the current business facts.** Is the order paid? What is the amount? Has it already been processed? These are inputs to the decision, not impressions from the model. If the facts are insufficient, the system should not guess. Context is a snapshot at evaluation time. It does not guarantee that the world is still the same at execution time. This article will not develop that engineering problem.

**Second: do the policies in force allow it.** Policy Evaluation has only three Canonical Evaluation States: **PROOF**, the action is provably allowed by the policies in force; **VIOLATION**, the action provably violates a policy in force; **UNDEFINED**, the system can prove neither that the action is allowed nor that it violates a policy in force. This is not a two-way split between allow and deny. In real enterprises, a large share of cases is simply not covered by the rules, or cannot be computed right now.

UNDEFINED is not a denial. It is the inability to prove that the action is allowed. What to do with it is not decided by the same business policy that already failed to cover the case. It is decided by a separate Default / Fallback Handling Policy — and for high-risk actions the default is Human-in-the-Loop (HITL). The previous article explained why this has to be explicit. This article only holds that line, so HITL is not treated as a fourth evaluation state.

**Third: was the decision enforced, and did the write land afterwards.** The PDP makes the decision. The **Policy Enforcement Point (PEP)** makes sure the decision is carried out: allow, block, or fulfill an obligation and then release. The component that actually writes to the system is the Executor. **PROOF does not mean the change has already been posted.** If an allowed action later fails to write, that is an execution result. It does not rewrite the decision. Every decision should leave Evidence: which request, which policy version, the context snapshot at the time, the Decision, the enforcement result, and the execution result. Evidence is not an ordinary log.

Together, these three make an Action a governable object. Missing any one of them, all you have is an agent that looks as if it can call tools.

## 4. You Do Not Replace the Agent

Enterprises already have agents built on frameworks such as OpenAI Agents SDK, LangGraph, Microsoft Agent Framework, Spring AI, or MCP-based tool interfaces. Replacing the orchestration layer is a different business, and it is not what an execution boundary is meant to solve.

The integration surface is narrow. The customer does not need to replace the agent. The write tool is gated before it is invoked — an HTTP callback, or an MCP wrap. The agent proposes an action, for example `request_refund(order_id, amount)`. The gate loads the current facts, runs Policy Evaluation, lets the PEP allow or block, and leaves Evidence. **The model may propose; it may not determine the policy outcome.**

The evaluation implementation can change — an existing rules engine, existing code, or another implementation. The gate binds to the three evaluation states and to enforcement, not to a particular library.

This is not a platform announcement. This is a working pattern that can be run.

## 5. Five Cases: Existence Proof, Not a Customer Story

A single illustrative refund Action runs the three questions above as five cases. This is not a real customer case. It only shows that the chain can close.

| Case | Action proposed | Result | What it shows |
|------|-----------------|--------|----------------|
| A | An authorized role refunds a paid order for a valid amount | **PROOF** → PEP allows → execute | The action is provably allowed |
| B | The same role refunds an order that is already completed | **VIOLATION** → do not execute | Being able to call the tool ≠ being allowed to write business state |
| C | An unauthorized role issues the same refund | Stopped at authorization | The request never reaches Policy Evaluation; this is not a fourth evaluation state |
| D | Refund amount is negative | Validation fails | This constraint does not require Ontology; Validation ≠ Policy |
| E | The order is missing a status field | **UNDEFINED** → fallback HITL → do not execute | Do not guess a write when information is insufficient |

A and B are a pair: authorization can pass, and the business may still forbid the action. E is the case that is easiest to skip: **the system would rather not write than pretend a decision was made when none could be proven.** C and D are reminders: authorization and payload validation at the door matter, but they are not business evaluation, and they do not belong in the three cells PROOF / VIOLATION / UNDEFINED.

A minimal implementation can be run locally: one command for the five cases, or an existing agent sending one HTTP request to the gate. Implementation detail lives in the accompanying demo, not in this article.

## 6. What Comes Next

The previous article named the AI Execution Boundary. This one places the governance object on the Action, and gives a minimal runnable shape: you do not replace the agent; you gate the write tool.

The next step is not a longer methodology. The next step is to take one real production Action — already planned, or already built but held back by the risks of automated writing — and run the same chain against the customer's existing agent and business systems.

*This is a working pattern, not a platform announcement.*

The formal definition of the methodology is on the [AI Execution Boundaries method page](/en/methods/ai-execution-boundaries). The previous article is indexed on [Insights](/insights/).
