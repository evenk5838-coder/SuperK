export const stages = [
  { id: "idea", title: "想法", doc: "想法.md" },
  { id: "evidence", title: "证据", doc: "证据.md" },
  { id: "prd", title: "PRD", doc: "PRD.md" },
]

export const modes = [
  {
    id: "auto",
    title: "自动推进",
    detail: "顺着阶段往下走，只在缺信息时问你。Skill 接入后才会真正自动跑。",
  },
  {
    id: "confirm",
    title: "每阶段确认",
    detail: "这一阶段做完就停住。你在对话里回复「继续」，才进入下一阶段。",
  },
  {
    id: "single",
    title: "只做当前阶段",
    detail: "停在你点名的这一阶段。回复「继续」不会往后走。",
  },
]

export const defaultMode = "confirm"
