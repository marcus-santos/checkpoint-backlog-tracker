import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckpointLogo } from '@/components/ui/checkpoint-logo'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="absolute inset-0 h-screen flex justify-center bg-linear-to-tl from-background via-background to-secondary">
      <section className="m-auto bg-background/40 backdrop:backdrop-blur-3xl border-border border flex h-fit p-6 md:p-10 rounded-xl flex-col justify-center gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <CheckpointLogo size="text-lg" />
        </Link>
        <form
          action="post"
          className="x-lg md:w-lg border-border border-b pb-3"
        >
          <Field>
            <FieldSet>
              <FieldLegend className=" font-semibold">
                Welcome Back, Adventurer!
              </FieldLegend>
              <FieldGroup className="flex flex-col gap-4 mt-4">
                <FieldLabel>Username</FieldLabel>
                <Input placeholder="example-user"></Input>
                <FieldLabel>Password</FieldLabel>
                <Input placeholder="Password" type="password"></Input>
                <Button
                  type="submit"
                  variant="secondary"
                  className="hover:bg-primary hover:cursor-pointer"
                >
                  Login
                </Button>
              </FieldGroup>
            </FieldSet>
          </Field>
        </form>
        <span>
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </span>
      </section>
    </div>
  )
}
