const shapes = {
  headphones: (
    <>
      <path d="M26 66v-6a34 34 0 0 1 68 0v6" />
      <rect x="18" y="64" width="18" height="30" rx="7" />
      <rect x="84" y="64" width="18" height="30" rx="7" />
    </>
  ),
  speaker: (
    <>
      <rect x="40" y="20" width="40" height="80" rx="12" />
      <circle cx="60" cy="44" r="8" />
      <circle cx="60" cy="74" r="13" />
    </>
  ),
  lamp: (
    <>
      <path d="M44 30h32l10 24H34z" />
      <path d="M60 54v40" />
      <path d="M42 94h36" />
    </>
  ),
  chair: (
    <>
      <path d="M40 30c-4 18-4 28 0 40h32c4-12 4-22 0-40" />
      <path d="M38 70v22M82 70v22M38 80h44" />
      <path d="M38 70h44" />
    </>
  ),
  candle: (
    <>
      <path d="M60 22c7 6 7 13 0 17-7-4-7-11 0-17z" />
      <rect x="44" y="46" width="32" height="50" rx="6" />
      <path d="M60 39v7" />
    </>
  ),
  plant: (
    <>
      <path d="M60 60c0-16 8-26 20-30-2 16-9 26-20 30z" />
      <path d="M60 64c0-14-7-22-18-26 2 14 8 22 18 26z" />
      <path d="M46 64h28l-4 32H50z" />
    </>
  ),
  bag: (
    <>
      <path d="M38 48h44l4 48H34z" />
      <path d="M48 48v-6a12 12 0 0 1 24 0v6" />
    </>
  ),
  bottle: (
    <>
      <path d="M52 22h16v10l4 8v48a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V40l4-8z" />
      <path d="M48 56h24" />
    </>
  ),
  watch: (
    <>
      <circle cx="60" cy="60" r="20" />
      <path d="M60 50v10l7 4" />
      <path d="M50 42l3-16h14l3 16M50 78l3 16h14l3-16" />
    </>
  ),
  camera: (
    <>
      <rect x="28" y="40" width="64" height="48" rx="8" />
      <circle cx="60" cy="64" r="13" />
      <path d="M44 40l4-8h24l4 8" />
    </>
  ),
  sneaker: (
    <>
      <path d="M26 74c0-10 6-16 10-26l12 6 10-4 8 10c8 2 20 4 26 10 4 4 2 10-4 10H30c-3 0-4-3-4-6z" />
      <path d="M44 56l6 8M54 52l6 8" />
    </>
  ),
  mug: (
    <>
      <path d="M38 40h36v40a12 12 0 0 1-12 12H50a12 12 0 0 1-12-12z" />
      <path d="M74 50h8a10 10 0 0 1 0 24h-8" />
    </>
  )
}

export default function ProductArt({ art, tint = ['#6d5efc', '#22d3ee'], className = '', size }) {
  const style = {
    background: `linear-gradient(140deg, ${tint[0]}, ${tint[1]})`,
    ...(size ? { width: size, height: size } : {})
  }
  return (
    <div className={`art ${className}`} style={style}>
      <div className="art-grain" />
      <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        {shapes[art] || shapes.mug}
      </svg>
    </div>
  )
}
