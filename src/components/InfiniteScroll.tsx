import { useCallback, useEffect, useRef, useState } from 'react'
import { posts } from '../data/posts'
import PostCard from './PostCard'

const PAGE_SIZE = 4

export default function InfiniteScroll() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (loading || visibleCount >= posts.length) return
    setLoading(true)
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, posts.length))
      setLoading(false)
    }, 400)
  }, [loading, visibleCount])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore])

  const visible = posts.slice(0, visibleCount)
  const done = visibleCount >= posts.length

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="font-dm-mono text-[10px] uppercase tracking-[0.25em] text-pink-vivid mb-3">
          Win-Back Strategy · 14-Day Automated Flow
        </div>
        <h1 className="font-bebas text-5xl md:text-7xl tracking-wide leading-none mb-4">
          REACTIVATION <span className="text-pink-vivid">JOURNEY</span>
        </h1>
        <div className="w-24 h-[3px] bg-gradient-to-r from-magenta to-pink-vivid rounded-full mx-auto mb-4 shadow-[0_0_12px_rgba(224,64,251,0.5)]" />
        <p className="text-grey-light text-sm max-w-lg mx-auto leading-relaxed">
          Full strategy for recovering lapsed players — segmentation logic, offer mechanics, channel cadence, control groups, and measurement framework.
        </p>
        <div className="flex justify-center gap-3 mt-5">
          <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            {posts.length} sections
          </span>
          <span className="text-magenta/30">·</span>
          <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            6 segments
          </span>
          <span className="text-magenta/30">·</span>
          <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            scroll to explore
          </span>
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-5">
        {visible.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-4 mt-4" />

      {/* Loading / done state */}
      <div className="flex justify-center py-8">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-magenta animate-bounce"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
              Loading
            </span>
          </div>
        ) : done ? (
          <div className="text-center">
            <div className="w-16 h-[2px] bg-magenta/30 mx-auto mb-3" />
            <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
              End of Journey
            </span>
          </div>
        ) : null}
      </div>
    </main>
  )
}
