import Image from 'next/image'
import { Field, FieldLabel } from '@/components/ui/field'
import { Progress } from '@/components/ui/progress'

export function ProfileCard() {
  return (
    <section className="mx-auto h-fit max-w-7xl mt-26">
      <div className="relative w-full h-fit rounded-2xl border-2 border-border bg-card">
        <div className="relative w-full h-46 overflow-hidden rounded-t-2xl">
          <Image
            src="/profile.jpg"
            alt="profile picture"
            width={128}
            height={128}
            className="object-cover w-full h-46"
          />
        </div>
        <div className="absolute left-6 top-46 -translate-y-1/3">
          <Image
            src="/profile.jpg"
            alt="profile picture"
            width={96}
            height={96}
            className="object-cover size-24 rounded-xl border-2 border-primary bg-card p-0.5 "
          />
        </div>

        <div className="h-64 rounded-b-2xl bg-card flex pt-18 justify-between">
          <div className="flex flex-col pl-7 gap-1 w-1/3">
            <div className="flex gap-2">
              <span className="text-lg font-semibold">imMusashi</span>
              <span className="text-xs flex items-center font-semibold text-primary p-2 h-7 rounded-lg bg-primary/25 border-primary border">
                LVL 42 · VETERAN
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs text-muted-foreground">
                Member since Jan 2022 · PS5 · PC
              </span>
              <Field className="w-4/5">
                <FieldLabel className="text-xs text-muted-foreground">
                  <span className="text-xs text-muted-foreground">
                    XP Progress to Level 43
                  </span>
                  <span className="text-xs text-primary ml-auto">
                    {' '}
                    12,450 / 15,000
                  </span>
                </FieldLabel>
                <Progress value={67} className="w-72 h-1 rounded-full" />
              </Field>
            </div>
          </div>
          <div className="flex gap-2 pr-7">
            <div className="bg-background flex flex-col w-28 h-fit items-center justify-center rounded-xl px-4 py-6">
              <span className="font-semibold">247</span>
              <span className="text-sm font-semibold">Completed</span>
              <span className="text-xs text-muted-foreground">Games</span>
            </div>
            <div className="bg-background flex flex-col w-28 h-fit items-center justify-center rounded-xl px-4 py-6">
              <span className="font-semibold">311</span>
              <span className="text-sm font-semibold">100%</span>
              <span className="text-xs text-muted-foreground">Completions</span>
            </div>
            <div className="bg-background flex flex-col w-28 h-fit items-center justify-center rounded-xl px-4 py-6">
              <span className="font-semibold">1250</span>
              <span className="text-sm font-semibold">Trophies</span>
              <span className="text-xs text-muted-foreground">Earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
