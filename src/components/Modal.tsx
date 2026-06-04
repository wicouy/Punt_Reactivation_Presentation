import { useEffect, useRef, useState } from 'react'
import type { Post, PostContent, SegmentItem, TimelineItem } from '../data/posts'

interface Props {
  post: Post
  onClose: () => void
}

// ─── re-use same render helpers from PostCard but full-size ───────────────────

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white/[0.05] border border-magenta/25 rounded-xl p-5">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((seg, i) => (
        <div
          key={i}
          className="relative bg-white/[0.05] border border-magenta/25 rounded-xl p-5 overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${seg.gradFrom}, ${seg.gradTo})` }}
          />
          <div className="font-bebas text-2xl tracking-wide mb-1" style={{ color: seg.color }}>
            {seg.name}
          </div>
          <div className="text-sm text-grey-light leading-relaxed mb-2">{seg.desc}</div>
          <div className="font-dm-mono text-[10px] text-pink-vivid tracking-wide">{seg.tag}</div>
        </div>
      ))}
    </div>
  )
}

function TimelineBlock({ items }: { items: TimelineItem[] }) {
  return (
    <div className="w-full overflow-x-auto pb-3">
      <div className="flex gap-0 min-w-max">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center relative flex-1 min-w-[64px]">
            {i < items.length - 1 && (
              <div className="absolute top-5 left-1/2 right-[-50%] h-[2px] bg-magenta/20 z-0" />
            )}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-dm-mono text-[12px] mb-2 ${
                item.type === 'touch'
                  ? 'bg-gradient-to-br from-purple-bright to-magenta text-white shadow-[0_0_16px_rgba(192,38,211,0.6)]'
                  : item.type === 'exit'
                  ? 'bg-magenta/10 border border-dashed border-magenta text-pink-vivid'
                  : 'bg-indigo-500/20 border border-dashed border-indigo-400/50 text-indigo-300'
              }`}
            >
              {item.day}
            </div>
            <div className="text-center px-1">
              <div
                className={`font-dm-mono text-[9px] tracking-wide mb-0.5 ${
                  item.type === 'touch'
                    ? 'text-pink-vivid'
                    : item.type === 'exit'
                    ? 'text-pink-vivid'
                    : 'text-indigo-400'
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((kpi, i) => (
        <div key={i} className="bg-white/[0.05] border border-magenta/25 rounded-xl p-5">
          <div className="font-bebas text-5xl text-pink-vivid leading-none mb-2">{kpi.num}</div>
          <div className="text-sm text-off-white font-medium mb-1">{kpi.label}</div>
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
        <div key={i} className="flex gap-3 items-start py-3.5 border-b border-magenta/10 last:border-b-0">
          <div
            className={`w-2 h-2 rounded-full mt-[7px] flex-shrink-0 ${
              item.muted ? 'bg-grey' : 'bg-pink-vivid shadow-[0_0_6px_rgba(224,64,251,0.5)]'
            }`}
          />
          <div>
            <span className={`text-sm font-semibold mr-2 ${item.muted ? 'text-grey-light' : 'text-pink-light'}`}>
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
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-magenta/15 text-sm text-off-white"
        >
          <div className="w-8 h-8 rounded-lg bg-magenta/20 flex items-center justify-center text-base flex-shrink-0">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((exp, i) => (
        <div key={i} className="bg-white/[0.05] border border-magenta/25 rounded-xl p-5">
          <div className="font-bebas text-xl tracking-wide mb-2">{exp.title}</div>
          <div className="text-sm text-grey-light leading-relaxed mb-3">{exp.desc}</div>
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
            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${
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
            <div className="text-base font-semibold text-off-white mb-1">{item.title}</div>
            <div className="text-sm text-grey-light leading-relaxed">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BigRecBlock({ lines, accentLines }: { lines: string[]; accentLines: number[] }) {
  return (
    <div className="py-6">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`font-bebas text-4xl md:text-6xl lg:text-7xl tracking-wide leading-tight ${
            accentLines.includes(i) ? 'text-pink-vivid' : 'text-off-white'
          }`}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

function renderBlock(block: PostContent, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-grey-light leading-relaxed text-base">
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

// ─── Modal component ──────────────────────────────────────────────────────────

export default function Modal({ post, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // mount → animate in
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-350 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDuration: '350ms' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-purple-dark/90 backdrop-blur-xl cursor-pointer"
        onClick={handleClose}
      />

      {/* Decorative glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-700 ${
            visible ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, #8b1fd4, transparent)',
            top: '-10%',
            left: '-10%',
            transitionDelay: '100ms',
          }}
        />
        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-700 ${
            visible ? 'opacity-15' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, #c026d3, transparent)',
            bottom: '-10%',
            right: '-10%',
            transitionDelay: '200ms',
          }}
        />
      </div>

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col transition-all duration-350 ${
          visible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-[0.96]'
        }`}
        style={{ transitionDuration: '350ms' }}
      >
        {/* Glass panel */}
        <div className="flex flex-col bg-purple-dark/95 border border-magenta/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(139,31,212,0.3),0_0_0_1px_rgba(192,38,211,0.2)]">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-magenta/15 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* cinema dots */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <span className="font-dm-mono text-[10px] uppercase tracking-[0.2em] text-grey">
                {post.tag}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
                {String(post.id).padStart(2, '0')} / 17
              </span>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/[0.06] border border-magenta/20 flex items-center justify-center text-grey hover:text-off-white hover:bg-magenta/20 hover:border-magenta/50 transition-all duration-200 text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div ref={scrollRef} className="overflow-y-auto scrollbar-thin flex-1">
            <div className="px-6 md:px-10 py-8">

              {/* Post header */}
              <div className="mb-8">
                <h2 className="font-bebas text-4xl md:text-5xl tracking-wide leading-tight mb-3">
                  {post.title}{' '}
                  {post.titleAccent && (
                    <span className="text-pink-vivid">{post.titleAccent}</span>
                  )}
                </h2>
                <p className="text-grey text-sm leading-relaxed border-l-2 border-magenta/40 pl-4">
                  {post.summary}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-magenta/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-magenta/60" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-magenta/40 to-transparent" />
              </div>

              {/* Content blocks */}
              <div className="flex flex-col gap-7">
                {post.content.map((block, i) => renderBlock(block, i))}
              </div>

              {/* Footer */}
              <div className="mt-10 pt-5 border-t border-magenta/10 flex items-center justify-between">
                <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
                  {post.readTime} min read
                </span>
                <div className="flex gap-1.5">
                  {[...Array(post.readTime)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-magenta/40" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
