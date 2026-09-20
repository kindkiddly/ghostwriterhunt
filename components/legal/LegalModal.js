"use client";

import { useEffect, useState } from "react";
import { legalContent } from "./legalContent";

/**
 * GhostWriterHunt — Bottom legal modal panel
 * Props: { isOpen, onClose, type } — type: privacy | terms | cookies | legal
 */

const styles = `
  @keyframes modalOpen {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes modalClose {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes backdropOpen {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes backdropClose {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .modal-opening {
    animation: modalOpen 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards;
  }

  .modal-closing {
    animation: modalClose 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
  }

  .backdrop-opening {
    animation: backdropOpen 0.3s ease forwards;
  }

  .backdrop-closing {
    animation: backdropClose 0.3s ease forwards;
  }

  .legal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 2000;
  }

  .legal-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70vh;
    background: #FFFFFF;
    border-radius: 24px 24px 0 0;
    z-index: 2001;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .legal-header {
    position: sticky;
    top: 0;
    background: #FFFFFF;
    border-bottom: 1px solid #E8D5A3;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    flex-shrink: 0;
  }

  .legal-header-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 22px;
    color: #1C1C1C;
    margin: 0 0 4px;
  }

  .legal-header-updated {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    margin: 0;
  }

  .legal-close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #F5F5F5;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #666666;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
    flex-shrink: 0;
    line-height: 1;
  }

  .legal-close:hover {
    background: #1C1C1C;
    color: #FFFFFF;
  }

  .legal-body {
    flex: 1;
    overflow-y: auto;
    padding: 40px 48px;
    scroll-behavior: smooth;
  }

  .legal-body h2 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 22px;
    color: #1C1C1C;
    margin: 32px 0 16px;
  }

  .legal-body h2:first-child {
    margin-top: 0;
  }

  .legal-body h3 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 18px;
    color: #1C1C1C;
    margin: 24px 0 12px;
  }

  .legal-body p {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 16px;
  }

  .legal-body ul,
  .legal-body ol {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 16px;
    padding-left: 20px;
  }

  .legal-body ul {
    list-style: disc;
  }

  .legal-body li {
    margin-bottom: 8px;
  }

  .legal-body strong {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    color: #1C1C1C;
  }

  .legal-body a {
    color: #C9A84C;
    text-decoration: none;
  }

  .legal-body a:hover {
    text-decoration: underline;
  }

  .legal-body hr {
    border: none;
    border-top: 1px solid #E8D5A3;
    margin: 24px 0;
  }

  @media (max-width: 768px) {
    .legal-header {
      padding: 16px 20px;
    }
    .legal-header-title {
      font-size: 18px;
    }
    .legal-body {
      padding: 28px 20px;
    }
  }

  /* Scrollbar compensation — covers body + fixed nav/header */
  body.modal-open {
    overflow: hidden;
    padding-right: var(--scrollbar-width);
  }
  body.modal-open nav,
  body.modal-open header,
  body.modal-open [class*="navbar"],
  body.modal-open [class*="Navbar"] {
    padding-right: var(--scrollbar-width) !important;
  }
`;

function clearBodyLock() {
  document.documentElement.style.setProperty("--scrollbar-width", "0px");
  document.body.classList.remove("modal-open");
  // Clear any leftover inline styles from prior lock approach
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.querySelectorAll("nav, header").forEach((el) => {
    el.style.paddingRight = "";
  });
}

function applyBodyLock() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`
  );
  document.body.classList.add("modal-open");
}

export default function LegalModal({ isOpen, onClose, type }) {
  const [isClosing, setIsClosing] = useState(false);

  const doc = legalContent[type] || legalContent.privacy;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      clearBodyLock();
    }, 350);
  };

  // Body scroll lock via CSS class + --scrollbar-width (no layout shift)
  useEffect(() => {
    if (isOpen) {
      applyBodyLock();
    } else {
      clearBodyLock();
    }
    return () => {
      clearBodyLock();
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isClosing]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <style>{styles}</style>

      <div
        className={`legal-backdrop ${isClosing ? "backdrop-closing" : "backdrop-opening"}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`legal-panel ${isClosing ? "modal-closing" : "modal-opening"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <div className="legal-header">
          <div>
            <h2 id="legal-modal-title" className="legal-header-title">
              {doc.title}
            </h2>
            <p className="legal-header-updated">
              Last updated: {doc.lastUpdated}
            </p>
          </div>
          <button
            type="button"
            className="legal-close"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div
          className="legal-body"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>
    </>
  );
}
