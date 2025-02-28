import DirectionAwareScrollComponent from "@/components/Header";
import Hero from "@/components/hero";
import { ScrollLock } from "@/components/scrollLock";

export default function Page() {
  return (
    <main className="relative w-full">
        <DirectionAwareScrollComponent />

      <div className="w-full bg-[#BFBFBF]">
        <ScrollLock />
        <Hero />
      </div>
      
      <section className="relative z-0 bg-none min-h-[100vh]">
      </section>
    </main>
  );
}
