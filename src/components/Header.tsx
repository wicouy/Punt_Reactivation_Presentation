export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-purple-dark/80 backdrop-blur-md border-b border-magenta/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-bright to-magenta" />
          <span className="font-bebas text-xl tracking-[0.2em] text-off-white">PUNT</span>
          <span className="hidden sm:block font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            Reactivation Journey
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-dm-mono text-[10px] text-grey uppercase tracking-widest">
            Karen Bordagorry
          </span>
          <span className="font-dm-mono text-[10px] text-magenta/60">· June 2026</span>
        </div>
      </div>
    </header>
  )
}
