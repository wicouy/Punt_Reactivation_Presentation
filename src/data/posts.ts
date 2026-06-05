export type PostTag = 'Overview' | 'Entry Logic' | 'Segmentation' | 'Journey Architecture' | 'Cool-Off Logic' | 'Offer Framework' | 'Communication' | 'Channel Pressure' | 'Measurement' | 'Success Definition' | 'Data Architecture' | 'Platform' | 'Go-Live Requirements' | 'Optimisation' | 'Final Recommendation'

export interface Post {
  id: number
  slug: string
  tag: PostTag
  title: string
  titleAccent?: string
  summary: string
  readTime: number
  content: PostContent[]
}

export type PostContent =
  | { type: 'paragraph'; text: string }
  | { type: 'pills'; items: { label: string; variant: 'magenta' | 'purple' }[] }
  | { type: 'cards'; items: { title: string; body: string; mono?: boolean }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'grid'; cols: 2 | 3 | 4; items: SegmentItem[] }
  | { type: 'timeline'; items: TimelineItem[] }
  | { type: 'kpis'; items: { num: string; label: string; sub: string }[] }
  | { type: 'checklist'; items: { icon: string; title: string; body: string; variant?: 'primary' | 'secondary' | 'none' }[] }
  | { type: 'bullets'; items: { label: string; desc: string; muted?: boolean }[] }
  | { type: 'deps'; items: { icon: string; text: string }[] }
  | { type: 'experiments'; items: { title: string; desc: string; purpose: string }[] }
  | { type: 'bigRec'; lines: string[]; accentLines: number[] }

export interface SegmentItem {
  name: string
  color: string
  gradFrom: string
  gradTo: string
  desc: string
  tag: string
}

export interface TimelineItem {
  day: number | string
  type: 'touch' | 'cooloff' | 'exit'
  label: string
}

