import { BacklogList } from '@/features/dashboard/components/backlog-list'
import { CurrentlyPlaying } from '@/features/dashboard/components/currently-playing'
import { DailyMissionsCard } from '@/features/dashboard/components/daily-missions-card'
import { ProfileCard } from '@/features/dashboard/components/profile-card'
import { StatisticsOverviewGraphic } from '@/features/dashboard/components/statistics-overview-graphic'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileCard />
      <div className="mx-auto mt-5 grid w-full max-w-7xl grid-cols-1 gap-5 px-4 pb-4 lg:grid-cols-4 lg:px-0">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-1">
          <DailyMissionsCard />
          <BacklogList />
        </div>
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-3 lg:row-span-2 lg:h-full">
          <CurrentlyPlaying />
          <StatisticsOverviewGraphic />
        </div>
      </div>
    </div>
  )
}
