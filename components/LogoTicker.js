/**
 * GhostWriterHunt — Logo Ticker
 * Glass social-proof strip below hero (matches How It Works / service glass cards).
 */
export default function LogoTicker() {
  const platforms = [
    "Amazon KDP",
    "Apple Books",
    "Google Play Books",
    "Kindle Direct",
    "Smashwords",
    "Barnes & Noble Press",
    "Kobo Writing Life",
    "Draft2Digital",
  ];

  const loopItems = [...platforms, ...platforms];

  return (
    <section
      className="gwh-logo-ticker relative overflow-hidden"
      aria-label="Trusted publishing platforms"
    >
      <style>{`
        @keyframes gwh-ticker-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .gwh-logo-ticker {
          background: transparent;
          padding: 20px 20px 28px;
          position: relative;
        }

        .gwh-logo-ticker-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        .gwh-logo-ticker-label {
          margin: 0 0 16px;
          text-align: center;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7c3a;
        }

        .gwh-logo-ticker-glass {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.38);
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(255, 255, 255, 0.48) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.65) inset,
            0 0 28px rgba(201, 168, 76, 0.12),
            0 10px 32px rgba(28, 28, 28, 0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 16px 0;
        }

        .gwh-logo-ticker-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.06) 0%,
            transparent 42%,
            transparent 58%,
            rgba(0, 0, 0, 0.12) 100%
          );
          pointer-events: none;
        }

        .gwh-logo-ticker-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .gwh-logo-ticker-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 56px;
          z-index: 2;
          pointer-events: none;
        }

        .gwh-logo-ticker-fade--left {
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(250, 250, 247, 0.98) 0%,
            rgba(250, 250, 247, 0.5) 55%,
            transparent 100%
          );
        }

        .gwh-logo-ticker-fade--right {
          right: 0;
          background: linear-gradient(
            270deg,
            rgba(250, 250, 247, 0.98) 0%,
            rgba(250, 250, 247, 0.5) 55%,
            transparent 100%
          );
        }

        .gwh-ticker-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: gwh-ticker-scroll 48s linear infinite;
          backface-visibility: hidden;
        }

        .gwh-logo-ticker-glass:hover .gwh-ticker-track {
          animation-play-state: paused;
        }

        .gwh-logo-ticker-item {
          display: flex;
          align-items: center;
        }

        .gwh-logo-ticker-name {
          white-space: nowrap;
          padding: 0 1.35rem;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #c9a84c;
        }

        .gwh-logo-ticker-dot {
          display: inline-block;
          height: 6px;
          width: 6px;
          flex-shrink: 0;
          border-radius: 9999px;
          background: #c9a84c;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.55);
        }

        @media (min-width: 769px) {
          .gwh-logo-ticker {
            padding: 24px 24px 32px;
          }
          .gwh-logo-ticker-name {
            font-size: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gwh-ticker-track {
            animation: none;
          }
        }
      `}</style>

      <div className="gwh-logo-ticker-inner">
        <p className="gwh-logo-ticker-label">Trusted by authors publishing on</p>

        <div className="gwh-logo-ticker-glass">
          <div className="gwh-logo-ticker-viewport" aria-hidden="true">
            <span
              className="gwh-logo-ticker-fade gwh-logo-ticker-fade--left"
              aria-hidden="true"
            />
            <span
              className="gwh-logo-ticker-fade gwh-logo-ticker-fade--right"
              aria-hidden="true"
            />
            <ul className="gwh-ticker-track">
              {loopItems.map((name, index) => (
                <li key={`${name}-${index}`} className="gwh-logo-ticker-item">
                  <span className="gwh-logo-ticker-name">{name}</span>
                  <span className="gwh-logo-ticker-dot" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="sr-only">
        {platforms.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
