import { Button } from "@/components/ui/button";
import { CheckpointLogo } from "@/components/ui/checkpoint-logo";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
	return (
		<div className="absolute inset-0 h-screen flex justify-center bg-linear-to-tl from-background via-background to-secondary">
			<section className="m-auto bg-background/40 backdrop:backdrop-blur-3xl border-border border flex h-fit p-6 md:p-10 rounded-xl flex-col justify-center gap-6">
				<div className="flex pb-3 border-b border-border">
					<Link href="/" className="flex items-center gap-2.5">
						<CheckpointLogo size="text-lg" />
					</Link>
				</div>
				<form
					action="post"
					className="x-lg md:w-lg border-border border-b pb-3"
				>
					<Field>
						<FieldSet>
							<FieldLegend className=" font-semibold">
								First Time Here? Create an account to get started!
							</FieldLegend>
							<FieldGroup className="flex flex-col gap-4 mt-4">
								<FieldLabel>Username</FieldLabel>
								<Input placeholder="example-user"></Input>
								<FieldLabel>Email</FieldLabel>
								<Input placeholder="email@example.com"></Input>
								<FieldLabel>Password</FieldLabel>
								<Input
									placeholder="Enter your password"
									type="password"
								></Input>
								<FieldLabel>Confirm Password</FieldLabel>
								<Input
									placeholder="Confirm your password"
									type="password"
								></Input>
								<Button
									type="submit"
									variant="secondary"
									className="hover:bg-primary hover:cursor-pointer"
								>
									Register
								</Button>
							</FieldGroup>
						</FieldSet>
					</Field>
				</form>
				<span>
					Already have an account?{" "}
					<Link href="/login" className="text-blue-400 hover:underline">
						Sign in
					</Link>
				</span>
			</section>
		</div>
	);
}
