"use client";

import { useState, type CSSProperties } from "react";
import { clinic, directionsUrl, fullAddress } from "@/lib/clinic";
import { openingHoursDisplay } from "@/lib/openingHours";

export function VisitSection() {
  const [mapReady, setMapReady] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${clinic.name}, ${fullAddress}`,
  )}&z=16&output=embed`;

  return (
    <section className="section visit" aria-labelledby="visit-heading">
      <div className="section-inner visit-grid">
        <div className="reveal">
          <h2 id="visit-heading">Visit Roots &amp; Pulp in Aliganj, Lucknow</h2>
          <p className="visit-name">{clinic.name}</p>
          <address>
            {clinic.streetAddress}
            <br />
            {clinic.locality}, {clinic.region} {clinic.postalCode}
          </address>
          <p className="landmark">{clinic.landmark}</p>
          <dl className="hours">
            {openingHoursDisplay.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.hours.replace(" – ", " to ")}</dd>
              </div>
            ))}
          </dl>
          <p className="visit-contacts">
            <span>Phone: {clinic.phoneDisplay}</span>
            <span>WhatsApp: {clinic.whatsappDisplay}</span>
          </p>
          <div className="visit-actions">
            <a className="btn btn-primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="map-panel reveal" style={{ "--i": 1 } as CSSProperties}>
          {mapReady ? (
            <iframe title={`Map showing ${clinic.name} at ${clinic.streetAddress}, ${clinic.locality}`} src={mapSrc} loading="lazy" />
          ) : (
            <button type="button" className="map-static" onClick={() => setMapReady(true)}>
              <span className="map-pin" aria-hidden="true" />
              <span className="map-copy">
                <strong>Roots & Pulp Dental Clinic</strong>
                Sector-Q, Aliganj, Lucknow, U.P.
              </span>
              <span className="map-action">Show map</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
