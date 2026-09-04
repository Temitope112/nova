"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  CalendarDays,
  MapPin,
  PackageSearch,
} from "lucide-react";

import { createLostFoundReport } from "./actions";

export default function ReportForm() {
  const formRef =
    useRef<HTMLFormElement>(null);

  async function handleAction(
    formData: FormData
  ) {
    await createLostFoundReport(formData);

    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={handleAction}
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
          New report
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
          Tell us what you lost.
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#111820]/60">
          Give us enough detail to help identify
          your item quickly.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <div>
          <label
            htmlFor="item_name"
            className="text-xs font-semibold text-[#111820]"
          >
            Item name
          </label>

          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#111820]/10 bg-[#faf9f6] px-4">
            <PackageSearch className="h-4 w-4 text-[#315b78]" />

            <input
              id="item_name"
              name="item_name"
              required
              placeholder="e.g. Black backpack"
              className="
                w-full
                bg-transparent
                py-3.5
                text-sm
                text-[#111820]
                outline-none
                placeholder:text-[#111820]/30
              "
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-xs font-semibold text-[#111820]"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Brand, colour, contents, markings or anything distinctive..."
            className="
              mt-2
              w-full
              resize-none
              rounded-2xl
              border
              border-[#111820]/10
              bg-[#faf9f6]
              px-4
              py-3.5
              text-sm
              text-[#111820]
              outline-none
              placeholder:text-[#111820]/30
            "
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="location_lost"
              className="text-xs font-semibold text-[#111820]"
            >
              Where did you lose it?
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#111820]/10 bg-[#faf9f6] px-4">
              <MapPin className="h-4 w-4 text-[#315b78]" />

              <input
                id="location_lost"
                name="location_lost"
                placeholder="e.g. Terminal 2 security"
                className="
                  w-full
                  bg-transparent
                  py-3.5
                  text-sm
                  text-[#111820]
                  outline-none
                  placeholder:text-[#111820]/30
                "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="date_lost"
              className="text-xs font-semibold text-[#111820]"
            >
              Date lost
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#111820]/10 bg-[#faf9f6] px-4">
              <CalendarDays className="h-4 w-4 text-[#315b78]" />

              <input
                id="date_lost"
                name="date_lost"
                type="date"
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
        ? "Submitting..."
        : "Submit report"}
    </button>
  );
}