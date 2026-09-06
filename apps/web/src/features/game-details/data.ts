import type { GameDetails } from './types'

const sharedMedia = [
  {
    id: 'trailer',
    type: 'trailer' as const,
    title: 'Official cinematic trailer',
    image: '/games/alan-wake-cover.avif',
    duration: '2:45',
  },
  {
    id: 'boss-fight',
    type: 'screenshot' as const,
    title: 'Boss fight screenshot',
    image: '/games/lies-of-p-cover.avif',
  },
  {
    id: 'sanctuary',
    type: 'screenshot' as const,
    title: 'Sanctuary hub screenshot',
    image: '/games/sifu-cover.avif',
  },
  {
    id: 'combat',
    type: 'screenshot' as const,
    title: 'Combat screenshot',
    image: '/games/batman-cover.avif',
  },
]

const baseGame: GameDetails = {
  id: 'alan-wake-2',
  title: 'Alan Wake 2',
  cover: '/games/alan-wake-cover.avif',
  backdrop: '/games/alan-wake-cover.avif',
  developer: 'Remedy Entertainment',
  publisher: 'Epic Games Publishing',
  releaseDate: 'Released October 27, 2023',
  certification: 'ESRB M 17+',
  platforms: ['PC', 'PlayStation 5', 'Xbox Series X|S'],
  genres: ['Survival Horror', 'Action'],
  themes: ['Psychological Horror', 'Mystery'],
  gameModes: ['Single-player'],
  engine: 'Northlight Engine',
  checkpointId: '#CP-ALAN-0002',
  officialSite: 'alanwake.com',
  igdbScore: 89,
  scoreLabel: 'Universal acclaim',
  communityRating: 4.8,
  reviewCount: 9840,
  completedCount: 6120,
  status: 'not-started',
  loggedHours: 0,
  synopsis:
    'Two protagonists become trapped in a nightmare shaped by a mysterious horror story. Investigate the impossible, survive the darkness, and find a way back to reality.',
  overview:
    'Alan Wake 2 combines investigative storytelling with tense survival horror. Explore a shifting Pacific Northwest, uncover hidden clues, and move between two connected stories as the supernatural threat grows.',
  media: sharedMedia,
  features: [
    {
      title: 'Dynamic horror encounters',
      description:
        'Unpredictable threats and shifting spaces keep every investigation dangerous.',
      icon: 'swords',
      tone: 'primary',
    },
    {
      title: 'Connected dual protagonists',
      description:
        'Follow two distinct investigations that converge in unexpected ways.',
      icon: 'users',
      tone: 'secondary',
    },
    {
      title: 'Layered mystery',
      description:
        'Piece together environmental clues, manuscripts, and hidden story fragments.',
      icon: 'book',
      tone: 'success',
    },
    {
      title: 'Resourceful survival',
      description:
        'Balance light, ammunition, and exploration while choosing when to push forward.',
      icon: 'sliders',
      tone: 'warning',
    },
  ],
  stores: [
    {
      name: 'Epic Games Store',
      edition: 'Digital download',
      price: '$49.99',
      discount: '-15%',
      previousPrice: '$59.99',
      icon: 'epic',
      href: '#',
    },
    {
      name: 'PlayStation Store',
      edition: 'PS5 digital edition',
      price: '$59.99',
      icon: 'playstation',
      href: '#',
    },
    {
      name: 'Xbox Games Store',
      edition: 'Series X|S optimized',
      price: '$59.99',
      icon: 'xbox',
      href: '#',
    },
  ],
  timeToBeat: [
    { label: 'Main story', hours: 18, percentage: 30, tone: 'success' },
    { label: 'Main + extras', hours: 24, percentage: 58, tone: 'secondary' },
    { label: 'Completionist', hours: 32, percentage: 100, tone: 'primary' },
  ],
  communityActivity: {
    members: 4280,
    playing: 1820,
    queued: 1450,
    completed: 790,
    difficulty: '8.4/10 Challenging',
  },
  ratingDistribution: [
    { stars: 5, percentage: 82, tone: 'success' },
    { stars: 4, percentage: 12, tone: 'success' },
    { stars: 3, percentage: 4, tone: 'warning' },
    { stars: 2, percentage: 1, tone: 'primary' },
    { stars: 1, percentage: 1, tone: 'primary' },
  ],
  reviews: [
    {
      id: 'review-1',
      author: 'Valkyrie_Nine',
      initials: 'VN',
      badge: '100% Platinum',
      metadata: 'Finished in 18.2 hrs • PS5 • 3 days ago',
      rating: 5,
      body: 'A masterclass in atmosphere. Every location feels deliberately composed, and the investigation mechanics made me slow down and notice details I would normally miss.',
      helpfulCount: 142,
      replyCount: 18,
      avatarTone: 'secondary',
    },
    {
      id: 'review-2',
      author: 'NeonRonin',
      initials: 'NR',
      badge: 'Active Runner',
      metadata: '22.4 hrs logged • PC • 1 week ago',
      rating: 4.5,
      body: 'The art direction and sound design are exceptional. The combat takes a little time to click, but the tension it creates makes every resource decision matter.',
      helpfulCount: 89,
      replyCount: 7,
      avatarTone: 'primary',
    },
  ],
}

const gameDetailsById: Record<string, GameDetails> = {
  'alan-wake-2': baseGame,
  '1': baseGame,
  '25': baseGame,
}

export function getGameDetails(gameId: string) {
  const game = gameDetailsById[gameId]
  if (game) {
    return game
  }

  return {
    ...baseGame,
    id: gameId,
    status: 'not-started' as const,
    loggedHours: 0,
  }
}
