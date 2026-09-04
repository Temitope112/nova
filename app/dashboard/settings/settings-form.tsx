"use client";

import { useFormStatus } from "react-dom";
import {
  Bell,
  Clock3,
  MapPin,
  PackageSearch,
} from "lucide-react";

import { updatePreferences } from "./actions";

type SettingsFormProps = {
  flightUpdates: boolean;
  gateChanges: boolean;
  journeyReminders: boolean;
  lostFoundUpdates: boolean;
};

export default function SettingsForm({
  flightUpdates,
  gateChanges,
  journeyReminders,
  lostFoundUpdates,
}: SettingsFormProps) {
  return (
    <form
      action={updatePreferences}
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#111820]/10
        bg-white/70
      "
    >
      <div className="border-b border-[#111820]/10 p-6 sm:p-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Notifications
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
          What should NOVA keep you updated on?
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#111820]/60">
          Choose the airport updates that matter to
          your journey.
        </p>
      </div>

      <div>
        <SettingToggle
          name="flight_updates"
          icon={<Bell className="h-4 w-4" />}
          title="Flight updates"
          description="Receive important changes related to flights you follow."
          defaultChecked={flightUpdates}
        />

        <SettingToggle
          name="gate_changes"
          icon={<MapPin className="h-4 w-4" />}
          title="Gate changes"
          description="Get notified when the gate assigned to your flight changes."
          defaultChecked={gateChanges}
        />

        <SettingToggle
          name="journey_reminders"
          icon={<Clock3 className="h-4 w-4" />}
          title="Journey reminders"
          description="Receive useful reminders as your airport journey approaches."
          defaultChecked={journeyReminders}
        />

        <SettingToggle
          name="lost_found_updates"
          icon={
            <PackageSearch className="h-4 w-4" />
          }
          title="Lost & Found updates"
          description="Receive updates when the status of your lost-item report changes."
          defaultChecked={lostFoundUpdates}
          last
        />
      </div>

      <div className="flex justify-end border-t border-[#111820]/10 p-6 sm:p-8">
        <SaveButton />
      </div>
    </form>
  );
}

function SettingToggle({
  name,
  icon,
  title,
  description,
  defaultChecked,
  last = false,
}: {
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  defaultChecked: boolean;
  last?: boolean;
}) {
  return (
    <label
      className={`
        flex
        cursor-pointer
        items-center
        justify-between
        gap-6
        p-6
        transition
        hover:bg-[#111820]/[0.02]
        sm:p-8

        ${
          !last
            ? "border-b border-[#111820]/10"
            : ""
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#315b78]/10
            text-[#315b78]
          "
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#111820]">
            {title}
          </p>

          <p className="mt-1 max-w-lg text-xs leading-5 text-[#111820]/50">
            {description}
          </p>
        </div>
      </div>

      <div className="relative shrink-0">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />

        <div
          className="
            h-6
            w-11
            rounded-full
            bg-[#111820]/15

            transition

            peer-checked:bg-[#315b78]
          "
        />

        <div
          className="
            absolute
            left-1
            top-1

            h-4
            w-4

            rounded-full
            bg-white

            shadow-sm

            transition-transform

            peer-checked:translate-x-5
          "
        />
      </div>
    </label>
  );
}

function SaveButton() {
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
        : "Save preferences"}
    </button>
  );
}