export function AnnouncementBar() {
  return (
    <a
      href="#talise"
      className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 bg-ink px-6 py-3 text-center text-[14px] font-medium text-white transition-opacity hover:opacity-90"
    >
      <span>Talise won DeFi &amp; Payments at Sui Overflow 2026.</span>
      <span aria-hidden>&rarr;</span>
    </a>
  );
}
