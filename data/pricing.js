/**
 * GhostWriterHunt — Shared pricing packages
 * Master copy of the Professional Ghostwriting service's pricing tiers
 * (data/services.js, slug 'ghostwriting'). Every service page and the
 * homepage Pricing section reference this so pricing stays identical
 * site-wide.
 */

export const SHARED_PRICING = [
  {
    name: 'Starter',
    label: 'ESSENTIALS',
    price: { perChapter: null, fullBook: 150 },
    description: 'For authors who already have a manuscript and want editing, formatting, cover design and publishing.',
    bestFor: 'Authors with a completed manuscript ready to publish, including the next book in a series',
    features: [
      'Team of 4 professionals assigned: Project Manager, Editor, Formatter and Publisher',
      'Professional manuscript editing and formatting',
      'eBook formatting included',
      'Professional cover design',
      'Author Central setup',
      'Publishing on 5 major global platforms',
      'You keep 100% of your royalties'
    ],
    guarantee: '✓ 14-Day Money Back Guarantee',
    featured: false
  },
  {
    name: 'Professional',
    label: 'MOST POPULAR',
    price: { perChapter: null, fullBook: 200 },
    description: 'A full ghostwriting and publishing package for one book, from draft through global distribution.',
    bestFor: 'Authors looking for a complete professionally published book',
    features: [
      'Unlimited word count',
      'Team of 6 professionals assigned: Project Manager, Writer, Editor, Formatter, Web Designer and Publisher',
      'Unlimited revision rounds for every chapter',
      'Professional cover design',
      'Professional author website',
      'Author Central setup',
      'Publishing on 5 major global platforms',
      'eBook, Paperback and Hardcover formats',
      'You keep 100% royalties'
    ],
    guarantee: '✓ 14-Day Money Back Guarantee',
    featured: true
  },
  {
    name: 'Complete Publishing Package',
    label: 'PREMIUM',
    price: { perChapter: null, fullBook: 299 },
    description: 'Full ghostwriting plus author website, all formats and publishing on 5 major global platforms.',
    bestFor: 'Authors who want the full premium package for one book',
    features: [
      'Unlimited word count',
      'Team of 6 professionals assigned: Project Manager, Writer, Editor, Formatter, Web Designer and Publisher',
      'Unlimited revision rounds per chapter',
      'Professional cover design',
      'Professional author website',
      'Author Central setup',
      'Publishing on 5 major global platforms',
      'eBook, Paperback and Hardcover formats',
      'You keep 100% royalties'
    ],
    guarantee: '✓ 14-Day Money Back Guarantee',
    featured: false
  }
];
