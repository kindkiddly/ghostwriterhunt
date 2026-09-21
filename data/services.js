export const services = [

  // ─────────────────────────────────
  // 1. PROFESSIONAL GHOSTWRITING
  // ─────────────────────────────────
  {
    slug: 'ghostwriting',
    category: 'Writing',
    title: 'Professional Ghostwriting',
    tagline: 'Your story, told',
    taglineItalic: 'perfectly.',
    heroSubtext: 'Our handpicked ghostwriters become the voice behind your vision — capturing how you think, speak and feel in every single word. From the first chapter to the final page, your book will sound unmistakably like you.',
    
    heroImages: [
      {
        url: '/images/Heero-L01.webp',
        alt: 'Professional ghostwriter at desk',
        size: 'large'
      },
      {
        url: '/images/books-stack-pink.webp',
        alt: 'Open manuscript',
        size: 'medium'
      },
      {
        url: '/images/author-reading.webp',
        alt: 'Writing tools',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Your book should sound like',
      headlineItalic: 'you — only better.',
      body: 'Every great book begins with a great conversation. Before a single word is written, your dedicated ghostwriter spends time truly understanding you — your voice, your vision and the story only you can tell. Through in-depth interviews and careful study of how you communicate, we create a personal voice guide that governs every word of your manuscript. The result is a book that feels completely authentic — because it is.',
      bullets: [
        'Dedicated senior ghostwriter assigned to your project',
        'In-depth author interview before writing begins',
        'Personal voice guide created for your manuscript',
        'Chapter by chapter review and approval process',
        'Unlimited revisions until every word is perfect',
        'Full NDA — complete confidentiality guaranteed'
      ],
      images: [
        {
          url: '/images/writing-desk.webp',
          alt: 'Author writing',
          size: 'large'
        },
        {
          url: '/images/fountain-pen-notes.webp',
          alt: 'Manuscript pages',
          size: 'medium'
        },
        {
          url: '/images/books-table.webp',
          alt: 'Books',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'pen',
        title: 'Voice Matching',
        description: 'We study your natural communication style through interviews and writing samples before crafting a single sentence.'
      },
      {
        icon: 'book',
        title: 'Genre Expertise',
        description: 'Every ghostwriter specializes in specific genres — you are always matched with someone who truly understands your category.'
      },
      {
        icon: 'check',
        title: 'Collaborative Process',
        description: 'Regular chapter reviews, direct writer access and multiple revision rounds ensure your complete satisfaction throughout.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Free Consultation',
        description: 'We begin with an in-depth conversation about your book idea, goals, target audience and vision.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Author Interview',
        description: 'Your ghostwriter conducts deep interviews to understand your voice, personality and unique story.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '03',
        title: 'Voice Guide and Outline',
        description: 'We document your unique style and create a detailed chapter outline for your approval.',
        image: '/images/fountain-pen-notes.webp'
      },
      {
        number: '04',
        title: 'Writing and Review',
        description: 'Your ghostwriter writes chapter by chapter with regular reviews and feedback rounds.',
        image: '/images/writing-hands.webp'
      },
      {
        number: '05',
        title: 'Final Polish',
        description: 'Full editorial review, final revisions and manuscript delivery ready for publishing.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Starter',
        label: 'ESSENTIALS',
        price: { perChapter: 299, fullBook: 1499 },
        description: 'Perfect for short books and first-time authors.',
        bestFor: 'First-time authors and short book projects',
        features: [
          'Up to 20,000 words',
          '1 professional ghostwriter',
          '2 revision rounds per chapter',
          'Basic manuscript editing',
          'eBook formatting included',
          'You keep 100% royalties'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: 499, fullBook: 2999 },
        description: 'Our most popular plan for full-length books.',
        bestFor: 'Authors who want a complete professionally published book',
        features: [
          'Up to 60,000 words',
          '1 senior ghostwriter assigned',
          'Unlimited revision rounds',
          'Full developmental editing',
          'Professional cover design included',
          'Interior layout and formatting',
          'Publishing on 47+ global platforms',
          'Author branding package',
          'You keep 100% royalties'
        ],
        featured: true
      },
      {
        name: 'Masterpiece',
        label: 'PREMIUM',
        price: { perChapter: 799, fullBook: 4999 },
        description: 'The complete white-glove experience.',
        bestFor: 'Authors who want the very best — no compromises',
        features: [
          'Unlimited word count',
          'Elite senior ghostwriter assigned',
          'Unlimited revisions — perfection only',
          'Full editorial suite included',
          'Premium cover and interior design',
          'Custom illustrations included',
          'Publishing on 47+ global platforms',
          'Full author branding and marketing',
          'Book launch strategy included',
          'You keep 100% royalties'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'How do you match me with the right ghostwriter?',
        answer: 'We carefully review your project requirements, genre, tone and vision before hand-selecting a ghostwriter from our vetted team who specializes in your specific genre and writing style.'
      },
      {
        question: 'Will my book truly sound like me?',
        answer: 'Absolutely. Before writing begins your ghostwriter conducts in-depth interviews and studies your existing writing. We create a personal voice guide to ensure every word reflects your unique voice and personality.'
      },
      {
        question: 'How long does the ghostwriting process take?',
        answer: 'A short book of 20,000 words typically takes 4 to 6 weeks. A full-length book of 60,000 words takes 8 to 16 weeks. We agree on a clear timeline before starting and keep you updated at every milestone.'
      },
      {
        question: 'Do I own the manuscript completely?',
        answer: 'Yes — 100%. Once your project is delivered you own the complete manuscript and all rights. We sign a full NDA and transfer all intellectual property to you. Your name goes on the cover and we remain completely behind the scenes.'
      },
      {
        question: 'Can I be involved in the writing process?',
        answer: 'Absolutely. We encourage active collaboration. You review and approve each chapter before we move forward, ensuring the manuscript meets your exact vision at every stage.'
      }
    ],

    testimonial: {
      quote: 'Working with GhostWriterHunt was the best decision I made for my book. My ghostwriter understood my voice from the very first conversation. The final manuscript moved me to tears — it sounded more like me than anything I could have written myself.',
      author: 'Margaret Thompson',
      book: 'Finding My Way Home',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Your story is waiting',
    ctaHeadlineItalic: 'to be written.',
    ctaSubtext: 'Book a free consultation today and meet your perfect ghostwriter.',
    ctaImage: '/images/library-books.webp'
  },

  // ─────────────────────────────────
  // 2. MANUSCRIPT EDITING
  // ─────────────────────────────────
  {
    slug: 'manuscript-editing',
    category: 'Editing',
    title: 'Manuscript Editing',
    tagline: 'Your words, refined to',
    taglineItalic: 'perfection.',
    heroSubtext: 'Our seasoned editors go beyond grammar and spelling — they refine your narrative structure, strengthen your voice and ensure every page reads with clarity, power and purpose.',

    heroImages: [
      {
        url: '/images/HEERO-L02.webp',
        alt: 'Manuscript editing professional',
        size: 'large'
      },
      {
        url: '/images/HERO-M-02.webp',
        alt: 'Manuscript editing detail',
        size: 'medium'
      },
      {
        url: '/images/book-pen-laptop.webp',
        alt: 'Pen and paper',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Every great book deserves',
      headlineItalic: 'a great editor.',
      body: 'Even the finest writers benefit from a skilled editorial eye. Our editors work contextually — not just correcting errors but understanding your story, your voice and your reader. From developmental structure to final line edits, we refine your manuscript until it shines with the clarity and power it deserves.',
      bullets: [
        'Developmental editing — structure and story flow',
        'Line editing — sentence level clarity and style',
        'Copy editing — grammar, spelling and consistency',
        'Proofreading — final error-free polish',
        'Detailed editorial report with every pass',
        'Multiple revision rounds included'
      ],
      images: [
        {
          url: '/images/writing-desk.webp',
          alt: 'Editing workspace',
          size: 'large'
        },
        {
          url: '/images/fountain-pen-notes.webp',
          alt: 'Manuscript',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'edit',
        title: 'Contextual Editing',
        description: 'We edit within the context of your story and voice — never imposing a generic style on your unique work.'
      },
      {
        icon: 'layers',
        title: 'Multiple Edit Passes',
        description: 'Developmental, line and copy editing performed in sequence ensures every layer of your manuscript is perfected.'
      },
      {
        icon: 'message',
        title: 'Clear Communication',
        description: 'Detailed editorial notes explain every suggestion so you understand and approve every change made.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Manuscript Assessment',
        description: 'We review your complete manuscript and provide an initial assessment report.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Developmental Edit',
        description: 'Structure, pacing, character and narrative flow are evaluated and refined.',
        image: '/images/writing-hands.webp'
      },
      {
        number: '03',
        title: 'Line Edit',
        description: 'Sentence by sentence refinement for clarity, style and voice consistency.',
        image: '/images/fountain-pen-notes.webp'
      },
      {
        number: '04',
        title: 'Copy Edit',
        description: 'Grammar, spelling, punctuation and consistency thoroughly corrected.',
        image: '/images/fountain-pen-notes.webp'
      },
      {
        number: '05',
        title: 'Final Proofread',
        description: 'Final pass ensures your manuscript is completely error-free and publication ready.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Copy Edit',
        label: 'ESSENTIALS',
        price: { perChapter: 99, fullBook: 599 },
        description: 'Grammar, spelling and consistency correction.',
        bestFor: 'Well-written manuscripts needing a final polish',
        features: [
          'Grammar and spelling correction',
          'Punctuation and consistency',
          'Style guide application',
          'One revision round',
          'Editorial report included',
          '7-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Line Edit',
        label: 'MOST POPULAR',
        price: { perChapter: 199, fullBook: 1199 },
        description: 'Deep sentence level editing for clarity and style.',
        bestFor: 'Authors who want their prose to truly sing',
        features: [
          'Full line edit pass',
          'Clarity and style refinement',
          'Voice consistency throughout',
          'Grammar and copy editing',
          'Two revision rounds',
          'Detailed editorial notes',
          '14-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Full Edit',
        label: 'PREMIUM',
        price: { perChapter: 349, fullBook: 1999 },
        description: 'Complete developmental, line and copy editing.',
        bestFor: 'Authors who want the full editorial experience',
        features: [
          'Developmental edit',
          'Full line edit pass',
          'Copy edit and proofread',
          'Unlimited revision rounds',
          'Comprehensive editorial report',
          'Direct editor access',
          '21-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What is the difference between editing and proofreading?',
        answer: 'Editing addresses structure, clarity, style and voice at a deep level. Proofreading is the final surface check for grammar, spelling and punctuation errors. Both are important steps in the publishing process.'
      },
      {
        question: 'Will the editor change my writing style?',
        answer: 'Never. Our editors work to enhance your existing voice — not replace it. Every suggestion is made to serve your story and your style, never to impose a generic standard.'
      },
      {
        question: 'How long does editing take?',
        answer: 'Copy editing typically takes 7 days. Line editing takes 14 days. Full developmental plus line plus copy editing takes 21 days. Rush turnaround is available for urgent projects.'
      },
      {
        question: 'Do I get to review the edits before they are finalized?',
        answer: 'Yes — always. All edits are tracked and explained. You review, accept or reject every change. The final manuscript is always your decision.'
      },
      {
        question: 'Can you edit a manuscript that someone else ghostwrote?',
        answer: 'Absolutely. We edit manuscripts regardless of origin. Whether you wrote it yourself or worked with another writer, our editors will refine it to publication standard.'
      }
    ],

    testimonial: {
      quote: 'The editing team at GhostWriterHunt transformed my manuscript. They understood exactly what I was trying to say and helped me say it better than I ever could alone. The editorial notes were clear, respectful and genuinely improved every page.',
      author: 'Prof. Rachel Adams',
      book: 'The Science of Success',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Your manuscript deserves',
    ctaHeadlineItalic: 'its finest form.',
    ctaSubtext: 'Book a free consultation and let our editors show you what your manuscript can become.',
    ctaImage: '/images/library-books.webp'
  },

  // ─────────────────────────────────
  // 3. BOOK COVER DESIGN
  // ─────────────────────────────────
  {
    slug: 'book-cover-design',
    category: 'Design',
    title: 'Book Cover Design',
    tagline: 'Covers that stop readers',
    taglineItalic: 'in their tracks.',
    heroSubtext: 'Your cover is the first conversation your book has with a reader. Our designers craft covers that capture the soul of your story and compel readers to look twice — optimized for every digital platform.',

    heroImages: [
      {
        url: '/images/Heero-L03.webp',
        alt: 'Book cover designer at work',
        size: 'large'
      },
      {
        url: '/images/HERO-M03.webp',
        alt: 'Book cover design detail',
        size: 'medium'
      },
      {
        url: '/images/library-books.webp',
        alt: 'Creative design',
        size: 'small'
      }
    ],

    overview: {
      headline: 'A great cover sells your book',
      headlineItalic: 'before it is even opened.',
      body: 'In a world of digital thumbnails and split-second decisions, your book cover must work harder than ever. Our award-winning designers combine deep knowledge of genre conventions with bold creative vision to produce covers that feel both familiar and utterly unique. Every element — typography, imagery, color and composition — is crafted to speak directly to your ideal reader.',
      bullets: [
        'Custom design — never templated or generic',
        'Genre-specific expertise for maximum appeal',
        'Front cover, back cover and spine design',
        'Optimized for Amazon KDP and all platforms',
        'Multiple initial concepts to choose from',
        'Unlimited revisions until perfect'
      ],
      images: [
        {
          url: '/images/books-fairy-lights.webp',
          alt: 'Book design 1',
          size: 'medium'
        },
        {
          url: '/images/books-stack-pink.webp',
          alt: 'Book design 2',
          size: 'medium'
        },
        {
          url: '/images/flipping-book.webp',
          alt: 'Book design 3',
          size: 'medium'
        },
        {
          url: '/images/books-fairy-lights.webp',
          alt: 'Book design 4',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'palette',
        title: 'Genre Knowledge',
        description: 'Every genre has visual conventions readers expect. We design within those conventions while making your cover stand out.'
      },
      {
        icon: 'image',
        title: 'Platform Optimized',
        description: 'Your cover is designed to work beautifully both as a full-size print file and as a tiny thumbnail on Amazon.'
      },
      {
        icon: 'refresh',
        title: 'Unlimited Concepts',
        description: 'We present multiple distinct design directions so you can choose the vision that resonates most with your story.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Brief and Discovery',
        description: 'We learn about your book, genre, target reader and design preferences.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Concept Development',
        description: 'Our designers develop multiple distinct cover concepts for your review.',
        image: '/images/flipping-book.webp'
      },
      {
        number: '03',
        title: 'Refinement',
        description: 'You select your preferred direction and we refine every detail to perfection.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '04',
        title: 'Typography and Detail',
        description: 'Title, author name, tagline and all typographic elements are perfected.',
        image: '/images/library-books.webp'
      },
      {
        number: '05',
        title: 'Final Files Delivery',
        description: 'Print-ready and digital files delivered in all required formats and sizes.',
        image: '/images/books-fairy-lights.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 299 },
        description: 'A clean professional cover for your digital book.',
        bestFor: 'First-time authors and eBook only releases',
        features: [
          'Front cover design only',
          '2 initial concepts',
          '3 revision rounds',
          'eBook formats included',
          'High resolution files',
          '7-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 599 },
        description: 'Complete cover design for serious authors.',
        bestFor: 'Authors publishing across multiple platforms',
        features: [
          'Front and back cover design',
          'Spine design included',
          '4 initial concepts',
          'Unlimited revision rounds',
          'All digital and print formats',
          'Amazon KDP optimized',
          '10-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 999 },
        description: 'Award-worthy cover design that commands attention.',
        bestFor: 'Authors who demand the highest standard of design',
        features: [
          'Full cover suite — front, back, spine',
          'Custom illustration or photography',
          '6 initial concepts',
          'Unlimited revisions — perfection only',
          'All formats for every platform',
          'Social media promotional graphics',
          'Priority 7-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'How many cover concepts will I see?',
        answer: 'Depending on your plan you will receive between 2 and 6 distinct initial concepts. Each concept represents a genuinely different creative direction, not minor variations of the same idea.'
      },
      {
        question: 'Can I provide reference images or ideas?',
        answer: 'Absolutely — we encourage it. The more reference material and inspiration you can share, the better we can understand your vision and create a cover that excites you.'
      },
      {
        question: 'What file formats will I receive?',
        answer: 'You receive high-resolution print-ready files (PDF, TIFF) and optimized digital files (JPEG, PNG) sized correctly for Amazon KDP, Apple Books, Kobo and all other major platforms.'
      },
      {
        question: 'Do you design covers for all genres?',
        answer: 'Yes — our design team includes specialists in fiction, non-fiction, memoir, self-help, business, children\'s books, mystery, thriller, romance, fantasy and every other major genre.'
      },
      {
        question: 'Can I use my own images or photos on the cover?',
        answer: 'Yes. If you have specific images you want to incorporate we can work with them. We also have access to premium licensed image libraries to source the perfect visual for your cover.'
      }
    ],

    testimonial: {
      quote: 'The cover GhostWriterHunt designed for my novel stopped me in my tracks the moment I saw it. It captured the mood of my story perfectly. Three readers have told me they picked up my book purely because of the cover — and that is exactly what it should do.',
      author: 'Isabella Romano',
      book: 'When Hearts Collide',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Your story deserves a cover',
    ctaHeadlineItalic: 'as powerful as its words.',
    ctaSubtext: 'Book a free design consultation and see what our designers can create for your book.',
    ctaImage: '/images/library-books.webp'
  },

  // ─────────────────────────────────
  // 4. INTERIOR LAYOUT AND FORMATTING
  // ─────────────────────────────────
  {
    slug: 'interior-layout',
    category: 'Design',
    title: 'Interior Layout and Formatting',
    tagline: 'Every page designed',
    taglineItalic: 'beautifully.',
    heroSubtext: 'The interior of your book is where your reader lives for hours. Our layout designers craft every page with typographic precision and visual elegance — creating a reading experience that feels effortless and professional.',

    heroImages: [
      {
        url: '/images/HEERO-L04.webp',
        alt: 'Interior layout designer',
        size: 'large'
      },
      {
        url: '/images/books-stack-pink.webp',
        alt: 'Open book pages',
        size: 'medium'
      },
      {
        url: '/images/author-reading.webp',
        alt: 'Typography detail',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Interior design that makes',
      headlineItalic: 'reading a pleasure.',
      body: 'Great books are not just well written — they are beautifully presented. The way text sits on a page, the choice of typeface, the spacing of lines and the elegance of chapter headings all shape how a reader experiences your words. Our layout designers bring the same care and craft to your interior that premium publishers apply to their finest titles.',
      bullets: [
        'Custom typography selection for your genre',
        'Chapter heading design and styling',
        'Page numbering, headers and footers',
        'Table of contents formatting',
        'Drop capitals and ornamental details',
        'Formatted for all digital platforms'
      ],
      images: [
        {
          url: '/images/library-books.webp',
          alt: 'Book pages',
          size: 'large'
        },
        {
          url: '/images/author-reading.webp',
          alt: 'Typography',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'layout',
        title: 'Genre-Appropriate Design',
        description: 'Fiction, non-fiction, children\'s and academic books each have distinct interior conventions we follow with expertise.'
      },
      {
        icon: 'type',
        title: 'Typographic Excellence',
        description: 'Font selection, line spacing, margins and hierarchy are all calibrated for maximum readability and visual elegance.'
      },
      {
        icon: 'device',
        title: 'Multi-Platform Ready',
        description: 'Your interior is formatted and exported correctly for Amazon KDP, ePub, MOBI and every major digital platform.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Style Consultation',
        description: 'We discuss your genre, aesthetic preferences and platform requirements.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Sample Pages',
        description: 'We design sample pages for your approval before formatting the full manuscript.',
        image: '/images/library-books.webp'
      },
      {
        number: '03',
        title: 'Full Layout',
        description: 'The complete manuscript is laid out with all design elements applied consistently.',
        image: '/images/books-stack-pink.webp'
      },
      {
        number: '04',
        title: 'Review and Revision',
        description: 'You review the complete layout and we refine any details to your satisfaction.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'File Delivery',
        description: 'Print-ready PDF and all digital format files delivered ready for publishing.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Digital',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 199 },
        description: 'Clean professional formatting for digital publishing.',
        bestFor: 'eBook only releases on major platforms',
        features: [
          'ePub and MOBI formatting',
          'Chapter heading styling',
          'Table of contents',
          'Amazon KDP ready',
          '1 revision round',
          '5-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Print and Digital',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 399 },
        description: 'Complete formatting for print and digital.',
        bestFor: 'Authors publishing in multiple formats',
        features: [
          'Print PDF and all digital formats',
          'Custom typography selection',
          'Chapter heading design',
          'Page numbers, headers, footers',
          'Table of contents',
          '3 revision rounds',
          '10-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium Layout',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 699 },
        description: 'Premium typographic design for discerning authors.',
        bestFor: 'Authors who want a truly beautiful interior',
        features: [
          'All print and digital formats',
          'Custom chapter heading illustrations',
          'Drop capitals and ornamental details',
          'Premium typeface selection',
          'Unlimited revisions',
          'All platform optimized files',
          '14-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What formats will my interior be delivered in?',
        answer: 'You receive a print-ready PDF correctly sized for your chosen trim size, plus ePub and MOBI files for digital platforms. All files are tested and ready to upload directly to your chosen publishing platforms.'
      },
      {
        question: 'Can you format books with images and diagrams?',
        answer: 'Yes. We format books of all types including those with images, charts, diagrams, tables and illustrations. Non-fiction and children\'s books with complex layouts are a specialty of our design team.'
      },
      {
        question: 'Do you format children\'s books?',
        answer: 'Absolutely. Children\'s book formatting requires special expertise in illustration placement, text sizing and visual flow. Our designers have extensive experience with picture books and early reader formats.'
      },
      {
        question: 'How long does interior formatting take?',
        answer: 'Digital only formatting typically takes 5 days. Full print and digital formatting takes 10 days. Premium layout design takes 14 days. Rush turnaround is available for urgent projects.'
      },
      {
        question: 'Can you reformat a book I have already published?',
        answer: 'Yes. If your existing book needs reformatting for new platforms, a new edition or simply an improved layout, our team can take your existing files and create a fresh professional layout.'
      }
    ],

    testimonial: {
      quote: 'The interior layout GhostWriterHunt created for my book looked like something from a major publishing house. Every page felt considered and elegant. My readers have commented on how beautifully presented it is — and that makes me incredibly proud.',
      author: 'Dr. Amanda Clarke',
      book: 'Leading With Purpose',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Give your readers a book',
    ctaHeadlineItalic: 'they love to hold.',
    ctaSubtext: 'Book a free consultation and let our designers show you what premium interior design looks like.',
    ctaImage: '/images/books-stack-pink.webp'
  },

  // ─────────────────────────────────
  // 5. ILLUSTRATION AND GRAPHICS
  // ─────────────────────────────────
  {
    slug: 'illustration-graphics',
    category: 'Design',
    title: 'Illustration and Graphics',
    tagline: 'Visuals that bring your',
    taglineItalic: 'story to life.',
    heroSubtext: 'From children\'s book illustrations to non-fiction diagrams and chapter artwork — our illustrators create visuals that enrich your narrative and leave lasting impressions on every reader.',

    heroImages: [
      {
        url: '/images/Heero-L05.webp',
        alt: 'Illustrator creating artwork',
        size: 'large'
      },
      {
        url: '/images/HERO-M05.webp',
        alt: 'Illustration detail',
        size: 'medium'
      },
      {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=200&h=240&fit=crop',
        alt: 'Design tools',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Illustrations that make readers',
      headlineItalic: 'stop and stare.',
      body: 'The right illustration can say what a thousand words cannot. Whether you need whimsical artwork for a children\'s picture book, detailed technical diagrams for a non-fiction title or atmospheric chapter headers for your novel — our illustrators bring the same passion and precision to every image they create for you.',
      bullets: [
        'Children\'s book illustration — all styles',
        'Chapter header and decorative artwork',
        'Non-fiction diagrams and infographics',
        'Character design and development',
        'Map and location illustrations',
        'Custom style matched to your vision'
      ],
      images: [
        {
          url: '/images/books-stack-pink.webp',
          alt: 'Illustration 1',
          size: 'large'
        },
        {
          url: '/images/flipping-book.webp',
          alt: 'Illustration 2',
          size: 'medium'
        },
        {
          url: '/images/collaboration-laptop.webp',
          alt: 'Illustration 3',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'brush',
        title: 'Style Matching',
        description: 'We match illustration style precisely to your book\'s tone — from playful and colorful to sophisticated and minimal.'
      },
      {
        icon: 'users',
        title: 'Specialist Illustrators',
        description: 'Children\'s books, technical diagrams and decorative artwork each require different expertise — we match you with the right illustrator.'
      },
      {
        icon: 'repeat',
        title: 'Revision Friendly',
        description: 'Illustrations evolve through feedback. We refine every image until it matches your vision exactly.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Style Brief',
        description: 'We discuss your vision, reference styles and the emotional tone you want your illustrations to convey.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Sketches and Concepts',
        description: 'Initial pencil sketches or digital concepts are presented for your feedback.',
        image: '/images/flipping-book.webp'
      },
      {
        number: '03',
        title: 'Refinement',
        description: 'Approved sketches are developed into full color or finished illustrations.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '04',
        title: 'Final Details',
        description: 'Colors, textures and final details are perfected to your satisfaction.',
        image: '/images/books-stack-pink.webp'
      },
      {
        number: '05',
        title: 'File Delivery',
        description: 'High resolution files delivered in all formats required for your publishing platform.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Starter',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 399 },
        description: 'Up to 10 illustrations for your book.',
        bestFor: 'Books needing chapter headers or spot illustrations',
        features: [
          'Up to 10 illustrations',
          'Digital color artwork',
          '2 revision rounds per illustration',
          'High resolution files',
          'Rights transfer included',
          '14-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 899 },
        description: 'Up to 25 illustrations with full character development.',
        bestFor: 'Children\'s books and illustrated non-fiction',
        features: [
          'Up to 25 illustrations',
          'Character design included',
          'Full color digital artwork',
          'Unlimited revision rounds',
          'Style guide created',
          'All format files delivered',
          '21-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1999 },
        description: 'Unlimited illustrations — complete visual storytelling.',
        bestFor: 'Full picture books and heavily illustrated titles',
        features: [
          'Unlimited illustrations',
          'Full character and world design',
          'Custom art style development',
          'Unlimited revisions',
          'Print and digital optimized',
          'Cover illustration included',
          'Priority turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What illustration styles do you offer?',
        answer: 'We work in virtually every illustration style — watercolor, digital painting, flat design, line art, realistic, cartoon, manga-inspired and more. We match the style to your book\'s tone and audience.'
      },
      {
        question: 'Do I own the illustrations?',
        answer: 'Yes — 100%. All illustrations are created exclusively for your book and full rights are transferred to you upon completion and payment.'
      },
      {
        question: 'Can you illustrate a children\'s picture book?',
        answer: 'Absolutely. Children\'s book illustration is one of our most popular services. We have illustrators who specialize in creating magical, age-appropriate artwork that young readers love.'
      },
      {
        question: 'How many revisions are included?',
        answer: 'Our Professional and Premium plans include unlimited revisions. Our Starter plan includes 2 revision rounds per illustration. Additional revisions can be arranged if needed.'
      },
      {
        question: 'Can you match an existing illustration style?',
        answer: 'Yes. If you have existing illustrations from another artist or a specific style you want to replicate, our illustrators can analyze and match that style for consistency across your entire book.'
      }
    ],

    testimonial: {
      quote: 'Priya\'s illustrations for my children\'s book were beyond anything I imagined. The characters felt alive, warm and magical. My daughter — who the book was written for — screamed with joy when she saw herself in the pages. That reaction said everything.',
      author: 'Linda Chen',
      book: 'The Little Star',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Let your story be',
    ctaHeadlineItalic: 'seen as well as read.',
    ctaSubtext: 'Book a free illustration consultation and discover what our artists can create for your book.',
    ctaImage: '/images/flipping-book.webp'
  },

  // ─────────────────────────────────
  // 6. EBOOK PUBLISHING
  // ─────────────────────────────────
  {
    slug: 'ebook-publishing',
    category: 'Publishing',
    title: 'eBook Publishing',
    tagline: 'Your book, live on',
    taglineItalic: '47+ platforms worldwide.',
    heroSubtext: 'We handle every step of the digital publishing process — from file preparation and ISBN registration to platform setup and listing optimization. Your book goes live globally while you keep 100% of your rights and royalties.',

    heroImages: [
      {
        url: '/images/HEERO-L06.webp',
        alt: 'eBook publishing professional',
        size: 'large'
      },
      {
        url: '/images/HERO-M06.webp',
        alt: 'eBook publishing detail',
        size: 'medium'
      },
      {
        url: '/images/flipping-book.webp',
        alt: 'Global reach',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Published globally in',
      headlineItalic: '30 days or less.',
      body: 'Self-publishing has never been more powerful — or more complex. Between file formats, platform requirements, metadata optimization and ISBN registration, the process can overwhelm even experienced authors. Our publishing team handles every technical detail so you can focus entirely on your next book while we launch your current one to readers around the world.',
      bullets: [
        'Publishing on Amazon KDP, Apple Books, Kobo and 47+ platforms',
        'ISBN registration and metadata setup',
        'Amazon listing optimization for discoverability',
        'All digital formats — ePub, MOBI, PDF',
        'Pricing strategy consultation included',
        'You keep 100% of your rights and royalties'
      ],
      images: [
        {
          url: '/images/library-books.webp',
          alt: 'Publishing platform',
          size: 'large'
        },
        {
          url: '/images/books-fairy-lights.webp',
          alt: 'Digital device',
          size: 'medium'
        },
        {
          url: '/images/flipping-book.webp',
          alt: 'Books',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'globe',
        title: 'Global Distribution',
        description: 'Your book is published simultaneously on 47+ platforms reaching readers in every country where digital books are sold.'
      },
      {
        icon: 'search',
        title: 'Discoverability Optimization',
        description: 'Keywords, categories, metadata and Amazon listing copy are all optimized to help readers find your book.'
      },
      {
        icon: 'shield',
        title: '100% Rights Retained',
        description: 'You retain complete ownership of your book, all publishing rights and 100% of the royalties earned on every platform.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'File Review',
        description: 'We review your manuscript and cover files to ensure they meet all platform requirements.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Format Conversion',
        description: 'Your manuscript is converted into all required digital formats for every platform.',
        image: '/images/library-books.webp'
      },
      {
        number: '03',
        title: 'ISBN and Metadata',
        description: 'ISBN registration, category selection, keywords and all metadata are set up for maximum discoverability.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '04',
        title: 'Platform Publishing',
        description: 'Your book is uploaded, configured and published across all 47+ platforms simultaneously.',
        image: '/images/books-fairy-lights.webp'
      },
      {
        number: '05',
        title: 'Launch Confirmation',
        description: 'We confirm your book is live on all platforms and provide direct links to every listing.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 299 },
        description: 'Publishing on the top 3 major platforms.',
        bestFor: 'Authors publishing on Amazon, Apple and Kobo',
        features: [
          'Amazon KDP publishing',
          'Apple Books publishing',
          'Kobo publishing',
          'ISBN registration',
          'Basic metadata setup',
          '30-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Global',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 599 },
        description: 'Full global distribution on 47+ platforms.',
        bestFor: 'Authors who want maximum global reach',
        features: [
          'Publishing on 47+ platforms worldwide',
          'Amazon listing optimization',
          'Full metadata and keyword setup',
          'ISBN registration included',
          'Pricing strategy consultation',
          'All digital format files',
          '30-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium Launch',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 999 },
        description: 'Complete publishing and launch strategy package.',
        bestFor: 'Authors who want a strategic book launch',
        features: [
          'Publishing on 47+ platforms',
          'Amazon optimization — advanced',
          'Book launch strategy included',
          'Pre-order setup on all platforms',
          'Author profile setup — all platforms',
          'First month sales monitoring',
          'Priority 14-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'Which platforms will my book be published on?',
        answer: 'We publish on Amazon KDP, Kindle, Apple Books, Google Play Books, Kobo, Barnes and Noble Press, Smashwords, Draft2Digital and 40+ additional platforms reaching readers in virtually every country in the world.'
      },
      {
        question: 'Do I need my own accounts on these platforms?',
        answer: 'Yes — you publish under your own author accounts so all royalties go directly to you. We guide you through setting up any accounts you do not already have as part of our service.'
      },
      {
        question: 'How long does publishing take?',
        answer: 'Most platforms approve and publish books within 24 to 72 hours of submission. Our full publishing process from file receipt to live listing typically takes 7 to 14 days depending on your plan.'
      },
      {
        question: 'What royalties will I earn?',
        answer: 'Royalty rates vary by platform and pricing. Amazon KDP pays 35% to 70% depending on price. Most other platforms pay 60% to 80%. We help you set prices to maximize your royalty income on every platform.'
      },
      {
        question: 'Can you publish a book I have already written and formatted?',
        answer: 'Yes. If your manuscript is already written and formatted, we can take it straight to publishing. We review your files, convert to required formats if needed and publish across all platforms.'
      }
    ],

    testimonial: {
      quote: 'GhostWriterHunt published my book on 47 platforms in less than 3 weeks. I had tried to navigate Amazon KDP myself and spent weeks confused. Their team handled everything — and my book was live globally before I had even fully processed that it was real.',
      author: 'Thomas Williams',
      book: 'A Life Remembered',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Your book belongs',
    ctaHeadlineItalic: 'in the hands of readers.',
    ctaSubtext: 'Book a free publishing consultation and let us take your book to the world.',
    ctaImage: '/images/flipping-book.webp'
  },

  // ─────────────────────────────────
  // 7. AUTHOR BRANDING
  // ─────────────────────────────────
  {
    slug: 'author-branding',
    category: 'Marketing',
    title: 'Author Branding',
    tagline: 'Build your presence as',
    taglineItalic: 'a published author.',
    heroSubtext: 'Your book is published — now the world needs to know who you are. We craft your author brand from bio to website copy, social presence to media kit — everything you need to establish yourself as an authority in your field.',

    heroImages: [
      {
        url: '/images/HEERO-L07.webp',
        alt: 'Author branding session',
        size: 'large'
      },
      {
        url: '/images/HERO-M07.webp',
        alt: 'Author branding detail',
        size: 'medium'
      },
      {
        url: '/images/collaboration-laptop.webp',
        alt: 'Author platform',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Every published author needs',
      headlineItalic: 'a powerful presence.',
      body: 'Being a published author is just the beginning. To build a readership, attract media attention and sell books consistently, you need a strong and cohesive author brand. We craft every element of your public author identity — from the words in your bio to the voice of your social media — ensuring you present yourself with the authority and authenticity your work deserves.',
      bullets: [
        'Professional author biography — short and long form',
        'Amazon Author Central profile setup and optimization',
        'Social media bio and profile optimization',
        'Author website content and copy',
        'Press kit and media kit creation',
        'Brand voice guide for consistent communication'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          alt: 'Author branding',
          size: 'large'
        },
        {
          url: '/images/collaboration-laptop.webp',
          alt: 'Brand elements',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'user',
        title: 'Authentic Voice',
        description: 'Your author brand should sound like the best version of you — authoritative, warm and genuine. We capture that perfectly.'
      },
      {
        icon: 'star',
        title: 'Platform Specific',
        description: 'Different platforms require different approaches. We tailor your presence for Amazon, Goodreads, Instagram, LinkedIn and beyond.'
      },
      {
        icon: 'trending-up',
        title: 'Readership Building',
        description: 'Every element we create is designed to attract and retain readers — turning casual visitors into devoted fans of your work.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Brand Discovery',
        description: 'We learn about your book, your audience, your values and the impression you want to make on readers.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Voice Development',
        description: 'We develop your unique author voice — the tone and style that will define all your public communication.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '03',
        title: 'Content Creation',
        description: 'All bio copy, website content, social profiles and press materials are written and designed.',
        image: '/images/writing-hands.webp'
      },
      {
        number: '04',
        title: 'Platform Setup',
        description: 'Your brand is applied consistently across all platforms — Amazon, Goodreads, social media and more.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      },
      {
        number: '05',
        title: 'Brand Guide Delivery',
        description: 'You receive a complete brand guide so you can maintain consistency in all future communications.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 299 },
        description: 'Core author bio and Amazon profile.',
        bestFor: 'Newly published authors establishing their presence',
        features: [
          'Professional author bio — 2 lengths',
          'Amazon Author Central setup',
          'Goodreads author profile',
          '1 revision round',
          'Delivered in 7 days'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 699 },
        description: 'Complete author brand across all platforms.',
        bestFor: 'Authors building a serious readership',
        features: [
          'Professional author bio — 3 lengths',
          'Amazon and Goodreads setup',
          'Social media bio — all platforms',
          'Author website copy — 5 pages',
          'Press kit creation',
          'Brand voice guide',
          'Unlimited revisions',
          'Delivered in 14 days'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1299 },
        description: 'Full author brand identity and media presence.',
        bestFor: 'Authors who want to build a powerful public profile',
        features: [
          'Everything in Professional',
          'Full media kit and press release',
          'Speaking bio and one-sheet',
          'Podcast and interview pitch copy',
          'Email newsletter setup copy',
          'Social media content plan',
          'Priority 10-day delivery'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What is included in an author bio?',
        answer: 'We create multiple lengths of your author biography — a short 50-word version for social media, a medium 100-word version for Amazon and a long 250-word version for your website and press materials.'
      },
      {
        question: 'Do you set up my Amazon Author Central page?',
        answer: 'Yes. We write and optimize your Amazon Author Central profile including your biography, author photo guidance, blog feed setup and linking all your books to your author page.'
      },
      {
        question: 'Can you help with social media for authors?',
        answer: 'Yes. We create optimized bios for Instagram, Twitter/X, Facebook, LinkedIn and TikTok. Our Professional and Premium plans also include a social media content strategy guide.'
      },
      {
        question: 'What is a press kit and do I need one?',
        answer: 'A press kit is a document media outlets, podcast hosts and event organizers use to learn about you and your book. It includes your bio, book summary, key talking points, interview topics and contact information. If you plan to do any media, you need one.'
      },
      {
        question: 'Can you write the copy for my author website?',
        answer: 'Yes. Our Professional plan includes copy for up to 5 pages of your author website — Home, About, Books, Blog and Contact. Our Premium plan includes additional pages and ongoing content support.'
      }
    ],

    testimonial: {
      quote: 'Before GhostWriterHunt created my author brand I felt invisible online. Now I have a professional presence that genuinely reflects who I am as a writer. My Amazon page looks like I belong there — because the brand they created makes me look like the author I actually am.',
      author: 'David Harrison',
      book: 'The Entrepreneur\'s Edge',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Step into your identity',
    ctaHeadlineItalic: 'as a published author.',
    ctaSubtext: 'Book a free brand consultation and discover what your author presence could look like.',
    ctaImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 8. BOOK MARKETING
  // ─────────────────────────────────
  {
    slug: 'book-marketing',
    category: 'Marketing',
    title: 'Book Marketing',
    tagline: 'Get your book in front of',
    taglineItalic: 'the right readers.',
    heroSubtext: 'Publishing your book is just the beginning. Our book marketing specialists create and execute targeted strategies that drive real visibility, real reviews and real sales — across Amazon, social media and beyond.',

    heroImages: [
      {
        url: '/images/HEERO-L08.webp',
        alt: 'Book marketing professional',
        size: 'large'
      },
      {
        url: '/images/collaboration-laptop.webp',
        alt: 'Marketing analytics',
        size: 'medium'
      },
      {
        url: '/images/collaboration-laptop.webp',
        alt: 'Social media',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Great books deserve',
      headlineItalic: 'great audiences.',
      body: 'The most beautifully written book in the world will not sell itself. Readers need to discover it — through search, social media, reviews and word of mouth. Our marketing team designs and executes campaigns that put your book in front of the exact readers who are looking for exactly what you have written. From Amazon optimization to social media campaigns and review generation, we build the visibility your book deserves.',
      bullets: [
        'Amazon KDP listing optimization',
        'Social media promotion campaigns',
        'Review generation strategy',
        'Email marketing campaigns',
        'Influencer and blogger outreach',
        'Book launch strategy and execution'
      ],
      images: [
        {
          url: '/images/child-reading-book.webp',
          alt: 'Child reading a book',
          size: 'large'
        },
        {
          url: '/images/collaboration-laptop.webp',
          alt: 'Analytics',
          size: 'medium'
        },
        {
          url: '/images/writing-desk.webp',
          alt: 'Social media',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'target',
        title: 'Reader Targeting',
        description: 'We identify exactly who your ideal readers are and build campaigns designed to reach them wherever they spend time online.'
      },
      {
        icon: 'bar-chart',
        title: 'Data Driven',
        description: 'Every campaign decision is informed by data — from Amazon keyword research to social media performance analytics.'
      },
      {
        icon: 'award',
        title: 'Review Strategy',
        description: 'Reviews are the lifeblood of book sales. We implement ethical, effective strategies to generate genuine reader reviews.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Market Research',
        description: 'We research your genre, competition and target readers to build a strategy that works.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Strategy Development',
        description: 'A custom marketing plan is created covering platforms, tactics and timeline.',
        image: '/images/child-reading-book.webp'
      },
      {
        number: '03',
        title: 'Amazon Optimization',
        description: 'Keywords, categories, description and listing copy are optimized for maximum discoverability.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '04',
        title: 'Campaign Execution',
        description: 'Social media, email and outreach campaigns are launched and managed by our marketing team.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Monitoring and Reporting',
        description: 'Regular performance reports keep you informed of results, adjustments and sales progress.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Launch',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 499 },
        description: 'Essential marketing for your book launch.',
        bestFor: 'Authors launching their first book',
        features: [
          'Amazon listing optimization',
          'Social media promotion — 3 months',
          'Review generation strategy',
          '5 blog and article placements',
          'Monthly performance report',
          'Dedicated marketing manager'
        ],
        featured: false
      },
      {
        name: 'Growth',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 999 },
        description: 'Comprehensive marketing for serious authors.',
        bestFor: 'Authors committed to building a readership',
        features: [
          'Advanced Amazon optimization',
          'Social media promotion — 6 months',
          'Email marketing campaign',
          '10 blog and article placements',
          'Influencer outreach program',
          'Video review campaign',
          'Bi-weekly performance reports',
          'Dedicated marketing manager'
        ],
        featured: true
      },
      {
        name: 'Authority',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1999 },
        description: 'Full-scale marketing for maximum impact.',
        bestFor: 'Authors who want to become bestsellers',
        features: [
          'Everything in Growth plan',
          'Amazon PPC advertising management',
          'Press release to 200+ outlets',
          'Podcast booking campaign',
          'Social media advertising',
          'Bestseller campaign strategy',
          'Weekly performance reports',
          'Priority marketing manager'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'How long before I see results from marketing?',
        answer: 'Amazon optimization typically shows results within 2 to 4 weeks as your listing gains visibility. Social media and review campaigns build momentum over 4 to 8 weeks. Sustained marketing over 3 to 6 months produces the most significant and lasting results.'
      },
      {
        question: 'Do you run Amazon advertising for my book?',
        answer: 'Yes — our Authority plan includes full Amazon PPC advertising management. We research keywords, create campaigns, manage bids and optimize for maximum return on your advertising investment.'
      },
      {
        question: 'Can you help with a book launch?',
        answer: 'Absolutely. Book launches are one of our specialties. We create a pre-launch, launch day and post-launch strategy that builds anticipation, drives reviews and maximizes your first-week sales — which are critical for Amazon rankings.'
      },
      {
        question: 'How do you generate reviews ethically?',
        answer: 'We use a proven process of reaching out to relevant readers, bloggers and book clubs within your genre who are genuinely interested in reviewing books like yours. All reviews are genuine and voluntary — never purchased or incentivized in violation of platform policies.'
      },
      {
        question: 'Do I need marketing if my book is already published?',
        answer: 'Yes — it is never too late to market a book. Many authors see significant sales increases from marketing campaigns launched months or even years after publication, particularly with Amazon optimization and a fresh social media strategy.'
      }
    ],

    testimonial: {
      quote: 'Within 6 weeks of GhostWriterHunt running my book marketing campaign, my Amazon ranking jumped from nowhere to the top 10 in my category. The reviews started coming in and the momentum just built and built. My book hit the bestseller list in its first month of proper marketing.',
      author: 'Kevin O\'Brien',
      book: 'Shadows at Midnight',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Your readers are out there',
    ctaHeadlineItalic: 'waiting to find you.',
    ctaSubtext: 'Book a free marketing consultation and discover how we can get your book in front of the right audience.',
    ctaImage: '/images/child-reading-book.webp'
  },

  // ─────────────────────────────────
  // 9. EBOOK WRITING
  // ─────────────────────────────────
  {
    slug: 'ebook-writing',
    category: 'Writing',
    title: 'eBook Writing',
    tagline: 'Expert eBooks written',
    taglineItalic: 'in your voice.',
    heroSubtext: 'Whether you need a lead magnet, a thought leadership piece or a full-length digital book — our professional eBook writers deliver compelling, well-researched content that establishes your authority and engages your readers from first page to last.',

    heroImages: [
      {
        url: '/images/HEERO-L09.webp',
        alt: 'eBook writer at work',
        size: 'large'
      },
      {
        url: '/images/writing-desk.webp',
        alt: 'Digital content',
        size: 'medium'
      },
      {
        url: '/images/books-education.webp',
        alt: 'Writing desk',
        size: 'small'
      }
    ],

    overview: {
      headline: 'eBooks that establish your',
      headlineItalic: 'expertise and authority.',
      body: 'A well-written eBook is one of the most powerful tools in any author or business owner\'s arsenal. It builds trust, demonstrates expertise and creates a lasting impression on every reader. Our eBook writers combine deep research skills with compelling storytelling to produce digital books that your readers will value, share and remember.',
      bullets: [
        'Thoroughly researched, expertly written content',
        'Non-fiction, self-help, business and how-to eBooks',
        'Lead magnets and marketing eBooks',
        'Written in your unique voice and style',
        'Fully formatted and design-ready',
        'Delivered ready for publishing on all platforms'
      ],
      images: [
        {
          url: '/images/books-fairy-lights.webp',
          alt: 'eBook content',
          size: 'large'
        },
        {
          url: '/images/books-education.webp',
          alt: 'Writing',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'book-open',
        title: 'Deep Research',
        description: 'Every eBook we write is grounded in thorough research — ensuring your content is accurate, current and genuinely valuable to your readers.'
      },
      {
        icon: 'mic',
        title: 'Voice Capture',
        description: 'Your eBook sounds like you — whether that means authoritative and professional, warm and conversational or bold and direct.'
      },
      {
        icon: 'zap',
        title: 'Reader Focused',
        description: 'We write with your reader in mind at every turn — creating content that answers their questions, solves their problems and earns their trust.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Topic and Scope',
        description: 'We define your eBook topic, target reader, key messages and desired outcomes.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Research and Outline',
        description: 'Thorough research is conducted and a detailed chapter outline is created for your approval.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '03',
        title: 'Writing',
        description: 'Your dedicated eBook writer produces the complete manuscript chapter by chapter.',
        image: '/images/writing-hands.webp'
      },
      {
        number: '04',
        title: 'Edit and Polish',
        description: 'The manuscript is edited for clarity, flow and consistency before your review.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Final Delivery',
        description: 'Your completed eBook is delivered in all required formats ready for publishing or distribution.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Short eBook',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 499 },
        description: 'Up to 10,000 words — perfect for lead magnets.',
        bestFor: 'Lead magnets and short how-to guides',
        features: [
          'Up to 10,000 words',
          'Research included',
          'Chapter outline approval',
          '2 revision rounds',
          'Word document delivery',
          '14-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Standard eBook',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 999 },
        description: 'Up to 30,000 words — complete thought leadership piece.',
        bestFor: 'Authors establishing expertise in their field',
        features: [
          'Up to 30,000 words',
          'Deep research included',
          'Chapter outline approval',
          'Unlimited revision rounds',
          'All format files delivered',
          'Basic cover design included',
          '21-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Full eBook',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1999 },
        description: 'Up to 60,000 words — complete digital book.',
        bestFor: 'Authors publishing a full-length digital book',
        features: [
          'Up to 60,000 words',
          'Comprehensive research',
          'Full editorial review',
          'Unlimited revisions',
          'Professional cover design',
          'Interior layout included',
          'Publishing ready on all platforms',
          '30-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What topics can you write eBooks about?',
        answer: 'Our writers cover virtually every non-fiction topic — business, finance, health and wellness, self-help, personal development, technology, marketing, leadership, cooking, parenting and more. If there is an audience for it, we can write it.'
      },
      {
        question: 'How do I provide my ideas and knowledge to the writer?',
        answer: 'Through an initial briefing call and a questionnaire, we capture your knowledge, opinions, examples and key messages. Your writer then uses this to create content that genuinely reflects your expertise and perspective.'
      },
      {
        question: 'Is the content original and plagiarism-free?',
        answer: 'Yes — always. Every eBook we write is 100% original content created exclusively for you. We never use templated, recycled or AI-generated content. Your eBook is written from scratch by a human professional.'
      },
      {
        question: 'Will my eBook be formatted and ready to publish?',
        answer: 'Our Standard and Full eBook plans include formatting in all required digital formats. Your eBook will be ready to upload directly to Amazon KDP, Apple Books or any other platform as soon as you receive it.'
      },
      {
        question: 'Can I use my eBook as a lead magnet or marketing tool?',
        answer: 'Absolutely. eBooks make exceptionally powerful lead magnets and marketing tools. We can write with that specific purpose in mind — creating content that builds trust and encourages readers to take the next step with you.'
      }
    ],

    testimonial: {
      quote: 'My eBook has become the most effective lead generation tool in my business. GhostWriterHunt captured exactly what I wanted to say — clearly, compellingly and in a voice that sounds exactly like me. Every week new clients tell me they decided to work with me after reading it.',
      author: 'Dr. Marcus Chen',
      book: 'The Science of Success',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Share your expertise with',
    ctaHeadlineItalic: 'the world.',
    ctaSubtext: 'Book a free consultation and let us write the eBook that establishes your authority.',
    ctaImage: '/images/books-fairy-lights.webp'
  },

  // ─────────────────────────────────
  // 10. CHILDREN'S BOOK WRITING
  // ─────────────────────────────────
  {
    slug: 'childrens-book',
    category: 'Writing',
    title: "Children's Book Writing",
    tagline: 'Stories that spark',
    taglineItalic: "a child's imagination.",
    heroSubtext: "Children's books are among the most powerful stories ever written. Our specialist children's book writers craft age-appropriate narratives with warmth, rhythm and magic — stories that young readers return to again and again.",

    heroImages: [
      {
        url: '/images/HEERO-L10.webp',
        alt: 'Children book author reading',
        size: 'large'
      },
      {
        url: '/images/books-education.webp',
        alt: 'Child reading',
        size: 'medium'
      },
      {
        url: '/images/book-pen-laptop.webp',
        alt: 'Colorful books',
        size: 'small'
      }
    ],

    overview: {
      headline: "Books that children treasure",
      headlineItalic: 'for a lifetime.',
      body: "Writing for children is one of the most demanding and rewarding forms of the craft. Every word must earn its place — creating rhythm, wonder and emotional resonance in the fewest possible words. Our children's book specialists understand the unique requirements of each age group — from picture books for toddlers to chapter books for middle grade readers — and bring years of experience to every project.",
      bullets: [
        'Picture books for ages 2 to 5',
        'Early reader books for ages 5 to 8',
        'Chapter books for ages 7 to 12',
        'Middle grade fiction and non-fiction',
        'Rhyming and prose styles available',
        'Character development and world building included'
      ],
      images: [
        {
          url: '/images/book-pen-laptop.webp',
          alt: "Children's books",
          size: 'large'
        },
        {
          url: '/images/books-education.webp',
          alt: 'Reading child',
          size: 'medium'
        },
        {
          url: '/images/book-pen-laptop.webp',
          alt: 'Books',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'heart',
        title: 'Age Appropriate',
        description: 'Every word, concept and sentence structure is calibrated for your target age group — creating content that resonates and delights.'
      },
      {
        icon: 'feather',
        title: 'Rhythm and Flow',
        description: "Children's books are meant to be read aloud. We craft every line with the cadence, rhythm and flow that makes reading together a joy."
      },
      {
        icon: 'sun',
        title: 'Character Magic',
        description: 'Memorable characters are the heart of every great children\'s book. We develop characters that children connect with, root for and love.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Story Discovery',
        description: 'We discuss your story idea, target age group, themes, characters and the message you want to share.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Character and Plot',
        description: 'Characters are developed and a story outline is created and approved before writing begins.',
        image: '/images/books-education.webp'
      },
      {
        number: '03',
        title: 'First Draft',
        description: 'Your specialist writer crafts the complete first draft with rhythm, warmth and wonder.',
        image: '/images/book-pen-laptop.webp'
      },
      {
        number: '04',
        title: 'Review and Refine',
        description: 'You read the draft aloud and share feedback. We refine until every word feels perfect.',
        image: '/images/book-pen-laptop.webp'
      },
      {
        number: '05',
        title: 'Final Manuscript',
        description: 'The completed manuscript is delivered ready for illustration and publishing.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Picture Book',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 399 },
        description: 'A complete picture book manuscript — up to 800 words.',
        bestFor: 'Picture books for children aged 2 to 5',
        features: [
          'Up to 800 words',
          'Character development',
          'Story outline approval',
          '3 revision rounds',
          'Illustration notes included',
          '14-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Early Reader',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 699 },
        description: 'An early reader or chapter book — up to 5,000 words.',
        bestFor: 'Books for children aged 5 to 8',
        features: [
          'Up to 5,000 words',
          'Full character development',
          'Story outline approval',
          'Unlimited revision rounds',
          'Chapter structure included',
          'Illustration brief included',
          '21-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Middle Grade',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1499 },
        description: 'A full middle grade novel — up to 30,000 words.',
        bestFor: 'Chapter books for children aged 7 to 12',
        features: [
          'Up to 30,000 words',
          'Full world and character development',
          'Detailed plot outline',
          'Unlimited revisions',
          'Series bible included',
          'Editorial review included',
          '45-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What age groups do you write for?',
        answer: 'We write for all children\'s age groups — board books and picture books for ages 2 to 5, early readers for ages 5 to 8, chapter books for ages 7 to 10 and middle grade fiction and non-fiction for ages 8 to 12.'
      },
      {
        question: 'Can you write a rhyming picture book?',
        answer: 'Yes — rhyming picture books are one of our specialties. Our writers understand the strict metrical requirements of children\'s rhyme and create verse that flows naturally when read aloud.'
      },
      {
        question: 'Do you also provide illustration services?',
        answer: 'Yes. We offer illustration services separately or as a combined package with the writing. Our illustrators specialize in children\'s book artwork across all styles — from watercolor and gouache to digital and mixed media.'
      },
      {
        question: 'Can I base the story on my own child or family?',
        answer: 'Absolutely — personalized children\'s books are among our most popular projects. Many of our clients want to capture a family story, honor a child\'s personality or create a keepsake that will be treasured for generations.'
      },
      {
        question: 'How do you make sure the story is age appropriate?',
        answer: 'Our children\'s book specialists have extensive knowledge of child development and age-appropriate content for each group. We calibrate vocabulary, sentence length, themes and concepts specifically for your target age group.'
      }
    ],

    testimonial: {
      quote: 'The children\'s book GhostWriterHunt wrote for my daughter is the most precious thing we own. She asks for it every single night and knows every word by heart. The writer captured her spirit so perfectly that she genuinely believes it was written just for her — because it was.',
      author: 'Linda Chen',
      book: 'The Little Star',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Create a story your child',
    ctaHeadlineItalic: 'will never forget.',
    ctaSubtext: 'Book a free consultation and let us write the children\'s book that becomes a family treasure.',
    ctaImage: '/images/book-pen-laptop.webp'
  },

  // ─────────────────────────────────
  // 11. ARTICLE WRITING
  // ─────────────────────────────────
  {
    slug: 'article-writing',
    category: 'Writing',
    title: 'Article Writing',
    tagline: 'Articles that inform,',
    taglineItalic: 'engage and convert.',
    heroSubtext: 'From thought leadership pieces to SEO-optimized web articles — our professional article writers produce content that establishes your authority, drives traffic and keeps readers coming back for more.',

    heroImages: [
      {
        url: '/images/HEERO-L11.webp',
        alt: 'Article writing professionals',
        size: 'large'
      },
      {
        url: '/images/writing-desk.webp',
        alt: 'Writing content',
        size: 'medium'
      },
      {
        url: '/images/writing-hands.webp',
        alt: 'Editorial desk',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Content that builds authority',
      headlineItalic: 'and drives results.',
      body: 'In a world saturated with content, only the best rises to the top. Our article writers combine deep research skills, compelling storytelling and SEO expertise to produce articles that rank, engage and convert. Whether you need regular website content, guest posts for major publications or in-depth thought leadership pieces — we deliver writing that makes readers trust you.',
      bullets: [
        'SEO-optimized articles for website and blog',
        'Thought leadership pieces for major publications',
        'Guest post writing and placement support',
        'Research-backed long-form articles',
        'Industry news and analysis pieces',
        'Ghostwritten under your byline'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=500&fit=crop',
          alt: 'Article writing',
          size: 'large'
        },
        {
          url: '/images/writing-desk.webp',
          alt: 'Content creation',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'search',
        title: 'SEO Integration',
        description: 'Every article is researched and written with search engine visibility in mind — naturally incorporating target keywords without compromising quality.'
      },
      {
        icon: 'feather',
        title: 'Expert Research',
        description: 'Our writers go deep into every topic — reading primary sources, industry reports and expert opinions to produce content that genuinely informs.'
      },
      {
        icon: 'trending-up',
        title: 'Conversion Focused',
        description: 'Great articles do not just inform — they guide readers toward action. We write with your conversion goals in mind at every stage.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Topic and Brief',
        description: 'We discuss your topic, target keywords, audience and the goal of each article.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Research',
        description: 'Thorough research is conducted to ensure accuracy, depth and genuine value for your readers.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '03',
        title: 'Writing',
        description: 'Your article is written with clarity, authority and the perfect balance of information and engagement.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'
      },
      {
        number: '04',
        title: 'Edit and Polish',
        description: 'Every article is edited for clarity, flow and consistency before delivery.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Delivery',
        description: 'Your completed article is delivered in your preferred format ready for publication.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Standard',
        label: 'ESSENTIALS',
        price: { perChapter: 99, fullBook: null },
        description: 'Per article — up to 1,000 words.',
        bestFor: 'Regular blog posts and website articles',
        features: [
          'Up to 1,000 words per article',
          'SEO keyword integration',
          'Research included',
          '1 revision round',
          '3-day turnaround per article',
          'Delivered in Word format'
        ],
        featured: false
      },
      {
        name: 'In-Depth',
        label: 'MOST POPULAR',
        price: { perChapter: 199, fullBook: null },
        description: 'Per article — up to 2,500 words.',
        bestFor: 'Long-form content and thought leadership',
        features: [
          'Up to 2,500 words per article',
          'Advanced SEO optimization',
          'Deep research included',
          '2 revision rounds',
          '5-day turnaround per article',
          'Meta description included'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: 399, fullBook: null },
        description: 'Per article — up to 5,000 words.',
        bestFor: 'Major publications and comprehensive guides',
        features: [
          'Up to 5,000 words per article',
          'Expert-level research',
          'Original data and analysis',
          'Unlimited revisions',
          '7-day turnaround per article',
          'Images and graphics brief included'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'Do you write articles for specific industries?',
        answer: 'Yes. We have writers who specialize in technology, finance, healthcare, legal, marketing, real estate, travel, food, lifestyle and many other industries. You are always matched with a writer who understands your field.'
      },
      {
        question: 'Will the articles be SEO optimized?',
        answer: 'Yes. All our articles naturally incorporate your target keywords, follow SEO best practices for headings and structure and include meta description copy. We write for both search engines and human readers simultaneously.'
      },
      {
        question: 'Can you write articles under my name as a ghostwriter?',
        answer: 'Absolutely. All our article writing is fully ghostwritten — you receive the complete article to publish under your name. We sign full NDAs and our involvement is completely confidential.'
      },
      {
        question: 'Can I order articles on a regular basis?',
        answer: 'Yes — we offer monthly retainer packages for authors and businesses who need regular content. Retainer pricing offers significant savings compared to per-article rates and ensures priority scheduling.'
      },
      {
        question: 'Do you write articles for specific publications?',
        answer: 'Yes. If you have a specific publication in mind — Forbes, Medium, LinkedIn or an industry journal — we research that publication\'s style, tone and submission guidelines and write to their specific requirements.'
      }
    ],

    testimonial: {
      quote: 'GhostWriterHunt writes all my LinkedIn articles and my website blog. The quality is extraordinary — every piece sounds exactly like me and my engagement has tripled since we started working together. I could not write this well myself even if I had the time.',
      author: 'Dr. Amanda Clarke',
      book: 'Leading With Purpose',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Build your authority',
    ctaHeadlineItalic: 'one article at a time.',
    ctaSubtext: 'Book a free consultation and let us create the content that establishes you as the expert in your field.',
    ctaImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 12. BLOG WRITING
  // ─────────────────────────────────
  {
    slug: 'blog-writing',
    category: 'Writing',
    title: 'Blog Writing',
    tagline: 'Consistent, compelling blogs',
    taglineItalic: 'that grow your audience.',
    heroSubtext: 'A great blog builds trust, drives organic traffic and keeps your audience coming back month after month. Our blog writers deliver consistent, high-quality content that sounds like you and achieves your goals.',

    heroImages: [
      {
        url: '/images/HEERO-L12.webp',
        alt: 'Blog writing team',
        size: 'large'
      },
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300&h=350&fit=crop',
        alt: 'Content creation',
        size: 'medium'
      },
      {
        url: '/images/writing-desk.webp',
        alt: 'Writing workspace',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Your blog, written with',
      headlineItalic: 'consistency and craft.',
      body: 'The hardest part of blogging is not writing one great post — it is writing fifty great posts while running a business or pursuing a career. Our blog writers take that burden completely off your shoulders. We research, write and deliver publication-ready blog posts in your voice, on your schedule, consistently — so your audience always has something valuable to read and your search rankings keep climbing.',
      bullets: [
        'Blog posts from 500 to 3,000 words',
        'SEO-optimized for organic traffic growth',
        'Written in your unique voice and style',
        'Consistent publishing schedule maintained',
        'Topic research and content calendar planning',
        'Images sourced and brief included'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop',
          alt: 'Blogging',
          size: 'large'
        },
        {
          url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=250&h=300&fit=crop',
          alt: 'Writing',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'calendar',
        title: 'Consistent Schedule',
        description: 'We maintain your publishing schedule without fail — delivering posts on time, every time, so your audience never waits.'
      },
      {
        icon: 'search',
        title: 'SEO Strategy',
        description: 'Every post is optimized for search — targeting keywords your ideal readers actually use to find content like yours.'
      },
      {
        icon: 'users',
        title: 'Audience First',
        description: 'We write for your specific audience — understanding their questions, concerns and desires and addressing them directly in every post.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Voice and Style',
        description: 'We study your existing content and interview you to capture your unique voice and style.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Content Calendar',
        description: 'A monthly content calendar is planned with topics, keywords and publishing dates.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop'
      },
      {
        number: '03',
        title: 'Writing',
        description: 'Each post is researched and written with your audience and SEO goals in mind.',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
      },
      {
        number: '04',
        title: 'Review',
        description: 'You review each post before publication — providing feedback for any refinements.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Publish and Monitor',
        description: 'Posts are delivered publication-ready and we track performance to continually improve.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Starter',
        label: 'ESSENTIALS',
        price: { perChapter: 299, fullBook: null },
        description: '4 blog posts per month — up to 800 words each.',
        bestFor: 'Authors starting their blogging journey',
        features: [
          '4 posts per month',
          'Up to 800 words per post',
          'SEO keyword integration',
          'Topic research included',
          '1 revision per post',
          'Monthly content calendar'
        ],
        featured: false
      },
      {
        name: 'Growth',
        label: 'MOST POPULAR',
        price: { perChapter: 599, fullBook: null },
        description: '8 blog posts per month — up to 1,500 words each.',
        bestFor: 'Authors building a serious content presence',
        features: [
          '8 posts per month',
          'Up to 1,500 words per post',
          'Advanced SEO optimization',
          'Topic research and ideation',
          '2 revisions per post',
          'Monthly content calendar',
          'Meta descriptions included'
        ],
        featured: true
      },
      {
        name: 'Authority',
        label: 'PREMIUM',
        price: { perChapter: 999, fullBook: null },
        description: '12 blog posts per month — up to 2,500 words each.',
        bestFor: 'Authors committed to content leadership',
        features: [
          '12 posts per month',
          'Up to 2,500 words per post',
          'Expert SEO strategy',
          'Full content calendar management',
          'Unlimited revisions',
          'Image sourcing included',
          'Monthly performance report'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'How do you match the writer to my blog\'s voice?',
        answer: 'We begin every blog writing engagement with a detailed voice and style study — reading your existing posts, interviewing you about your perspective and preferences, and creating a style guide that governs every post we write for you.'
      },
      {
        question: 'Can I review posts before they are published?',
        answer: 'Yes — always. You receive every post for review before it goes live. You can request revisions, add your own insights or approve it as written. Publication only happens with your explicit approval.'
      },
      {
        question: 'Do you handle the content calendar and topic planning?',
        answer: 'Yes. Our Growth and Authority plans include full content calendar management — researching and proposing topics monthly based on your goals, your audience\'s interests and current search opportunities in your niche.'
      },
      {
        question: 'Will my blog posts be SEO optimized?',
        answer: 'Yes. All our blog posts are written with SEO best practices — natural keyword integration, optimized headings, meta descriptions and internal linking recommendations. We write to rank without sacrificing readability or quality.'
      },
      {
        question: 'Can you write technical or specialist blog content?',
        answer: 'Yes. We have writers who specialize in technical, medical, legal, financial and other specialist fields. You are always matched with a writer who has genuine knowledge of your subject area.'
      }
    ],

    testimonial: {
      quote: 'My blog has transformed my business. GhostWriterHunt writes four posts a month in my voice and my organic traffic has grown by 340% in eight months. Clients regularly tell me they discovered me through my blog — and that never happened before we started working together.',
      author: 'James Whitmore',
      book: 'Shadows at Midnight',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Start the blog that',
    ctaHeadlineItalic: 'builds your readership.',
    ctaSubtext: 'Book a free consultation and let us create consistent, compelling content for your audience.',
    ctaImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 13. PROOFREADING
  // ─────────────────────────────────
  {
    slug: 'proofreading',
    category: 'Editing',
    title: 'Proofreading',
    tagline: 'Error-free manuscripts,',
    taglineItalic: 'every single time.',
    heroSubtext: 'The final read before publication is the most critical. Our professional proofreaders catch every error that slipped through — from typos and grammatical mistakes to inconsistencies that would undermine your credibility with readers.',

    heroImages: [
      {
        url: '/images/HEERO-L13.webp',
        alt: 'Proofreading professionals',
        size: 'large'
      },
      {
        url: '/images/collaboration-laptop.webp',
        alt: 'Editing manuscript',
        size: 'medium'
      },
      {
        url: '/images/book-pen-laptop.webp',
        alt: 'Pen and paper',
        size: 'small'
      }
    ],

    overview: {
      headline: 'No error reaches your',
      headlineItalic: 'readers on our watch.',
      body: 'Even the most experienced writers miss errors in their own work — it is simply how the human brain operates when reading familiar text. Our proofreaders bring fresh, expert eyes to your manuscript, catching every typo, grammatical error, punctuation mistake and inconsistency before your book goes to print or publication. The result is a manuscript that reads with the polish and professionalism of a major publishing house.',
      bullets: [
        'Spelling, grammar and punctuation correction',
        'Consistency checks throughout the manuscript',
        'Formatting and style guide compliance',
        'Homophone and commonly confused word errors',
        'Chapter and page numbering verification',
        'Final pre-publication quality assurance'
      ],
      images: [
        {
          url: '/images/fountain-pen-notes.webp',
          alt: 'Proofreading work',
          size: 'large'
        },
        {
          url: '/images/book-pen-laptop.webp',
          alt: 'Checking manuscript',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'eye',
        title: 'Fresh Eyes',
        description: 'Our proofreaders come to your manuscript completely fresh — seeing errors that familiarity has made invisible to you.'
      },
      {
        icon: 'check-circle',
        title: 'Systematic Process',
        description: 'We use a structured multi-pass proofreading process that ensures no error category is overlooked.'
      },
      {
        icon: 'clock',
        title: 'Fast Turnaround',
        description: 'We understand publication deadlines. Our proofreaders work efficiently without ever sacrificing thoroughness.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Manuscript Receipt',
        description: 'We receive your manuscript and confirm scope, style guide requirements and turnaround time.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'First Pass',
        description: 'A thorough first read catches spelling, grammar and punctuation errors throughout.',
        image: '/images/fountain-pen-notes.webp'
      },
      {
        number: '03',
        title: 'Consistency Check',
        description: 'Character names, place names, dates and factual consistency are verified throughout.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '04',
        title: 'Formatting Review',
        description: 'Page numbers, chapter headings, spacing and formatting consistency are checked.',
        image: '/images/book-pen-laptop.webp'
      },
      {
        number: '05',
        title: 'Delivery',
        description: 'Your corrected manuscript is returned with all changes tracked and a summary report.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Standard',
        label: 'ESSENTIALS',
        price: { perChapter: 49, fullBook: 299 },
        description: 'Professional proofreading for manuscripts up to 30,000 words.',
        bestFor: 'Short books, novellas and eBooks',
        features: [
          'Up to 30,000 words',
          'Spelling and grammar check',
          'Punctuation correction',
          'Tracked changes delivery',
          '7-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: 79, fullBook: 499 },
        description: 'Thorough proofreading for full-length manuscripts.',
        bestFor: 'Full-length novels and non-fiction books',
        features: [
          'Up to 80,000 words',
          'Full grammar and spelling check',
          'Consistency verification',
          'Formatting review',
          'Error summary report',
          '10-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: 99, fullBook: 799 },
        description: 'Comprehensive proofreading plus style check.',
        bestFor: 'Academic, technical and complex manuscripts',
        features: [
          'Unlimited word count',
          'Full proofreading suite',
          'Style guide compliance',
          'Fact and name consistency',
          'Detailed error report',
          'Rush 5-day turnaround available'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What is the difference between proofreading and editing?',
        answer: 'Proofreading is the final quality check for surface errors — spelling, grammar, punctuation and consistency. Editing goes deeper — addressing structure, clarity, style and voice. Proofreading always comes after editing, as the last step before publication.'
      },
      {
        question: 'Will you change my writing style?',
        answer: 'No. Proofreading corrects errors — it does not change your writing style. We correct mistakes while preserving your voice exactly as you have written it.'
      },
      {
        question: 'How fast can you proofread my manuscript?',
        answer: 'Standard turnaround is 7 to 10 days depending on manuscript length. Rush turnaround in 3 to 5 days is available on our Premium plan for urgent publication deadlines.'
      },
      {
        question: 'Do you proofread non-English manuscripts?',
        answer: 'We currently proofread in English only. If you are writing in a language other than English and need translation or proofreading support, please contact us and we will recommend appropriate specialists.'
      },
      {
        question: 'Will I be able to see what was changed?',
        answer: 'Yes — always. We deliver your manuscript with all corrections tracked using Microsoft Word track changes or Google Docs suggesting mode. You can review every correction individually before accepting them.'
      }
    ],

    testimonial: {
      quote: 'I thought I had proofread my manuscript thoroughly. GhostWriterHunt found 340 errors I had completely missed. The corrections were delivered quickly, clearly and professionally. My book launched without a single reader complaint about errors — and that confidence is priceless.',
      author: 'Robert Callahan',
      book: 'My Father\'s Legacy',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Publish with complete',
    ctaHeadlineItalic: 'confidence.',
    ctaSubtext: 'Book a free consultation and let our proofreaders ensure your manuscript is flawless.',
    ctaImage: '/images/fountain-pen-notes.webp'
  },

  // ─────────────────────────────────
  // 14. BOOK FORMATTING
  // ─────────────────────────────────
  {
    slug: 'book-formatting',
    category: 'Editing',
    title: 'Book Formatting',
    tagline: 'Formatted for every platform,',
    taglineItalic: 'perfectly.',
    heroSubtext: 'Every publishing platform has specific technical requirements for file formatting. Our specialists ensure your manuscript meets every standard — delivering clean, professional files ready to upload on any platform worldwide.',

    heroImages: [
      {
        url: '/images/HEERO-L14.webp',
        alt: 'Book formatting professional',
        size: 'large'
      },
      {
        url: '/images/books-stack-pink.webp',
        alt: 'Formatted pages',
        size: 'medium'
      },
      {
        url: '/images/author-reading.webp',
        alt: 'Typography',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Technical precision meets',
      headlineItalic: 'beautiful presentation.',
      body: 'Formatting errors can get your book rejected by publishing platforms, create a poor reading experience and undermine your professional reputation. Our formatting specialists have deep technical knowledge of every major platform\'s requirements — from Amazon KDP to Apple Books — and deliver files that pass every quality check first time, every time.',
      bullets: [
        'Amazon KDP print and digital formatting',
        'ePub 3.0 and MOBI file creation',
        'IngramSpark and other print-on-demand platforms',
        'Table of contents with working hyperlinks',
        'Image optimization for all formats',
        'Quality tested on real devices before delivery'
      ],
      images: [
        {
          url: '/images/library-books.webp',
          alt: 'Book layout',
          size: 'large'
        },
        {
          url: '/images/author-reading.webp',
          alt: 'Typography detail',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'settings',
        title: 'Platform Expertise',
        description: 'We know the exact technical requirements of every major publishing platform — and stay current as requirements change.'
      },
      {
        icon: 'smartphone',
        title: 'Device Testing',
        description: 'Every digital file is tested on actual Kindle, iPad and other devices before delivery to ensure a perfect reading experience.'
      },
      {
        icon: 'check-square',
        title: 'First Time Approval',
        description: 'Our formatting consistently passes platform quality checks first time — saving you the frustration of repeated rejections and delays.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'File Review',
        description: 'We assess your manuscript file and identify all formatting requirements for your chosen platforms.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Clean and Prepare',
        description: 'The manuscript is cleaned of hidden formatting issues that cause problems during conversion.',
        image: '/images/library-books.webp'
      },
      {
        number: '03',
        title: 'Format and Convert',
        description: 'Files are formatted and converted for each required platform — print PDF, ePub and MOBI.',
        image: '/images/books-stack-pink.webp'
      },
      {
        number: '04',
        title: 'Quality Testing',
        description: 'All files are tested on real devices and checked against platform requirements.',
        image: '/images/author-reading.webp'
      },
      {
        number: '05',
        title: 'File Delivery',
        description: 'All platform-ready files are delivered with upload instructions for each platform.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Digital',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 149 },
        description: 'ePub and MOBI formatting for digital platforms.',
        bestFor: 'eBook only publishing',
        features: [
          'ePub 3.0 formatting',
          'MOBI for Kindle',
          'Clickable table of contents',
          'Device tested',
          '5-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Print and Digital',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 299 },
        description: 'Complete formatting for print and digital publishing.',
        bestFor: 'Authors publishing in all formats',
        features: [
          'Print-ready PDF',
          'ePub and MOBI formatting',
          'All platform specifications met',
          'Clickable table of contents',
          'Image optimization',
          'Device tested',
          '7-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 499 },
        description: 'Complete multi-platform formatting with design elements.',
        bestFor: 'Authors who want premium presentation',
        features: [
          'All print and digital formats',
          'Custom chapter heading styling',
          'Drop capitals and ornamentals',
          'Advanced image formatting',
          'All platforms quality tested',
          'Upload assistance included',
          '5-day rush turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What formats will I receive?',
        answer: 'Depending on your plan you receive a combination of print-ready PDF, ePub 3.0 and MOBI files. All files are tested and confirmed compatible with Amazon KDP, Apple Books, Kobo, IngramSpark and other major platforms.'
      },
      {
        question: 'My book has images and tables — can you format that?',
        answer: 'Yes. Books with complex elements — images, tables, charts, diagrams and sidebars — require specialist formatting knowledge. Our team has extensive experience with all types of complex content across both print and digital formats.'
      },
      {
        question: 'Can you format a book I have already uploaded that was rejected?',
        answer: 'Yes. If your book was rejected by a publishing platform due to formatting issues, we diagnose the problem and reformat correctly. We have a strong track record of resolving persistent formatting rejections quickly.'
      },
      {
        question: 'Do you provide upload assistance?',
        answer: 'Our Premium plan includes upload assistance — we provide step-by-step instructions for uploading your files to each platform and are available to answer questions during the upload process.'
      },
      {
        question: 'How long does formatting take?',
        answer: 'Digital-only formatting typically takes 5 days. Full print and digital formatting takes 7 days. Rush formatting in 3 days is available for urgent publishing deadlines on our Premium plan.'
      }
    ],

    testimonial: {
      quote: 'I had tried to format my book myself and it was rejected by Amazon three times. GhostWriterHunt formatted it professionally and it was approved first time. They also delivered a beautiful ePub that looked perfect on every device I tested. I wish I had come to them first.',
      author: 'Jennifer Walsh',
      book: 'The Power Within',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Get your book formatted',
    ctaHeadlineItalic: 'right the first time.',
    ctaSubtext: 'Book a free consultation and let our formatting specialists prepare your book for every platform.',
    ctaImage: '/images/library-books.webp'
  },

  // ─────────────────────────────────
  // 15. VIDEO BOOK TRAILER
  // ─────────────────────────────────
  {
    slug: 'video-book-trailer',
    category: 'Design',
    title: 'Video Book Trailer',
    tagline: 'Give your book a cinematic',
    taglineItalic: 'introduction.',
    heroSubtext: 'A compelling video trailer creates excitement, drives pre-orders and gives your book a presence on social media and YouTube that static images simply cannot match. Our production team creates book trailers that make readers want to read immediately.',

    heroImages: [
      {
        url: '/images/HEERO-L15.webp',
        alt: 'Video book trailer production',
        size: 'large'
      },
      {
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=350&fit=crop',
        alt: 'Film equipment',
        size: 'medium'
      },
      {
        url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=240&fit=crop',
        alt: 'Video editing',
        size: 'small'
      }
    ],

    overview: {
      headline: 'A trailer that sells your book',
      headlineItalic: 'in 60 seconds.',
      body: 'The most powerful book promotion tool you can have is a great video trailer. In the age of social media and short-form video, a compelling 60-second trailer can reach thousands of potential readers in days. Our production team writes, designs and produces book trailers that capture the mood, tension and appeal of your story — compelling viewers to find your book immediately.',
      bullets: [
        'Professional script writing for your trailer',
        'Custom animation and motion design',
        'Licensed music score selection',
        'Professional voice-over available',
        'Optimized for YouTube, Instagram and Amazon',
        'Multiple format delivery for all platforms'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=400&h=500&fit=crop',
          alt: 'Video production',
          size: 'large'
        },
        {
          url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=250&h=300&fit=crop',
          alt: 'Film production',
          size: 'medium'
        },
        {
          url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=240&fit=crop',
          alt: 'Editing suite',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'film',
        title: 'Story-Led Production',
        description: 'Every trailer begins with your story — we identify the emotional hook that will make viewers need to read your book immediately.'
      },
      {
        icon: 'music',
        title: 'Cinematic Score',
        description: 'Licensed music transforms a good trailer into a great one. We select or compose a score that perfectly matches your book\'s tone.'
      },
      {
        icon: 'share-2',
        title: 'Platform Optimized',
        description: 'Your trailer is delivered in multiple formats and aspect ratios — optimized for YouTube, Instagram Stories, TikTok and Amazon video.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Creative Brief',
        description: 'We discuss your book, its tone, target audience and the emotional response you want the trailer to create.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Script and Storyboard',
        description: 'A compelling script and visual storyboard are created and approved before production begins.',
        image: 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=400&h=300&fit=crop'
      },
      {
        number: '03',
        title: 'Production',
        description: 'Animation, motion graphics, typography and visual elements are produced by our creative team.',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop'
      },
      {
        number: '04',
        title: 'Music and Voice',
        description: 'Licensed music score and professional voice-over are added and mixed to create the final trailer.',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop'
      },
      {
        number: '05',
        title: 'Delivery',
        description: 'Final trailer files delivered in all required formats with thumbnail images for each platform.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 499 },
        description: 'A 30-second animated book trailer.',
        bestFor: 'Authors launching their first video promotion',
        features: [
          '30-second trailer',
          'Script writing included',
          'Motion graphics and animation',
          'Licensed music track',
          'YouTube and social media formats',
          '14-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 999 },
        description: 'A 60-second cinematic book trailer.',
        bestFor: 'Authors who want a full cinematic trailer',
        features: [
          '60-second trailer',
          'Full script and storyboard',
          'Advanced motion graphics',
          'Licensed cinematic music score',
          'Professional voice-over',
          'All platform formats delivered',
          '21-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1999 },
        description: 'A full cinematic trailer plus promotional cut-downs.',
        bestFor: 'Authors investing in a complete video marketing campaign',
        features: [
          '90-second hero trailer',
          '30-second social media cut',
          '15-second Instagram Stories cut',
          'Full script and storyboard',
          'Custom music composition',
          'Professional voice-over talent',
          'Thumbnail design for all platforms',
          'Priority 21-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'What style of trailer do you produce?',
        answer: 'We produce animated motion graphics trailers — using typography, imagery, color and movement to create a cinematic feel. We do not produce live-action filmed trailers, though we can incorporate author photos or stock footage where appropriate.'
      },
      {
        question: 'Can I provide images to use in my trailer?',
        answer: 'Yes — we encourage it. Your book cover, author photo and any approved imagery you own can be incorporated into your trailer. We also have access to licensed stock footage and image libraries.'
      },
      {
        question: 'Where can I use my book trailer?',
        answer: 'Your trailer can be used everywhere — YouTube, Instagram, Facebook, TikTok, your author website, Amazon Author Central, email newsletters and any other platform. We deliver in multiple formats sized for each platform.'
      },
      {
        question: 'Is music included and do I own the rights?',
        answer: 'Yes — licensed music is included in all plans. The music license covers your trailer for use across all major platforms. You own the complete trailer including all visual elements — only the music requires the continued license which we arrange and maintain.'
      },
      {
        question: 'How long will my trailer take to produce?',
        answer: 'Essential trailers take 14 days from approved storyboard. Professional trailers take 21 days. Premium trailers with multiple cut-downs take 21 to 28 days. Rush production is available for urgent launch deadlines.'
      }
    ],

    testimonial: {
      quote: 'My book trailer from GhostWriterHunt has been watched over 12,000 times on YouTube and has driven more pre-orders than any other marketing I have done. It perfectly captures the mood of my thriller in 60 seconds. Every author needs one — I only wish I had done it sooner.',
      author: 'James Whitmore',
      book: 'Shadows at Midnight',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Give your book the trailer',
    ctaHeadlineItalic: 'it deserves.',
    ctaSubtext: 'Book a free creative consultation and let us produce a trailer that makes readers want your book immediately.',
    ctaImage: 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 16. AUDIOBOOK PUBLISHING
  // ─────────────────────────────────
  {
    slug: 'audiobook-publishing',
    category: 'Publishing',
    title: 'Audiobook Publishing',
    tagline: 'Your words, heard by',
    taglineItalic: 'the world.',
    heroSubtext: 'The audiobook market is growing faster than any other format in publishing. Our audiobook production team handles everything — from professional narration and studio recording to distribution on Audible, Apple Podcasts and beyond.',

    heroImages: [
      {
        url: '/images/HEERO-L16.webp',
        alt: 'Audiobook recording studio',
        size: 'large'
      },
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=350&fit=crop',
        alt: 'Headphones',
        size: 'medium'
      },
      {
        url: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=200&h=240&fit=crop',
        alt: 'Microphone',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Reach readers who prefer',
      headlineItalic: 'to listen.',
      body: 'Millions of readers today consume books through their ears — commuting, exercising, cooking or simply relaxing. An audiobook version of your title opens your work to this vast and rapidly growing audience. Our audiobook production team manages every aspect of the process — from matching you with the perfect narrator voice to mastering the final audio and distributing across all major platforms.',
      bullets: [
        'Professional narrator selection for your genre',
        'Studio-quality recording and production',
        'Audio mastering to ACX and Audible standards',
        'Distribution on Audible, Apple Books Audio and more',
        'You retain 100% of your audiobook rights',
        'Royalty share or upfront payment options'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=500&fit=crop',
          alt: 'Recording studio',
          size: 'large'
        },
        {
          url: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=250&h=300&fit=crop',
          alt: 'Microphone',
          size: 'medium'
        },
        {
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=240&fit=crop',
          alt: 'Listening',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'mic',
        title: 'Perfect Voice Match',
        description: 'We match your book with a narrator whose voice, tone and style perfectly complement your genre and target audience.'
      },
      {
        icon: 'volume-2',
        title: 'Studio Quality',
        description: 'All recording and production meets ACX and Audible\'s strict quality standards — ensuring your audiobook passes review first time.'
      },
      {
        icon: 'headphones',
        title: 'Wide Distribution',
        description: 'Your audiobook is distributed to Audible, Apple Books, Google Play Audiobooks and all major listening platforms simultaneously.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Narrator Selection',
        description: 'We present narrator audition samples for your approval — selecting the perfect voice for your book.',
        image: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=400&h=300&fit=crop'
      },
      {
        number: '02',
        title: 'Recording',
        description: 'Your book is recorded in a professional studio to ACX quality standards.',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop'
      },
      {
        number: '03',
        title: 'Editing and Mastering',
        description: 'The recording is edited for errors and mastered to meet all platform technical requirements.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
      },
      {
        number: '04',
        title: 'Quality Review',
        description: 'You listen to the final production and approve before distribution.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Distribution',
        description: 'Your audiobook is submitted and published across all major audio platforms.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 999 },
        description: 'Professional audiobook for books up to 30,000 words.',
        bestFor: 'Short books, novellas and eBooks',
        features: [
          'Up to 30,000 words',
          'Professional narrator selection',
          'Studio recording',
          'Audio mastering',
          'Audible and Apple distribution',
          '30-day production'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 1999 },
        description: 'Full audiobook production for standard length books.',
        bestFor: 'Full-length novels and non-fiction books',
        features: [
          'Up to 80,000 words',
          'Narrator auditions provided',
          'Studio quality recording',
          'Full audio mastering',
          'All major platform distribution',
          'Retail audio cover design',
          '45-day production'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 3999 },
        description: 'Premium production for maximum impact.',
        bestFor: 'Authors who want the highest quality audiobook',
        features: [
          'Unlimited word count',
          'Multiple narrator auditions',
          'Premium studio recording',
          'Advanced audio mastering',
          'Global platform distribution',
          'Audio cover design',
          'Launch strategy included',
          'Priority production'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'Can I narrate my own audiobook?',
        answer: 'Yes — if you want to narrate your own book, we provide recording guidance, a professional studio session and full post-production editing and mastering. Many authors find narrating their own work creates a powerful personal connection with listeners.'
      },
      {
        question: 'How do I choose a narrator?',
        answer: 'We present you with audition samples from narrators who specialize in your genre. You listen and select the voice that feels right for your book. We handle all narrator contracts, scheduling and direction.'
      },
      {
        question: 'Which platforms will my audiobook be on?',
        answer: 'We distribute to Audible, ACX, Apple Books Audiobooks, Google Play Audiobooks, Libro.fm, OverDrive and other major audio platforms. Your audiobook will be available wherever listeners prefer to consume audio content.'
      },
      {
        question: 'How long does audiobook production take?',
        answer: 'Production typically takes 30 to 60 days depending on book length and narrator availability. This includes recording, editing, mastering, your review and platform submission. We communicate clearly throughout the entire process.'
      },
      {
        question: 'Do I keep my audiobook rights?',
        answer: 'Yes — 100%. We produce your audiobook as a work for hire. You retain complete ownership of the finished audiobook, all distribution rights and 100% of your royalties on every platform.'
      }
    ],

    testimonial: {
      quote: 'My audiobook has opened my work to an entirely new audience. The narrator GhostWriterHunt selected was perfect — her voice brought my memoir to life in a way I never imagined. Listeners have told me the audio version moved them even more deeply than reading it. I could not be more proud.',
      author: 'Margaret Thompson',
      book: 'Finding My Way Home',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Let your book be',
    ctaHeadlineItalic: 'heard as well as read.',
    ctaSubtext: 'Book a free consultation and discover how we can bring your book to life in audio.',
    ctaImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 17. AUTHOR WEBSITE DESIGN
  // ─────────────────────────────────
  {
    slug: 'author-website',
    category: 'Marketing',
    title: 'Author Website Design',
    tagline: 'Your home on the web,',
    taglineItalic: 'beautifully crafted.',
    heroSubtext: 'Every serious author needs a professional website — the one place online that is entirely yours. We design and build beautiful, fast author websites that showcase your books, build your readership and establish your authority.',

    heroImages: [
      {
        url: '/images/HEERO-L17.webp',
        alt: 'Author website design team',
        size: 'large'
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=350&fit=crop',
        alt: 'Web development',
        size: 'medium'
      },
      {
        url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=240&fit=crop',
        alt: 'Design mockup',
        size: 'small'
      }
    ],

    overview: {
      headline: 'A website that makes readers',
      headlineItalic: 'want to stay.',
      body: 'Your author website is your most important marketing asset — the hub that connects everything else you do online. It is where readers discover you, where media goes to learn about you and where fans go to feel connected to your work. We design author websites that are as compelling as the books they showcase — beautiful, fast, easy to navigate and optimized for search engines.',
      bullets: [
        'Custom design — built specifically for authors',
        'Mobile-responsive and fast loading',
        'SEO optimized from the ground up',
        'Book showcase with buy links',
        'Email newsletter integration',
        'Blog and events sections available'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=400&fit=crop',
          alt: 'Website design',
          size: 'large'
        },
        {
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=280&h=280&fit=crop',
          alt: 'Development',
          size: 'medium'
        },
        {
          url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=200&fit=crop',
          alt: 'Design',
          size: 'small'
        }
      ]
    },

    approach: [
      {
        icon: 'layout',
        title: 'Author Focused Design',
        description: 'We design specifically for authors — not generic business websites. Every element serves your books, your readers and your brand.'
      },
      {
        icon: 'search',
        title: 'SEO Built In',
        description: 'Your website is optimized for search from day one — helping readers find you when they search for your name, your books or your genre.'
      },
      {
        icon: 'smartphone',
        title: 'Mobile Perfect',
        description: 'Most readers will discover you on mobile. Your website looks and works flawlessly on every device and screen size.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Discovery and Brief',
        description: 'We discuss your books, your brand, your audience and the goals of your website.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Design Mockup',
        description: 'A complete website design mockup is created for your review before any development begins.',
        image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop'
      },
      {
        number: '03',
        title: 'Development',
        description: 'Your website is built to pixel-perfect specification — fast, secure and SEO optimized.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
      },
      {
        number: '04',
        title: 'Content and Review',
        description: 'Content is added, integrations are connected and you review the complete website before launch.',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop'
      },
      {
        number: '05',
        title: 'Launch',
        description: 'Your website goes live and we provide training so you can manage it confidently yourself.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 999 },
        description: 'A professional author website — 3 pages.',
        bestFor: 'Authors who need a professional online presence quickly',
        features: [
          'Home, About and Books pages',
          'Custom design — not templated',
          'Mobile responsive',
          'Basic SEO setup',
          'Buy links to Amazon and other platforms',
          'Contact form included',
          '14-day delivery'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 1999 },
        description: 'A complete author website — 6 pages.',
        bestFor: 'Authors building a serious online readership',
        features: [
          'Up to 6 custom pages',
          'Blog section included',
          'Email newsletter integration',
          'Advanced SEO optimization',
          'Social media integration',
          'Google Analytics setup',
          'Book sample download',
          '21-day delivery'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 3499 },
        description: 'A full-featured author platform.',
        bestFor: 'Authors who want a complete professional platform',
        features: [
          'Unlimited pages',
          'Full blog with categories',
          'Events and appearances section',
          'Media and press kit page',
          'Email list building tools',
          'Advanced SEO and analytics',
          'Monthly maintenance included',
          '30-day delivery'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'Do I need technical knowledge to manage my website?',
        answer: 'No. We build your website on a user-friendly platform and provide comprehensive training so you can update your content, add new books and publish blog posts without any technical knowledge.'
      },
      {
        question: 'Can I use my existing domain name?',
        answer: 'Yes. If you already have a domain name registered, we connect it to your new website at no extra cost. If you need a domain, we help you choose and register the perfect one for your author brand.'
      },
      {
        question: 'Will my website appear in Google search results?',
        answer: 'Yes. All our websites are built with SEO best practices — optimized headings, fast loading, mobile responsive and properly structured for search engines. We also submit your sitemap to Google and Bing as part of our launch process.'
      },
      {
        question: 'Can you include a shop where I sell books directly?',
        answer: 'Yes. Our Professional and Premium plans can include a direct sales shop integrated with your website — allowing readers to purchase signed copies or digital editions directly from you, keeping more of the royalty than through Amazon.'
      },
      {
        question: 'What happens after my website is launched?',
        answer: 'We provide full training for managing your website and remain available for questions. Our Premium plan includes ongoing monthly maintenance. For all plans, support packages are available for updates, new pages and technical assistance.'
      }
    ],

    testimonial: {
      quote: 'My author website from GhostWriterHunt is the most professional thing I have ever had in my name. It looks like I have a full publishing team behind me. My speaking enquiries have doubled and readers tell me they feel like they know me before they even read the book.',
      author: 'Sofia Martinez',
      book: 'When Hearts Collide',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Claim your space on',
    ctaHeadlineItalic: 'the web.',
    ctaSubtext: 'Book a free consultation and let us design the author website your readers deserve.',
    ctaImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=600&fit=crop'
  },

  // ─────────────────────────────────
  // 18. WEBSITE CONTENT WRITING
  // ─────────────────────────────────
  {
    slug: 'website-content',
    category: 'Writing',
    title: 'Website Content Writing',
    tagline: 'Words that make visitors',
    taglineItalic: 'become readers.',
    heroSubtext: 'Your website is only as powerful as the words on it. Our website content writers craft copy that communicates your value, connects with your audience and compels visitors to take action — whether that means buying your book, signing up to your list or getting in touch.',

    heroImages: [
      {
        url: '/images/HEERO-L18.webp',
        alt: 'Website content writing team',
        size: 'large'
      },
      {
        url: '/images/writing-desk.webp',
        alt: 'Writing workspace',
        size: 'medium'
      },
      {
        url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=240&fit=crop',
        alt: 'Digital content',
        size: 'small'
      }
    ],

    overview: {
      headline: 'Copy that connects, compels',
      headlineItalic: 'and converts.',
      body: 'Most author websites fail not because of poor design — but because of weak copy. Visitors arrive and leave without taking action because nothing on the page speaks directly to them. Our website content writers specialize in author copy — understanding how readers think, what they need to feel before they buy and how to write every page with purpose and persuasion.',
      bullets: [
        'Homepage copy that captures your author brand',
        'About page that creates genuine connection',
        'Book page copy that drives purchases',
        'SEO-optimized throughout for search visibility',
        'Email opt-in and newsletter copy',
        'Press and media page content'
      ],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=500&fit=crop',
          alt: 'Content creation',
          size: 'large'
        },
        {
          url: '/images/writing-desk.webp',
          alt: 'Writing',
          size: 'medium'
        }
      ]
    },

    approach: [
      {
        icon: 'user',
        title: 'Reader Psychology',
        description: 'We understand how book buyers think and feel — and write every page to address their specific questions, concerns and desires.'
      },
      {
        icon: 'search',
        title: 'SEO Integrated',
        description: 'Every page is written to rank — naturally incorporating search terms your ideal readers use to find authors like you.'
      },
      {
        icon: 'arrow-right',
        title: 'Conversion Driven',
        description: 'Beautiful copy that does not convert is wasted. Every word we write serves a clear goal — moving visitors toward action.'
      }
    ],

    process: [
      {
        number: '01',
        title: 'Discovery',
        description: 'We learn about your books, your audience, your goals and the action you want visitors to take.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '02',
        title: 'Research',
        description: 'We research your genre, your ideal readers and the language that resonates most with your audience.',
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=300&fit=crop'
      },
      {
        number: '03',
        title: 'Copy Writing',
        description: 'All pages are written with clarity, persuasion and your unique author voice at the forefront.',
        image: '/images/writing-desk.webp'
      },
      {
        number: '04',
        title: 'Review and Refine',
        description: 'You review all copy and we refine until every word reflects your voice and achieves your goals.',
        image: '/images/collaboration-laptop.webp'
      },
      {
        number: '05',
        title: 'Delivery',
        description: 'Final copy delivered in your preferred format ready for your web designer or directly into your website.',
        image: '/images/books-stack-pink.webp'
      }
    ],

    pricing: [
      {
        name: 'Essential',
        label: 'ESSENTIALS',
        price: { perChapter: null, fullBook: 399 },
        description: 'Copy for 3 core website pages.',
        bestFor: 'Authors who need their core pages written professionally',
        features: [
          'Home, About and one Book page',
          'SEO keyword integration',
          'Meta descriptions included',
          '2 revision rounds',
          '7-day turnaround'
        ],
        featured: false
      },
      {
        name: 'Professional',
        label: 'MOST POPULAR',
        price: { perChapter: null, fullBook: 799 },
        description: 'Copy for a complete author website — up to 6 pages.',
        bestFor: 'Authors building their complete web presence',
        features: [
          'Up to 6 website pages',
          'Advanced SEO optimization',
          'Email opt-in copy',
          'Meta descriptions for all pages',
          'Unlimited revisions',
          'Voice guide included',
          '14-day turnaround'
        ],
        featured: true
      },
      {
        name: 'Premium',
        label: 'PREMIUM',
        price: { perChapter: null, fullBook: 1499 },
        description: 'Comprehensive copy for a full author platform.',
        bestFor: 'Authors who want every word to work perfectly',
        features: [
          'Unlimited website pages',
          'Full SEO strategy',
          'Email sequence copy — 5 emails',
          'Press and media page',
          'Speaking and events copy',
          'Ongoing content support — 3 months',
          'Priority 10-day turnaround'
        ],
        featured: false
      }
    ],

    faqs: [
      {
        question: 'How do you write in my voice for my website?',
        answer: 'We begin with a detailed voice discovery session — studying your existing writing, interviewing you about your style and preferences and creating a voice guide that governs every word we write for your website.'
      },
      {
        question: 'Will the copy be SEO friendly?',
        answer: 'Yes. All website copy is naturally optimized for search — incorporating relevant keywords, properly structured headings and meta descriptions for every page. We write for both search engines and human readers simultaneously.'
      },
      {
        question: 'Do you write copy for individual book pages?',
        answer: 'Yes. Book page copy is one of our specialties — including compelling book descriptions, reader benefits, genre positioning and calls to action that drive visitors to purchase. Strong book page copy is one of the highest-ROI investments an author can make.'
      },
      {
        question: 'Can you rewrite existing website copy that is not working?',
        answer: 'Absolutely. Many authors come to us with websites that look good but do not convert. We analyze your existing copy, identify what is not working and rewrite with a focus on engagement and conversion.'
      },
      {
        question: 'Do I need to provide any information about my books?',
        answer: 'Yes — the more you share the better. We will ask you to complete a detailed brief about each book, your target readers and your goals. The richer the information you provide, the more compelling and accurate the copy we produce.'
      }
    ],

    testimonial: {
      quote: 'Before GhostWriterHunt rewrote my website copy, I was getting traffic but no one was buying. Within a month of launching the new copy my conversion rate tripled. The words finally matched the quality of my books — and readers responded immediately.',
      author: 'Charles Bennett',
      book: 'My Father\'s Legacy',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=96&h=96&fit=crop&crop=face'
    },

    ctaHeadline: 'Make every word on your site',
    ctaHeadlineItalic: 'work for you.',
    ctaSubtext: 'Book a free consultation and let us write the copy that turns your website visitors into readers.',
    ctaImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1920&h=600&fit=crop'
  }

];

// Helper function to get service by slug
export function getServiceBySlug(slug) {
  return services.find(service => service.slug === slug) || null;
}

// Helper function to get services by category
export function getServicesByCategory(category) {
  return services.filter(service => service.category === category);
}

// Helper to get all slugs for static generation
export function getAllServiceSlugs() {
  return services.map(service => service.slug);
}

// Services organized by category for navbar
export const servicesByCategory = {
  Writing: services.filter(s => s.category === 'Writing'),
  Editing: services.filter(s => s.category === 'Editing'),
  Design: services.filter(s => s.category === 'Design'),
  Publishing: services.filter(s => s.category === 'Publishing'),
  Marketing: services.filter(s => s.category === 'Marketing'),
};
