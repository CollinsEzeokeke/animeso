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
      <section className="relative z-0 bg-none min-h-[100vh]">
      </section>
      </div>
      {/* further sections that won't be visible and be locked in place until the hero section reaches the end animation at 0.16 then after wards would be visible and scrollable and have an index that would make it appear on top of the hero section meaning that the components after the hero section would go over the hero section  and they would be entirely new sections and components*/}
      {/* new components for testing */}
      <div>
        
      </div>
    </main>
  );
}
