import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

const base =
	"inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
	primary: "bg-accent text-accent-ink hover:brightness-110",
	secondary: "border border-ink/40 text-ink hover:border-ink hover:bg-ink/5",
	ghost: "text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink",
} as const;

const sizes = {
	sm: "h-9 px-4 text-sm",
	md: "h-11 px-6 text-[0.9375rem]",
	lg: "h-13 px-8 text-base",
} as const;

type Style = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClasses({ variant = "primary", size = "md" }: Style = {}, extra?: string) {
	return cn(base, variants[variant], variant !== "ghost" && sizes[size], extra);
}

export function Button({ variant, size, className, type = "button", ...rest }: Style & ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button type={type} className={buttonClasses({ variant, size }, className)} {...rest} />;
}

export function LinkButton({ variant, size, className, ...rest }: Style & ComponentProps<typeof Link>) {
	return <Link className={buttonClasses({ variant, size }, className)} {...rest} />;
}
