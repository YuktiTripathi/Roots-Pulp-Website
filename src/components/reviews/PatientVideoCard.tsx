"use client";

import { useState, type CSSProperties } from "react";
import type { PatientVideo } from "@/lib/patientReviews";

export function PatientVideoCard({ video, index = 0 }: { video: PatientVideo; index?: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="patient-video-card reveal" style={{ "--i": index } as CSSProperties}>
      <div className="patient-video-frame">
        {playing ? (
          <video src={video.src} poster={video.poster} controls playsInline autoPlay preload="metadata" />
        ) : (
          <button type="button" className="patient-video-play" onClick={() => setPlaying(true)}>
            {video.poster ? (
              <span className="patient-video-poster" style={{ backgroundImage: `url(${video.poster})` }} />
            ) : (
              <span className="patient-video-poster" />
            )}
            <span className="patient-video-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8.4 6.2v11.6L18.2 12 8.4 6.2Z" />
              </svg>
            </span>
            <span className="sr-only">Play patient video{video.name ? ` from ${video.name}` : ""}</span>
          </button>
        )}
      </div>
      {video.name || video.treatment || video.duration || video.description ? (
        <div className="patient-video-meta">
          {video.name ? <h3>{video.name}</h3> : null}
          {video.treatment ? <p>{video.treatment}</p> : null}
          {video.duration ? <p>{video.duration}</p> : null}
          {video.description ? <p>{video.description}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
