  import Hero from "@/components/hero";
  import { ScrollLock } from "@/components/scrollLock";

  export default function Page() {
    return (
      <div className="w-full bg-[#BFBFBF]">
        <ScrollLock />
        <Hero />
      </div>
    );
  }