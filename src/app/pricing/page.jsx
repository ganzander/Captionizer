"use client";
import React from "react";
import { Spotlight } from "../../components/ui/spotlight";

export default function page() {
  return (
    <div className="h-[90vh] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="intro-top">
          <section className="text-center mb-8">
            <h1 className="text-5xl text-white capitalize font-semibold">
              Check Out Our Pricing
            </h1>
            <h2 className="text-white/75 pt-5">Our Pricing Is Very Good</h2>
          </section>
        </div>

        <div className="bg-white text-slate-700 rounded-lg max-w-sm mx-auto p-4 text-center">
          <h3 className="font-bold text-3xl">Free</h3>
          <h4>Free Forever</h4>
        </div>
      </div>
    </div>
  );
}
