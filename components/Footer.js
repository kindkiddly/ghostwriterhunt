"use client";

/**
 * GhostWriterHunt — Footer
 * 4-column dark band: brand, services, company, contact + legal bar.
 */

const SERVICE_LINKS = [
  { label: "Professional Ghostwriting", href: "/services/ghostwriting" },
  { label: "Manuscript Editing", href: "/services/manuscript-editing" },
  { label: "Book Cover Design", href: "/services/book-cover-design" },
  { label: "Interior Layout", href: "/services/interior-layout" },
  { label: "Illustration & Graphics", href: "/services/illustration-graphics" },
  { label: "eBook Publishing", href: "/services/ebook-publishing" },
  { label: "Author Branding", href: "/services/author-branding" },
  { label: "Book Marketing", href: "/services/book-marketing" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Writers", href: "/#writers" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#start" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Legal", href: "/legal" },
];

function SocialIcon({ type }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  switch (type) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.2 7.1c.7-.4 1.2-1 1.4-1.7-.6.4-1.3.6-2 .8A3.1 3.1 0 0013.5 8c0 .2 0 .5.1.7-2.6-.1-4.9-1.4-6.5-3.3-.3.5-.4 1-.4 1.6 0 1.1.6 2.1 1.4 2.6-.5 0-1-.2-1.4-.4v.1c0 1.5 1.1 2.8 2.5 3.1-.3.1-.5.1-.8.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3 2.3A6.3 6.3 0 015 17.5c1.4.9 3.1 1.4 4.9 1.4 5.9 0 9.1-4.9 9.1-9.1v-.4c.6-.5 1.2-1 1.6-1.7-.6.3-1.2.4-1.8.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 7.2A4.8 4.8 0 1016.8 12 4.8 4.8 0 0012 7.2zm0 7.9A3.1 3.1 0 1115.1 12 3.1 3.1 0 0112 15.1zm6.1-8A1.1 1.1 0 1119.2 6a1.1 1.1 0 01-1.1 1.1zM21.9 8.1a6.4 6.4 0 00-1.7-4.5 6.4 6.4 0 00-4.5-1.7H8.3A6.4 6.4 0 003.8 3.6 6.4 6.4 0 002.1 8.1v7.8a6.4 6.4 0 001.7 4.5 6.4 6.4 0 004.5 1.7h7.4a6.4 6.4 0 004.5-1.7 6.4 6.4 0 001.7-4.5V8.1zm-1.8 7.8a4.6 4.6 0 01-1.2 3.2 4.6 4.6 0 01-3.2 1.2H8.3a4.6 4.6 0 01-3.2-1.2 4.6 4.6 0 01-1.2-3.2V8.1A4.6 4.6 0 015.1 4.9a4.6 4.6 0 013.2-1.2h7.4a4.6 4.6 0 013.2 1.2 4.6 4.6 0 011.2 3.2z" />
        </svg>
      );
    case "linkedin":
    default:
      return (
        <svg {...common}>
          <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.6 1.6 0 103.5 5.6 1.6 1.6 0 005.1 4zM20.3 13.3c0-2.7-1.4-4-3.4-4a3.1 3.1 0 00-2.8 1.5V9.5h-2.8c0 1.2 0 10.5 0 10.5h2.8v-5.9c0-.3 0-.6.1-.9.3-.6.9-1.3 1.9-1.3 1.3 0 1.9 1 1.9 2.5V20h2.8v-6.7z" />
        </svg>
      );
  }
}

