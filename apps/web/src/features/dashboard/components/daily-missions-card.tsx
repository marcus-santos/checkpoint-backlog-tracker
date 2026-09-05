import { Medal, Target } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export type DailyMission = {
  id: string
  label: string
  current: number
  target: number
  unit: string
}

export type RecentAchievement = {
  id: string
  text: string
  time: string
}

export const mockDailyMissions: DailyMission[] = [
  {
    id: 'play-session',
    label: 'Complete a play session',
    current: 2,
    target: 3,
    unit: ' sessions',
  },
  {
    id: 'earn-trophies',
    label: 'Earn trophies',
    current: 7,
    target: 10,
    unit: ' trophies',
  },
  {
    id: 'finish-chapter',
    label: 'Finish a game chapter',
    current: 1,
    target: 1,
    unit: ' chapter',
  },
]

export const mockRecentAchievements: RecentAchievement[] = [
  {
    id: 'first-blood',
    text: 'First Blood unlocked in Resident Evil Requiem',
    time: '2 hours ago',
  },
  {
    id: 'combo-master',
    text: 'Combo Master unlocked in Sifu',
    time: 'Yesterday',
  },
]

type DailyMissionsCardProps = {
  missions?: DailyMission[]
  achievements?: RecentAchievement[]
}

export function DailyMissionsCard({
  missions = mockDailyMissions,
  achievements = mockRecentAchievements,
}: DailyMissionsCardProps) {
  return (
    <section className="w-full rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-primary" aria-hidden="true" />
          <h2 className="text-sm font-bold">Weekly Goals</h2>
        </div>

        <div className="flex flex-col gap-3">
          {missions.map((mission) => {
            const percentage = Math.min(
              100,
              Math.round((mission.current / mission.target) * 100)
            )

            return (
              <div key={mission.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate pr-2 text-xs font-medium">
                    {mission.label}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-primary">
                    {mission.current}
                    {mission.unit} / {mission.target}
                    {mission.unit}
                  </span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            )
          })}
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col gap-1">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recent Achievements
          </p>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-2">
              <Medal
                size={12}
                className="mt-0.5 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] leading-snug text-foreground/80">
                  {achievement.text}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {achievement.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
