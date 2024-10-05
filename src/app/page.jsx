"use client";
import "./globals.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Spotlight } from "../components/ui/spotlight";
import axios from "axios";

export default function Page() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function upLoad(e) {
    e.preventDefault();
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      const res = await axios.postForm("/api/upload", {
        file,
      });
      setIsUploading(false);
      const newName = res.data.newName;
      router.push("/" + newName);
    }
  }

  return (
    <div className="items-center flex flex-col lg:flex-row justify-center min-h-[90vh] w-full md:items-center md:justify-evenly bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-full lg:w-1/2">
        <section className="text-center mt-24 mb-8">
          <h1 className="text-4xl md:text-5xl text-white capitalize font-semibold">
            Add <span className=" text-yellow-400 ">SUBTITLES</span> <br />
            to your videos.
          </h1>
          <h2 className="text-lg md:text-2xl text-white/75 pt-10">
            with just one CLICK!
          </h2>
        </section>

        <div className="flex justify-center">
          <>
            {isUploading && (
              <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                <div className="w-full text-center">
                  <h2 className="text-4xl mb-4">Uploading</h2>
                  <h3 className="text-xl">Please Wait</h3>
                </div>
              </div>
            )}

            <label className="flex gap-2 bg-white text-purple-500 py-2 px-6 rounded-full border-2 border-purple-700/50 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
              <span>Choose files</span>
              <input onChange={upLoad} type="file" className="hidden" />
            </label>
          </>
        </div>
      </div>

      <section className="w-full lg:w-1/2 flex justify-center gap-10 m-8 sm:mt-12 items-center">
        <div className="hidden sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
          <video
            src="/Video without captions.mp4"
            preload="true"
            muted
            autoPlay
            loop
          />
        </div>

        <div className="hidden sm:block text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </div>

        <div className="bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
          <video
            src="/Video with captions.mp4"
            preload="true"
            muted
            autoPlay
            loop
          />
        </div>
      </section>
    </div>
  );
}
