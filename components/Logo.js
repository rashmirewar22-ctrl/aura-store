export default function Logo({ size = 24 }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M16 6a10 10 0 0 1 0 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3.4" fill="currentColor" />
      </svg>
      <span className="logo-text">aura</span>
    </span>
  )
}
