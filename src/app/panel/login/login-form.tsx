"use client";

import { useActionState, useState } from "react";
import { signIn, signUp } from "../actions";
import { Button } from "../_components/ui/button";
import { Logo } from "@/components/site/logo";

export function LoginForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const action = mode === "in" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-6 py-16">
      <a href="/" aria-label="71Labs home">
        <Logo variant="black" size={26} />
      </a>
      <h1 className="mt-8 text-2xl font-medium tracking-tight text-ink text-balance">
        {mode === "in" ? "Sign in to the panel" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-grey">
        {mode === "in"
          ? "Welcome back. Enter your work credentials."
          : "Use your work email. An admin can grant you access after."}
      </p>

      <form action={formAction} className="mt-8 space-y-3">
        {mode === "up" && (
          <Field
            name="full_name"
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Ada Okafor"
            required
          />
        )}
        <Field
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@71labs.xyz"
          required
        />
        <Field
          name="password"
          label="Password"
          type="password"
          autoComplete={mode === "in" ? "current-password" : "new-password"}
          placeholder="••••••••"
          required
        />

        {state?.error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {state.error}
          </p>
        )}

        <Button type="submit" disabled={pending} className="mt-2 w-full py-2.5">
          {pending ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
        </Button>
      </form>

      <button
        onClick={() => setMode(mode === "in" ? "up" : "in")}
        className="mt-6 self-start rounded text-sm text-grey outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
      >
        {mode === "in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}

function Field({
  name,
  label,
  type,
  placeholder,
  required,
  autoComplete,
  inputMode,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-grey-2 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10"
      />
    </label>
  );
}
