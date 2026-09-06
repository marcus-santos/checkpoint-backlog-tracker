import {
  type CatalogGame,
  GameCatalog,
} from '@/features/discovery/components/game-catalog'
import {
  RecommendationCarousel,
  type TrendingGame,
} from '@/features/discovery/components/recomendation-carousel'
import {
  type TrendingCardGame,
  TrendingCards,
} from '@/features/discovery/components/trending-cards'

const trendingGames: TrendingGame[] = [
  {
    id: 1,
    title: 'Alan Wake 2',
    cover: '/games/alan-wake-cover.avif',
    developer: 'Remedy Entertainment',
    releaseYear: 2023,
    genres: ['Psychological Horror', 'Action'],
    platforms: ['PS5', 'PC', 'Xbox Series X'],
    rating: 4.8,
    ratingCount: '9.8k',
    timeToBeat: '18h main story',
    matchPercentage: 98,
    flavor: 'Personalized for your horror taste',
  },
  {
    id: 2,
    title: 'Lies of P',
    cover: '/games/lies-of-p-cover.avif',
    developer: 'NEOWIZ',
    releaseYear: 2023,
    genres: ['Action RPG', 'Soulslike'],
    platforms: ['PS5', 'PC', 'Xbox Series X'],
    rating: 4.7,
    ratingCount: '7.4k',
    timeToBeat: '32h main story',
    matchPercentage: 96,
    flavor: 'Built for your RPG taste',
    statusLabel: 'Next up',
  },
  {
    id: 3,
    title: 'Sifu',
    cover: '/games/sifu-cover.avif',
    developer: 'Sloclap',
    releaseYear: 2022,
    genres: ['Action', 'Beat ’em up'],
    platforms: ['PS5', 'PC'],
    rating: 4.6,
    ratingCount: '5.1k',
    timeToBeat: '9h main story',
    matchPercentage: 94,
    flavor: 'Personalized for your action taste',
    statusLabel: 'Trending',
  },
  {
    id: 4,
    title: 'Batman: Arkham Knight',
    cover: '/games/batman-cover.avif',
    developer: 'Rocksteady Studios',
    releaseYear: 2015,
    genres: ['Action', 'Open World'],
    platforms: ['PS5', 'PC'],
    rating: 4.5,
    ratingCount: '12.6k',
    timeToBeat: '16h main story',
    matchPercentage: 91,
    flavor: 'Personalized for your action taste',
  },
]

const spotlightGames: TrendingCardGame[] = [
  {
    id: 11,
    title: 'Black Myth: Wukong',
    cover: '/games/hollow-cover.avif',
    releaseYear: 2024,
    platforms: 'PC, PS5',
    rating: 4.8,
    weeklyLogCount: '24.5k',
  },
  {
    id: 12,
    title: 'Hades II',
    cover: '/games/re9-cover.avif',
    releaseYear: 2024,
    platforms: 'PC, Deck',
    rating: 4.9,
    weeklyLogCount: '18.2k',
  },
  {
    id: 13,
    title: "Baldur's Gate 3",
    cover: '/games/dbz.avif',
    releaseYear: 2023,
    platforms: 'PC, PS5, Xbox',
    rating: 4.9,
    weeklyLogCount: '41.8k',
  },
  {
    id: 14,
    title: 'Helldivers 2',
    cover: '/games/crash-cover.avif',
    releaseYear: 2024,
    platforms: 'PC, PS5',
    rating: 4.6,
    weeklyLogCount: '32.1k',
  },
  {
    id: 15,
    title: 'Like a Dragon: IW',
    cover: '/games/runescape-cover.avif',
    releaseYear: 2024,
    platforms: 'Multi-platform',
    rating: 4.7,
    weeklyLogCount: '12.4k',
  },
  {
    id: 16,
    title: 'Balatro',
    cover: '/games/sifu-cover.avif',
    releaseYear: 2024,
    platforms: 'PC, Switch, Mobile',
    rating: 4.9,
    weeklyLogCount: '29.9k',
  },
]

const catalogGames: CatalogGame[] = [
  {
    id: 21,
    title: 'The Witcher 3: Wild Hunt',
    cover: '/games/hollow-cover.avif',
    genres: ['RPG', 'Open World'],
    platforms: ['PC', 'PS5', 'Xbox', 'Switch'],
    rating: 4.9,
    releaseYear: 2015,
    status: 'available',
  },
  {
    id: 22,
    title: 'Cyberpunk 2077',
    cover: '/games/alan-wake-cover.avif',
    genres: ['RPG', 'Action'],
    platforms: ['PC', 'PS5', 'Xbox Series'],
    rating: 4.7,
    releaseYear: 2020,
    status: 'backlog',
  },
  {
    id: 23,
    title: 'Stardew Valley',
    cover: '/games/runescape-cover.avif',
    genres: ['Simulation', 'Indie'],
    platforms: ['PC', 'Switch', 'Mobile'],
    rating: 4.9,
    releaseYear: 2016,
    status: 'available',
  },
  {
    id: 24,
    title: 'Persona 3 Reload',
    cover: '/games/dbz.avif',
    genres: ['RPG', 'Strategy'],
    platforms: ['PC', 'PS5', 'Xbox Series'],
    rating: 4.8,
    releaseYear: 2024,
    status: 'available',
  },
  {
    id: 25,
    title: 'Alan Wake 2',
    cover: '/games/alan-wake-cover.avif',
    genres: ['Action', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox Series'],
    rating: 4.8,
    releaseYear: 2023,
    status: 'available',
  },
  {
    id: 26,
    title: 'Ghost of Tsushima',
    cover: '/games/batman-cover.avif',
    genres: ['Action', 'Open World'],
    platforms: ['PC', 'PS5'],
    rating: 4.8,
    releaseYear: 2020,
    status: 'playing',
    progress: 'Playing (32h)',
  },
  {
    id: 27,
    title: 'Hollow Knight: Silksong',
    cover: '/games/hollow-cover.avif',
    genres: ['Indie', 'Adventure'],
    platforms: ['PC', 'Switch', 'Xbox'],
    rating: 4.9,
    releaseYear: 2025,
    status: 'wishlist',
  },
  {
    id: 28,
    title: 'Monster Hunter Wilds',
    cover: '/games/re9-cover.avif',
    genres: ['Action', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox Series'],
    rating: 4.7,
    releaseYear: 2025,
    status: 'upcoming',
  },
]

function DiscoveryPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <RecommendationCarousel games={trendingGames} />
      <TrendingCards games={spotlightGames} totalCount={24} />
      <GameCatalog games={catalogGames} totalCount={18420} />
    </main>
  )
}

export default DiscoveryPage