export const posts: Post[] = [
  {
    id: 1,
    slug: 'cover',
    tag: 'Overview',
    title: 'REACTIVATION',
    titleAccent: 'JOURNEY',
    summary: 'Win-Back Strategy for Lapsed Players · 14-Day Automated Flow · Karen Bordagorry · June 2026',
    readTime: 2,
    content: [
      {
        type: 'paragraph',
        text: 'A fully segmented 14-day reactivation journey for players who have not purchased in 21+ days. Six behavioural segments, five outbound touches, and a 10% control group for clean attribution.',
      },
      {
        type: 'pills',
        items: [
          { label: '14-Day Journey', variant: 'magenta' },
          { label: '6 Segments', variant: 'purple' },
          { label: '10% Control Group', variant: 'purple' },
          { label: '5 Outbound Touches', variant: 'magenta' },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'objective',
    tag: 'Overview',
    title: 'THE',
    titleAccent: 'OBJECTIVE',
    summary: 'Recover lapsed players while protecting promotional cost and player experience.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Recover players who have not purchased for 21+ days, while protecting promotional cost and player experience. The journey should be simple enough to operate reliably, but segmented enough to avoid treating a VIP, a free-to-play player, and a bonus-sensitive player the same way.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Primary KPI', body: 'Completed Purchase — during the 14-day journey window' },
          { title: 'Entry Trigger', body: 'last_purchase_date ≥ 21 days', mono: true },
          { title: 'First Assumption', body: 'If a pre-lapse churn prevention journey exists, this journey acts as a reset, not a continuation.' },
        ],
      },
      {
        type: 'pills',
        items: [
          { label: '14-Day Journey', variant: 'magenta' },
          { label: '6 Segments', variant: 'purple' },
          { label: '10% Control Group', variant: 'purple' },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'suppression-logic',
    tag: 'Entry Logic',
    title: 'SUPPRESSION',
    titleAccent: 'LAYERS',
    summary: 'Three-tier suppression model — Hard → Channel → Journey — applied in strict order before any player enters. Conflating tiers is a compliance risk.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Suppression is layered in three tiers and applied in strict sequence. Hard suppressions are non-negotiable, channel suppressions sit below that and journey suppressions handle operational conflicts. The layering matters because conflating the tiers creates compliance risk.',
      },
      {
        type: 'table',
        headers: ['Tier', 'Layer', 'Rule'],
        rows: [
          ['—', 'Eligible Audience', 'Registered player, valid account, 21+ days since last purchase, previous purchase history'],
          ['1 — Hard', 'Hard Suppressions', 'RG restriction, self-exclusion, cooling-off, fraud / risk flag, unresolved KYC, legal / geographic restriction — blocks all channels, no exceptions'],
          ['2 — Channel', 'Channel Suppressions', 'Do not send through channels where the player is unsubscribed or not opted in — player remains eligible for other available channels'],
          ['3 — Journey', 'Journey Suppressions', 'Exclude players already reactivated, already in a conflicting critical journey, or allocated to the control group'],
          ['—', 'VIP Routing', 'VIPs are not excluded — they enter a dedicated VIP lane with stronger personalisation and earlier escalation'],
        ],
      },
      {
        type: 'cards',
        items: [
          { title: '⚠️ Why Tiers Must Stay Separate', body: 'Conflating Hard and Channel suppressions is a compliance risk. A self-excluded player must never receive an offer — even if their email is opted in and technically deliverable.' },
          { title: '📡 Channel Block ≠ Full Block', body: 'A player unsubscribed from email but opted into push is still reachable. Channel suppressions remove one route, not the entire player.' },
          { title: '🔄 Journey Suppressions Are Operational', body: 'Already reactivated, in a conflicting journey, or in the control group — these are not compliance blocks, they are logic gates to prevent redundant or misleading comms.' },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'segments',
    tag: 'Segmentation',
    title: 'THE',
    titleAccent: '6 SEGMENTS',
    summary: 'Six behavioural segments drive offer type, channel pressure, and escalation path.',
    readTime: 4,
    content: [
      {
        type: 'paragraph',
        text: 'Each player is assigned to exactly one segment at entry. The segment determines the offer ladder, channel mix, and exit path. Segmentation logic should be validated against current player data before launch.',
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { name: 'VIP', color: '#e879f9', gradFrom: '#a855f7', gradTo: '#c026d3', desc: 'Formal VIP tier or top players representing the majority of revenue', tag: 'Dedicated lane · Earlier SMS · Stronger ceiling' },
          { name: 'HIGH VALUE', color: '#c4b5fd', gradFrom: '#8b5cf6', gradTo: '#a855f7', desc: 'Strong historical purchasers not in VIP — above average spend', tag: 'Strong offer ladder · Boosted bundles' },
          { name: 'NORMAL / CORE', color: '#a5b4fc', gradFrom: '#6366f1', gradTo: '#8b5cf6', desc: 'Standard purchasing players with moderate value', tag: 'Balanced flow · Scratch cards · Prize draws' },
          { name: 'LOW VALUE', color: '#94a3b8', gradFrom: '#64748b', gradTo: '#6366f1', desc: 'Low historical value or weak engagement before lapse', tag: 'Content-first · Low-cost mechanics only' },
          { name: 'BONUS-SENSITIVE', color: '#fbbf24', gradFrom: '#d97706', gradTo: '#ea580c', desc: 'Players who mainly return when promotions are available', tag: 'Capped offers · Hard expiry · No extensions' },
          { name: 'PAYMENT FRICTION', color: '#7dd3fc', gradFrom: '#0ea5e9', gradTo: '#6366f1', desc: 'Attempted or abandoned a purchase before lapsing', tag: 'Help-first branch · Fix blocker first' },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'journey-flow',
    tag: 'Journey Architecture',
    title: 'FULL JOURNEY',
    titleAccent: 'FLOW',
    summary: 'Entry trigger → suppressions → segment split → five touches → exit logic.',
    readTime: 5,
    content: [
      {
        type: 'paragraph',
        text: 'The journey runs on a daily batch or real-time event trigger. After suppression checks and segment assignment, players receive up to five outbound touches across 14 days. A purchase event triggers immediate journey exit at any point.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Entry', body: 'last_purchase_date ≥ 21 days — daily batch or real-time event', mono: true },
          { title: 'Suppression Gate', body: 'RG · Fraud · KYC · Geo · Opt-outs — applied before any segment logic' },
          { title: 'Control Split', body: '10% global holdout — no reactivation comms — measures natural return rate' },
          { title: 'Segment Split', body: 'VIP · High Value · Core · Low Intent · Bonus-Sensitive · Payment Friction — determines offer type, channel pressure & escalation path' },
        ],
      },
      {
        type: 'bullets',
        items: [
          { label: 'Day 1 — First Touch', desc: 'Email (all). SMS/push for VIP & High Value. Onsite if player visits naturally.' },
          { label: 'Day 3 — Light Reminder', desc: 'Push only (opted-in players). Day 2 is cool-off.' },
          { label: 'Day 5 — Main Offer', desc: 'Core reactivation offer by segment. Email + SMS (VIP/High Value).' },
          { label: 'Day 8 — Escalation', desc: 'Segment-based escalation. Email + Push. Days 6–7 cool-off.' },
          { label: 'Day 11/13 — Final Touch', desc: 'Last chance messaging. SMS for urgency (VIP/High Value).' },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'cadence',
    tag: 'Cool-Off Logic',
    title: '14-DAY',
    titleAccent: 'CADENCE',
    summary: 'Max 5 outbound touches. No consecutive day messaging. Cool-off days built in.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'The cadence is designed around player experience as much as conversion. Cool-off days are mandatory — no consecutive day messaging. Maximum 5 outbound touches in 14 days prevents fatigue.',
      },
      {
        type: 'timeline',
        items: [
          { day: 1, type: 'touch', label: 'First Touch' },
          { day: 2, type: 'cooloff', label: 'Silence' },
          { day: 3, type: 'touch', label: 'Light Reminder' },
          { day: 4, type: 'cooloff', label: 'Silence' },
          { day: 5, type: 'touch', label: 'Main Offer' },
          { day: 6, type: 'cooloff', label: 'Silence' },
          { day: 7, type: 'cooloff', label: 'Silence' },
          { day: 8, type: 'touch', label: 'Escalation' },
          { day: 9, type: 'cooloff', label: 'Silence' },
          { day: 10, type: 'cooloff', label: 'Silence' },
          { day: 11, type: 'touch', label: 'Final Touch' },
          { day: 12, type: 'cooloff', label: 'Silence' },
          { day: 13, type: 'touch', label: 'Final Reminder' },
          { day: '14', type: 'exit', label: 'Exit Logic' },
        ],
      },
    ],
  },
  {
    id: 7,
    slug: 'offer-mechanics',
    tag: 'Offer Framework',
    title: 'OFFER',
    titleAccent: 'MECHANICS BY STAGE',
    summary: 'Segment-specific offer ladders across Day 1, 5, 8, 11–13 and exit. Values illustrative — validate vs bonus cost, LTV, margin & compliance.',
    readTime: 5,
    content: [
      {
        type: 'paragraph',
        text: 'Values should be validated against bonus cost, LTV, margin and compliance before launch. Offer type escalates through the journey. Bonus-Sensitive players never receive offer extensions or increases.',
      },
      {
        type: 'bullets',
        items: [
          { label: 'VIP', desc: 'High offer ceiling · Escalates every touch · SC Giveaway at Day 8' },
          { label: 'High Value', desc: 'Boosted Bundle led · 48h expiry · Tournament entry at Day 8' },
          { label: 'Normal / Core', desc: 'Low-cost mechanics · Scratch Card and Free Spins · Prize Draw' },
          { label: 'Low Value / Low Intent', desc: 'Content-led · No expensive offers · Challenge tasks only' },
          { label: 'Bonus-Sensitive', desc: 'Hard capped · One-time only · Never extended or increased' },
          { label: 'Payment Friction', desc: 'Help-first · No promo until blocker resolved · Scratch Card post-purchase' },
        ],
      },
      {
        type: 'table',
        headers: ['Segment', 'Day 1 — First Touch', 'Day 3 — Light Reminder', 'Day 5 — Main Offer', 'Day 8 — Escalation', 'Day 11–13 — Final'],
        rows: [
          [
            'VIP',
            'VIP Prize Draw entry + Boosted Bundle preview. e.g. "Your VIP Prize Draw entry is unlocked. Buy $49.99 and receive 50,000 Gold Coins + 75 Sweeps Coins instead of 50 Sweeps Coins."',
            'Reminder of VIP Prize Draw entry. e.g. "Your VIP Prize Draw entry closes in 48 hours."',
            'VIP Boosted Bundle + Tournament entry. e.g. "VIP Comeback Bundle: buy $49.99 and receive 50,000 Gold Coins + 80 Sweeps Coins. Your reserved entry into the VIP Weekend Race is included."',
            'SC Giveaway + VIP Boosted Bundle. e.g. "Your VIP gift: 10 Sweeps Coins when you return today. VIP Comeback Bundle also still open: buy $49.99 and receive 50,000 Gold Coins + 80 Sweeps Coins."',
            'Day 11 — Final VIP rescue. e.g. "Final VIP Comeback Reward: 15 Sweeps Coins gift + buy $49.99 and receive 50,000 Gold Coins + 90 Sweeps Coins." Day 13 — Reminder only: "Your 15 SC VIP gift and VIP Comeback Bundle close tonight."',
          ],
          [
            'High Value',
            '20 Free Spins + Boosted Bundle teaser. e.g. "Claim 20 Free Spins on [Last Played Game]. Your Comeback Bundle: buy $29.99 and receive 30,000 Gold Coins + 40 Sweeps Coins instead of 30 Sweeps Coins."',
            'Reminder of Free Spins or Scratch Card. e.g. "Your 20 Free Spins on [Game Name] are still waiting."',
            'Boosted Bundle with 48-hour expiry. e.g. "Comeback Bundle: buy $29.99 and receive 30,000 Gold Coins + 40 Sweeps Coins instead of 30 Sweeps Coins. Available for 48 hours."',
            'Tournament entry + Boosted Bundle reminder. e.g. "Join the Weekend Race and compete for a share of 500 Sweeps Coins. Your $29.99 Comeback Bundle is still available."',
            'Day 11 — Final Bundle or SC Giveaway. e.g. "Final Comeback Offer: buy $29.99 and receive 30,000 Gold Coins + 45 Sweeps Coins." or "Claim 5 Sweeps Coins when you return today." Day 13 — Reminder only: "Your final Comeback Bundle closes tonight: buy $29.99 for 30,000 Gold Coins + 45 Sweeps Coins."',
          ],
          [
            'Normal / Core',
            'Scratch Card. e.g. "Scratch your comeback card for a chance to win up to 3 Sweeps Coins or 15 Free Spins."',
            'Scratch Card reminder. e.g. "Your comeback Scratch Card is still available today."',
            '10 Free Spins or Scratch Card. e.g. "Claim 10 Free Spins on [Game Name]." or "Scratch your card for a chance to win 1 Sweeps Coin or 10 Free Spins."',
            'Prize Draw entry + Free Spins. e.g. "Play today and receive 1 entry into the 500 Sweeps Coins Prize Draw, plus 10 Free Spins on [Game Name]."',
            'Day 11 — Scratch Card or Free Spins. e.g. "Last chance to claim 15 Free Spins on [Game Name]." or "Scratch your final comeback card for a chance to win up to 3 Sweeps Coins." Day 13 — Reminder only: "Last call: your 15 Free Spins close today." or "Your final Scratch Card closes today."',
          ],
          [
            'Low Value / Low Intent',
            'Prize Draw entry. e.g. "Play one game today and receive 1 entry into the 500 Sweeps Coins Prize Draw."',
            'No new reward.',
            'Challenge with small reward. e.g. "Complete 20 spins today and receive 5 Free Spins." or "Play 3 New Releases and receive 1 Prize Draw entry."',
            'Prize Draw entry only. e.g. "Play one game today and receive 1 entry into the 500 Sweeps Coins Prize Draw."',
            'Day 11 — Content-led final message. e.g. "New games were added this week. Come back and see the Top 20 games in your state." Day 13 — Final Prize Draw reminder: "Last chance to get 1 entry into the 500 Sweeps Coins Prize Draw."',
          ],
          [
            'Bonus-Sensitive',
            'Capped reward teaser — no full value shown yet. e.g. "A limited comeback bundle may be available this week. The offer will be capped and available once only."',
            'No new reward.',
            'Capped Boosted Bundle with hard expiry. e.g. "Limited Comeback Bundle: buy $9.99 and receive 10,000 Gold Coins + 12 Sweeps Coins instead of 10 Sweeps Coins. One-time only. No extension."',
            'Same capped offer from Day 5 — no increase. e.g. "Reminder: your one-time $9.99 Comeback Bundle closes soon. This offer will not be extended."',
            'Day 11 — Final capped offer, no increase and no extension. e.g. "Final reminder: your one-time $9.99 Comeback Bundle closes today. Buy $9.99 and receive 10,000 Gold Coins + 12 Sweeps Coins. No extension." Day 13 — No new reward, no extension.',
          ],
          [
            'Payment Friction',
            'No promo yet — help-first message. e.g. "We noticed your last purchase may not have completed. Resume your purchase or contact support here."',
            'Support reminder only if they opened or clicked Day 1. e.g. "Still having trouble completing your purchase? Continue from where you left off."',
            'If resolved: small Scratch Card. e.g. "Your purchase path is ready. Complete your return and unlock a Scratch Card with a chance to win up to 2 Sweeps Coins." If unresolved: support-first message, no reward.',
            'Reward after successful purchase. e.g. "Complete your purchase and unlock 5 Free Spins."',
            'Day 11 — No bonus escalation. Final support route. e.g. "We can still help you complete your purchase. Use this direct support path." Day 13 — Support-only, no reward.',
          ],
        ],
      },
    ],
  },
  {
    id: 8,
    slug: 'channels',
    tag: 'Communication',
    title: 'CHANNEL',
    titleAccent: 'STRATEGY',
    summary: 'Four channels with clear rules on days, segments, and opt-in requirements.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Each channel has a defined role in the journey. Higher-cost channels (SMS) are reserved for VIP and High Value only, where urgency is commercially justified. Onsite pop-ups are reactive — never outbound — and capped at one per session.',
      },
      {
        type: 'cards',
        items: [
          { title: '✉️ Email · Days 1 · 5 · 8 · 11', body: 'Main channel for all segments. Explains the offer, shows game recommendations and includes clear CTAs.' },
          { title: '🔔 Push · Days 3 · 8 · 13 — opted-in only', body: 'Light reminder when player hasn\'t reacted to email. Best for short nudges and deep links to last played game.' },
          { title: '💬 SMS · Days 5 · 11 · 13 — VIP & High Value only', body: 'Higher cost, higher pressure. Reserved for moments where urgency is commercially justified.' },
          { title: '🖥️ Onsite Pop-Up · Full journey if player visits', body: 'Reactive only. Appears if the player visits naturally. Reinforces the active offer without adding outbound pressure. Max 1 per session.' },
        ],
      },
    ],
  },
  {
    id: 9,
    slug: 'channel-by-segment',
    tag: 'Channel Pressure',
    title: 'CHANNEL SELECTION',
    titleAccent: 'BY SEGMENT',
    summary: 'Channel pressure scales with player value. Low Value and Bonus-Sensitive: email only.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Channel pressure is proportional to commercial value. VIPs receive the full stack. Low Value and Bonus-Sensitive players receive email only to avoid cost-negative reactivation.',
      },
      {
        type: 'table',
        headers: ['Segment', 'Email', 'Push', 'SMS', 'Onsite'],
        rows: [
          ['VIP', '✓ Primary', '✓ If opted-in', '✓ Days 5/11/13', '✓ If visits'],
          ['High Value', '✓ Primary', '✓ If opted-in', '✓ Days 5/11/13', '✓ If visits'],
          ['Normal / Core', '✓ Primary', '✓ Secondary reminder', '✗ Not warranted', '✓ If visits'],
          ['Low Value', '✓ Only channel', '✗ Not warranted', '✗ Not warranted', '✓ If visits'],
          ['Bonus-Sensitive', '✓ Only channel', '✗ No urgency amp', '✗ Not warranted', '✓ If visits'],
          ['Payment Friction', '✓ Throughout', '✗', '△ If payment event', '✓ If visits'],
        ],
      },
      {
        type: 'cards',
        items: [
          { title: 'Frequency Cap', body: 'Max 5 outbound touches in 14 days · No consecutive day messaging' },
          { title: 'Instant Exit', body: 'Purchase event → immediate journey exit at any point' },
        ],
      },
    ],
  },
  {
    id: 10,
    slug: 'control-groups',
    tag: 'Measurement',
    title: 'CONTROL',
    titleAccent: 'GROUPS',
    summary: 'Global holdout + optional promo holdout + VIP control note.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Clean measurement requires a properly structured control group. Attribution should never rely on clicks alone — the comparison between treated and control performance is the primary signal.',
      },
      {
        type: 'cards',
        items: [
          { title: 'Global Control Group — 10%', body: 'No email, push, SMS or onsite message during the 14-day window. Purpose: measure natural return rate and true incremental uplift from the automation.' },
          { title: 'Optional Promo Holdout — 10% per Segment', body: 'Receives CRM messaging but no promotional offer. Purpose: measure whether the offer is necessary, or if messaging alone drives reactivation.' },
          { title: 'VIP Control Note', body: 'VIPs should be excluded from the global no-contact control group — or placed into a smaller, separately measured VIP control group — depending on sample size and revenue concentration.' },
        ],
      },
    ],
  },
  {
    id: 11,
    slug: 'reactivation-events',
    tag: 'Success Definition',
    title: 'REACTIVATION',
    titleAccent: 'EVENTS',
    summary: 'Three exit states: commercial reactivation, engagement reactivation, and no reactivation.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Success has a clear hierarchy. Purchase is the only primary KPI. SC engagement is a secondary signal — useful for nurture sequencing, but does not count as reactivation for reporting purposes.',
      },
      {
        type: 'checklist',
        items: [
          { icon: '✓', title: 'Commercial Reactivation (Primary)', body: 'Player completes any purchase during the journey window → exit win-back immediately → enter post-reactivation nurture (second session, second purchase, habit rebuild)', variant: 'primary' },
          { icon: '~', title: 'Engagement Reactivation (Secondary)', body: 'Qualifying Sweeps Coins session (10+ minutes or meaningful gameplay) → exit or reduce pressure → nurture toward second session and eventual purchase. Does not replace purchase as the main KPI.', variant: 'secondary' },
          { icon: '✗', title: 'No Reactivation', body: 'No qualifying purchase or SC session by end of journey → exit to dormant or low-frequency reactivation pool, segment-dependent path', variant: 'none' },
        ],
      },
      {
        type: 'cards',
        items: [
          { title: 'Post-Reactivation Nurture Uses', body: 'Reactivation date · Purchase value · Game played · Reward redeemed · Channel that drove return' },
        ],
      },
    ],
  },
  {
    id: 12,
    slug: 'data-inputs',
    tag: 'Data Architecture',
    title: 'DATA',
    titleAccent: 'INPUTS',
    summary: 'Eight essential data inputs for V1, plus six nice-to-have enrichments.',
    readTime: 4,
    content: [
      {
        type: 'paragraph',
        text: 'Launch with essentials only. Nice-to-have inputs improve personalisation and segmentation accuracy but should not block V1. Build up data incrementally based on what improves measurable outcomes.',
      },
      {
        type: 'bullets',
        items: [
          { label: 'Player ID', desc: 'Connect activity, purchases, offers and results' },
          { label: 'Last Purchase Date', desc: 'Main trigger: last_purchase_date ≥ 21 days' },
          { label: 'Account / Compliance Status', desc: 'RG, self-exclusion, fraud/risk, geo, KYC' },
          { label: 'VIP / Value Data', desc: 'VIP flag, LTV, purchase count, avg value' },
          { label: 'Game Preference', desc: 'Last game played, preferred category / provider' },
          { label: 'Channel Permissions', desc: 'Email, push, SMS, onsite eligibility' },
          { label: 'Offer Tracking', desc: 'Offer assigned, claimed, redeemed' },
          { label: 'Reactivation Event', desc: 'Purchase event, date, revenue after reactivation' },
        ],
      },
      {
        type: 'bullets',
        items: [
          { label: 'Session Behaviour', desc: 'Last session date, frequency before lapse', muted: true },
          { label: 'Coin Balances', desc: 'Gold Coins and Sweeps Coins balance', muted: true },
          { label: 'Promo History', desc: 'Offer type, redemption, bonus sensitivity', muted: true },
          { label: 'Channel Engagement', desc: 'Email/push/SMS engagement, contact fatigue score', muted: true },
          { label: 'Payment Friction Data', desc: 'Cashier abandoned, payment fail reason, support ticket', muted: true },
          { label: 'Dynamic Content Feeds', desc: 'Recommended games, Top 20 in State, tournaments, prize draws', muted: true },
        ],
      },
    ],
  },
  {
    id: 13,
    slug: 'optimove-setup',
    tag: 'Platform',
    title: 'OPTIMOVE',
    titleAccent: 'SETUP',
    summary: 'Data flows, channel connections, and six build steps for the Optimove implementation.',
    readTime: 4,
    content: [
      {
        type: 'paragraph',
        text: 'The Optimove build follows a strict sequence. Suppress before you segment. Segment before you schedule. Set exit logic before launch — an untested exit condition is a production incident waiting to happen.',
      },
      {
        type: 'deps',
        items: [
          { icon: '🏛️', text: 'Data warehouse → Optimove: player data for segmentation & triggers' },
          { icon: '⚡', text: 'Product events → Optimove: purchase, session, game launch, offer claim/redeem, cashier fail' },
          { icon: '📤', text: 'Optimove → Channels: Email · Push · SMS · Onsite' },
          { icon: '🎁', text: 'Optimove → Offer system: Bundle · Scratch Card · Free Spins · Prize Draw · Tournament' },
          { icon: '📊', text: 'Results → Optimove: claims, redemptions, purchases, revenue' },
        ],
      },
      {
        type: 'bullets',
        items: [
          { label: '① Create target group', desc: 'last_purchase_date ≥ 21 days' },
          { label: '② Apply suppressions', desc: 'RG · fraud · risk · geo · KYC · opt-outs · control group' },
          { label: '③ Split by value', desc: 'VIP · High Value · Core · Low Value · Bonus-Sensitive · Payment Friction' },
          { label: '④ Set campaign attributes', desc: 'last game · offer type · bundle eligibility · expiry' },
          { label: '⑤ Trigger steps', desc: 'Day 1 · 3 · 5 · 8 · 11 · 13 · exit on purchase_completed' },
          { label: '⑥ Measure', desc: 'treated vs control · promo holdout · post-reactivation nurture' },
        ],
      },
    ],
  },
  {
    id: 14,
    slug: 'engineering-deps',
    tag: 'Go-Live Requirements',
    title: 'ENGINEERING',
    titleAccent: 'DEPENDENCIES',
    summary: 'Ten data and platform dependencies required before go-live.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Every dependency here is a potential silent failure mode in production. UAT test users for each segment are non-negotiable — launch only when all six segment paths have been manually verified end-to-end.',
      },
      {
        type: 'deps',
        items: [
          { icon: '📅', text: 'last_purchase_date accuracy and refresh timing confirmed' },
          { icon: '🔑', text: 'Consistent Player ID across all systems' },
          { icon: '🛡️', text: 'Real-time suppression flags: RG · fraud · account restrictions · geo' },
          { icon: '✅', text: 'Accurate email, push and SMS opt-in status' },
          { icon: '💳', text: 'Reliable purchase_completed event for journey exit' },
          { icon: '🎁', text: 'Offer assignment, claim, redemption and expiry logic' },
          { icon: '🖥️', text: 'Onsite pop-up integration and frequency rules' },
          { icon: '🔗', text: 'Deep links: games · bundles · wallet · tournaments · support' },
          { icon: '🔇', text: 'Control group exclusion from all channels confirmed' },
          { icon: '🧪', text: 'UAT test users for each segment before launch' },
        ],
      },
    ],
  },
  {
    id: 15,
    slug: 'execution-rollout',
    tag: 'Go-Live Requirements',
    title: 'EXECUTION &',
    titleAccent: 'ROLLOUT',
    summary: 'A structured 4-week build sprint followed by a controlled, phased launch to manage risk.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'A great strategy only survives if it can be built and launched safely. The rollout must be phased to catch data latency issues, verify bonus triggers, and monitor support volume before exposing 100% of the active base.',
      },
      {
        type: 'bullets',
        items: [
          { label: 'Week 1 — Foundations', desc: 'Finalise data feeds (last_purchase_date) and implement real-time suppression flags (RG, self-exclusion).' },
          { label: 'Week 2 — CRM & Offers', desc: 'Build the multi-channel flow in Optimove. Generate and configure bonus mechanisms (capped bundles, free spins).' },
          { label: 'Week 3 — UAT & QA', desc: 'Push test users through all 6 segment paths. Verify channel delivery, deep links, and offer redemption limits.' },
          { label: 'Week 4 — Phased Launch', desc: 'Day 1: 10% volume. Day 4: 50% volume. Day 8+: 100% volume. Monitor crash rates and support tickets.' },
        ],
      },
      {
        type: 'cards',
        items: [
          { title: '⚠️ Risk 1: Data Latency', body: 'A player deposits but the data warehouse lags, causing a reactivation email to fire in error. Mitigation: Use real-time webhooks for the purchase exit event.' },
          { title: '⚠️ Risk 2: Bonus Abuse', body: 'Bonus-sensitive segments find a way to repeat the offer. Mitigation: Hard-capping natively in the platform, strictly no extensions.' },
        ],
      },
    ],
  },
  {
    id: 16,
    slug: 'experimentation-plan',
    tag: 'Optimisation',
    title: 'EXPERIMENTATION',
    titleAccent: 'PLAN',
    summary: 'Four experiments to run after V1 stabilises. One major variable at a time.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Run experiments after the baseline is established — not during launch. Change one major variable at a time to isolate what drives improvement. Results reviewed every 4–6 weeks.',
      },
      {
        type: 'experiments',
        items: [
          { title: '🧪 Promo Holdout', desc: 'A portion of players receive the message but no offer', purpose: 'Is the offer needed, or does messaging alone reactivate?' },
          { title: '🎰 Offer Mechanic Test', desc: 'Scratch Card vs Free Spins for Core · Boosted Bundle vs Tournament for High Value', purpose: 'Best mechanic at lowest reactivation cost?' },
          { title: '📡 Channel Test', desc: 'Email only vs Email + Push · Email + SMS for High Value', purpose: 'Incremental value of each channel, not just total conversions' },
          { title: '⏱️ Timing Test', desc: 'Day 5 vs Day 8 as the main escalation point', purpose: 'Earlier or later offer pressure: what works better?' },
        ],
      },
      {
        type: 'cards',
        items: [
          { title: 'Review Cadence', body: 'Results reviewed every 4–6 weeks. Change one major variable at a time — offer type, timing or channel mix — to clearly understand what improved performance.' },
        ],
      },
    ],
  },
  {
    id: 17,
    slug: 'kpis',
    tag: 'Measurement',
    title: 'KPIs &',
    titleAccent: 'ATTRIBUTION',
    summary: 'Four primary KPIs. Attribution driven by treated vs control, not click metrics.',
    readTime: 3,
    content: [
      {
        type: 'paragraph',
        text: 'Success is not attributed to clicks alone. The key comparison is treated vs control group performance. Compare offer recipients vs promo holdout, channel combos vs single channel, offer cost vs post-reactivation revenue, and reactivation quality by segment.',
      },
      {
        type: 'kpis',
        items: [
          { num: '%', label: 'Reactivation Rate', sub: '% purchasing in 14-day window' },
          { num: 'Δ', label: 'Incremental Uplift', sub: 'Treated vs control group' },
          { num: '£', label: 'Revenue Post-Reactivation', sub: '7-day and 30-day windows' },
          { num: '÷', label: 'Cost Per Reactivation', sub: 'Reward cost ÷ reactivated players' },
        ],
      },
      {
        type: 'bullets',
        items: [
          { label: 'Offer Claim & Redemption Rate', desc: 'Is the offer attractive? Do players actually use it?' },
          { label: 'Channel Performance', desc: 'Open · click · push tap · SMS click · onsite engagement by segment' },
          { label: 'Post-Reactivation Retention', desc: '2nd session · 2nd purchase · 7 & 30-day retention' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Based on these KPIs — how do we monitor and analyse success?',
      },
      {
        type: 'cards',
        items: [
          { title: '① Primary Measure', body: 'Incremental reactivation rate versus the control group — not raw reactivation. The control group is the benchmark; without it, any uplift number is meaningless.' },
          { title: '② Revenue Windows', body: 'Compare revenue in the 7 and 30 days after reactivation — not just whether the player returned. A low-quality reactivation that generates one purchase and lapses again is not a win.' },
          { title: '③ Segment-Level Analysis', body: 'Break down results by segment. A strong overall rate can mask a failing segment or a cost-negative reactivation path. Analyse VIP, High Value, Core, and Bonus-Sensitive separately.' },
          { title: '④ One Variable at a Time', body: 'Avoid comparing total store metrics before and after launch — too many variables change at once. Only change one element per test cycle — offer type, timing, or channel mix — to understand what actually moved performance.' },
        ],
      },
    ],
  },
  {
    id: 18,
    slug: 'recommendation',
    tag: 'Final Recommendation',
    title: 'FINAL',
    titleAccent: 'RECOMMENDATION',
    summary: 'Launch a controlled MVP. Optimise after 4–6 weeks. Build up data incrementally.',
    readTime: 2,
    content: [
      {
        type: 'bigRec',
        lines: ['LAUNCH A CONTROLLED MVP', 'WITH CLEAR ELIGIBILITY,', 'STRICT SUPPRESSION &', '10% CONTROL GROUP.'],
        accentLines: [0, 3],
      },
      {
        type: 'pills',
        items: [
          { label: 'Incremental Reactivation', variant: 'magenta' },
          { label: 'Reward Cost Control', variant: 'purple' },
          { label: 'Revenue Post-Reactivation', variant: 'magenta' },
          { label: 'Post-Reactivation Retention', variant: 'purple' },
          { label: 'Segment-Level Response', variant: 'magenta' },
        ],
      },
      {
        type: 'paragraph',
        text: 'Optimise after 4–6 weeks based on results. Change one major variable at a time. Build up data inputs incrementally — launch with essentials only.',
      },
    ],
  },
]
