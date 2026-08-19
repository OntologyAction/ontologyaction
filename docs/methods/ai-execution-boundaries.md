---
description: AI Execution Boundary（AI 执行边界）——当 AI 从生成回答走向执行动作，企业需要显式定义、运行时强制、且可度量的新治理边界。OntologyAction 方法体系的核心方法之一。
head:
  - - link
    - rel: canonical
      href: https://ontologyaction.com/methods/ai-execution-boundaries
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://ontologyaction.com/methods/ai-execution-boundaries
  - - link
    - rel: alternate
      hreflang: en
      href: https://ontologyaction.com/en/methods/ai-execution-boundaries
---

# AI Execution Boundaries

*方法 · OntologyAction 方法体系* — 中文 · [English](/en/methods/ai-execution-boundaries)

> **As AI systems become capable of taking actions, a governance boundary that was previously implicit is becoming explicit. We call this boundary the AI Execution Boundary.**

AI 系统正在从「生成回答」走向「执行动作」——发起退款、审批交易、修改客户记录、变更配置、触发业务流程。回答错了可以重新生成；动作做错了，会改变业务系统的真实状态。

当执行主体从人变成 AI，一条过去由流程和权限体系隐含兜住的边界，必须被显式定义。我们把它称为 **AI Execution Boundary（AI 执行边界）**。

## 五个必须能回答的问题

治理 AI 执行边界，意味着企业能明确回答：

1. AI 可以执行哪些动作？
2. 在什么条件下可以执行？
3. 哪些必须经过人工审核？
4. 哪些必须被阻止？
5. **当规则无法裁定时，会发生什么？**

第五个问题最常被忽略，也最危险。

## 设计时：三个维度

要显式定义执行边界，设计时需要三个维度——这与[本体优先架构](/architecture/ontology-first)的三层模型一脉相承：

- **Ontology（是什么）**：AI 所处的业务世界——对象、关系、业务概念。没有它，「订单」「已完成」「退款」对系统只是字符串。
- **Policy（允许什么）**：什么条件下允许、什么必须人工、什么禁止——金额阈值、状态约束、风险条件。
- **Action（做什么）**：AI 能执行的业务操作，以及它会造成什么状态变更。

三者合起来回答：**在什么业务语义和规则下，AI 可以做什么。**

## 运行时：三种规范裁定状态

每次 AI 发起动作时，**Policy Evaluation** 对照当前业务事实求值，产出三种规范裁定状态（Canonical Evaluation States）之一：

- **PROOF**：可证明该动作被现行 Policy 明确允许；
- **VIOLATION**：可证明该动作违反现行 Policy；
- **UNDEFINED**：无法证明允许或违规——Policy 裁定不了。

裁定由 **PDP（Policy Decision Point）** 做出，由 **PEP（Policy Enforcement Point）** 强制落实——放行、阻断，或落实附带义务（如「大额退款须人工审批」：明确允许 + 一条义务，而不是第四种裁定状态）。

**UNDEFINED 不是一种决策，而是裁定能力的缺失。** 把它显式化，才能看见原本不可见的事实：

> **Policy coverage gaps are governance gaps.（策略覆盖的缺口，就是治理的缺口。）**

边界显式化之后，治理成熟度可以度量：**Policy Decidability Rate（策略可裁定率）** = (PROOF + VIOLATION) ÷ 到达 Policy Evaluation 的动作请求数。

## 方法闭环

```text
Design-Time：Ontology + Policy + Action
        ↓
Execution Boundary Assessment（设计时边界评估）
        ↓
Runtime：Policy Evaluation → PROOF / VIOLATION / UNDEFINED
        ↓
PDP → Decision → PEP
        ↓
Action（+ Evidence / 可裁定率度量）
```

它不重新发明权限系统或策略引擎，解决的是更上游的问题：**在 AI 真正获得执行能力之前，企业是否已经清楚地定义了 AI 可以做什么、什么条件下可以做、什么必须被阻止——以及规则裁定不了时怎么办。**

---

## 延伸阅读

- **[When AI Can Act](/insights/when-ai-can-act)** *Why Actions Must Become First-Class Governance Objects*（English · 本站）
- 上一篇索引：[Insights](/insights/)
- Framework：[本体优先架构](/architecture/ontology-first)

*This methodology is being developed as part of an ongoing effort to define practical governance patterns for agentic AI systems.*
