import { Reveal } from "@/components/motion/reveal";

/** Full-bleed cinematic video — a visual exhale between typographic sections. */
export function VideoBlock() {
  return (
    <Reveal>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f2f2f2] sm:aspect-[21/9]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/cine/opt/phone.jpg"
        >
          <source src="/cine/money.mp4" type="video/mp4" />
        </video>
      </div>
    </Reveal>
  );
}
