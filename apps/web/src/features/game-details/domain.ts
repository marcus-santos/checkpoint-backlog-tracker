import type { UserGameStatus } from './types'

const reviewableStatuses: UserGameStatus[] = [
  'ongoing',
  'paused',
  'dropped',
  'completed',
]

export function canReview(status: UserGameStatus) {
  return reviewableStatuses.includes(status)
}

export function getReviewEligibilityMessage(status: UserGameStatus) {
  if (canReview(status)) {
    return null
  }

  return 'You can review this game after marking it as ongoing, paused, dropped, or completed in your library.'
}

export const userGameStatusLabels: Record<UserGameStatus, string> = {
  'not-started': 'Not started',
  ongoing: 'Ongoing',
  paused: 'Paused',
  dropped: 'Dropped',
  completed: 'Completed',
}
