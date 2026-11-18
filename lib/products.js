export const categories = [
  { slug: 'all', name: 'All' },
  { slug: 'audio', name: 'Audio' },
  { slug: 'living', name: 'Living' },
  { slug: 'carry', name: 'Carry' },
  { slug: 'wear', name: 'Wear' }
]

export const products = [
  {
    slug: 'halo-headphones',
    name: 'Halo Over-Ear Headphones',
    category: 'audio',
    price: 249,
    compareAt: 299,
    art: 'headphones',
    tint: ['#6d5efc', '#22d3ee'],
    rating: 4.8,
    reviews: 214,
    badge: 'Bestseller',
    blurb: 'Weightless comfort and a hush-quiet cabin, all day.',
    description:
      'Forty hours of playback, adaptive noise cancellation and memory-foam cushions that disappear on your ears. Halo tunes itself to the room so the music stays exactly where you left it.',
    colors: ['Graphite', 'Sand', 'Sage'],
    features: ['40h battery', 'Adaptive ANC', 'Multipoint pairing', 'USB-C fast charge']
  },
  {
    slug: 'nimbus-speaker',
    name: 'Nimbus Portable Speaker',
    category: 'audio',
    price: 129,
    art: 'speaker',
    tint: ['#f59e0b', '#f0466e'],
    rating: 4.6,
    reviews: 98,
    blurb: 'Room-filling sound that fits in your palm.',
    description:
      'A single machined-aluminium body throws warm, directional sound in every direction. Splash-proof, pocketable, and good for eighteen hours between charges.',
    colors: ['Clay', 'Graphite'],
    features: ['18h battery', 'IPX5 splash-proof', '360° sound', 'Stereo pairing']
  },
  {
    slug: 'lumen-lamp',
    name: 'Lumen Table Lamp',
    category: 'living',
    price: 89,
    art: 'lamp',
    tint: ['#f59e0b', '#fbbf24'],
    rating: 4.7,
    reviews: 142,
    badge: 'New',
    blurb: 'Warm, dimmable light with a tap.',
    description:
      'A hand-finished aluminium stem and a glow that dims with a touch. Lumen remembers your last brightness and warms as it fades, like the last hour of daylight.',
    colors: ['Ivory', 'Graphite', 'Clay'],
    features: ['Touch dimming', 'Warm-to-cool', 'Memory brightness', '2m braided cord']
  },
  {
    slug: 'drift-chair',
    name: 'Drift Lounge Chair',
    category: 'living',
    price: 540,
    compareAt: 620,
    art: 'chair',
    tint: ['#22b07d', '#6d5efc'],
    rating: 4.9,
    reviews: 67,
    blurb: 'The chair you sink into and forget the time.',
    description:
      'A steam-bent oak frame cradles a single piece of boucle. Drift arrives flat and assembles with one tool in under ten minutes.',
    colors: ['Oat', 'Moss', 'Slate'],
    features: ['Solid oak frame', 'Boucle upholstery', 'Tool-light assembly', '10-year frame warranty']
  },
  {
    slug: 'ember-candle',
    name: 'Ember Scented Candle',
    category: 'living',
    price: 36,
    art: 'candle',
    tint: ['#f0466e', '#f59e0b'],
    rating: 4.5,
    reviews: 189,
    blurb: 'Cedar, smoke and something like rain.',
    description:
      'Hand-poured coconut-soy wax with a crackling wood wick. Sixty hours of cedar, vetiver and a whisper of petrichor in a reusable stoneware vessel.',
    colors: ['Stone'],
    features: ['60h burn', 'Wood wick', 'Coconut-soy wax', 'Refillable vessel']
  },
  {
    slug: 'fern-planter',
    name: 'Fern Desk Planter',
    category: 'living',
    price: 44,
    art: 'plant',
    tint: ['#22b07d', '#22d3ee'],
    rating: 4.4,
    reviews: 76,
    blurb: 'A little green, self-watering.',
    description:
      'A matte stoneware planter with a hidden reservoir that waters for two weeks at a time. Ships with a starter fern and a drainage wick.',
    colors: ['Sage', 'Stone', 'Clay'],
    features: ['Self-watering', '2-week reservoir', 'Starter plant included', 'Matte stoneware']
  },
  {
    slug: 'field-daypack',
    name: 'Field Daypack',
    category: 'carry',
    price: 165,
    art: 'bag',
    tint: ['#6d5efc', '#0ea5e9'],
    rating: 4.7,
    reviews: 158,
    badge: 'Bestseller',
    blurb: 'One bag, every day, for years.',
    description:
      'Twenty-two litres of recycled sailcloth with a padded laptop sleeve and a magnetic roll-top. Weatherproof, lifetime-guaranteed and quietly handsome.',
    colors: ['Black', 'Olive', 'Sand'],
    features: ['22L recycled sailcloth', '16" laptop sleeve', 'Magnetic roll-top', 'Lifetime guarantee']
  },
  {
    slug: 'terra-bottle',
    name: 'Terra Insulated Bottle',
    category: 'carry',
    price: 38,
    art: 'bottle',
    tint: ['#22d3ee', '#22b07d'],
    rating: 4.6,
    reviews: 203,
    blurb: 'Cold for a day, hot for half of one.',
    description:
      'Triple-wall vacuum steel keeps drinks cold for 24 hours and hot for 12. A leak-proof cap and a powder-coated grip that never sweats.',
    colors: ['Sage', 'Clay', 'Graphite', 'Ivory'],
    features: ['24h cold / 12h hot', 'Leak-proof cap', 'Powder-coated', '620ml']
  },
  {
    slug: 'ora-watch',
    name: 'Ora Minimal Watch',
    category: 'carry',
    price: 199,
    compareAt: 240,
    art: 'watch',
    tint: ['#0f172a', '#6d5efc'],
    rating: 4.8,
    reviews: 121,
    blurb: 'Tells the time and nothing else.',
    description:
      'A 38mm brushed-steel case, sapphire crystal and a dial stripped to its essentials. Swiss movement, interchangeable straps, water-resistant to 50m.',
    colors: ['Silver', 'Black', 'Gold'],
    features: ['38mm steel case', 'Sapphire crystal', 'Swiss movement', '50m water resistance']
  },
  {
    slug: 'frame-camera',
    name: 'Frame Instant Camera',
    category: 'carry',
    price: 149,
    art: 'camera',
    tint: ['#f0466e', '#6d5efc'],
    rating: 4.5,
    reviews: 88,
    badge: 'New',
    blurb: 'Prints the moment, right now.',
    description:
      'Point, shoot and hold a credit-card-sized print in sixty seconds. A fixed 34mm lens, a built-in mirror for selfies and a rechargeable pack good for a hundred shots.',
    colors: ['Cream', 'Mint', 'Charcoal'],
    features: ['Instant prints', '34mm lens', 'Selfie mirror', '100 shots per charge']
  },
  {
    slug: 'stride-runners',
    name: 'Stride Everyday Runners',
    category: 'wear',
    price: 128,
    art: 'sneaker',
    tint: ['#6d5efc', '#f0466e'],
    rating: 4.6,
    reviews: 311,
    badge: 'Bestseller',
    blurb: 'Light, springy, go-anywhere.',
    description:
      'A knit upper from recycled bottles over a sugarcane-foam sole. Breathable, machine-washable and light enough to forget you’re wearing them.',
    colors: ['Bone', 'Storm', 'Clay', 'Black'],
    features: ['Recycled knit upper', 'Sugarcane foam', 'Machine-washable', '240g per shoe']
  },
  {
    slug: 'vellum-mug',
    name: 'Vellum Ceramic Mug',
    category: 'living',
    price: 24,
    art: 'mug',
    tint: ['#f59e0b', '#22b07d'],
    rating: 4.7,
    reviews: 264,
    blurb: 'The one you reach for first.',
    description:
      'Thrown from speckled stoneware with a thumb-rest handle and a reactive glaze that makes every piece a little different. Holds 350ml and loves the dishwasher.',
    colors: ['Oat', 'Sage', 'Rust'],
    features: ['350ml', 'Speckled stoneware', 'Reactive glaze', 'Dishwasher-safe']
  }
]

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null
}

export function related(slug, n = 4) {
  const current = getProduct(slug)
  if (!current) return products.slice(0, n)
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === current.category) - (a.category === current.category))
    .slice(0, n)
}

export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n)
