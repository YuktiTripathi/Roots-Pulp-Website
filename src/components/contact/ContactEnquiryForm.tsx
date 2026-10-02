"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/Icons";
import { treatments, whatsappHref } from "@/lib/clinic";

function makeCaptcha() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

type FieldName = "name" | "phone" | "email" | "service" | "captcha";

export function ContactEnquiryForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  // Generated after mount so the server and client markup match (a random value
  // during render caused a hydration mismatch).
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<FieldName | null>(null);
  const [sentHref, setSentHref] = useState("");
  const services = useMemo(() => treatments.map((item) => item.name), []);

  useEffect(() => {
    setCaptcha(makeCaptcha());
  }, []);

  const id = (field: FieldName) => `${uid}-${field}`;

  function fail(field: FieldName, message: string) {
    setErrorField(field);
    setError(message);
    document.getElementById(id(field))?.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (!name.trim()) return fail("name", "Please enter the patient name.");
    if (digits.length !== 10) return fail("phone", "Please enter a 10-digit mobile number.");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("email", "Please enter a valid email address.");
    if (!service) return fail("service", "Please choose a service.");
    if (!captcha || captchaAnswer.trim() !== captcha) return fail("captcha", "Please enter the captcha number exactly.");

    const message = [
      "Hello Roots & Pulp Dental Clinic, I would like to get in touch.",
      `Name: ${name.trim()}`,
      `Phone: ${digits}`,
      email ? `Email: ${email.trim()}` : null,
      `Service: ${service}`,
    ]
      .filter(Boolean)
      .join("\n");

    const href = whatsappHref(message);
    // window.open with "noopener" always returns null, which used to trigger the
    // fallback below and navigate the current tab as well as opening a new one.
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();

    setError("");
    setErrorField(null);
    setSentHref(href);
  }

  if (sentHref) {
    return (
      <div className="contact-enquiry contact-enquiry-sent" role="status">
        <span className="contact-sent-check" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.2 4.2L19 7" />
          </svg>
        </span>
        <p className="eyebrow">Contact us</p>
        <h2 id="enquiry-heading">Get in touch with us</h2>
        <p className="contact-enquiry-note">
          Your message is ready in WhatsApp. Send it to the clinic, and we will get back to you.
        </p>
        <a className="btn btn-secondary contact-sent-again" href={sentHref} target="_blank" rel="noopener noreferrer">
          Open WhatsApp again
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    );
  }

  const invalid = (field: FieldName) => (errorField === field ? true : undefined);
  const describedBy = (field: FieldName) => (errorField === field ? `${uid}-error` : undefined);

  return (
    <form className="contact-enquiry" onSubmit={onSubmit} noValidate aria-labelledby="enquiry-heading">
      <p className="eyebrow">Contact us</p>
      <h2 id="enquiry-heading">Get in touch with us</h2>
      <div className="contact-enquiry-grid">
        <div className="field">
          <input
            id={id("name")}
            type="text"
            name="name"
            autoComplete="name"
            placeholder=" "
            value={name}
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor={id("name")}>Patient name</label>
        </div>
        <div className="field">
          <input
            id={id("phone")}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="numeric"
            placeholder=" "
            value={phone}
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone")}
            onChange={(event) => setPhone(event.target.value)}
          />
          <label htmlFor={id("phone")}>Phone number</label>
        </div>
        <div className="field">
          <input
            id={id("email")}
            type="email"
            name="email"
            autoComplete="email"
            placeholder=" "
            value={email}
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor={id("email")}>Email address (optional)</label>
        </div>
        <div className={service ? "field field-select is-filled" : "field field-select"}>
          <select
            id={id("service")}
            name="service"
            value={service}
            aria-invalid={invalid("service")}
            aria-describedby={describedBy("service")}
            onChange={(event) => setService(event.target.value)}
          >
            <option value="" />
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label htmlFor={id("service")}>Choose service</label>
        </div>
        <div className="contact-captcha">
          <p className="contact-enquiry-label">Captcha code</p>
          <p className="contact-captcha-code" aria-label={captcha ? `Captcha code ${captcha.split("").join(" ")}` : undefined}>
            {captcha || "\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7"}
          </p>
        </div>
        <div className="field">
          <input
            id={id("captcha")}
            type="text"
            name="captcha"
            inputMode="numeric"
            autoComplete="off"
            placeholder=" "
            value={captchaAnswer}
            aria-invalid={invalid("captcha")}
            aria-describedby={describedBy("captcha")}
            onChange={(event) => setCaptchaAnswer(event.target.value)}
          />
          <label htmlFor={id("captcha")}>Enter captcha</label>
        </div>
      </div>
      {error ? (
        <p className="contact-enquiry-error" id={`${uid}-error`} role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn btn-primary contact-enquiry-submit" type="submit">
        Book Appointment <ArrowIcon className="arrow" />
      </button>
    </form>
  );
}
