export type UserGameStatus =
  | 'not-started'
  | 'ongoing'
  | 'paused'
  | 'dropped'
  | 'completed'

export type GameMedia = {
  id: string
  type: 'trailer' | 'screenshot'
  title: string
  image: string
  duration?: string
}

export type GameFeature = {
  title: string
  description: string
  icon: 'swords' | 'users' | 'book' | 'sliders'
  tone: 'primary' | 'secondary' | 'success' | 'warning'
}

export type GameReview = {
  id: string
  author: string
  initials: string
  badge: string
  metadata: string
  rating: number
  body: string
  helpfulCount: number
  replyCount: number
  avatarTone: 'primary' | 'secondary' | 'success'
}

export type GameStore = {
  name: string
  edition: string
  price: string
  previousPrice?: string
  discount?: string
  icon: 'steam' | 'playstation' | 'xbox' | 'epic'
  href: string
}

export type GameTimeToBeat = {
  label: string
  hours: number
  percentage: number
  tone: 'primary' | 'secondary' | 'success' | 'warning'
}

export type GameDetails = {
  id: string
  title: string
  cover: string
  backdrop: string
  developer: string
  publisher: string
  releaseDate: string
  certification: string
  platforms: string[]
  genres: string[]
  themes: string[]
  gameModes: string[]
  engine: string
  checkpointId: string
  officialSite?: string
  igdbScore: number
  scoreLabel: string
  communityRating: number
  reviewCount: number
  completedCount: number
  status: UserGameStatus
  loggedHours: number
  synopsis: string
  overview: string
  media: GameMedia[]
  features: GameFeature[]
  stores: GameStore[]
  timeToBeat: GameTimeToBeat[]
  communityActivity: {
    members: number
    playing: number
    queued: number
    completed: number
    difficulty: string
  }
  ratingDistribution: {
    stars: number
    percentage: number
    tone: GameTimeToBeat['tone']
  }[]
  reviews: GameReview[]
}