function FooterHeading({ children }) {
  return (
    <h3 className="mb-5 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-[#FFFFFF]">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="block font-inter text-[14px] font-normal leading-[2] text-[#666666] no-underline transition-colors duration-200 ease-in-out hover:text-[#C9A84C]"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full overflow-x-hidden bg-[#1C1C1C] pb-10 pt-[80px]"
      aria-label="Site footer"
    >
      <style>{`
        .gwh-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .gwh-footer-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .gwh-footer-newsletter {
            padding-left: 20px !important;
            padding-right: 20px !important;
            text-align: center;
            align-items: center !important;
          }
          .gwh-footer-form {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .gwh-footer-form input {
            width: 100% !important;
            border-radius: 6px !important;
            border-right-width: 1px !important;
          }
          .gwh-footer-form button {
            width: 100%;
            border-radius: 6px !important;
            margin-top: 8px;
          }
          .gwh-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px 24px;
          }
          .gwh-footer-brand {
            grid-column: 1 / -1;
            text-align: center;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .gwh-footer-social {
            justify-content: center;
          }
          .gwh-footer-contact {
            grid-column: 1 / -1;
          }
          .gwh-footer-mini-form {
            flex-direction: column !important;
            width: 100% !important;
          }
          .gwh-footer-mini-form input {
            width: 100% !important;
            border-radius: 6px !important;
            border-right-width: 1px !important;
          }
          .gwh-footer-mini-form button {
            width: 100%;
            border-radius: 6px !important;
            margin-top: 8px;
          }
          .gwh-footer-bottom {
            text-align: center;
            justify-content: center !important;
          }
        }
      `}</style>
      <div className="gwh-footer-inner mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        {/* Newsletter strip */}
        <div className="gwh-footer-newsletter mb-[60px] flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#2A2A2A] px-10 py-8 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 font-playfair text-[22px] font-bold text-[#FFFFFF]">
              Stay updated with publishing tips
            </p>
            <p className="font-inter text-[14px] font-normal text-[#666666]">
              Join 10,000+ authors getting weekly insights.
            </p>
          </div>

          <form
            className="gwh-footer-form flex w-full max-w-[420px] shrink-0"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="w-full min-w-0 flex-1 rounded-l-[6px] border border-[#333333] border-r-0 bg-[#1C1C1C] px-5 py-3 font-inter text-[14px] text-white outline-none placeholder:text-[#666666] focus:border-[#C9A84C] lg:w-[280px] lg:flex-none"
              required
            />
            <button
              type="submit"
              className="shrink-0 rounded-r-[6px] border-0 bg-[#C9A84C] px-6 py-3 font-inter text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 4-column grid: Brand · Services · Company · Contact */}
        <div className="gwh-footer-grid">
          {/* Column 1 — Brand */}
          <div className="gwh-footer-brand">
            <a href="/" className="mb-5 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/GhostWriterHunt-logo-white.webp"
                alt="GhostWriterHunt"
                style={{
                  height: "auto",
                  width: "200px",
                  maxWidth: "200px",
                  objectFit: "contain",
                  objectPosition: "left bottom",
                  display: "block",
                  marginBottom: "0",
                }}
              />
            </a>
            <p className="mb-6 max-w-[220px] font-inter text-[14px] font-normal leading-[1.7] text-[#999999]">
              Professional ghostwriting services for authors worldwide. Your
              story. Your voice. Perfectly told.
            </p>
            <div className="gwh-footer-social flex items-center gap-4">
              {[
                { type: "facebook", label: "Facebook", href: "#facebook" },
                { type: "twitter", label: "Twitter", href: "#twitter" },
                { type: "instagram", label: "Instagram", href: "#instagram" },
                { type: "linkedin", label: "LinkedIn", href: "#linkedin" },
              ].map((social) => (
                <a
                  key={social.type}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[#666666] transition-colors duration-200 ease-in-out hover:text-[#C9A84C]"
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <nav aria-label="Footer services">
              {SERVICE_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Column 3 — Company */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <nav aria-label="Footer company">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Column 4 — Contact */}
          <div className="gwh-footer-contact" id="contact">
            <FooterHeading>Contact</FooterHeading>
            <a
              href="mailto:hello@ghostwriterhunt.com"
              className="font-inter text-[14px] font-medium text-[#C9A84C] no-underline hover:underline"
            >
              hello@ghostwriterhunt.com
            </a>
            <p className="mt-3 font-inter text-[14px] font-normal text-[#666666]">
              Houston, USA
            </p>
            <p className="mt-1 font-inter text-[14px] font-normal text-[#666666]">
              Mon-Fri: 9am - 6pm CST
            </p>

            <div className="my-5 h-px w-full bg-[#333333]" aria-hidden="true" />

            <p className="mb-3 font-inter text-[13px] font-normal text-[#999999]">
              Get writing tips weekly
            </p>
            <form
              className="gwh-footer-mini-form flex w-full"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Footer newsletter signup"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full min-w-0 flex-1 rounded-l-[6px] border border-[#333333] border-r-0 bg-[#1C1C1C] px-3 py-2.5 font-inter text-[13px] text-white outline-none placeholder:text-[#666666] focus:border-[#C9A84C]"
                required
              />
              <button
                type="submit"
                className="shrink-0 rounded-r-[6px] border-0 bg-[#C9A84C] px-4 py-2.5 font-inter text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-[#2A2A2A]" aria-hidden="true" />

        {/* Bottom bar */}
        <div className="gwh-footer-bottom flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="font-inter text-[13px] font-normal text-[#666666]">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-6"
            aria-label="Legal"
          >
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-[13px] font-normal text-[#666666] no-underline transition-colors duration-200 ease-in-out hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
