import { clinic, telHref, whatsappHref } from "@/lib/clinic";

/** Clinic contact block for the legal pages, from the central clinic details. */
export function ClinicContact() {
  return (
    <address>
      <strong>{clinic.name}</strong>
      <br />
      Dr. Shubham Tripathi
      <br />
      {clinic.addressLine1}, {clinic.neighbourhood}, {clinic.locality}, Uttar Pradesh {clinic.postalCode}
      <br />
      {clinic.landmark}
      <br />
      Phone: <a href={telHref()}>{clinic.phoneDisplay}</a>
      <br />
      WhatsApp:{" "}
      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
        {clinic.whatsappDisplay}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </address>
  );
}
