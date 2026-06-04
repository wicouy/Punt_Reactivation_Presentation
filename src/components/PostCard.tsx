import { useEffect, useRef, useState } from 'react'
import type { Post, PostContent, SegmentItem, TimelineItem } from '../data/posts'

interface Props {
  post: Post
  index: number
}

const TAG_COLORS: Record<string, string> = {
  'Overview': 'text-pink-vivid border-pink-vivid/40 bg-pink-vivid/10',
  'Entry Logic': 'text-accent border-accent/40 bg-accent/10',
  'Segmentation': 'text-purple-300 border-purple-400/40 bg-purple-400/10',
  'Journey Architecture': 'text-pink-light border-pink-light/40 bg-pink-light/10',
  'Cool-Off Logic': 'text-blue-300 border-blue-400/40 bg-blue-400/10',
  'Offer Framework': 'text-yellow-300 border-yellow-400/40 bg-yellow-400/10',
  'Communication': 'text-green-300 border-green-400/40 bg-green-400/10',
  'Channel Pressure': 'text-orange-300 border-orange-400/40 bg-orange-400/10',
  'Measurement': 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
  'Success Definition': 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
  'Data Architecture': 'text-violet-300 border-violet-400/40 bg-violet-400/10',
  'Platform': 'text-pink-vivid border-pink-vivid/40 bg-pink-vivid/10',
  'Go-Live Requirements': 'text-red-300 border-red-400/40 bg-red-400/10',
  'Optimisation': 'text-amber-300 border-amber-400/40 bg-amber-400/10',
  'Final Recommendation': 'text-pink-light border-pink-light/40 bg-pink-light/10',
}

function Pill({ label, variant }: { label: string; variant: 'magenta' | 'purple' }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border ${
        variant === 'magenta'
          ? 'bg-magenta/20 border-magenta/60 text-pink-vivid'
          : 'bg-purple-bright/20 border-purple-bright/40 text-pink-light'
      }`}
    >
      {label}
    </span>
  )
}

function CardBlock({ items }: { items: { title: string; body: string; mono?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white/[0.04] border border-magenta/25 rounded-xl p-4"
        >
          <div className="font-dm-mono text-[10px] uppercase tracking-[0.15em] text-pink-vivid mb-2">
            {item.title}
          </div>
          <div className={`text-sm leading-relaxed text-off-white ${item.mono ? 'font-dm-mono' : ''}`}>
            {item.body}
          </div>
        </div>
      ))}
    </div>
  )
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-magenta/20">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-dm-mono text-[10px] uppercase tracking-[0.14em] text-pink-vivid bg-magenta/10 border-b border-magenta/20 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-magenta/5 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 border-b border-magenta/10 last:border-b-0 align-top leading-relaxed ${
                    ci === 0 ? 'font-semibold text-pink-light' : 'text-grey-light'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SegmentGrid({ items }: { items: SegmentItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((seg, i) => (
        <div
          key={i}
          className="relative bg-white/[0.04] border border-magenta/25 rounded-xl p-4 overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${seg.gradFrom}, ${seg.gradTo})` }}
          />
          <div
            className="font-bebas text-xl tracking-wide mb-1"
            style={{ color: seg.color }}
          >
            {seg.name}
          </div>
          <div className="text-xs text-grey-light leading-relaxed mb-2">{seg.desc}</div>
          <div className="font-dm-mono text-[9px] text-pink-vivid tracking-wide">{seg.tag}</div>
        </div>
      ))}
    </div>
  )
}

