import Hero from "@/components/hero";
import { ScrollLock } from "@/components/scrollLock";

export default function Page() {
  return (
    <main className="relative w-full">
      <div className="w-full bg-[#BFBFBF]">
        <ScrollLock />
        <Hero />
      </div>

      {/* Content section with increased height to ensure enough scroll space */}
      <section className="relative z-0 bg-white min-h-[160vh]">
      </section>
    </main>
  );
}
