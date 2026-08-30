export function AnnouncementBar() {
  return (
    <a
      href="#talise"
      className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 bg-[#fdf313] px-6 py-3 text-center text-[14px] font-medium text-[#1a1a1a] transition-opacity hover:opacity-90"
    >
      <span>Talise won 2nd place, DeFi &amp; Payments, at Sui Overflow 2026.</span>
      <span aria-hidden>&rarr;</span>
    </a>
  );
}
