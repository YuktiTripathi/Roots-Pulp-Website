"use client";

import { useState } from "react";
import { clinic, directionsUrl, fullAddress } from "@/lib/clinic";

export function ContactMap() {
  const [mapReady, setMapReady] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${clinic.name}, ${fullAddress}`,
  )}&z=16&output=embed`;

  return (
    <div className="contact-map">
      <div className={`contact-map-panel${mapReady ? " is-live" : ""}`}>
        {mapReady ? (
          <iframe
            title={`Map showing ${clinic.name} at ${clinic.streetAddress}, ${clinic.locality}`}
            src={mapSrc}
            loading="lazy"
          />
        ) : (
          <button type="button" className="map-static contact-map-static" onClick={() => setMapReady(true)}>
            <span className="map-pin" aria-hidden="true" />
            <span className="map-copy">
              <strong>Roots &amp; Pulp Dental Clinic</strong>
              {clinic.streetAddress}, {clinic.locality}
            </span>
            <span className="map-action">Show map</span>
          </button>
        )}
      </div>
      <a className="btn btn-secondary contact-map-cta" href={directionsUrl} target="_blank" rel="noopener noreferrer">
        Get directions
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
