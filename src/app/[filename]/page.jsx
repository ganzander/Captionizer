"use client";
import React, { useEffect, useState } from "react";
import ResultVideo from "../../components/ResultVideo";
import TranscriptionEditor from "../../components/TranscriptionEditor";
import { clearTranscriptionItems } from "../../libs/awsTranscriptionHelper";
import axios from "axios";
import { Spotlight } from "../../components/ui/spotlight";

export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfo(true);
    axios.get("/api/transcribe?filename=" + filename).then((response) => {
      setIsFetchingInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        console.log(transcription);
        setAwsTranscriptionItems(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  if (isTranscribing) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="text-center py-10 text-2xl">
          Transcribing your video...
        </div>
        {/* <img className="justify-cnter" width={44} src="/giphy.gif" alt="" /> */}
      </div>
    );
  }

  if (isFetchingInfo) {
    return (
      <div className="text-center py-10 text-2xl">Fetching information...</div>
    );
  }

  return (
    <div className="min-h-[90vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div>
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-16 p-10">
            <div className="">
              <h2 className="text-2xl m-4 text-center text-white">
                Transcription
              </h2>
              <TranscriptionEditor
                awsTranscriptionItems={awsTranscriptionItems}
                setAwsTranscriptionItems={setAwsTranscriptionItems}
              />
            </div>
            <div className="w-full">
              <h2 className="text-2xl text-center m-4 text-white">Result</h2>
              <ResultVideo
                filename={filename}
                transcriptionItems={awsTranscriptionItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
