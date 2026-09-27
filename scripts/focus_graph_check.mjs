// 点击聚焦的口径校验：改图数据或改 kHopDepth 后重跑
//   node scripts/focus_graph_check.mjs
// 数字来自设计阶段的实测：2 跳集 p50 10 / p90 39 / p99 76 / max 184，
// 因为规模合适才决定"聚焦不限流、名称钉住上限 40"。
import { readFileSync } from 'node:fs'
import { buildGraph, kHopDepth, NOT_RELATED } from '../src/graph.ts'

const techs = JSON.parse(readFileSync('data/techs.json', 'utf8'))
const ids = techs.map(t => t.id)
const g = buildGraph(ids, techs.map(t => t.prereqs ?? []))

const q = v => {
  const s = [...v].sort((a, b) => a - b)
  const at = p => s[Math.floor(s.length * p)]
  return { p50: at(0.5), p90: at(0.9), p99: at(0.99), max: s[s.length - 1] }
}
const size = (i, hops) => {
  const d = kHopDepth(g, i, hops, new Int8Array(g.count))
  let n = 0
  for (let k = 0; k < d.length; k++) if (d[k] !== NOT_RELATED) n++
  return n - 1 // 不含自身
}
const one = ids.map((_, i) => size(i, 1))
const two = ids.map((_, i) => size(i, 2))

const fail = []
const expect = (name, got, want) => {
  if (got !== want) fail.push(`${name}: 实测 ${got}，期望 ${want}`)
}
// 边数 = 数据里能解析出端点的 prereq 条目数（无向邻接是它的双向展开）
expect('弧线总数', g.edges.length, techs.reduce((n, t) => n + (t.prereqs ?? []).length, 0))
expect('1 跳 p50', q(one).p50, 2)
expect('2 跳 p50', q(two).p50, 10)
expect('2 跳 p90', q(two).p90, 39)
expect('2 跳 max', q(two).max, 184)
// 2 跳集必然包含 1 跳集
for (let i = 0; i < g.count; i++) if (two[i] < one[i]) { fail.push(`节点 ${ids[i]} 的 2 跳集小于 1 跳集`); break }
// 孤立节点（1 跳为 0）聚焦后只剩自己，界面不能因此报错
const isolated = one.filter(n => n === 0).length
console.log(`节点 ${g.count} · 弧线 ${g.edges.length} · 零邻居 ${isolated}`)
console.log(`1 跳集 ${JSON.stringify(q(one))}`)
console.log(`2 跳集 ${JSON.stringify(q(two))}`)
if (fail.length) {
  console.error('FAIL\n' + fail.join('\n'))
  process.exit(1)
}
console.log('OK：跳数表与设计口径一致')
