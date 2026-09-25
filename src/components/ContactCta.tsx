"use client";

import { type PointerEvent, useRef } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export function ContactCta() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  function setFillOrigin(event?: PointerEvent<HTMLAnchorElement>) {
    const link = linkRef.current;
    if (!link) return;

    const bounds = link.getBoundingClientRect();
    const x = event ? event.clientX - bounds.left : bounds.width / 2;
    const y = event ? event.clientY - bounds.top : bounds.height / 2;
    const scale = Math.ceil(Math.hypot(bounds.width, bounds.height) / 16) + 2;

    link.style.setProperty("--fill-x", `${x}px`);
    link.style.setProperty("--fill-y", `${y}px`);
    link.style.setProperty("--fill-scale", String(scale));
  }

  function preview(event?: PointerEvent<HTMLAnchorElement>) {
    setFillOrigin(event);
    linkRef.current?.classList.add("is-previewing");
  }

  function endPreview() {
    linkRef.current?.classList.remove("is-previewing");
  }

  return (
    <a
      ref={linkRef}
      className="contact-cta"
      href="mailto:darshanmass3007@gmail.com"
      onPointerEnter={(event) => preview(event)}
      onPointerLeave={endPreview}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") preview();
      }}
      onPointerCancel={endPreview}
      onFocus={() => preview()}
      onBlur={endPreview}
    >
      <span className="contact-cta-content">
        Email Darshan
        <ArrowUpRightIcon size={18} weight="regular" aria-hidden="true" />
      </span>
    </a>
  );
}
