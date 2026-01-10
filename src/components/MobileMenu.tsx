"use client";

import { TOC_ITEMS, tocHref, type TocItemId } from "@/components/toc";
import { PixelIcon } from "@/components/PixelIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function tocIconSrc(id: TocItemId) {
  switch (id) {
    case "profile":
      return "/assets/pixel/icons/profile.svg";
    case "work":
      return "/assets/pixel/icons/work.svg";
    case "writing":
      return "/assets/pixel/icons/writing.svg";
    case "activities":
      return "/assets/pixel/icons/activities.svg";
    case "skills":
      return "/assets/pixel/icons/skills.svg";
    case "contact":
      return "/assets/pixel/icons/contact.svg";
  }
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to trigger button
    triggerRef.current?.focus();
  }, []);

  // Scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-menu-open");
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Close menu when screen width >= 640px (sm breakpoint)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 640px)");

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches && isOpen) {
        setIsOpen(false);
      }
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isOpen]);

  // Focus trap within the overlay
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleLinkClick = () => {
    close();
  };

  // Don't render anything on server (SSR)
  if (typeof window === "undefined") {
    return null;
  }

  const content = (
    <>
      {/* Hamburger button - rendered via portal to body for proper fixed positioning */}
      <button
        ref={triggerRef}
        type="button"
        className={`mobile-menu-btn fixed right-4 top-4 z-[9999] sm:hidden ${isOpen ? "mobile-menu-btn--open" : ""}`}
        onClick={open}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-overlay"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="mobile-menu-btn__line" />
        <span className="mobile-menu-btn__line" />
        <span className="mobile-menu-btn__line" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          id="mobile-menu-overlay"
          className="mobile-menu-overlay frame hud"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-menu-overlay__header">
            <h2
              className="text-sm text-fami-gold"
              style={{ fontFamily: "var(--font-press)" }}
            >
              MENU
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-menu-overlay__close"
              onClick={close}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="mobile-menu-overlay__nav" aria-label="Main navigation">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={tocHref(item.id)}
                className="mobile-menu-overlay__link"
                onClick={handleLinkClick}
              >
                <PixelIcon src={tocIconSrc(item.id)} decorative size="md" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );

  // Use portal to render directly into document.body
  return createPortal(content, document.body);
}
