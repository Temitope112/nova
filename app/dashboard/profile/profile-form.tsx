"use client";

import { useFormStatus } from "react-dom";
import {
  Mail,
  UserRound,
} from "lucide-react";

import { updateProfile } from "./actions";

type ProfileFormProps = {
  fullName: string;
  email: string;
};

export default function ProfileForm({
  fullName,
  email,
}: ProfileFormProps) {
  return (
    <form
      action={updateProfile}
      className="
        rounded-[28px]
        border
        border-[#111820]/10
        bg-white/70
        p-6
        sm:p-8
      "
    >
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Personal details
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
          Your information.
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#111820]/60">
          Keep your passenger profile accurate
          across NOVA.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <div>
          <label
            htmlFor="full_name"
            className="text-xs font-semibold text-[#111820]"
          >
            Full name
          </label>

          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#111820]/10 bg-[#faf9f6] px-4">
            <UserRound className="h-4 w-4 text-[#315b78]" />

            <input
              id="full_name"
              name="full_name"
              defaultValue={fullName}
              required
              className="
                w-full
                bg-transparent
                py-3.5
                text-sm
                text-[#111820]
                outline-none
              "
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-xs font-semibold text-[#111820]"
          >
            Email address
          </label>

          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#111820]/10 bg-[#111820]/[0.025] px-4">
            <Mail className="h-4 w-4 text-[#111820]/35" />

            <input
              id="email"
              value={email}
              disabled
              className="
                w-full
                bg-transparent
                py-3.5
                text-sm
                text-[#111820]/55
                outline-none
                disabled:cursor-not-allowed
              "
            />
          </div>

          <p className="mt-2 text-[11px] leading-5 text-[#111820]/45">
            Email is managed through your secure
            NOVA account.
          </p>
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        rounded-full
        bg-[#111820]
        px-6
        py-3
        text-sm
        font-semibold
        !text-white
        transition
        hover:bg-[#315b78]
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {pending
        ? "Saving..."
        : "Save changes"}
    </button>
  );
}