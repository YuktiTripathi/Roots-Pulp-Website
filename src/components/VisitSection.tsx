"use client";

import { useState } from "react";
import { clinic, directionsUrl, fullAddress, telHref, whatsappHref } from "@/lib/clinic";

export function VisitSection() {
  const [mapReady, setMapReady] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${clinic.name}, ${fullAddress}`,
  )}&z=16&output=embed`;

  return (
    <section className="section visit" aria-labelledby="visit-heading">
      <div className="section-inner visit-grid">
        <div>
          <h2 id="visit-heading">Visit Roots & Pulp</h2>
          <p className="visit-name">{clinic.name}</p>
          <address>
            {clinic.streetAddress}
            <br />
            {clinic.locality}, {clinic.region} {clinic.postalCode}
          </address>
          <p className="landmark">{clinic.landmark}</p>
          <dl className="hours">
            <div>
              <dt>Monday to Saturday</dt>
              <dd>10:00 AM to 8:00 PM</dd>
            </div>
            <div>
              <dt>Sunday</dt>
              <dd>10:00 AM to 5:00 PM</dd>
            </div>
          </dl>
          <p className="visit-contacts">
            <a href={telHref()}>Call: {clinic.phoneDisplay}</a>
            <a href={whatsappHref()}>WhatsApp: {clinic.whatsappDisplay}</a>
          </p>
          <a className="btn btn-primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="map-panel">
          {mapReady ? (
            <iframe title="Map showing Roots & Pulp Dental Clinic at ED-362, Sector-Q, Aliganj, Lucknow" src={mapSrc} loading="lazy" />
          ) : (
            <button type="button" className="map-static" onClick={() => setMapReady(true)}>
              <span className="map-pin" aria-hidden="true" />
              <span className="map-copy">
                <strong>Roots & Pulp Dental Clinic</strong>
                ED-362, Sector-Q, Aliganj, Lucknow
              </span>
              <span className="map-action">Show map</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
