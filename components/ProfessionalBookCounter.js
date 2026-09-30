"use client";

import { PROFESSIONAL_MIN_BOOKS, professionalTotalUsd } from "@/lib/stripe/packages";

/**
 * Small book-quantity control for the Professional tier only.
 * variant="home" | "service" — uses each card's existing typography classes.
 */
export default function ProfessionalBookCounter({
  bookCount,
  onBookCountChange,
  variant = "home",
}) {
  const total = professionalTotalUsd(bookCount);
  const atMin = bookCount <= PROFESSIONAL_MIN_BOOKS;

  function decrement() {
    if (atMin) return;
    onBookCountChange(bookCount - 1);
  }

  function increment() {
    onBookCountChange(bookCount + 1);
  }

  if (variant === "service") {
    return (
      <div className="text-center">
        <div
          className="spr-price-label"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 6,
            marginBottom: 2,
          }}
        >
          <button
            type="button"
            onClick={decrement}
            disabled={atMin}
            aria-label="Remove one book"
            className="font-inter text-[14px] font-medium leading-none disabled:opacity-35"
            style={{ background: "none", border: "none", padding: "2px 6px", cursor: atMin ? "default" : "pointer", color: "inherit" }}
          >
            −
          </button>
          <span className="spr-price-row" style={{ fontSize: 20 }}>
            <span className="spr-price-currency" style={{ fontSize: 14 }}>
              $
            </span>
            {total.toLocaleString("en-US")}
          </span>
          <button
            type="button"
            onClick={increment}
            aria-label="Add one book"
            className="font-inter text-[14px] font-medium leading-none"
            style={{ background: "none", border: "none", padding: "2px 6px", cursor: "pointer", color: "inherit" }}
          >
            +
          </button>
        </div>
        <p className="spr-price-label">for {bookCount} books</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="gwh-price-term mt-2 flex items-center justify-center gap-2.5 font-inter text-[13px] font-normal"
        style={{ color: "rgba(255, 255, 255, 0.55)" }}
      >
        <button
          type="button"
          onClick={decrement}
          disabled={atMin}
          aria-label="Remove one book"
          className="leading-none disabled:opacity-35"
          style={{
            background: "none",
            border: "none",
            padding: "2px 6px",
            cursor: atMin ? "default" : "pointer",
            color: "inherit",
            font: "inherit",
          }}
        >
          −
        </button>
        <span className="gwh-price-value font-playfair font-bold" style={{ fontSize: 20, color: "#ffffff" }}>
          <span className="align-top text-[14px]">$</span>
          {total.toLocaleString("en-US")}
        </span>
        <button
          type="button"
          onClick={increment}
          aria-label="Add one book"
          className="leading-none"
          style={{
            background: "none",
            border: "none",
            padding: "2px 6px",
            cursor: "pointer",
            color: "inherit",
            font: "inherit",
          }}
        >
          +
        </button>
      </div>
      <p className="gwh-price-term mt-1 font-inter text-[13px] font-normal">
        for {bookCount} books
      </p>
    </>
  );
}
