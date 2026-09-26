/**
 * Low-priority preloads for below-the-fold home backgrounds (desktop).
 * Keeps visuals unchanged; reduces late pop-in when scrolling to those sections.
 */
export default function HomeImagePreloads() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/background-howitworks-2.webp"
        media="(min-width: 769px)"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/background-cards.webp"
        media="(min-width: 1024px)"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/CTA-AUTHOR.webp"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/ghost-writer-3.webp"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/book-H11.webp"
        fetchPriority="low"
      />
    </>
  );
}
