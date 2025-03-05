"use client";
import DirectionAwareScrollComponent from "@/components/Header";
import Hero from "@/components/hero";
import { ScrollLock } from "@/components/scrollLock";
import ScrollOverlay from "@/components/ScrollOverlay";
import { Geiger } from "react-geiger";
import React from "react";

export default function Page() {
  return (
    <Geiger 
      renderTimeThreshold={1.0}
      enabled={process.env.NODE_ENV === 'development'}
    >
      <div className="relative min-h-dvh bg-[#FEFEFE] z-0 overflow-hidden">
        <div className="relative z-10 w-full">
          <DirectionAwareScrollComponent />
        </div>
        <div className="w-full bg-[#BFBFBF]">
          <ScrollLock />
          <Hero />
          <section className="relative z-0 bg-none min-h-[100vh]"></section>
        </div>
        
        {/* Overlay content that animates on scroll */}
        <ScrollOverlay />
        
        {/* Post-scroll content */}
        {/* {postScrollContent} */}
      </div>
    </Geiger>
  );
}
