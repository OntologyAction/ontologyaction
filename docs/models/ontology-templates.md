---
description: Ontology Templates（本体模板库）——制造业、供应链、企业通用管理等领域的可复用语义与动作模型，降低本体优先架构的落地冷启动成本。
---

# Ontology Templates · 本体模板库

> **将架构原则转化为可复用的工业级语义资产。**

通过一系列标准化的本体模型（Ontology Models），降低企业在不同行业、不同场景下落地「本体优先架构」的冷启动成本。模板文件在 [GitHub `/ontology-templates` 目录](https://github.com/OntologyAction/ontologyaction/tree/main/ontology-templates) 维护。

## 正在收录与规划中的模块

- **[Manufacturing] 离散制造执行本体**（Coming Soon）
  - 核心对象：设备、工单、工艺路线、物料、人员
  - 核心动作：工单下发、设备报修、质检触发、物料追溯

- **[Supply Chain] 供应协同与库存本体**（Planning）
  - 核心对象：供应商、采购单、在途库存、仓储库位
  - 核心动作：需求预测对齐、入库确认、风险预警回写

- **[Enterprise Knowledge] 企业通用管理本体**（In-progress）
  - 核心对象：组织机构、岗位、审批流、权限集
  - 核心动作：组织变更、权限分发、多级流转定义

## 模板设计原则

所有模板遵循 **OntologyAction** 的三层设计哲学：

1. **语义层（Semantic Layer）**：基于行业标准协议（如 ISA-95）的对象定义。
2. **动作层（Action Layer）**：显式定义逻辑边界，确保行为可审计、可回写。
3. **执行层（Execution Layer）**：预留 AI Agent 接入接口，实现逻辑闭环。

## 参与贡献

如果您在特定行业有深厚的业务建模经验，欢迎参与：

1. **提交 PR**：贡献您的 `.owl`、`.json-ld` 或 YAML 格式的本体定义。
2. **提交建议**：在 [Issues](https://github.com/OntologyAction/ontologyaction/issues) 中描述您所在行业的典型语义冲突场景。

---

相关：[Framework · 本体优先架构](/architecture/ontology-first)（三层模型的完整阐述）
