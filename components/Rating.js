import Icon from './Icon'

export default function Rating({ value, reviews, size = 14 }) {
  const full = Math.round(value)
  return (
    <span className="rating">
      <span className="rating-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="star" size={size} fill={i <= full ? 'currentColor' : 'none'} strokeWidth={1.5} />
        ))}
      </span>
      <span className="rating-num">{value.toFixed(1)}{reviews != null && <em> ({reviews})</em>}</span>
    </span>
  )
}
