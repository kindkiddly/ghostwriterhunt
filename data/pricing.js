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
    description: 'Perfect for authors who have already written their manuscript and are ready to publish professionally.',
    bestFor: 'Authors who have already written their manuscript',
    features: [
      'Team of 4 professionals assigned — Project Manager, Editor, Formatter and Publisher',
      'Professional manuscript editing and formatting',
      'eBook formatting included',
      'Bestseller-quality cover design',
      'Author Central setup',
      'Publishing on 5 major platforms',
      'eBook, Paperback and Hardcover formats',
      'You keep 100% of your royalties'
    ],
    guarantee: '✓ 14-Day Money Back Guarantee',
    featured: false
  },
  {
    name: 'Professional',
    label: 'MOST POPULAR',
    price: { perChapter: null, fullBook: 200 },
    description: 'A complete, professionally published book — everything you need to launch your title with confidence and authority.',
    bestFor: 'Authors looking for a complete professionally published book',
    features: [
      'Unlimited word count',
      'Team of 6 professionals assigned — Project Manager, Writer, Editor, Formatter, Web Designer and Publisher',
      'Unlimited revision rounds for every chapter',
      'Best-selling cover design',
      'Professional author website',
      'Author Central setup',
      'Publishing on 5 global platforms',
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
    description: 'The ultimate ghostwriting and publishing experience — no compromises, no limits, no equal.',
    bestFor: 'Authors who want the very best — no compromises',
    features: [
      'Unlimited word count',
      'Team of 6 professionals assigned — Project Manager, Writer, Editor, Formatter, Web Designer and Publisher',
      'Unlimited revision rounds per chapter',
      'Best-selling cover design',
      'Professional author website',
      'Author Central setup',
      'Publishing on 5 global platforms',
      'eBook, Paperback and Hardcover formats',
      'You keep 100% royalties'
    ],
    guarantee: '✓ 14-Day Money Back Guarantee',
    featured: false
  }
];
