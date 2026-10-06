# gB shard 复查摘要（2026-09-27）

owner: gB 会话 · 契约: `docs/superpowers/specs/2026-09-27-adjudication-contract.md`
域: algorithms_cs, computing_systems, info_media, physics, materials（实测 1051 条，非契约写的 747）

## 产出文件（均为 gB 独占路径）

| 文件 | 内容 |
|---|---|
| `scripts/adjud_gB_metrics.mjs` | 指标快照 + 通道命中生成器（含契约 §6 断言对账） |
| `data/adjud-metrics.gB.json` | 1051 条全字段快照（含未提名条目） |
| `data/adjud-worklist.gB.<domain>.json` × 5 | 各域提名工作单（205 条） |
| `data/adjud-frag.gB.<domain>.json` × 5 | 各域疑点标注片段（代理产物） |
| `data/adjud-miss.gB.json` / `adjud-miss-cards.gB.json` | 规则漏检扫描结果 34 条 |
| `data/adjud-cards.gB.json` | **最终提名卡 205 张**（契约 §3 字段 + doubt/boundary） |
| `scripts/adjud_gB_merge.mjs` | 装配器，带 3 道不变量自检（id 不跨片重复、提名必已标注、漏检不得与规则命中重叠） |

## 数字

- 规则提名 205：支柱存疑 170 / 原理零引用 28 / 疑被低估 16 / 基石存疑 15 / 孤岛媒介制度 1
- 边界存疑（代理判"最可能不算科技"）**74 条 = 本 shard 的 7.0%**：physics 24、info_media 19、materials 13、computing_systems 12、algorithms_cs 6
- 漏检补提名 34：boundary 16 / domain 错挂 8 / dup 7 / tier 3
- 提名卡档位构成：P2 占绝大多数（P3 仅 15、P4 仅 5）

## 契约与规则的三处问题（需主控定夺）

1. **§2 条数错误**：实测 gA 881 / gB 1051 / gC 690 / gD 582 / gE 672（合计 3876 正确）。若各 shard 按"722–775"排批次数会算错。
2. **`支柱存疑` 判据在多数域退化**：`d < 域内中位数` 在 15/22 个域（中位数 = 0）恒假，原判据要么命中 0、要么因并列恒真。gB 实现的兜底是"中位数 > 0 用相对分位；中位数 = 0 退回 `pf=0 且 domainDownstreams=0`"。需主控认可后其他 shard 统一，否则各 shard 通道不可比。
3. **`支柱存疑` 与接线欠账无法区分**：gB 170 条中 pf=0 占 166、rf≤1 占 168，而本 shard 各域零下游占比 43–61%。该通道现在标的是"没有位置证据"，不等于"该降档"——卡片已并列显示 `zeroDownstreamShare` 供裁决时分辨。

## 给判据 v1 的素材（代理发现里最可一般化的几条）

- 互联网公司产品/机构成批（facebook、amazon、icann、sora、uber、chatgpt、android…）——"机构与产品实例"是否一律不收录
- 单一印本/单一机型/单一牌号当独立条目（jikji 与 `movable_type_printing` 并存；SU-8、NMC 与材料大类并存）
- 同发明跨域重复建条（`transistor` 挂在 info_media、`silicon_transistor` 另立 P1）
- 发现/著作/研究事件混入技术条目（physics 的引力波预言、霍金辐射、伯努利 1738）
- 同级材料档位不一致（PVC 标 P4、聚乙烯标 P2）—— 域内一致性缺口，不是单条问题

gB 已就绪，等 `scripts/adjudicate_review.html` 与判据 v1 即可开裁。本 shard 未改 `data/techs.json` 任何字段。
