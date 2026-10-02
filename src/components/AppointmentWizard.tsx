"use client";

import { useMemo, useState, type FormEvent } from "react";
import { clinic, telHref, visitReasons, whatsappHref } from "@/lib/clinic";

const STEPS = ["Need", "Date", "Time", "Details", "Request"] as const;

function todayInKolkata() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isSunday(value: string) {
  if (!value) return false;
  const date = new Date(`${value}T12:00:00+05:30`);
  return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "short" }).format(date) === "Sun";
}

export function AppointmentWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappSame, setWhatsappSame] = useState(true);
  const [whatsapp, setWhatsapp] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const sunday = isSunday(date);
  const minDate = useMemo(() => todayInKolkata(), []);

  function goNext() {
    setError("");
    if (step === 0 && !reason) return setError("Please choose what you would like help with.");
    if (step === 1 && (!date || date < minDate)) return setError("Please choose today or a later date.");
    if (step === 2 && !time) return setError("Please choose a preferred time.");
    if (step === 2 && sunday && time.startsWith("Evening")) {
      return setError("Evening appointments are available Monday to Saturday.");
    }
    setStep((value) => Math.min(value + 1, STEPS.length - 1));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const whatsappDigits = (whatsappSame ? phone : whatsapp).replace(/\D/g, "");
    if (!name.trim()) return setError("Please enter your name.");
    if (digits.length !== 10) return setError("Please enter a 10-digit mobile number.");
    if (whatsappDigits.length !== 10) return setError("Please enter a 10-digit WhatsApp number.");
    if (!reason || !date || !time) return setError("Please complete each step of the request.");

    const message = [
      clinic.whatsappPrefill,
      `Name: ${name.trim()}`,
      `Phone: ${digits}`,
      `WhatsApp: ${whatsappDigits}`,
      `Reason: ${reason}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
    ].join("\n");

    const href = whatsappHref(message);
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = href;
    setError("");
    setSent(true);
    setStep(4);
  }

  return (
    <form className="wizard" onSubmit={onSubmit} noValidate>
      <ol className="wizard-steps" aria-label="Appointment request steps">
        {STEPS.map((label, index) => (
          <li key={label} className={index === step ? "is-active" : index < step ? "is-done" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <fieldset className="wizard-panel">
          <legend>What would you like help with?</legend>
          <div className="wizard-choices">
            {visitReasons.map((item) => (
              <label key={item} className={reason === item ? "is-selected" : undefined}>
                <input type="radio" name="reason" value={item} checked={reason === item} onChange={() => setReason(item)} />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="wizard-panel">
          <legend>Preferred date</legend>
          <label>
            Choose a date
            <input type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} required />
            <span>This is a preferred date, not a confirmed booking.</span>
          </label>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="wizard-panel">
          <legend>Preferred time</legend>
          <div className="wizard-choices">
            {["Morning (10 AM to 1 PM)", "Afternoon (1 PM to 5 PM)", ...(sunday ? [] : ["Evening (5 PM to 8 PM, Monday to Saturday only)"])].map(
              (item) => (
                <label key={item} className={time === item ? "is-selected" : undefined}>
                  <input type="radio" name="time" value={item} checked={time === item} onChange={() => setTime(item)} />
                  {item}
                </label>
              ),
            )}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="wizard-panel">
          <legend>Name, phone and WhatsApp</legend>
          <label>
            Your name
            <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" required />
          </label>
          <label>
            Mobile number
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              name="phone"
              inputMode="numeric"
              autoComplete="tel"
              required
            />
            <span>We will call this number to confirm the request.</span>
          </label>
          <label className="wizard-check">
            <input type="checkbox" checked={whatsappSame} onChange={(event) => setWhatsappSame(event.target.checked)} />
            WhatsApp is the same number
          </label>
          {whatsappSame ? null : (
            <label>
              WhatsApp number
              <input value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} inputMode="numeric" />
            </label>
          )}
        </fieldset>
      ) : null}

      {step === 4 ? (
        <div className="wizard-panel">
          <h2>Review your appointment request</h2>
          <dl className="wizard-summary">
            <div>
              <dt>Help with</dt>
              <dd>{reason || "—"}</dd>
            </div>
            <div>
              <dt>Preferred date</dt>
              <dd>{date || "—"}</dd>
            </div>
            <div>
              <dt>Preferred time</dt>
              <dd>{time || "—"}</dd>
            </div>
            <div>
              <dt>Name</dt>
              <dd>{name || "—"}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{phone || "—"}</dd>
            </div>
          </dl>
          <p className="wizard-disclaimer">
            This is an appointment request. Sending it opens WhatsApp so the clinic can confirm. A preferred time is
            not reserved until the clinic calls you back.
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="wizard-actions">
        {step > 0 ? (
          <button className="btn btn-secondary" type="button" onClick={() => setStep((value) => value - 1)}>
            Back
          </button>
        ) : null}
        {step < 4 ? (
          <button className="btn btn-primary" type="button" onClick={goNext}>
            Continue
          </button>
        ) : (
          <button className="btn btn-primary" type="submit">
            Send request on WhatsApp
          </button>
        )}
      </div>

      {sent ? (
        <p className="notice" role="status">
          WhatsApp should now be open with your request. Please review the message, edit it if you need to, and send
          it. The clinic will call to confirm. This form does not book the time by itself.
        </p>
      ) : null}

      <p className="wizard-alt">
        Prefer to talk now? <a href={telHref()}>Call {clinic.phoneDisplay}</a> or{" "}
        <a href={whatsappHref()}>WhatsApp {clinic.whatsappDisplay}</a>.
      </p>
    </form>
  );
}

export const BookForm = AppointmentWizard;
