"use client";

import { type PointerEvent, useRef } from "react";

export function CursorFillLabel({
  children,
  showArrow = true,
}: {
  children: string;
  showArrow?: boolean;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);

  function setOrigin(event?: PointerEvent<HTMLSpanElement>) {
    const label = labelRef.current;
    if (!label) return;

    const bounds = label.getBoundingClientRect();
    const x = event ? event.clientX - bounds.left : bounds.width / 2;
    const y = event ? event.clientY - bounds.top : bounds.height / 2;
    const diameter = 16;
    const scale = Math.ceil(Math.hypot(bounds.width, bounds.height) / diameter) + 2;

    label.style.setProperty("--fill-x", `${x}px`);
    label.style.setProperty("--fill-y", `${y}px`);
    label.style.setProperty("--fill-scale", `${scale}`);
  }

  function startPreview(event?: PointerEvent<HTMLSpanElement>) {
    setOrigin(event);
    labelRef.current?.classList.add("is-previewing");
  }

  function stopPreview() {
    labelRef.current?.classList.remove("is-previewing");
  }

  return (
    <span
      ref={labelRef}
      className="project-action"
      aria-hidden="true"
      onPointerEnter={(event) => startPreview(event)}
      onPointerLeave={stopPreview}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") startPreview();
      }}
      onPointerCancel={stopPreview}
    >
      <span className="project-action-content">
        {children}
        {showArrow ? (
          <svg
            className="project-action-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18.3646 5.63623H11.2939M18.3646 5.63623L18.3643 12.7073M18.3646 5.63623L5.63672 18.3642"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </span>
  );
}
