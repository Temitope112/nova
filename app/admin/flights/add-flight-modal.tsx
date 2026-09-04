"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  Loader2,
  Plane,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";
import { FLIGHT_STATUSES } from "./constants";

type AddFlightModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialForm = {
  flightNumber: "",
  airlineName: "",
  airlineCode: "",
  originCode: "",
  originCity: "",
  destinationCode: "",
  destinationCity: "",
  departureAt: "",
  arrivalAt: "",
  terminal: "",
  gate: "",
  status: "scheduled",
};

export default function AddFlightModal({
  open,
  onClose,
}: AddFlightModalProps) {
  const router = useRouter();

  const [form, setForm] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !loading
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose, loading]);

  if (!open) {
    return null;
  }

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleClose = () => {
    if (loading) return;

    setError("");
    setSuccess("");
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.status) {
      setError(
        "Select a valid flight status."
      );
      setLoading(false);
      return;
    }

    const validStatus =
      FLIGHT_STATUSES.includes(
        form.status as
          (typeof FLIGHT_STATUSES)[number]
      );

    if (!validStatus) {
      setError(
        "The selected flight status is invalid."
      );
      setLoading(false);
      return;
    }

    if (
      !form.flightNumber.trim() ||
      !form.airlineName.trim() ||
      !form.originCode.trim() ||
      !form.originCity.trim() ||
      !form.destinationCode.trim() ||
      !form.destinationCity.trim() ||
      !form.departureAt
    ) {
      setError(
        "Please complete all required fields."
      );
      setLoading(false);
      return;
    }

    const departureDate = new Date(
      form.departureAt
    );

    const arrivalDate = form.arrivalAt
      ? new Date(form.arrivalAt)
      : null;

    if (
      Number.isNaN(
        departureDate.getTime()
      )
    ) {
      setError(
        "Enter a valid departure date."
      );
      setLoading(false);
      return;
    }

    if (
      arrivalDate &&
      Number.isNaN(
        arrivalDate.getTime()
      )
    ) {
      setError(
        "Enter a valid arrival date."
      );
      setLoading(false);
      return;
    }

    if (
      arrivalDate &&
      arrivalDate <= departureDate
    ) {
      setError(
        "Arrival must be after departure."
      );
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error: insertError } =
      await supabase
        .from("flights")
        .insert({
          flight_number:
            form.flightNumber
              .trim()
              .toUpperCase(),

          airline_name:
            form.airlineName.trim(),

          airline_code:
            form.airlineCode.trim()
              ? form.airlineCode
                  .trim()
                  .toUpperCase()
              : null,

          origin_code:
            form.originCode
              .trim()
              .toUpperCase(),

          origin_city:
            form.originCity.trim(),

          destination_code:
            form.destinationCode
              .trim()
              .toUpperCase(),

          destination_city:
            form.destinationCity.trim(),

          departure_at:
            departureDate.toISOString(),

          arrival_at: arrivalDate
            ? arrivalDate.toISOString()
            : null,

          terminal:
            form.terminal.trim() || null,

          gate:
            form.gate
              .trim()
              .toUpperCase() || null,

          status: form.status,
        });

    if (insertError) {
      console.error(
        "Add flight error:",
        insertError
      );

      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Flight added successfully."
    );

    setForm(initialForm);

    router.refresh();

    setTimeout(() => {
      setLoading(false);
      setSuccess("");
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleClose}
        className="absolute inset-0 bg-[#111820]/65 backdrop-blur-[3px]"
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-[820px] overflow-y-auto rounded-[28px] bg-[#f5f2eb] shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#111820]/10 bg-[#f5f2eb]/95 px-6 py-6 backdrop-blur-xl sm:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111820]">
              <Plane className="h-4 w-4 text-white" />
            </span>

            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
                Flight Operations
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
                Add flight
              </h2>

              <p className="mt-2 text-sm text-[#111820]/55">
                Create a new flight record
                in the NOVA operations
                system.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#111820]/10 text-[#111820]/60 transition hover:bg-[#111820]/5 hover:text-[#111820] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8"
        >
          {/* FLIGHT IDENTITY */}
          <FormSection
            eyebrow="Flight identity"
            title="Flight information"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Flight number"
                required
              >
                <input
                  required
                  value={form.flightNumber}
                  onChange={(e) =>
                    updateField(
                      "flightNumber",
                      e.target.value
                    )
                  }
                  placeholder="NOV 204"
                  className={inputStyles}
                />
              </Field>

              <Field
                label="Airline"
                required
              >
                <input
                  required
                  value={form.airlineName}
                  onChange={(e) =>
                    updateField(
                      "airlineName",
                      e.target.value
                    )
                  }
                  placeholder="NOVA Air"
                  className={inputStyles}
                />
              </Field>

              <Field label="Airline code">
                <input
                  value={form.airlineCode}
                  onChange={(e) =>
                    updateField(
                      "airlineCode",
                      e.target.value
                    )
                  }
                  placeholder="NV"
                  maxLength={5}
                  className={inputStyles}
                />
              </Field>

              <Field
                label="Status"
                required
              >
                <select
                  required
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value
                    )
                  }
                  className={inputStyles}
                >
                  {FLIGHT_STATUSES.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {formatStatus(
                          status
                        )}
                      </option>
                    )
                  )}
                </select>
              </Field>
            </div>
          </FormSection>

          {/* ROUTE */}
          <FormSection
            eyebrow="Route"
            title="Origin and destination"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Origin airport code"
                required
              >
                <input
                  required
                  value={form.originCode}
                  onChange={(e) =>
                    updateField(
                      "originCode",
                      e.target.value
                    )
                  }
                  placeholder="LOS"
                  maxLength={4}
                  className={inputStyles}
                />
              </Field>

              <Field
                label="Origin city"
                required
              >
                <input
                  required
                  value={form.originCity}
                  onChange={(e) =>
                    updateField(
                      "originCity",
                      e.target.value
                    )
                  }
                  placeholder="Lagos"
                  className={inputStyles}
                />
              </Field>

              <Field
                label="Destination code"
                required
              >
                <input
                  required
                  value={
                    form.destinationCode
                  }
                  onChange={(e) =>
                    updateField(
                      "destinationCode",
                      e.target.value
                    )
                  }
                  placeholder="ABV"
                  maxLength={4}
                  className={inputStyles}
                />
              </Field>

              <Field
                label="Destination city"
                required
              >
                <input
                  required
                  value={
                    form.destinationCity
                  }
                  onChange={(e) =>
                    updateField(
                      "destinationCity",
                      e.target.value
                    )
                  }
                  placeholder="Abuja"
                  className={inputStyles}
                />
              </Field>
            </div>
          </FormSection>

          {/* SCHEDULE */}
          <FormSection
            eyebrow="Schedule"
            title="Departure and arrival"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Departure"
                required
              >
                <input
                  required
                  type="datetime-local"
                  value={form.departureAt}
                  onChange={(e) =>
                    updateField(
                      "departureAt",
                      e.target.value
                    )
                  }
                  className={inputStyles}
                />
              </Field>

              <Field label="Arrival">
                <input
                  type="datetime-local"
                  value={form.arrivalAt}
                  onChange={(e) =>
                    updateField(
                      "arrivalAt",
                      e.target.value
                    )
                  }
                  className={inputStyles}
                />
              </Field>
            </div>
          </FormSection>

          {/* AIRPORT ASSIGNMENT */}
          <FormSection
            eyebrow="Airport assignment"
            title="Terminal and gate"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Terminal">
                <input
                  value={form.terminal}
                  onChange={(e) =>
                    updateField(
                      "terminal",
                      e.target.value
                    )
                  }
                  placeholder="1"
                  className={inputStyles}
                />
              </Field>

              <Field label="Gate">
                <input
                  value={form.gate}
                  onChange={(e) =>
                    updateField(
                      "gate",
                      e.target.value
                    )
                  }
                  placeholder="A12"
                  className={inputStyles}
                />
              </Field>
            </div>
          </FormSection>

          {/* FEEDBACK */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.07] px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#111820]/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-full border border-[#111820]/15 px-5 py-3 text-sm font-semibold text-[#111820] transition hover:bg-[#111820]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111820] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding flight...
                </>
              ) : (
                <>
                  <Plane className="h-4 w-4" />
                  Add flight
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#111820]/10 py-7 first:pt-0 last:border-b-0">
      <div className="mb-5">
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[#111820]">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#111820]/65">
        {label}

        {required && (
          <span className="ml-1 text-[#e8a735]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

const inputStyles =
  "h-12 w-full rounded-xl border border-[#111820]/10 bg-white px-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/35 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10";

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}