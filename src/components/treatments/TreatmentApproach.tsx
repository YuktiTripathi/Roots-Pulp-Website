"use client";

import { useState } from "react";
import { CrossfadePhoto } from "@/components/CrossfadePhoto";
import { stagger } from "@/lib/motion";
import { photos } from "@/lib/photos";

const steps = [
  {
    title: "Listen",
    text: "We begin by understanding your concerns, symptoms and expectations.",
    photo: photos.listeningAtDesk,
  },
  {
    title: "Diagnose",
    text: "We examine the problem carefully before recommending treatment.",
    photo: photos.examination,
  },
  {
    title: "Explain",
    text: "We make sure you understand your options and the reasoning behind the treatment plan.",
    photo: photos.explaining,
  },
] as const;

const stepPhotos = steps.map((step) => step.photo);

/** Listen / Diagnose / Explain steps; hovering, focusing or clicking a step brings its photo forward. */
export function TreatmentApproach() {
  const [active, setActive] = useState(0);

  return (
    <div className="tx-approach-layout">
      <ol className="tx-approach-steps">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="reveal"
            data-active={index === active || undefined}
            style={stagger(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
          >
            <span className="tx-step" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>
              <button
                type="button"
                className="tx-approach-trigger"
                aria-pressed={index === active}
                aria-controls="tx-approach-photo"
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                {step.title}
              </button>
            </h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <div id="tx-approach-photo" className="tx-approach-media reveal reveal--mask" style={stagger(1)}>
        <CrossfadePhoto photos={stepPhotos} active={active} sizes="(max-width: 900px) 100vw, 520px" />
      </div>
    </div>
  );
}