function TimelineBlock({ items }: { items: TimelineItem[] }) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-0 min-w-max">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center relative flex-1 min-w-[52px]">
            {i < items.length - 1 && (
              <div className="absolute top-4 left-1/2 right-[-50%] h-[2px] bg-magenta/20 z-0" />
            )}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-dm-mono text-[11px] mb-2 ${
                item.type === 'touch'
                  ? 'bg-gradient-to-br from-purple-bright to-magenta text-white shadow-[0_0_12px_rgba(192,38,211,0.5)]'
                  : item.type === 'exit'
                  ? 'bg-magenta/10 border border-dashed border-magenta text-pink-vivid'
                  : 'bg-indigo-500/20 border border-dashed border-indigo-400/50 text-indigo-300'
              }`}
            >
              {item.day}
            </div>
            <div className="text-center">
              <div
                className={`font-dm-mono text-[9px] tracking-wide mb-0.5 ${
                  item.type === 'touch' ? 'text-pink-vivid' : item.type === 'exit' ? 'text-pink-vivid' : 'text-indigo-400'
                }`}
              >
                {item.type === 'touch' ? 'TOUCH' : item.type === 'exit' ? 'EXIT' : 'COOL-OFF'}
              </div>
              <div className="text-[10px] text-grey-light leading-tight">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 mt-4 text-xs text-grey-light">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-bright to-magenta inline-block" />
          Active Touch
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/30 border border-dashed border-indigo-400/50 inline-block" />
          Cool-Off
        </span>
      </div>
    </div>
  )
}

function KpiGrid({ items }: { items: { num: string; label: string; sub: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((kpi, i) => (
        <div key={i} className="bg-white/[0.04] border border-magenta/25 rounded-xl p-4">
          <div className="font-bebas text-4xl text-pink-vivid leading-none mb-1">{kpi.num}</div>
          <div className="text-sm text-off-white font-medium mb-0.5">{kpi.label}</div>
          <div className="text-xs text-grey">{kpi.sub}</div>
        </div>
      ))}
    </div>
  )
}

function BulletsBlock({ items }: { items: { label: string; desc: string; muted?: boolean }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex gap-3 items-start py-3 border-b border-magenta/10 last:border-b-0"
        >
          <div
            className={`w-2 h-2 rounded-full mt-[7px] flex-shrink-0 ${
              item.muted ? 'bg-grey' : 'bg-pink-vivid shadow-[0_0_6px_rgba(224,64,251,0.5)]'
            }`}
          />
          <div>
            <span
              className={`text-sm font-semibold mr-2 ${item.muted ? 'text-grey-light' : 'text-pink-light'}`}
            >
              {item.label}
            </span>
            <span className="text-sm text-grey-light">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DepsBlock({ items }: { items: { icon: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-magenta/15 text-sm text-off-white"
        >
          <div className="w-7 h-7 rounded-md bg-magenta/20 flex items-center justify-center text-sm flex-shrink-0">
            {item.icon}
          </div>
          {item.text}
        </div>
      ))}
    </div>
  )
}

function ExperimentsBlock({ items }: { items: { title: string; desc: string; purpose: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((exp, i) => (
        <div key={i} className="bg-white/[0.04] border border-magenta/25 rounded-xl p-4">
          <div className="font-bebas text-lg tracking-wide mb-2">{exp.title}</div>
          <div className="text-xs text-grey-light leading-relaxed mb-2">{exp.desc}</div>
          <div className="font-dm-mono text-[9px] uppercase tracking-wide text-pink-vivid">
            PURPOSE — {exp.purpose}
          </div>
        </div>
      ))}
    </div>
  )
}

function ChecklistBlock({ items }: { items: { icon: string; title: string; body: string; variant?: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 items-start py-4 border-b border-magenta/10 last:border-b-0">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
              item.variant === 'primary'
                ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300'
                : item.variant === 'secondary'
                ? 'bg-magenta/15 border border-magenta text-pink-light'
                : 'bg-indigo-500/15 border border-indigo-400/50 text-indigo-300'
            }`}
          >
            {item.icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-off-white mb-1">{item.title}</div>
            <div className="text-sm text-grey-light leading-relaxed">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BigRecBlock({ lines, accentLines }: { lines: string[]; accentLines: number[] }) {
  return (
    <div className="py-4">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`font-bebas text-3xl md:text-5xl tracking-wide leading-tight ${
            accentLines.includes(i) ? 'text-pink-vivid' : 'text-off-white'
          }`}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

function renderContent(block: PostContent, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-grey-light leading-relaxed text-sm">
          {block.text}
        </p>
      )
    case 'pills':
      return (
        <div key={idx} className="flex flex-wrap gap-2">
          {block.items.map((p, i) => (
            <Pill key={i} label={p.label} variant={p.variant} />
          ))}
        </div>
      )
    case 'cards':
      return <CardBlock key={idx} items={block.items} />
    case 'table':
      return <TableBlock key={idx} headers={block.headers} rows={block.rows} />
    case 'grid':
      return <SegmentGrid key={idx} items={block.items as SegmentItem[]} />
    case 'timeline':
      return <TimelineBlock key={idx} items={block.items as TimelineItem[]} />
    case 'kpis':
      return <KpiGrid key={idx} items={block.items} />
    case 'bullets':
      return <BulletsBlock key={idx} items={block.items} />
    case 'deps':
      return <DepsBlock key={idx} items={block.items} />
    case 'experiments':
      return <ExperimentsBlock key={idx} items={block.items} />
    case 'checklist':
      return <ChecklistBlock key={idx} items={block.items} />
    case 'bigRec':
      return <BigRecBlock key={idx} lines={block.lines} accentLines={block.accentLines} />
    default:
      return null
  }
}

export default function PostCard({ post, index }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const tagClass = TAG_COLORS[post.tag] ?? 'text-pink-vivid border-pink-vivid/40 bg-pink-vivid/10'

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 3) * 60}ms` }}
    >
      <div className="bg-white/[0.03] border border-magenta/20 rounded-2xl p-6 md:p-8 card-hover glow-border">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-dm-mono uppercase tracking-[0.15em] border mb-3 ${tagClass}`}
            >
              {post.tag}
            </span>
            <h2 className="font-bebas text-2xl md:text-3xl tracking-wide leading-tight">
              {post.title}{' '}
              {post.titleAccent && <span className="text-pink-vivid">{post.titleAccent}</span>}
            </h2>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-magenta/10 border border-magenta/30 flex items-center justify-center font-dm-mono text-xs text-pink-vivid">
            {String(post.id).padStart(2, '0')}
          </div>
        </div>

        {/* Summary */}
        <p className="text-grey text-sm leading-relaxed mb-6 pb-5 border-b border-magenta/15">
          {post.summary}
        </p>

        {/* Content blocks */}
        <div className="flex flex-col gap-5">
          {post.content.map((block, i) => renderContent(block, i))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-magenta/10 flex items-center justify-between">
          <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            {post.readTime} min read
          </span>
          <div className="flex gap-1">
            {[...Array(post.readTime)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-magenta/50" />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
