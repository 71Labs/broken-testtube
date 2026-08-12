"use client";

import { useActionState, useState } from "react";
import { signIn, signUp } from "../actions";

export function LoginForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const action = mode === "in" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-6 py-16">
      <a href="/" className="font-wordmark text-lg font-medium tracking-tight text-neutral-950">
        71labs
      </a>
      <h1 className="mt-8 text-2xl font-medium tracking-tight text-neutral-950">
        {mode === "in" ? "Sign in to the panel" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        {mode === "in"
          ? "Welcome back. Enter your work credentials."
          : "Use your work email. An admin can grant you access after."}
      </p>

      <form action={formAction} className="mt-8 space-y-3">
        {mode === "up" && (
          <Field name="full_name" label="Full name" type="text" placeholder="Ada Okafor" required />
        )}
        <Field name="email" label="Email" type="email" placeholder="you@71labs.xyz" required />
        <Field name="password" label="Password" type="password" placeholder="••••••••" required />

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full rounded-lg bg-neutral-950 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
        >
          {pending ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "in" ? "up" : "in")}
        className="mt-6 text-sm text-neutral-500 hover:text-neutral-950"
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
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-neutral-600">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
      />
    </label>
  );
}
